# Migração: notas da Aplicação Pessoal, busca full-text, favoritos, URLs amigáveis

Resposta às recomendações da revisão arquitetural do relatório de funcionalidades. Cobre o que foi implementado agora (backend/dados, independentes do redesign visual) e o que fica pra depois (migração de framework, que só faz sentido decidir junto com o design).

## 1. Aplicação Pessoal: 66/66 livros + schema de intervalo

O PDF foi reprocessado e o bug que travava a detecção de livros numerados (2 Samuel, 2 Reis, 2 Crônicas, 2 Coríntios, 2 Tessalonicenses, 2 Timóteo, 2 Pedro, 2 João, 3 João, Judas, Apocalipse) foi corrigido na fonte — agora são **4.067 notas, 66 de 66 livros**.

Além disso, a tabela `notes_aplicacao_pessoal` foi **recriada com schema de intervalo**, como recomendado:

```sql
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
```

As 4.067 linhas brutas (uma por versículo, com faixas duplicadas) foram colapsadas em **3.443 notas reais** — cada faixa de versículos vira uma única linha. Uma função RPC resolve a consulta:

```sql
create function get_ap_notes(p_book text, p_chapter smallint, p_verse smallint)
returns setof notes_aplicacao_pessoal
language sql stable as $$
  select * from notes_aplicacao_pessoal
  where book = p_book
    and (chapter_start < p_chapter or (chapter_start = p_chapter and verse_start <= p_verse))
    and (chapter_end   > p_chapter or (chapter_end   = p_chapter and verse_end   >= p_verse))
  order by chapter_start, verse_start;
$$;
```

O app agora chama `get_ap_notes` em vez de filtrar direto na tabela, e mostra uma etiqueta **"Aplica-se a Livro X:Y–Z"** acima da nota sempre que ela cobre mais de um versículo.

### Limitação herdada da extração (não introduzida agora)

A extração original limitava a expansão de uma faixa a 40 versículos por segurança, sem considerar o fim real do capítulo — então uma nota que originalmente ia até o fim de um capítulo curto podia "vazar" pra um número de versículo que não existe (ex: `Amós 1:3–42`, mas Amós 1 só tem 15 versículos). Isso foi detectado comparando com a versificação canônica (mesma tabela usada na limpeza da Seção A) e **23 faixas tiveram o fim ajustado (`clamp`) pro último versículo real do capítulo**, pra não exibir um intervalo que não existe. A informação de onde a faixa realmente termina no PDF original não está disponível sem reprocessar — o clamp é a aproximação mais honesta possível.

## 2. Busca full-text

O índice `gin`/`tsvector` já existia no schema mas o app usava `ilike`. Agora existe uma função RPC:

```sql
create function search_verses(query text)
returns setof verses
language sql stable as $$
  select * from verses
  where to_tsvector('portuguese', text || ' ' || comment)
        @@ plainto_tsquery('portuguese', query)
  order by book_order, chapter, verse
  limit 30;
$$;
```

Isso resolve radical de palavra (`amar` encontra `amor`, `amou`, `amando`) e usa o índice em vez de escanear a tabela inteira. O app chama essa função primeiro e cai pra `ilike` só se a chamada falhar (ex: RPC indisponível).

## 3. Favoritos — decisão: localStorage, não Supabase

Conforme apontado na revisão, criar uma tabela `favorites` gravável pela chave anônima pública é arriscado (qualquer um poderia escrever/apagar). Implementado em `localStorage` (chave `bibliaExpositorFavoritos`, array de `{book, book_order, chapter, verse}`):

- Estrela (☆/★) no card do versículo alterna o favorito.
- Botão "★ Favoritos" no topo abre a lista, com prévia do texto e botão de remover.
- Não sincroniza entre dispositivos — se isso virar necessário, o caminho é Supabase Auth (login) + tabela com `user_id` e RLS por usuário, não uma tabela pública.

## 4. URLs amigáveis

Cada livro ganhou um `slug` ASCII (`GENESIS` → `genesis`, `1 SAMUEL` → `1-samuel`, `CANTARES DE SALOMÃO` → `cantares-de-salomao`). Navegar por livro/capítulo/versículo, buscar ou usar anterior/próximo atualiza a URL para `/<slug>/<capítulo>/<versículo>` via `history.pushState`, sem recarregar a página. `vercel.json` foi adicionado com um rewrite (`/(.*)  → /index.html`) pra abrir esses links direto (compartilhamento, refresh) funcionar num site 100% estático.

## 5. O que fica pra depois (aguardando o design)

A revisão também sugeriu separar o app em componentes/módulos e considerar React + Vite + TypeScript. Isso não foi feito agora de propósito: reestruturar o front-end antes do design chegar significaria fazer o trabalho duas vezes. As mudanças desta rodada foram todas de dados/backend (schema, funções RPC) e front-end "invisível ao design" (favoritos, URLs) — não deveriam precisar ser refeitas quando o layout novo chegar, só re-estilizadas.
