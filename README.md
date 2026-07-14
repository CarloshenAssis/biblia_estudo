# Bíblia Expositor

App pessoal de estudo bíblico: leitura da Bíblia de Estudo do Expositor (Jimmy Swaggart Ministries) com uma segunda fonte de comentário, a Bíblia de Estudo Aplicação Pessoal (CPAD/Tyndale House), busca por referência/palavra-chave, favoritos, histórico de leitura, navegação bíblica completa e tema claro/escuro. Design recriado a partir do protótipo em `design/`.

## Stack

React + Vite + TypeScript, consumindo o Supabase diretamente do navegador (chave anônima, somente leitura, via `@supabase/supabase-js`). Sem servidor próprio — é um site estático publicado no Vercel.

```
src/
  App.tsx              shell (top bar, sidebar, rotas, overlay de busca, toast)
  main.tsx             bootstrap
  types.ts             tipos compartilhados
  lib/
    supabase.ts         cliente Supabase + queries (verses, get_ap_notes, buscas)
    books.ts             lista canônica dos 66 livros, slugs, apelidos, parser de referência
    storage.ts            favoritos/histórico/tema em localStorage
    AppContext.tsx        estado compartilhado (tema, favoritos, histórico, toast, overlays)
  components/            TopBar, Sidebar, BottomNav, SearchOverlay, Toast, ícones
  views/                 ReadingView, FavoritesView, HistoryView
```

Cada view/componente tem seu próprio `*.module.css` (CSS Modules) — nada de estilos globais brigando entre si, e cada peça pode ser editada isoladamente.

## Rotas

- `/:livroSlug/:capitulo/:versiculo` — leitura (ex: `/joao/3/16`, `/genesis/1/1`)
- `/favoritos`
- `/historico`

URLs são amigáveis e compartilháveis; `vercel.json` reescreve qualquer path pra `index.html` (necessário pra navegação direta/refresh funcionar num SPA estático).

## Dados

- `verses` — texto bíblico + comentário do Expositor (31.104 versículos, 66/66 livros).
- `notes_aplicacao_pessoal` — notas da Aplicação Pessoal em schema de intervalo (`chapter_start`/`verse_start`/`chapter_end`/`verse_end`), 3.443 notas, 66/66 livros.
- Funções RPC: `get_ap_notes(book, chapter, verse)`, `search_verse_text`, `search_expositor_comments`, `search_ap_comments` (full-text em português).
- Favoritos e histórico ficam só em `localStorage` (`be_favorites`, `be_history`, `be_theme`) — decisão deliberada: uma tabela gravável pela chave anônima pública seria insegura sem autenticação (ver `relatorio_migracao_notas.md`).

## Rodando localmente

```
npm install
npm run dev
```

## Deploy

`npm run build` gera `dist/`; o Vercel já está conectado ao repositório e builda a partir de `vercel.json` (`buildCommand`/`outputDirectory`) a cada push em `main`.

## Scripts de importação (Python, fora do app)

- `scripts/importar_biblia.py` + `scripts/expositor_dados.json` — popula `verses`.
- `scripts/importar_aplicacao_pessoal.py` + `scripts/aplicacao_pessoal_dados_raw.json` — colapsa faixas duplicadas e popula `notes_aplicacao_pessoal`.

## Histórico do projeto

- `legacy/biblia-expositor-classic.html` — versão anterior (HTML/CSS/JS num arquivo só, sem build). Mantida como referência; não é mais o app em produção.
- `design/` — protótipo de design recebido para este redesign (referência visual, não é código de produção).
- `relatorio_qa_expositor.md`, `relatorio_limpeza_secaoA.md`, `relatorio_migracao_notas.md` — relatórios de qualidade de dados e migrações de schema feitas ao longo do projeto.

Uso estritamente pessoal.
