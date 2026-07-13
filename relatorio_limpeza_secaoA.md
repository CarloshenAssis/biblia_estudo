# Limpeza da Seção A — números de versículo corrompidos

Os 39 casos listados na Seção A do `relatorio_qa_expositor.md` foram conferidos contra a versificação canônica da Bíblia (baseada no KJV, que segue a mesma numeração usada pela ACF/Expositor do Swaggart em praticamente todos os casos) e **todos os 39 foram confirmados como números que não existem** no capítulo real — o parser leu um número solto dentro do comentário (idade, referência cruzada, nota de rodapé) como se fosse marcador de novo versículo.

## O que foi feito

- Removidas as 39 linhas com número de versículo inexistente, tanto do dataset local (`scripts/expositor_dados.json`) quanto da tabela `verses` no Supabase.
- Total de versículos: 31.143 → **31.104** (o real é ≈ 31.102 — ficou praticamente exato).
- Backup das 39 linhas removidas (texto + comentário) salvo em `scripts/removidos_numeracao_corrompida.json`, caso queira revisar o conteúdo antes de descartar de vez.

## Observação — conteúdo não perdido, só mal numerado

Na maioria dos 39 casos o "versículo" fantasma tinha texto bíblico vazio ou só pontuação, mas o **comentário** dele era a continuação legítima do comentário do versículo anterior (cortado no meio por causa do número solto). Isso significa que, embora a numeração agora esteja limpa, o comentário do versículo anterior a cada um desses 39 pode estar **truncado** (terminando no meio de uma frase). Não mexi nisso agora — só removi os números que não existem, como pedido. Se quiser, num próximo passo posso reanexar essas continuações de comentário ao versículo correto.

## Descoberta extra (fora do escopo dos 39, fica registrada para depois)

Ao comparar com a versificação canônica, apareceu mais um problema relacionado em **Apocalipse 22**: além dos 2 casos já removidos (v59 e v120), o capítulo também tem entradas fantasmas em v29, v30, v31, v34 e v40 (o capítulo real só vai até o v21) — essas vieram do apêndice/material de estudo do final da Bíblia do Expositor, que aparentemente ficou colado ao texto do versículo 21. Isso pertence à Seção B do relatório original, não foi tocado agora.
