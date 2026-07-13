# Bíblia do Expositor

App pessoal para leitura da Bíblia de Estudo do Expositor (Jimmy Swaggart Ministries), com busca por referência ou palavra-chave, comentário por versículo, navegação sequencial e seletores de livro/capítulo/versículo.

- `index.html` — app (HTML/CSS/JS puro, sem build step), consome o Supabase via REST (chave anônima, somente leitura).
- `scripts/importar_biblia.py` — script usado para popular a tabela `verses` no Supabase (já executado; mantido para referência/reimportação futura).

Uso estritamente pessoal.
