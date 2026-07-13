#!/usr/bin/env python3
"""
Importa as notas de aplicação da Bíblia de Estudo Aplicação Pessoal (CPAD/Tyndale)
para o Supabase, colapsando faixas de versículos duplicadas em uma única linha
por nota (schema de intervalo: chapter_start/verse_start/chapter_end/verse_end).

Por que colapsar: a extração original replica a mesma nota em cada versículo
de uma faixa (ex: uma nota que cobre Gênesis 1:3-1:25 vira 23 linhas
idênticas). Este script detecta essas sequências consecutivas com texto
byte-a-byte idêntico dentro do mesmo livro e grava só uma linha por faixa.

ANTES DE RODAR, crie a tabela no SQL Editor do Supabase:

    create table notes_aplicacao_pessoal (
      id bigserial primary key,
      book text not null,
      book_order smallint not null,
      chapter_start smallint not null,
      verse_start smallint not null,
      chapter_end smallint not null,
      verse_end smallint not null,
      comment text not null
    );

    create index idx_nap_range on notes_aplicacao_pessoal
      (book, chapter_start, verse_start, chapter_end, verse_end);

    alter table notes_aplicacao_pessoal enable row level security;
    create policy "public read access" on notes_aplicacao_pessoal for select using (true);
    create policy "temp public insert" on notes_aplicacao_pessoal for insert with check (true);

    create or replace function get_ap_notes(p_book text, p_chapter smallint, p_verse smallint)
    returns setof notes_aplicacao_pessoal
    language sql stable as $$
      select * from notes_aplicacao_pessoal
      where book = p_book
        and (chapter_start < p_chapter or (chapter_start = p_chapter and verse_start <= p_verse))
        and (chapter_end   > p_chapter or (chapter_end   = p_chapter and verse_end   >= p_verse))
      order by chapter_start, verse_start;
    $$;

COMO USAR:
1. pip install requests
2. Coloque o dataset bruto (uma linha por versículo, com faixas duplicadas)
   em aplicacao_pessoal_dados_raw.json, no mesmo formato de sempre:
   [{"book": "GENESIS", "chapter": 1, "verse": 1, "comment": "..."}, ...]
3. python importar_aplicacao_pessoal.py
4. Depois de confirmar que importou, rode no SQL Editor:
     drop policy "temp public insert" on notes_aplicacao_pessoal;

NOTA: o campo "book" usa o mesmo texto (ex: "GENESIS", "1 SAMUEL") já usado na
tabela `verses` do Expositor. A consulta pro app usa a função get_ap_notes
(RPC), que já resolve a faixa certa pra qualquer book/chapter/verse.
"""
import json
import requests
import sys
import time
from collections import defaultdict

SUPABASE_URL = "https://hkfmhkvinuahkhdwkgwo.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZm1oa3ZpbnVhaGtoZHdrZ3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MDkzMTIsImV4cCI6MjA5OTQ4NTMxMn0.ZOUKn8iUcpVRi77ka3d3IfLJc63FPuRGhfolDI2_ESQ"
RAW_FILE = "aplicacao_pessoal_dados_raw.json"
CHUNK_SIZE = 500

BOOKS_ORDER = [
    "GENESIS", "ÊXODO", "LEVÍTICO", "NÚMEROS", "DEUTERONÔMIO", "JOSUÉ", "JUÍZES", "RUTE",
    "1 SAMUEL", "2 SAMUEL", "1 REIS", "2 REIS", "1 CRÔNICAS", "2 CRÔNICAS", "ESDRAS", "NEEMIAS",
    "ESTER", "JÓ", "SALMOS", "PROVÉRBIOS", "ECLESIASTES", "CANTARES DE SALOMÃO", "ISAÍAS", "JEREMIAS",
    "LAMENTAÇÕES DE JEREMIAS", "EZEQUIEL", "DANIEL", "OSÉIAS", "JOEL", "AMOS", "OBADIAS", "JONAS",
    "MIQUÉIAS", "NAUM", "HABACUQUE", "SOFONIAS", "AGEU", "ZACARIAS", "MALAQUIAS", "MATEUS", "MARCOS",
    "LUCAS", "JOÃO", "ATOS DOS APÓSTOLOS", "ROMANOS", "1 CORÍNTIOS", "2 CORÍNTIOS", "GÁLATAS", "EFÉSIOS",
    "FILIPENSES", "COLOSSENSES", "1 TESSALONICENSES", "2 TESSALONICENSES", "1 TIMÓTEO", "2 TIMÓTEO",
    "TITO", "FILEMON", "HEBREUS", "TIAGO", "1 PEDRO", "2 PEDRO", "1 JOÃO", "2 JOÃO", "3 JOÃO", "JUDAS", "APOCALIPSE",
]
BOOK_ORDER_MAP = {b: i for i, b in enumerate(BOOKS_ORDER)}


