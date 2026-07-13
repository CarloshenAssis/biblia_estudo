# Bíblia de Estudo Aplicação Pessoal — Relatório de Extração

Complementa o `RELATORIO_PROJETO.md` (Bíblia do Expositor). Este documento cobre a segunda fonte:
**Bíblia de Estudo Aplicação Pessoal** (Life Application Study Bible, CPAD/Tyndale House, 2003),
para uso no repositório `bibliaexpositor.vercel.app` via Claude Code.

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
- **Identificação do livro atual**: cada página tem um cabeçalho (ex: "GÊNESIS 24", "213NÚMEROS 24")
  misturando nome do livro (com variações de OCR: "GÊNESIS"/"GENESIS"/"GÊNESiS") e número de página.
  Comparação fuzzy (`difflib.SequenceMatcher`) contra a lista canônica de 66 livros, com ponteiro
  sequencial (mesma lógica usada no Expositor) e janela de lookahead de 3 livros.
- **Notas por versículo**: regex identifica blocos que começam com `capítulo.versículo`
  (ex: `1.1`, `1.3—2.7`, `24.15`), tratando também variações como "ss" (e os seguintes). Faixas de
  versículos (ex: `1.3—2.7`) são expandidas — a mesma nota é replicada para cada versículo do intervalo
  (limitado a 40 versículos por seguraça).
- Blocos que não começam com uma referência numérica (caixas temáticas, notas de rodapé com `*`,
  cabeçalhos) são automaticamente ignorados pelo regex.

## 3. Resultado desta extração

- **4.098 notas** extraídas, cobrindo **55 dos 66 livros**.

### Livros com boa cobertura
Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1 Samuel, 1 Reis, 1 Crônicas,
Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes, Cantares de Salomão, Isaías, Jeremias,
Lamentações de Jeremias, Ezequiel, Daniel, Oséias, Joel, Amós, Obadias, Jonas, Miquéias, Naum,
Habacuque, Sofonias, Ageu, Zacarias, Malaquias, Mateus, Marcos, Lucas, João, Atos dos Apóstolos,
Romanos, 1 Coríntios, Gálatas, Efésios, Filipenses, Colossenses, 1 Tessalonicenses, 1 Timóteo, Tito,
Filemon, Hebreus, Tiago, 1 Pedro, 1 João.

### Livros que ficaram de fora (bug conhecido, não corrigido nesta passada)
**2 Samuel, 2 Reis, 2 Crônicas, 2 Coríntios, 2 Tessalonicenses, 2 Timóteo, 2 Pedro, 2 João, 3 João,
Judas, Apocalipse.**

**Causa raiz:** a normalização do cabeçalho da página remove dígitos (pra isolar o nome do livro do
número da página), o que também apaga o "2"/"3" que diferencia "2 Samuel" de "1 Samuel", etc. O
ponteiro sequencial então nunca reconhece a transição para o livro numerado seguinte, e o conteúdo
dele acaba sendo atribuído ao livro anterior (por isso "1 JOÃO" aparece com 314 notas — bem mais que o
esperado — e "COLOSSENSES" com 132: absorveram o conteúdo dos livros seguintes que não foram
detectados).

**Como corrigir, se for reprocessar:** diferenciar os cabeçalhos mantendo um dígito isolado no início
do texto do cabeçalho (antes de remover o restante dos números, que são de paginação), ou usar a
contagem de capítulos de cada livro como sinal auxiliar (ex: se a nota referencia capítulo 1 de novo
mas o livro atual já tinha chego no capítulo 4, é sinal de troca de livro). Precisa do PDF original de
novo para reprocessar — ele não está mais disponível no ambiente desta conversa.

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

- `aplicacao_pessoal_dados.json` — as 4.098 notas extraídas
- `importar_aplicacao_pessoal.py` — script de importação local (mesmo padrão do Expositor)

## 6. Próximos passos sugeridos pro Claude Code

1. Rodar a criação da tabela (seção 4) no Supabase.
2. Rodar `importar_aplicacao_pessoal.py` localmente.
3. Atualizar o app (`biblia-expositor.html` ou o código do site) para buscar também em
   `notes_aplicacao_pessoal` pelo mesmo `book/chapter/verse` e exibir como uma segunda aba/fonte de
   comentário.
4. Se quiser os 11 livros que faltaram, reenviar o PDF `BIBLIA_APLICAÇÃO_PESSOAL.pdf` para reprocessar
   com a correção da seção 3.
