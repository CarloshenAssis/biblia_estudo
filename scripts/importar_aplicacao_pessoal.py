#!/usr/bin/env python3
"""
Importa as notas de aplicação da Bíblia de Estudo Aplicação Pessoal (CPAD/Tyndale)
para uma tabela nova no mesmo projeto Supabase do bibliaexpositor.vercel.app.

ANTES DE RODAR, crie a tabela no SQL Editor do Supabase:

    create table notes_aplicacao_pessoal (
      id bigserial primary key,
      book text not null,
      chapter smallint not null,
      verse smallint not null,
      comment text not null
    );

    create index idx_nap_book_chapter_verse on notes_aplicacao_pessoal (book, chapter, verse);

    alter table notes_aplicacao_pessoal enable row level security;
    create policy "public read access" on notes_aplicacao_pessoal for select using (true);
    create policy "temp public insert" on notes_aplicacao_pessoal for insert with check (true);

COMO USAR:
1. pip install requests
2. python importar_aplicacao_pessoal.py
3. Depois de confirmar que importou, rode no SQL Editor:
     drop policy "temp public insert" on notes_aplicacao_pessoal;

NOTA: o campo "book" usa o mesmo texto (ex: "GENESIS", "1 SAMUEL") já usado na
tabela `verses` do Expositor, então dá pra fazer join direto por book+chapter+verse.

COBERTURA: esta extração tem 55 dos 66 livros (veja o relatório). Os livros
"2 X" (2 Samuel, 2 Reis, 2 Crônicas, 2 Coríntios, 2 Tessalonicenses, 2 Timóteo,
2 Pedro, 2 João, 3 João), Judas e Apocalipse ficaram de fora nesta passada e
precisam ser reprocessados depois.
"""
import json
import requests
import sys
import time

SUPABASE_URL = "https://hkfmhkvinuahkhdwkgwo.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZm1oa3ZpbnVhaGtoZHdrZ3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MDkzMTIsImV4cCI6MjA5OTQ4NTMxMn0.ZOUKn8iUcpVRi77ka3d3IfLJc63FPuRGhfolDI2_ESQ"
DATA_FILE = "aplicacao_pessoal_dados.json"
CHUNK_SIZE = 500

def main():
    print("Lendo arquivo de dados...")
    with open(DATA_FILE, encoding="utf-8") as f:
        data = json.load(f)
    print(f"Total de notas: {len(data)}")

    url = f"{SUPABASE_URL}/rest/v1/notes_aplicacao_pessoal"
    headers = {
        "apikey": ANON_KEY,
        "Authorization": f"Bearer {ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    total = len(data)
    for i in range(0, total, CHUNK_SIZE):
        chunk = data[i:i + CHUNK_SIZE]
        payload = [
            {
                "book": d["book"],
                "chapter": d["chapter"],
                "verse": d["verse"],
                "comment": d["comment"],
            }
            for d in chunk
        ]
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code not in (200, 201):
            print(f"ERRO no lote {i}-{i+len(chunk)}: {resp.status_code} {resp.text[:300]}")
            sys.exit(1)
        pct = min(100, round((i + len(chunk)) / total * 100))
        print(f"  {i + len(chunk)}/{total} ({pct}%)")
        time.sleep(0.05)

    print("\nImportação concluída! Agora rode no SQL Editor do Supabase:")
    print('  drop policy "temp public insert" on notes_aplicacao_pessoal;')

if __name__ == "__main__":
    main()
