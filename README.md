# Bíblia do Expositor

App pessoal para leitura da Bíblia de Estudo do Expositor (Jimmy Swaggart Ministries), com busca por referência ou palavra-chave, comentário por versículo, navegação sequencial e seletores de livro/capítulo/versículo. Também exibe uma segunda fonte de comentário, a Bíblia de Estudo Aplicação Pessoal (CPAD/Tyndale House), em aba separada quando disponível para o versículo.

- `index.html` — app (HTML/CSS/JS puro, sem build step), consome o Supabase via REST (chave anônima, somente leitura).
- `scripts/importar_biblia.py` + `scripts/expositor_dados.json` — dataset e script de importação da tabela `verses` (texto bíblico + comentário do Expositor).
- `scripts/importar_aplicacao_pessoal.py` + `scripts/aplicacao_pessoal_dados.json` — dataset e script de importação da tabela `notes_aplicacao_pessoal` (notas de aplicação, complementares, ligadas por `book/chapter/verse`). Cobertura parcial (55/66 livros) — ver `RELATORIO_APLICACAO_PESSOAL.md`.

Uso estritamente pessoal.
