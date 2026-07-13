#!/usr/bin/env python3
"""
Importa os dados da Bíblia do Expositor (expositor_dados.json) para o Supabase.

COMO USAR:
1. pip install requests
2. Rode: python importar_biblia.py
3. Espera ~1-2 minutos. Vai importar os 31.143 versículos em lotes.

Depois de confirmar que a importação funcionou (dá uma olhada no
Table Editor do Supabase), REMOVA a policy temporária de insert
rodando isto no SQL Editor do Supabase:

    drop policy "temp public insert" on verses;

Isso fecha a tabela para gravação pública (só leitura fica liberada,
que é o que o app precisa).
"""
import json
import requests
import sys
import time

SUPABASE_URL = "https://hkfmhkvinuahkhdwkgwo.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZm1oa3ZpbnVhaGtoZHdrZ3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MDkzMTIsImV4cCI6MjA5OTQ4NTMxMn0.ZOUKn8iUcpVRi77ka3d3IfLJc63FPuRGhfolDI2_ESQ"
DATA_FILE = "expositor_dados.json"
CHUNK_SIZE = 500

def main():
    print("Lendo arquivo de dados...")
    with open(DATA_FILE, encoding="utf-8") as f:
        data = json.load(f)
    print(f"Total de versículos: {len(data)}")

    # Limpa a tabela antes de reimportar (evita duplicar se já rodou parcialmente)
    print("Limpando dados de teste anteriores...")
    del_resp = requests.delete(
        f"{SUPABASE_URL}/rest/v1/verses",
        headers={
            "apikey": ANON_KEY,
            "Authorization": f"Bearer {ANON_KEY}",
        },
        params={"id": "gte.0"},
    )
    print(f"  status: {del_resp.status_code}")

    url = f"{SUPABASE_URL}/rest/v1/verses"
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
                "book_order": d["book_order"],
                "chapter": d["chapter"],
                "verse": d["verse"],
                "text": d["text"],
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
        time.sleep(0.05)  # gentileza com a API

    print("\nImportação concluída! Agora rode no SQL Editor do Supabase:")
    print('  drop policy "temp public insert" on verses;')

if __name__ == "__main__":
    main()
