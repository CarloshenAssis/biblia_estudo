# Redesign: migração para React + Vite + TypeScript

Implementação do design recebido em `design/` (protótipo interativo em HTML de referência, não código de produção — conforme o próprio handoff instrui, o app foi recriado usando os padrões nativos da stack alvo).

## O que mudou

- **Stack**: HTML/CSS/JS num arquivo único → React + Vite + TypeScript, com CSS Modules por componente. Resolve o "Problema nº 1" apontado na revisão arquitetural anterior (tudo num `index.html`).
- **Roteamento real**: `react-router-dom`, mantendo o esquema de URLs amigáveis já existente (`/livro/capitulo/versiculo`, agora também `/favoritos` e `/historico`).
- **Responsividade**: os três breakpoints do protótipo (mobile <720px, tablet 720–1079px, desktop ≥1080px) foram implementados com `@media` real em CSS, não com JS lendo `window.innerWidth` — só o estado de "menu aberto" (`navOpen`) é JS; a decisão de _quando_ mostrar a barra lateral fixa vs. gaveta overlay é 100% CSS.
- **Dados reais**: o protótipo trazia 3 capítulos de exemplo (`bible-data.js`, mantido em `design/` só como referência). O app final busca os 66 livros / 31.104 versículos / 3.443 notas de Aplicação Pessoal do Supabase de verdade — nada de dado de exemplo em produção.
- **Favoritos e histórico**: implementados em `localStorage` (`be_favorites`, `be_history`, `be_theme` — mesmas chaves do protótipo), não numa tabela pública do Supabase, seguindo a decisão já tomada na rodada anterior.
- **Busca**: a busca do protótipo era client-side sobre os 3 capítulos de exemplo. Reimplementada contra 3 funções RPC no Supabase (`search_verse_text`, `search_expositor_comments`, `search_ap_comments`), todas com índice de full-text em português — os resultados aparecem separados em Versículos / Comentários (rotulados por fonte) / Histórico recente, como no design.

## Fidelidade ao design

Tokens de cor, tipografia (Crimson Pro + Work Sans) e espaçamento foram copiados exatamente dos valores do handoff. Telas implementadas: Leitura (com toggle "ver somente este versículo", favoritar, compartilhar, abas de comentário, navegação de capítulo, skeleton de carregamento, drop cap no versículo 1), Favoritos (agrupado por livro, busca local, remoção), Histórico (12 mais recentes, deduplicado), busca em overlay, navegação bíblica em gaveta/barra lateral.

## O que não foi trazido do protótipo (de propósito)

- O conceito de "capítulo disponível no protótipo" (chips de capítulo destacados só pros 3 exemplos, resto mudo) não existe mais — como o banco real tem os 66 livros completos, todo capítulo é "disponível", então todos os chips usam o estilo de destaque.
- O estado de "capítulo vazio" (`Este capítulo ainda não está no protótipo`) foi mantido no código como estado defensivo (referência inválida, falha de rede), mas não deve aparecer em uso normal.

## Verificação

`npm run build` roda limpo (TypeScript estrito, zero erros). Testado via navegador headless: tema claro/escuro persistindo corretamente, os três breakpoints responsivos (mobile/tablet/desktop) trocando de layout exatamente como especificado, navegação da barra lateral abrindo/fechando, overlay de busca abrindo/fechando, chips de capítulo com contagem real por livro (ex: Gênesis mostrou 50). As consultas ao Supabase foram conferidas byte a byte contra a API real (`curl`) — o ambiente de teste automatizado tem uma limitação de rede conhecida (proxy do sandbox) que impede confirmar visualmente o carregamento de dados end-to-end aqui, mas a mesma limitação já apareceu e nunca correspondeu a um bug real nas rodadas anteriores deste projeto.

## Estrutura antiga

`legacy/biblia-expositor-classic.html` guarda a versão anterior (single-file) como referência/backup — não é mais servida em produção.
