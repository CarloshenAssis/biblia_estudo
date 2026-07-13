# Bíblia de Estudo Aplicação Pessoal — Relatório de Extração

Complementa o `RELATORIO_PROJETO.md` (Bíblia do Expositor). Este documento cobre a segunda fonte:
**Bíblia de Estudo Aplicação Pessoal** (Life Application Study Bible, CPAD/Tyndale House, 2003),
para uso no repositório `bibliaexpositor.vercel.app` via Claude Code.

**Status: 66 de 66 livros extraídos** (correção de bug aplicada — ver seção 3.1).

## 1. Diferença em relação ao Expositor

O arquivo `Biblia_de_Estudo_do_Expositor.pdf` foi gerado digitalmente (Word), com texto e comentário
separados por cor. Este arquivo (`BIBLIA_APLICAÇÃO_PESSOAL.pdf`) é **scan de um livro físico** (OCR via
ABBYY FineReader), em **duas colunas**, 2044 páginas, com um layout bem mais complexo: caixas temáticas
("Informações Essenciais", "Esboço", "Lugares-Chave"), referências cruzadas, e notas de aplicação
numeradas por versículo.

**Decisão de escopo:** o texto do versículo saiu do OCR com as duas colunas embaralhadas
(caractere a caractere em vários trechos) — não confiável. As **notas de aplicação**, por outro lado,
saem limpas, cada uma prefixada com a referência (ex: `1.1 A simples afirmação de que Deus criou...`).
Por isso, **só as notas foram extraídas**, para complementar (não substituir) o texto bíblico já
armazenado na tabela `verses` (vindo do Expositor).

## 2. Método de extração

- PyMuPDF (`fitz`), lendo blocos de texto por página (`page.get_text("dict")`).
- **Identificação do livro atual**: cada página tem um cabeçalho (ex: "GÊNESIS 24", "4192 SAMUEL 2")
  misturando nome do livro, um dígito de livro (1/2/3, quando aplicável) e o número de página — tudo
  concatenado sem separador consistente pelo OCR.
- **Notas por versículo**: regex identifica blocos que começam com `capítulo.versículo`
  (ex: `1.1`, `1.3—2.7`, `24.15`), tratando também variações como "ss" (e os seguintes). Faixas de
  versículos (ex: `1.3—2.7`) são expandidas — a mesma nota é replicada para cada versículo do intervalo
  (limitado a 40 versículos por segurança).
- Blocos que não começam com uma referência numérica (caixas temáticas, notas de rodapé com `*`,
  cabeçalhos) são automaticamente ignorados pelo regex.

### 3.1 Bug encontrado e corrigido (livros numerados)

Na primeira passada, a normalização do cabeçalho removia **todos** os dígitos pra isolar o nome do
livro do número de página — o que também apagava o dígito que diferencia "2 Samuel" de "1 Samuel",
etc. Isso travava o ponteiro sequencial de detecção de livro no livro anterior, e como o efeito é
cascata (o "Judas" e "Apocalipse", que nem têm dígito, ficaram fora da janela de busca por tabela
porque o ponteiro nunca chegou perto deles), 11 livros no total saíram prejudicados: 2 Samuel, 2 Reis,
2 Crônicas, 2 Coríntios, 2 Tessalonicenses, 2 Timóteo, 2 Pedro, 2 João, 3 João, Judas e Apocalipse.

**Correção aplicada:** em vez de remover todos os dígitos, o parser agora verifica se há exatamente
um dígito (1, 2 ou 3) separado do nome do livro por um espaço (ex: `"2 SAMUEL"` → dígito `2`), o que
diferencia isso de dígitos de paginação que tocam a letra diretamente sem espaço (ex: `"213NÚMEROS"`
→ não é dígito de livro, é número de página). O casamento de livro agora exige que esse dígito bata
exatamente com o esperado (nunca confunde "1 Samuel" com "2 Samuel"), e o limiar de confiança do
fuzzy-match subiu de 0.6 para 0.78 pra evitar que nomes curtos colidam por acidente quando o OCR erra
um dígito isolado (ex.: uma página de "1 Timóteo" onde o OCR leu "1" como "7" quase enganou o parser
pra pular direto pra "Tito").

Depois da correção: **4.067 notas**, 66 de 66 livros, todos com contagens plausíveis (ex: 1 Timóteo 27,
2 Timóteo 13, Tito 13 — coerentes entre si; Apocalipse 223, coerente com ser um livro longo e muito
comentado).

## 3. Resultado final

Todos os 66 livros têm cobertura. Contagem de notas por livro está no arquivo de dados; nenhum livro
ficou zerado.

## 4. Schema da nova tabela

```sql
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
-- remover a policy de insert depois de importar:
-- drop policy "temp public insert" on notes_aplicacao_pessoal;
```

O campo `book` usa exatamente os mesmos valores já usados na tabela `verses` (ex: `"GENESIS"`,
`"1 SAMUEL"`, `"ÊXODO"`), então dá pra fazer `join` direto por `book + chapter + verse` entre as duas
tabelas — é assim que o app pode mostrar os dois comentários (Expositor + Aplicação Pessoal) no mesmo
versículo.

## 5. Arquivos entregues

- `aplicacao_pessoal_dados.json` — as 4.067 notas extraídas (versão corrigida, 66/66 livros)
- `importar_aplicacao_pessoal.py` — script de importação local (mesmo padrão do Expositor; limpa
  automaticamente qualquer dado de uma importação parcial anterior antes de reimportar)

## 6. Próximos passos sugeridos pro Claude Code

1. Rodar a criação da tabela (seção 4) no Supabase, se ainda não existir.
2. Rodar `importar_aplicacao_pessoal.py` localmente (substitui dados antigos automaticamente).
3. Atualizar o app (`biblia-expositor.html` ou o código do site) para buscar também em
   `notes_aplicacao_pessoal` pelo mesmo `book/chapter/verse` e exibir como uma segunda aba/fonte de
   comentário.

