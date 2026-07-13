# Bíblia do Expositor

App pessoal para leitura da Bíblia de Estudo do Expositor (Jimmy Swaggart Ministries), com busca por referência (aceita abreviações) ou por palavra-chave (full-text em português, com radical/relevância), comentário por versículo, navegação sequencial, seletores de livro/capítulo/versículo, favoritos e URLs amigáveis (`/genesis/1/1`). Também exibe uma segunda fonte de comentário, a Bíblia de Estudo Aplicação Pessoal (CPAD/Tyndale House), em aba separada — cobrindo os 66 livros, com notas que valem para uma faixa de versículos mostrando "Aplica-se a Livro X:Y–Z" quando aplicável.

- `index.html` — app (HTML/CSS/JS puro, sem build step), consome o Supabase via REST (chave anônima, somente leitura) e duas funções RPC (`search_verses`, `get_ap_notes`).
- `vercel.json` — rewrite para servir `index.html` em qualquer path, necessário pras URLs amigáveis funcionarem em navegação direta/refresh.
- `scripts/importar_biblia.py` + `scripts/expositor_dados.json` — dataset e script de importação da tabela `verses` (texto bíblico + comentário do Expositor).
- `scripts/importar_aplicacao_pessoal.py` + `scripts/aplicacao_pessoal_dados_raw.json` — dataset bruto (uma linha por versículo) e script que colapsa faixas duplicadas e importa pra tabela `notes_aplicacao_pessoal` (schema de intervalo — ver `relatorio_migracao_notas.md`). `scripts/aplicacao_pessoal_dados.json` é a versão já colapsada, pronta pra conferência.
- Favoritos ficam em `localStorage` do navegador (chave `bibliaExpositorFavoritos`) — sem tabela no Supabase, decisão deliberada enquanto o app não tem autenticação (ver `relatorio_migracao_notas.md`).

Uso estritamente pessoal.
