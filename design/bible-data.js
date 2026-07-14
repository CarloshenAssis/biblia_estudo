export const BOOKS = [
  ['Gênesis','AT',50],['Êxodo','AT',40],['Levítico','AT',27],['Números','AT',36],['Deuteronômio','AT',34],
  ['Josué','AT',24],['Juízes','AT',21],['Rute','AT',4],['1 Samuel','AT',31],['2 Samuel','AT',24],
  ['1 Reis','AT',22],['2 Reis','AT',25],['1 Crônicas','AT',29],['2 Crônicas','AT',36],['Esdras','AT',10],
  ['Neemias','AT',13],['Ester','AT',10],['Jó','AT',42],['Salmos','AT',150],['Provérbios','AT',31],
  ['Eclesiastes','AT',12],['Cantares','AT',8],['Isaías','AT',66],['Jeremias','AT',52],['Lamentações','AT',5],
  ['Ezequiel','AT',48],['Daniel','AT',12],['Oséias','AT',14],['Joel','AT',3],['Amós','AT',9],
  ['Obadias','AT',1],['Jonas','AT',4],['Miquéias','AT',7],['Naum','AT',3],['Habacuque','AT',3],
  ['Sofonias','AT',3],['Ageu','AT',2],['Zacarias','AT',14],['Malaquias','AT',4],
  ['Mateus','NT',28],['Marcos','NT',16],['Lucas','NT',24],['João','NT',21],['Atos','NT',28],
  ['Romanos','NT',16],['1 Coríntios','NT',16],['2 Coríntios','NT',13],['Gálatas','NT',6],['Efésios','NT',6],
  ['Filipenses','NT',4],['Colossenses','NT',4],['1 Tessalonicenses','NT',5],['2 Tessalonicenses','NT',3],
  ['1 Timóteo','NT',6],['2 Timóteo','NT',4],['Tito','NT',3],['Filemom','NT',1],['Hebreus','NT',13],
  ['Tiago','NT',5],['1 Pedro','NT',5],['2 Pedro','NT',3],['1 João','NT',5],['2 João','NT',1],
  ['3 João','NT',1],['Judas','NT',1],['Apocalipse','NT',22]
].map(([name,testament,chapters]) => ({name, testament, chapters}));

export const ABBR = {
  'jo':'João','joao':'João','joão':'João','john':'João',
  'gn':'Gênesis','gen':'Gênesis','genesis':'Gênesis','gênesis':'Gênesis',
  'sl':'Salmos','salmo':'Salmos','salmos':'Salmos','ps':'Salmos',
  'rm':'Romanos','romanos':'Romanos',
};