def is_adjacent(prev_ch, prev_vs, ch, vs):
    if ch == prev_ch and vs == prev_vs + 1:
        return True
    if ch == prev_ch + 1 and vs == 1:
        return True
    return False


def collapse_to_ranges(rows):
    by_book = defaultdict(list)
    for r in rows:
        by_book[r["book"]].append(r)

    ranges = []
    for book, book_rows in by_book.items():
        rows_sorted = sorted(book_rows, key=lambda r: (r["chapter"], r["verse"]))
        groups = []
        cur_key, cur_list = None, []
        for r in rows_sorted:
            key = (r["chapter"], r["verse"])
            if key != cur_key:
                if cur_list:
                    groups.append((cur_key, cur_list))
                cur_key, cur_list = key, []
            cur_list.append(r["comment"])
        if cur_list:
            groups.append((cur_key, cur_list))

        open_ranges = {}
        prev_key = None
        for (ch, vs), comments in groups:
            adjacent = prev_key is not None and is_adjacent(prev_key[0], prev_key[1], ch, vs)
            new_open = {}
            for c in comments:
                if adjacent and c in open_ranges:
                    rng = open_ranges.pop(c)
                    rng["chapter_end"], rng["verse_end"] = ch, vs
                    new_open[c] = rng
                else:
                    new_open[c] = {
                        "book": book, "comment": c,
                        "chapter_start": ch, "verse_start": vs,
                        "chapter_end": ch, "verse_end": vs,
                    }
            for c, rng in open_ranges.items():
                ranges.append(rng)
            open_ranges = new_open
            prev_key = (ch, vs)
        for c, rng in open_ranges.items():
            ranges.append(rng)

    for r in ranges:
        r["book_order"] = BOOK_ORDER_MAP[r["book"]]
    return ranges


def main():
    print("Lendo dataset bruto...")
    with open(RAW_FILE, encoding="utf-8") as f:
        raw = json.load(f)
    print(f"Linhas brutas: {len(raw)}")

    ranges = collapse_to_ranges(raw)
    print(f"Faixas colapsadas: {len(ranges)}")

    url = f"{SUPABASE_URL}/rest/v1/notes_aplicacao_pessoal"
    headers = {
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    print("Limpando dados de importação anterior (se houver)...")
    del_resp = requests.delete(url, headers=headers, params={"id": "gte.0"})
    print(f"  status: {del_resp.status_code}")

    total = len(ranges)
    for i in range(0, total, CHUNK_SIZE):
        chunk = ranges[i:i + CHUNK_SIZE]
        payload = [
            {
                "book": r["book"], "book_order": r["book_order"],
                "chapter_start": r["chapter_start"], "verse_start": r["verse_start"],
                "chapter_end": r["chapter_end"], "verse_end": r["verse_end"],
                "comment": r["comment"],
            }
            for r in chunk
        ]
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code not in (200, 201):
            print(f"ERRO no lote {i}-{i + len(chunk)}: {resp.status_code} {resp.text[:300]}")
            sys.exit(1)
        pct = min(100, round((i + len(chunk)) / total * 100))
        print(f"  {i + len(chunk)}/{total} ({pct}%)")
        time.sleep(0.05)

    print("\nImportação concluída! Agora rode no SQL Editor do Supabase:")
    print('  drop policy "temp public insert" on notes_aplicacao_pessoal;')


if __name__ == "__main__":
    main()