export const VERSES = {
  'João-3': {
    book:'João', chapter:3, total:36, range:[14,21],
    verses: [
      {n:14, text:'E, como Moisés levantou a serpente no deserto, assim importa que o Filho do Homem seja levantado,'},
      {n:15, text:'para que todo aquele que nele crê não pereça, mas tenha a vida eterna.'},
      {n:16, text:'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.'},
      {n:17, text:'Porque Deus enviou o seu Filho ao mundo não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.'},
      {n:18, text:'Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus.'},
      {n:19, text:'E a condenação é esta: que a luz veio ao mundo, e os homens amaram antes as trevas do que a luz, porque as suas obras eram más.'},
      {n:20, text:'Porque todo aquele que faz o mal aborrece a luz, e não vem para a luz, para que as suas obras não sejam reprovadas.'},
      {n:21, text:'Mas quem pratica a verdade vem para a luz, a fim de que as suas obras sejam manifestas, por serem feitas em Deus.'}
    ],
    comments: {
      expositor: [
        {verse:16, text:'O termo grego para "amou" é ágape — amor de decisão e vontade, não de mero sentimento. "De tal maneira" descreve o método do amor divino: a entrega do Filho unigênito.'},
        {verse:17, text:'O propósito da vinda de Cristo não é condenatório, mas salvífico. O verbo "salvar" (sozo) carrega a ideia de resgate integral, não apenas perdão jurídico.'},
        {verse:18, text:'A condenação aqui não é futura, mas presente — "já está condenado". A incredulidade não cria a condenação; ela apenas a revela.'},
        {verse:19, text:'"Vieram as trevas" é escolha, não destino. O texto grego usa ēgapēsan (amaram) — o mesmo verbo do v.16, agora aplicado à preferência humana pelas trevas.'}
      ],
      aplicacao: [{range:[16,18], text:'Aplica-se a João 3:16–18. Este é o ponto de virada de toda a conversa com Nicodemos: da religiosidade das obras para a fé simples no Filho enviado. Memorize este trecho como âncora da sua fé — antes de julgar o mundo, lembre-se de que Deus o amou primeiro. Sua salvação não depende do seu esforço, mas de acreditar naquilo que já foi feito por você.'}]
    }
  },
  'Salmos-23': {
    book:'Salmos', chapter:23, total:6, range:[1,6],
    verses: [
      {n:1, text:'O Senhor é o meu pastor; nada me faltará.'},
      {n:2, text:'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.'},
      {n:3, text:'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.'},
      {n:4, text:'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.'},
      {n:5, text:'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.'},
      {n:6, text:'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.'}
    ],
    comments: {
      expositor: [
        {verse:1, text:'"Pastor" (ro\'eh) evoca a imagem real na cultura antiga — reis eram chamados pastores do povo. Davi inverte a metáfora: ele, rei, se vê como ovelha do verdadeiro Rei.'},
        {verse:4, text:'"Vale da sombra da morte" (tsalmavet) é um composto hebraico que intensifica a escuridão. A presença de Deus ali — "tu estás comigo" — é o eixo teológico do salmo inteiro.'},
        {verse:6, text:'"Seguirão" traduz um verbo hebraico que sugere perseguição ativa — a bondade de Deus não apenas acompanha, ela persegue o crente.'}
      ],
      aplicacao: [{range:[1,6], text:'Aplica-se a Salmos 23:1–6. Davi escreve como pastor que se tornou rei, mas que nunca deixou de se ver como ovelha. A metáfora percorre todo o salmo: provisão, restauração, proteção e comunhão. Se o Senhor é seu pastor, a pergunta não é "o que me falta", mas "por que ainda me preocupo". O vale não é destino, é passagem — este salmo não promete uma vida sem sombra, mas uma companhia que não falha dentro dela.'}]
    }
  },
  'Gênesis-1': {
    book:'Gênesis', chapter:1, total:31, range:[1,5],
    verses: [
      {n:1, text:'No princípio, criou Deus os céus e a terra.'},
      {n:2, text:'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.'},
      {n:3, text:'E disse Deus: Haja luz. E houve luz.'},
      {n:4, text:'E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.'},
      {n:5, text:'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.'}
    ],
    comments: {
      expositor: [
        {verse:1, text:'O verbo hebraico "bará" (criar) é usado exclusivamente para a ação de Deus — nunca para o homem. Esta distinção teológica funda toda a cosmovisão bíblica.'},
        {verse:2, text:'"Sem forma e vazia" (tohu vavohu) descreve um estado pré-cósmico, não caótico no sentido moral. O Espírito "se movia" (merachefet) — o mesmo verbo usado para uma ave pairando sobre o ninho.'},
        {verse:3, text:'A ordem "haja luz" antecede o sol e a lua (v.14-16), mostrando que esta luz é primeiro teológica antes de física — a Palavra precede a criação material.'}
      ],
      aplicacao: [{range:[1,3], text:'Aplica-se a Gênesis 1:1–3. Seu caos particular — "sem forma e vazio" — não assusta o Espírito que se move sobre as águas; Deus trabalha exatamente onde parece não haver ordem. E a palavra de Deus continua criando: onde Ele fala luz, há luz, inclusive na sua história.'}]
    }
  }
};
