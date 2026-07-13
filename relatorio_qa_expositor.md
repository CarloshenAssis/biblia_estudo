# Relatório de QA — Bíblia do Expositor (extração do PDF)

Total de versículos extraídos: **31143** (real ≈ 31.102)

Este relatório separa os problemas em 3 categorias por prioridade. Recomenda-se revisar A e B primeiro (poucas dezenas de casos, alta chance de serem erros reais). C e D são de menor prioridade.

---
## A. Números de versículo corrompidos no fim do capítulo — 39 casos (PRIORIDADE ALTA)

Nestes casos, o último 'versículo' do capítulo recebeu um número absurdo (ex: verso 900 num capítulo que só tem ~24 versos) e o texto é só pontuação solta — sinal de que o parser leu lixo de rodapé/nota como se fosse um versículo novo. **Não são 800+ versículos faltando** — provavelmente é só 1 versículo real faltando ou mesclado ao anterior, mas o número ficou errado.

### GENESIS 7 — verso 24 → verso 900 (salto de 875)
- v24: E prevaleceram as águas sobre a terra cento e cinqüenta dias.
- v900 (número suspeito): "."

### GENESIS 39 — verso 23 → verso 40 (salto de 16)
- v23: O guarda da prisão não teve cuidado de nenhuma coisa que estava na mão; porque o Senhor era com ele, e que o que ele fez, o Senhor fez para prosperar.
- v40 (número suspeito): ""

### ÊXODO 2 — verso 25 → verso 40 (salto de 14)
- v25: E viu Deus os filhos de Israel, e Deus tinha respeito a eles.
- v40 (número suspeito): ""

### ÊXODO 33 — verso 23 → verso 38 (salto de 14)
- v23: E eu vou tirar minha mão, e você deve ver My Back Peças: mas a minha face não se verá.
- v38 (número suspeito): ":"

### JOSUÉ 11 — verso 23 → verso 90 (salto de 66)
- v23: Assim Josué tomou toda esta terra conforme tudo o que o Senhor disse a Moisés; e Josué a deu em herança a Israel, segundo as suas divisões, segundo as suas tribos. E a terra repousou da guerra .
- v90 (número suspeito): ","

### JOSUÉ 12 — verso 24 → verso 42 (salto de 17)
- v24: O rei de Tirza, um; todos os trinta e um reis. Heb. 6: 1
- v42 (número suspeito): ":"

### 2 SAMUEL 16 — verso 23 → verso 37 (salto de 13)
- v23: E o conselho de Aitofel, que aconselhava naqueles dias, era como se um homem tinha investigado no oráculo de Deus:. Tal era todo o conselho de Aitofel, tanto para com Davi como para com Absalão
- v37 (número suspeito): ""

### 2 REIS 22 — verso 20 → verso 300 (salto de 279)
- v20: Eis, portanto, eu te recolherei a teus pais, e tu serás recolhido em sua sepultura em paz; e os teus olhos não verão todo o mal que hei de trazer sobre este lugar. E trouxeram a resposta ao rei.
- v300 (número suspeito): "."

### ESDRAS 10 — verso 44 → verso 70 (salto de 25)
- v44: Todos estes tinham tomado mulheres estrangeiras, e alguns deles tinham mulheres de quem tiveram filhos.
- v70 (número suspeito): "."

### JÓ 36 — verso 33 → verso 140 (salto de 106)
- v33: O barulho dos mesmos programas que lhe dizem respeito, o gado também relativas ao vapor .
- v140 (número suspeito): "."

### SALMOS 58 — verso 11 → verso 39 (salto de 27)
- v11: para que o homem dirá: Deveras há uma recompensa para o justo; deveras há um Deus que julga na terra.
- v39 (número suspeito): "."

### SALMOS 61 — verso 8 → verso 70 (salto de 61)
- v8: Assim cantarei louvores ao seu nome para sempre, para que eu possa realizar diariamente os meus votos.
- v70 (número suspeito): ""

### SALMOS 95 — verso 11 → verso 94 (salto de 82)
- v11: A quem jurei na minha ira que não entrarão no meu repouso.
- v94 (número suspeito): "96: 1-32-nos diante a Sua presença com ações de graças, e fazer um ruído alegre até Ele com Salmos."

### SALMOS 109 — verso 31 → verso 109 (salto de 77)
- v31: Pois se porá à direita do pobre, para o salvar dos que condenam a sua alma.
- v109 (número suspeito): ""

### ECLESIASTES 12 — verso 14 → verso 24 (salto de 9)
- v14: Porque Deus há de trazer a juízo toda obra, e até tudo está encoberto, quer seja bom, quer seja mau.
- v24 (número suspeito): ""

### ISAÍAS 20 — verso 6 → verso 185 (salto de 178)
- v6: Então os moradores desta ilha dirão naquele dia: Vede que tal é a nossa esperança, à qual fugimos por socorro, para nos livrarmos do rei da Assíria: e como escaparemos nós
- v185 (número suspeito): "Isa. 37: 36-38"

### ISAÍAS 46 — verso 13 → verso 200 (salto de 186)
- v13: Faço chegar a minha justiça; ele não deve estar muito longe, ea minha salvação não tardará; mas estabelecerei a salvação em Sião a Israel a minha glória.
- v200 (número suspeito): ":"

### JEREMIAS 29 — verso 32 → verso 536 (salto de 503)
- v32: Portanto assim diz o SENHOR; Eis que castigarei a Semaías, o neelamita, ea sua descendência: ele não terá varão que habite entre este povo; nem verá ele o bem que hei de fazer ao meu povo, diz o Senho
- v536 (número suspeito): ""

### EZEQUIEL 21 — verso 32 → verso 597 (salto de 564)
- v32: Sereis por combustível para o fogo; o seu sangue será no meio da terra; você deve ser mais lembrado:. porque eu, o Senhor, o disse
- v597 (número suspeito): ""

### EZEQUIEL 31 — verso 18 → verso 31 (salto de 12)
- v18: A quem, pois, és semelhante em glória e em grandeza entre as árvores do Éden? mas você deve ser trazido para baixo com as árvores do Éden às partes mais baixas da terra: você deve estar no meio dos in
- v31 (número suspeito): ""

### EZEQUIEL 45 — verso 25 → verso 42 (salto de 16)
- v25: No sétimo mês, no décimo quinto dia do mês, deve ele fazer o mesmo na Festa dos sete dias, de acordo com esta oferta pelo pecado, segundo o holocausto, e de acordo com a oferta de alimentos, e de acor
- v42 (número suspeito): ""

### DANIEL 4 — verso 37 → verso 130 (salto de 92)
- v37: Agora eu, Nabucodonosor, louvo e exalto e glorifico ao Rei do céu, porque todas as suas obras são verdade, e Seu julgamento maneiras:. E aqueles que andam na soberba Ele é capaz de humilhar
- v130 (número suspeito): ";"

### AMOS 6 — verso 14 → verso 33 (salto de 18)
- v14: Mas eis que eu levantarei contra vós uma nação, ó casa de Israel, diz o Senhor, o Deus dos Exércitos; e será afligida você desde a entrada de Hamate até ao rio do deserto.
- v33 (número suspeito): ""

### NAUM 2 — verso 13 → verso 150 (salto de 136)
- v13: Eis que eu sou contra vós, diz o Senhor dos Exércitos, e eu vou queimar seus carros no meio da fumaça, ea espada devorará os seus jovens leões, e eu vou cortar a sua presa a partir da Terra, ea voz de
- v150 (número suspeito): ""

### AGEU 2 — verso 23 → verso 46 (salto de 22)
- v23: Naquele dia, diz o Senhor dos Exércitos, se eu levá-lo, ó Zorobabel, servo meu, filho de Sealtiel, diz o SENHOR, e fará com que você, como um anel de selar; porque eu vos escolhi a vós, diz o Senhor d
- v46 (número suspeito): ""

### AGEU 2 — verso 46 → verso 66 (salto de 19)
- v46: 
- v66 (número suspeito): ""

### ZACARIAS 3 — verso 10 → verso 29 (salto de 18)
- v10: Naquele dia, diz o Senhor dos Exércitos, se você chama cada um a seu vizinho para debaixo da videira e para debaixo da figueira.
- v29 (número suspeito): "29Hos. 6: 2"

### ZACARIAS 5 — verso 11 → verso 49 (salto de 37)
- v11: E disse-me, para construir-se uma casa na terra de Sinar.: E será estabelecido, e definir lá em cima de sua própria base
- v49 (número suspeito): ""

### ZACARIAS 8 — verso 23 → verso 48 (salto de 24)
- v23: Assim diz o SENHOR dos Exércitos; Naqueles dias, ela deve vir a passar, que dez homens apoderaram de todas as línguas das nações, pegarão da saia daquele que é um judeu, dizendo: Iremos convosco, porq
- v48 (número suspeito): "48"

### ZACARIAS 9 — verso 17 → verso 200 (salto de 182)
- v17: Pois quão grande é a sua bondade, e quão grande é a sua formosura! milho deve fazer os jovens alegres, e novo vinho as empregadas domésticas.
- v200 (número suspeito): ""

### MALAQUIAS 3 — verso 18 → verso 73 (salto de 54)
- v18: Então você voltará, e discernir entre o justo eo ímpio; entre o que serve a Deus e aquele que O serve não. 1816
- v73 (número suspeito): ""

### MALAQUIAS 4 — verso 6 → verso 37 (salto de 30)
- v6: E ele converterá o coração dos pais aos filhos, eo coração dos filhos a seus pais, para que eu não venha e fira a terra com maldição. Gal. 03:13De Malaquias, o último profeta do Antigo Testamento, até
- v37 (número suspeito): "aC a 4 aC Ele procurou obter o favor dos judeus pela reconstrução do templo com grande esplendor. El"

### MATEUS 4 — verso 25 → verso 72 (salto de 46)
- v25: E seguia-o uma grande multidão de pessoas da Galiléia, e da Decápole , e de Jerusalém, e da Judéia, e de além do Jordão.
- v72 (número suspeito): "."

### MATEUS 26 — verso 75 → verso 115 (salto de 39)
- v75: E Pedro se lembrou da palavra de Jesus, que disse-lhe: Antes que o galo cante, você negará três vezes Me . E ele saiu e chorou amargamente .
- v115 (número suspeito): "."

### MARCOS 12 — verso 44 → verso 110 (salto de 65)
- v44: Para todos eles deitaram do que lhes sobrava; mas esta, da sua pobreza, deu tudo o que tinha, mesmo todo o seu sustento .
- v110 (número suspeito): ": O Senhor disse ao meu Senhor : Assenta-te à minha direita, até que eu ponha os teus inimigos escab"

### MARCOS 13 — verso 37 → verso 70 (salto de 32)
- v37: E o que eu vos digo que digo a todos , relógio .
- v70 (número suspeito): ","

### APOCALIPSE 15 — verso 8 → verso 43 (salto de 34)
- v8: E o santuário se encheu de fumaça procedente da glória de Deus, e do seu poder ; e ninguém podia entrar no templo, até que as sete pragas dos sete anjos foram cumpridas.
- v43 (número suspeito): "eo cântico do Cordeiro , dizendo: Grandes e maravilhosas são as tuas obras, Senhor Deus Todo-Poderos"

### APOCALIPSE 22 — verso 40 → verso 59 (salto de 18)
- v40: metros de altura, produzindo uma fruta que se assemelha, mas muito inferior à figueira comum. Joio, grego zizanion ( ). O joio barbado ou azevém (Lolium temulentum) , a grama que cresce em campos de c
- v59 (número suspeito): "anos. Ele cura de dois endemoninhados de Gadara, sendo um proeminente ... 60. Voltando para a costa "

### APOCALIPSE 22 — verso 59 → verso 120 (salto de 60)
- v59: anos. Ele cura de dois endemoninhados de Gadara, sendo um proeminente ... 60. Voltando para a costa oeste, Ele levanta a filha de Jairo, e cura uma mulher com um fluxo de sangue ... 61. Ele cura dois 
- v120 (número suspeito): "pés. Ele foi usado na construção do templo de Salomão. Milho, principalmente trigo ou cevada, mas nã"

---
## B. Pequenos gaps — provável versículo faltando ou mesclado — 233 grupos / 301 números faltando (PRIORIDADE ALTA)

Aqui a sequência pula 1 a 8 números. Muitas vezes o texto do versículo faltante foi colado dentro do versículo anterior (dá pra ver às vezes um '. N ...' no meio do texto do verso anterior). Preencha a coluna 'texto correto' se você conferir na Bíblia física.

- **GENESIS 16:[3]** — entre v2 ("...do dez anos na terra de Canaã, e lhe deu a seu marido Abrão para ser sua esposa.") e v4 ("E ele entrou a Agar, e ela concebeu; e quando ela viu que ela havia concebido, f...")
- **GENESIS 18:[14]** — entre v13 ("...rcada eu tornarei para vós, de acordo com o tempo de vida, e Sara terá um filho.") e v15 ("Então Sara negou, dizendo: Não me ri ; pois ela estava com medo . E Ele disse: N...")
- **GENESIS 34:[2]** — entre v1 ("... o heveu, príncipe da terra, viu-a, levou-a, e se deitou com ela, e humilhou-a .") e v3 ("E a sua alma se apegou a Diná, filha de Jacó, e amou a moça e falou afetuosament...")
- **GENESIS 35:[8]** — entre v7 ("...errada sob Betel debaixo de um carvalho eo nome dele foi chamado Allon-bachuth .") e v9 ("E apareceu Deus outra vez a Jacó, quando ele voltou de Padã-Arã, e abençoou-o ....")
- **GENESIS 39:[15]** — entre v14 ("...a minha voz e gritando, ele deixou a sua roupa comigo, e fugiu, e saiu para fora") e v16 ("E ela pôs a sua roupa perto de si, até que o seu senhor chegou em casa....")
- **GENESIS 40:[4]** — entre v3 ("...go de José com eles, e os serviram; e eles continuaram a temporada na enfermaria") e v5 ("E teve um sonho de ambos, cada um seu sonho na mesma noite, cada um conforme a i...")
- **GENESIS 41:[50]** — entre v49 ("... de fome veio, o que lhe deu Asenate, filha de Poti-pherah sacerdote de deu-lhe.") e v51 ("E chamou José o nome do primogênito Manassés: Por Deus, disse ele, me fez esquec...")
- **ÊXODO 6:[25]** — entre v24 ("...eu Finéias: estes são os cabeças dos pais dos levitas, segundo as suas famílias.") e v26 ("Estes são Arão e Moisés, aos quais o Senhor disse: Tirai os filhos de Israel da ...")
- **ÊXODO 12:[45]** — entre v44 ("...cuncidado, então comerá dela. . 45 O estrangeiro eo assalariado não comerão dela") e v46 ("Em uma casa se comerá; você não deve levar adiante deveria de carne fora da casa...")
- **ÊXODO 20:[25]** — entre v24 ("...s lavradas, porque se você levantar a sua ferramenta em cima dele, você profanou") e v26 ("Nem subirás por degraus ao meu altar, para que a tua nudez não seja descoberta d...")
- **ÊXODO 21:[17]** — entre v16 ("...morto. . 17 E aquele que amaldiçoa a seu pai ou a sua mãe, certamente será morto") e v18 ("E se dois homens brigarem e um ferir ao outro com pedra ou com o punho, e este n...")
- **ÊXODO 26:[27]** — entre v26 ("...sas para as tábuas do outro lado do tabernáculo, para os dois lados para o oeste") e v28 ("E a barra do meio no meio das tábuas, de uma extremidade à outra....")
- **ÊXODO 32:[33]** — entre v32 ("...ENHOR a Moisés: Aquele que tiver pecado contra mim, a este riscarei do meu livro") e v34 ("Agora, pois, ir, levar as pessoas até o lugar do qual eu vos falei: Eis que o me...")
- **ÊXODO 35:[3]** — entre v2 ("...morte. . 3 Você deve acender fogo em nenhuma das vossas moradas no dia do sábado") e v4 ("E Moisés falou a toda a congregação dos filhos de Israel, dizendo: Esta é a pala...")
- **ÊXODO 35:[26]** — entre v25 ("...6 E todas as mulheres cujo coração agitou-los no cabelo sabedoria fiado de cabra") e v27 ("E os governantes trouxeram pedras de ônix, e pedras a serem definidos, para o éf...")
- **LEVÍTICO 7:[27]** — entre v26 ("...ue comer qualquer espécie de sangue, mesmo que a alma será extirpada do seu povo") e v28 ("E falou o SENHOR a Moisés, dizendo:...")
- **LEVÍTICO 8:[5]** — entre v4 (".... . 5 E disse Moisés à congregação: Isto é o que o Senhor ordenou que se fizesse") e v6 ("Então Moisés fez chegar Arão e seus filhos, e os lavou com água ....")
- **LEVÍTICO 9:[2]** — entre v1 ("...ecado, e um carneiro para holocausto, sem defeito, e oferece-os perante o SENHOR") e v3 ("E até os filhos de Israel falarás, dizendo: Você toma um bode para oferta pelo p...")
- **LEVÍTICO 9:[8]** — entre v7 ("...foi até o altar e matou o bezerro da oferta pelo pecado, que era para si mesmo .") e v9 ("E os filhos de Arão trouxeram o sangue a ele; e ele molhou o dedo no sangue, eo ...")
- **LEVÍTICO 11:[20]** — entre v19 ("... que se arrastam, indo em cima de todos os quatro, será para vós uma abominação.") e v21 ("No entanto, estes que você pode comer de cada coisa voando rastejante que anda s...")
- **LEVÍTICO 13:[22]** — entre v21 ("... E se ele se estender muito na pele, o sacerdote o declarará imundo: é uma praga") e v23 ("Mas se a mancha brilhante em seu lugar, não se estendendo, é a cicatriz da úlcer...")
- **LEVÍTICO 14:[29]** — entre v28 ("...eça daquele que se há de purificar, para fazer expiação por ele perante o Senhor") e v30 ("E ele oferecerá a uma das rolas ou um dos pombinhos, como ele pode obter ;...")
- **LEVÍTICO 17:[6]** — entre v5 ("...a do Tabernáculo da congregação, e queimará a gordura por cheiro suave ao Senhor") e v7 ("E nunca mais oferecerão os seus sacrifícios aos demônios, após os quais eles se ...")
- **LEVÍTICO 19:[24]** — entre v23 ("...4 Mas, no quarto ano todo o seu fruto será santo para oferta de louvor ao Senhor") e v25 ("E no quinto ano comereis o seu fruto, para que possa render-vos o aumento do mes...")
- **LEVÍTICO 19:[36]** — entre v35 ("...m, será que você tem: Eu sou o Senhor teu Deus, que te tirei da terra do Egito .") e v37 ("Portanto, você deve observar todas as minhas estátuas, e todos os meus juízos, e...")
- **LEVÍTICO 22:[14]** — entre v13 ("...colocar a quinta parte sobre a ele , ea dará ao sacerdote como a coisa sagrada .") e v15 ("E eles não profanarão as coisas sagradas dos filhos de Israel, que eles oferecem...")
- **LEVÍTICO 23:[19]** — entre v18 ("...oferta pelo pecado, e dois cordeiros de um ano para sacrifício de ofertas da paz") e v20 ("E o sacerdote os moverá com o pão das primícias por oferta movida perante o Senh...")
- **NÚMEROS 3:[28]** — entre v27 ("... de um mês para cima, eram oito mil e seiscentos, mantendo a carga do Santuário.") e v29 ("As famílias dos filhos de Coate armarão ao lado do tabernáculo para o sul....")
- **NÚMEROS 9:[18]** — entre v17 ("...m; desde que a nuvem parava sobre o tabernáculo eles descansaram em suas tendas.") e v19 ("E, quando a nuvem se detinha sobre o tabernáculo muitos dias, os filhos de Israe...")
- **NÚMEROS 31:[47]** — entre v46 ("...arregados do serviço do tabernáculo do Senhor; como o Senhor ordenara a Moisés .") e v48 ("E os oficiais que estavam sobre os milhares do exército, os chefes de milhares e...")
- **DEUTERONÔMIO 15:[24, 25, 26, 27, 28]** — entre v23 ("... você não deve comer o seu sangue; você deve derramá-lo sobre o solo como a água") e v29 ("....")
- **DEUTERONÔMIO 29:[24]** — entre v23 ("...r que fez o Senhor assim com esta terra? o que significa o furor de tamanha ira?") e v25 ("Então se dirá: Porquanto deixaram o pacto do Senhor, Deus de seus pais, que tinh...")
- **JOSUÉ 4:[17]** — entre v16 ("...do Jordão. Portanto, 17 Josué deu ordem aos sacerdotes, dizendo: Subi do Jordão.") e v18 ("E sucedeu que, quando os sacerdotes que levavam a arca da aliança do SENHOR, sub...")
- **JOSUÉ 8:[9]** — entre v8 ("...Betel e Ai, ao ocidente de Ai; porém Josué passou aquela noite no meio do povo .") e v10 ("Então Josué se levantou de madrugada, e contou o povo, e subiu, ele e os anciãos...")
- **JOSUÉ 10:[9]** — entre v8 ("... de você. Portanto 9 Josué lhes veio de repente, e subiu de Gilgal a noite toda.") e v10 ("E o SENHOR os conturbou diante de Israel, e os feriu com grande matança em Gibeã...")
- **JOSUÉ 14:[14]** — entre v13 ("...o quenezeu, até o dia, porque ele perseverou em seguir ao Senhor Deus de Israel.") e v15 ("E o nome de Hebrom era Quiriate-Arba; Arba era o maior homem entre os anaquins. ...")
- **JUÍZES 5:[19]** — entre v18 ("...e Canaã em Taanaque, junto às águas de Megido; não tomaram despojo de dinheiro .") e v20 ("Eles lutaram do céu ; as estrelas em seus cursos pelejaram contra Sísera ....")
- **JUÍZES 16:[12]** — entre v11 ("... emboscada permanentes na câmara. E ele os quebrou de seus braços como a um fio.") e v13 ("E disse Dalila a Sansão: Até agora você me deixa escarnecer, e me disseste menti...")
- **RUTE 1:[3]** — entre v2 ("... . O marido de 3 E Elimelech Naomi morreu; e ficou ela com os seus dois filhos .") e v4 ("E eles tomaram para si mulheres de mulheres moabitas ; o nome de um era Orfa, eo...")
- **1 SAMUEL 3:[2]** — entre v1 ("...tado no seu lugar, e os seus olhos começavam já a escurecer, que não podia ver ;") e v3 ("E antes que a lâmpada de Deus saiu no Templo do Senhor , onde a Arca de Deus est...")
- **1 SAMUEL 7:[18, 19]** — entre v17 ("...de estava a sua casa; e ali julgava a Israel; e edificou ali um altar ao Senhor.") e v20 ("anos, e toda a casa de Israel suspirou pelo Senhor....")
- **1 SAMUEL 18:[9]** — entre v8 ("... que ele pode ter mais, mas o reino? 9, Saul trazia Davi daquele dia em diante .") e v10 ("E sucedeu que, no dia seguinte, que o espírito maligno da parte de Deus se apode...")
- **1 SAMUEL 26:[4]** — entre v3 ("... Portanto, 4 Davi enviou espias, e entendeu que Saul foi vir em muito escritura.") e v5 ("E Davi se levantou, e foi ao lugar onde Saul se tinha acampado; viu Davi o lugar...")
- **2 SAMUEL 7:[16]** — entre v15 ("...eu reino para sempre diante de você: será estabelecido o seu trono para sempre .") e v17 ("Segundo todas estas palavras, e conforme toda esta visão, assim falou Natã a Dav...")
- **2 SAMUEL 12:[16]** — entre v15 ("... Deus pela criança; e jejuou Davi, e entrou, e fica a noite toda sobre a terra .") e v17 ("Então os anciãos da sua casa se levantaram e foram a ele, para o levantar da ter...")
- **2 SAMUEL 15:[38, 39, 40]** — entre v37 ("...Então, amigo de Davi Husai entrou na cidade, e Absalão entrou em Jerusalém .") e v41 ("...")
- **1 REIS 4:[22]** — entre v21 ("...ão cada dia, trinta medidas de flor de farinha , e sessenta medidas de farinha ,") e v23 ("dez bois cevados, vinte bois de pasto e cem ovelhas, além de veados , e corços, ...")
- **1 REIS 7:[37]** — entre v36 ("... modo fez as dez bases: todas com a mesma fundição, a mesma medida e um tamanho.") e v38 ("Então fez dez pias de bronze, uma pia continha quarenta banhos, e cada pia era d...")
- **1 REIS 11:[41]** — entre v40 ("...fez, e à sua sabedoria, porventura não está escrito no livro dos atos de Salomão") e v42 ("E o tempo que reinou Salomão em Jerusalém sobre todo o Israel foi quarenta anos....")
- **2 REIS 14:[11]** — entre v10 ("... Amazias, rei de Judá, viram-se face a face em Bete-Semes, que pertence a Judá .") e v12 ("E Judá foi ferido diante de Israel; e fugiu cada um para as suas tendas ....")
- **1 CRÔNICAS 14:[16]** — entre v15 ("...o Deus lhe ordenara; e feriram o exército dos filisteus desde Gibeão até Gezer .") e v17 ("E a fama de Davi se espalhou por todas as terras; eo SENHOR pôs o temor dele sob...")
- **1 CRÔNICAS 27:[30]** — entre v29 ("...ongo dos 30 camelos, Obil, o ismaelita; sobre as jumentas, Jedeías o meronotita:") e v31 ("E sobre os rebanhos foi Jaziz o Hagerite. Todos esses eram os intendentes dos be...")
- **2 CRÔNICAS 10:[12]** — entre v11 ("... terceiro dia, como o rei havia ordenado, dizendo: Voltai a mim ao terceiro dia.") e v13 ("E o rei lhes respondeu asperamente; E o rei Roboão deixara o conselho dos ancião...")
- **2 CRÔNICAS 30:[13]** — entre v12 ("...para celebrar a festa dos pães ázimos no segundo mês, uma congregação mui grande") e v14 ("E levantaram-se, e tiraram os altares que havia em Jerusalém, e todos os altares...")
- **ESDRAS 8:[37, 38, 39]** — entre v36 ("... rei, e aos governadores dalém do rio : e estes ajudaram o povo ea casa de Deus.") e v40 ("....")
- **JÓ 3:[4]** — entre v3 ("...aquele dia em trevas; e Deus, lá de cima, nem deixar a luz brilhar em cima dele.") e v5 ("Deixe trevas e na sombra da morte; deixar uma nuvem habitam sobre ela; deixe a e...")
- **JÓ 7:[20]** — entre v19 ("... que me definir como uma marca contra ti, por isso que eu sou um fardo para mim?") e v21 ("E por que não perdoas a minha transgressão, e não a minha iniqüidade? por agora ...")
- **JÓ 22:[17]** — entre v16 ("...17, que disse a Deus: retira de nós:? Eo que pode o Todo-Poderoso fazer por eles") e v18 ("Contudo ele encheu suas casas com as coisas boas, mas o conselho dos ímpios este...")
- **JÓ 38:[23]** — entre v22 ("...ue eu tenho reservado para o tempo da angústia, para o dia da peleja e da guerra") e v24 ("Por que é que está se reparte a luz, que espalha o vento oriental sobre a terra?...")
- **SALMOS 5:[10]** — entre v9 ("...; expulsá-los na multidão das suas transgressões; pois se revoltaram contra ti .") e v11 ("Mas deixe todos aqueles que depositam sua confiança em você se alegrar: deixá-lo...")
- **SALMOS 11:[3]** — entre v2 ("...os de coração . ? 3 Quando os fundamentos são destruídos, que pode fazer o justo") e v4 ("O Senhor está no seu santo templo, o trono do Senhor está nos céus; os seus olho...")
- **SALMOS 19:[2]** — entre v1 ("... . Dia 2 até dia faz declaração a outro, e noite para noite mostra conhecimento.") e v3 ("Não há fala, nem palavras, em que a sua voz não é ouvida....")
- **SALMOS 40:[9]** — entre v8 ("...na grande congregação; eis que eu não retive os meus lábios, ó Senhor, tu sabes.") e v10 ("Não escondi a tua justiça dentro do Meu coração; Eu declarei a tua fidelidade ea...")
- **SALMOS 44:[9]** — entre v8 ("... mas você tem rejeitaste e nos humilhaste; e não saiais com os nossos exércitos.") e v10 ("Fizeste-nos voltar as costas ao inimigo e aqueles que nos odeiam nos despojam à ...")
- **SALMOS 56:[6]** — entre v5 ("...se ajuntam, escondem-se, marcam os meus passos, como que aguardando a minha alma") e v7 ("Porventura escaparão eles por iniqüidade? na tua ira derrubado o povo, ó Deus....")
- **SALMOS 59:[4]** — entre v3 ("...4 Eles correm, e se preparam, sem culpa minha; desperta para me ajudares, e olha") e v5 ("Tu, pois, ó Senhor, Deus dos Exércitos, o Deus de Israel, desperta para visitar ...")
- **SALMOS 66:[9]** — entre v8 ("...: 9, que detém a nossa alma na vida, e não sofre os nossos pés para ser movido .") e v10 ("Pois tu, ó Deus, que nos provou: Você nos julgados, como a prata é provada ....")
- **SALMOS 68:[34]** — entre v33 ("...Atribuí a Deus: Sua excelência está sobre Israel, ea sua força está nas nuvens .") e v35 ("Ó Deus, Tu és terrível fora de seus lugares santos: o Deus de Israel é ele que d...")
- **SALMOS 69:[23]** — entre v22 ("...os escurecidos para que não vejam; e fazer os seus lombos tremam constantemente.") e v24 ("Derrama a tua indignação sobre eles, e deixe sua raiva colérica tomar posse dele...")
- **SALMOS 78:[17]** — entre v16 ("... 17 E ainda prosseguiram em pecar contra ele, provocando ao Altíssimo no deserto") e v18 ("E tentaram a Deus nos seus corações, pedindo carne para o seu apetite ....")
- **SALMOS 83:[10]** — entre v9 ("...ibeira de Quisom: 10, que foi morto em En-Dor; tornaram-se esterco para a terra.") e v11 ("Faze aos seus nobres como a Orebe, e como a Zeebe; ea todos os seus príncipes co...")
- **SALMOS 86:[7]** — entre v6 ("...has súplicas. . 7 No dia da minha angústia clamo a você: para você responderá Me") e v8 ("Entre os deuses não há semelhante a ti, ó Senhor; nem há obras como as tuas obra...")
- **SALMOS 87:[6]** — entre v5 ("...ecerá . 6 Senhor contará na Escreve-se o povo, que este homem nasceu ali. Selah.") e v7 ("Tanto os cantores como os tocadores de instrumentos estarão lá; todas as minhas ...")
- **SALMOS 88:[6]** — entre v5 ("...27. 6 Você colocou-me na cova mais profunda, em lugares escuros, nas profundezas") e v7 ("A sua ira dura reside em Mim, e você tem afligido me com todas as tuas ondas. . ...")
- **SALMOS 89:[24]** — entre v23 ("...e ea minha benignidade estarão com ele, e em meu nome será exaltado o seu chifre") e v25 ("Porei a sua mão sobre o mar, ea sua direita nos rios....")
- **SALMOS 89:[45]** — entre v44 ("...ias de sua juventude ter encurtado Você: Você tê-lo coberto de vergonha. . Selah") e v46 ("Até quando, Senhor? Você vai se esconder para sempre? será tua ira como fogo?...")
- **SALMOS 95:[2]** — entre v1 ("...r, cantemos ao Senhor: vamos fazer um barulho alegre ao rocha da nossa salvação.") e v3 ("Porque o Senhor é Deus grande, e Rei grande acima de todos os deuses....")
- **SALMOS 98:[8]** — entre v7 ("...m. . 8 Deixe as enchentes batem palmas: deixar as colinas ser alegre em conjunto") e v9 ("diante do Senhor; pois Ele vem julgar a terra:. com justiça julgará o mundo, e o...")
- **SALMOS 98:[10, 11, 12, 13]** — entre v9 ("...is Ele vem julgar a terra:. com justiça julgará o mundo, e os povos com equidade") e v14 ("...")
- **SALMOS 102:[9, 10]** — entre v8 ("...a de sua indignação e sua ira: para você ter me levantou, e lançou-me para baixo") e v11 ("Os meus dias são como a sombra que declina; e eu estou seco como a erva....")
- **SALMOS 104:[19]** — entre v18 ("... para os conies. . 19 Designou a lua para as estações; o sol conhece o seu ocaso") e v20 ("Fazes as trevas, e vem a noite, onde, em todos os animais da floresta que rastej...")
- **SALMOS 104:[23]** — entre v22 ("...seus covis. Homem de 23 anos sai para a sua obra e ao seu trabalho, até à noite.") e v24 ("Ó Senhor, quão variadas são as tuas obras! em sabedoria, você já fez todos eles:...")
- **SALMOS 106:[46]** — entre v45 ("... 46 Por isso fez com que obtivessem compaixão de todos os que os levaram cativos") e v47 ("Salva-nos, SENHOR nosso Deus, e congrega-nos dentre as nações, para dar graças a...")
- **SALMOS 109:[28]** — entre v27 ("... quando eles surgem, deixá-los envergonhados; mas deixe o seu servo se alegrará.") e v29 ("Que meus adversários se vestirão de confusão, e cubram-se com a sua própria conf...")
- **SALMOS 111:[5]** — entre v4 ("...le deu mantimento aos que o temem: Ele nunca vai ser conscientes de Seu Convênio") e v6 ("Mostrou ao seu povo o poder das suas obras, para que Ele possa dar-lhes a heranç...")
- **SALMOS 113:[6]** — entre v5 ("...lturas. ! 6 que se humilha para contemplar as coisas que estão no céu e na terra") e v7 ("Ele levanta o pobre do pó, e levanta o necessitado fora do monturo ;...")
- **SALMOS 118:[3]** — entre v2 ("...pre. . 3 Deixe a casa de Arão agora dizer que a sua benignidade dura para sempre") e v4 ("Digam agora os que temem ao SENHOR que a sua benignidade dura para sempre....")
- **SALMOS 119:[16]** — entre v15 ("...os seus caminhos. 16-me-ei nos teus estatutos: não me esquecerei da tua palavra.") e v17 ("Faze bem ao teu servo, para que eu viva e observe a tua palavra....")
- **SALMOS 119:[136]** — entre v135 ("...tatutos. . 136 Rios de águas correm dos meus olhos, porque não guardam a tua lei") e v137 ("Justo és, ó Senhor, e retos são os teus juízos....")
- **SALMOS 122:[5]** — entre v4 ("...or. . 5 Pois ali estão postos os tronos de julgamento, os tronos da casa de Davi") e v6 ("Orai pela paz de Jerusalém; prosperem quem você ama....")
- **SALMOS 144:[16, 17, 18]** — entre v15 ("...é que as pessoas, isto é, em tal caso: sim, feliz é o povo cujo Deus é o Senhor.") e v19 ("...")
- **PROVÉRBIOS 2:[17]** — entre v16 ("...que abandona o companheiro da sua mocidade e se esquece do concerto do seu Deus.") e v18 ("Porque a sua casa se inclina para a morte, e as suas veredas para os mortos....")
- **PROVÉRBIOS 3:[3]** — entre v2 ("...dade te desampararei: ata-as ao teu pescoço; escreva-os na tábua do seu coração:") e v4 ("Então você achar graça e bom entendimento à vista de Deus e do homem....")
- **PROVÉRBIOS 6:[26]** — entre v25 ("...m homem é levado a um pedaço de pão, mas a adúltera anda à caça da alma preciosa") e v27 ("Pode alguém tomar fogo no seu seio, sem que suas vestes se queimem?...")
- **PROVÉRBIOS 12:[19]** — entre v18 ("...bio da verdade permanece para sempre, mas a língua mentirosa dura só um momento.") e v20 ("Engano há no coração dos que maquinam o mal; mas os que aconselham a paz é a ale...")
- **PROVÉRBIOS 14:[6]** — entre v5 ("...ca sabedoria, e acha que não: mas o conhecimento é fácil para aquele que entende") e v7 ("Vai-te da presença do homem insensato, quando você não percebe nele os lábios do...")
- **PROVÉRBIOS 14:[18]** — entre v17 (".... . 18 A loucura simples herdam, mas os prudentes serão coroados de conhecimento") e v19 ("Os maus inclinam-se perante os bons; e os ímpios diante das portas dos justos. 2...")
- **PROVÉRBIOS 14:[20]** — entre v19 ("...os justos. 20 pobre é odiado até pelo seu vizinho;. Mas o rico tem muitos amigos") e v21 ("O que despreza seus pecados vizinho.: Mas o que se compadece do pobre, feliz é e...")
- **PROVÉRBIOS 14:[27]** — entre v26 ("... refúgio . 27 O temor do SENHOR é fonte de vida, para desviar dos laços da morte") e v28 ("Na multidão do povo está a glória do rei, mas na falta de povo a ruína do prínci...")
- **PROVÉRBIOS 15:[7]** — entre v6 ("...s lábios dos sábios difundem conhecimento; mas o coração dos tolos não faz assim") e v8 ("O sacrifício dos ímpios é abominável ao Senhor, mas a oração dos retos lhe é agr...")
- **PROVÉRBIOS 16:[8]** — entre v7 ("...paz com ele. . 8 Melhor é o pouco com justiça, do que grandes rendas sem direito") e v9 ("O coração do homem inventa seu caminho, mas o Senhor lhe dirige os passos....")
- **PROVÉRBIOS 17:[6]** — entre v5 ("...s de 6 das crianças são a coroa dos anciãos; ea glória dos filhos são seus pais.") e v7 ("Excelente discurso não se torna um tolo: muito menos lábio mentiroso um príncipe...")
- **PROVÉRBIOS 26:[6]** — entre v5 ("... 6 Aquele que envia uma mensagem pela mão dum tolo corta os pés, e bebidas danos") e v7 ("Como as pernas do coxo não são iguais:. Assim é o provérbio na boca dos tolos...")
- **PROVÉRBIOS 27:[19]** — entre v18 ("... . 19 Como na água o rosto respostas ao rosto, assim o coração do homem ao homem") e v20 ("O inferno ea perdição nunca está completa; e os olhos do homem nunca se satisfaz...")
- **ECLESIASTES 4:[13]** — entre v12 ("... rei velho e insensato, que não se deixa mais admoestar 1 Ki. 3:149: 3-911: 9-40") e v14 ("Para sair da prisão, ele vem para reinar; Considerando também o que nasce em seu...")
- **CANTARES DE SALOMÃO 2:[5]** — entre v4 ("...m era o amor. 5-me com passas, confortai-me com maçãs, porque desfaleço de amor.") e v6 ("A sua mão esquerda esteja debaixo da minha cabeça, ea sua mão direita não me abr...")
- **CANTARES DE SALOMÃO 4:[17, 18, 19, 20, 21, 22, 23, 24]** — entre v16 ("...a. Entre o meu amado no seu jardim, e coma os seus frutos excelentes. Mat. 24:21") e v25 ("Jo. 4: 13-...")
- **ISAÍAS 3:[4]** — entre v3 ("...s, e crianças governarão sobre eles 2 Ki. 24:182 Ki. 24: 82 Ki. 21: 12 Ki. 22: 1") e v5 ("E o povo será oprimido, cada um por si, e cada um contra o seu próximo.: A crian...")
- **ISAÍAS 3:[19]** — entre v18 ("... e seus pneus redondos como a lua, As 19 cadeias, as pulseiras e os silenciosos,") e v20 ("Os gorros, e os ornamentos das pernas, e as tiaras e os comprimidos, e os brinco...")
- **ISAÍAS 5:[21]** — entre v20 ("... Ai dos que são sábios aos seus próprios olhos, e prudentes em seu próprio vista") e v22 ("Ai dos que são poderosos para beber vinho, e valentes para misturar bebida forte...")
- **ISAÍAS 7:[15]** — entre v14 ("...l. . 15 Manteiga e mel comerá, quando ele souber rejeitar o mal e escolher o bem") e v16 ("Pois antes que o menino saiba rejeitar o mal e escolher o bem, a terra que abomi...")
- **ISAÍAS 11:[3]** — entre v2 ("...gundo a vista dos seus olhos, nem repreenderá segundo o ouvir dos seus ouvidos :") e v4 ("Mas com justiça julgará os pobres, e decidirá com eqüidade em defesa dos mansos ...")
- **ISAÍAS 32:[10]** — entre v9 ("...odado, vocês mulheres descuidadas: pois a vindima falhará, ea colheita não virá.") e v11 ("Treme, vocês mulheres que estão à vontade; . ser incomodado, você os descuidados...")
- **ISAÍAS 36:[14]** — entre v13 ("...z o rei, não vos engane Ezequias você, porque ele não será capaz de entregar-lhe") e v15 ("Nem tampouco Ezequias vos faça confiar no SENHOR, dizendo: O Senhor certamente n...")
- **ISAÍAS 41:[24]** — entre v23 ("... 24 Eis que és do nada, ea vossa obra do que nada; abominação é quem vos escolhe") e v25 ("Tenho levantado um do norte, e ele há de vir; desde o nascimento do sol invocará...")
- **ISAÍAS 42:[9]** — entre v8 ("... já se realizaram, e novas coisas eu vos declaro: antes de brotar Digo-vos deles") e v10 ("Cantai ao Senhor um cântico novo, eo seu louvor desde a extremidade da terra, vó...")
- **ISAÍAS 43:[17]** — entre v16 ("...taram, e nunca se levantarão.: eles estão extintos, mas apagaram-se como reboque") e v18 ("Não vos lembreis das coisas passadas, nem considereis as coisas antigas....")
- **ISAÍAS 44:[10]** — entre v9 ("...10 Quem forma um deus, e funde uma imagem de escultura, que é de nenhum préstimo") e v11 ("Eis que todos os seus companheiros ficarão confundidos; e os artífices são apena...")
- **ISAÍAS 57:[20]** — entre v19 ("... mar bravo, porque não se pode aquietar, cujas águas lançam de si lama e sujeira") e v21 ("Não há paz, diz o meu Deus, para os ímpios. Rom. 6: 3-51 Cor. 1: 17-18232: 2...")
- **ISAÍAS 60:[21]** — entre v20 ("...e, o ramo da Minha plantados, obra das minhas mãos, para que eu seja glorificado") e v22 ("O mais pequeno virá a ser mil, eo mínimo uma nação forte; eu, o Senhor vai apres...")
- **ISAÍAS 65:[4]** — entre v3 ("...ntos, que come carne de porco e tem caldo de coisas abomináveis nos seus vasos ;") e v5 ("Que dizem: Fica por si mesmo, não vêm perto de mim; porque sou mais santo do que...")
- **JEREMIAS 4:[15]** — entre v14 ("... de você? 15 Porque uma voz anuncia desde Dã, e publica aflição do Monte Efraim.") e v16 ("Faça você menciona para as nações; eis, proclamai contra Jerusalém, que vigias v...")
- **JEREMIAS 6:[2]** — entre v1 ("...e destruição. . 2 Tenho comparou a filha de Sião a uma mulher formosa e delicada") e v3 ("pastores com os seus rebanhos, virá a ela; eles armarão as suas tendas contra el...")
- **JEREMIAS 7:[11]** — entre v10 ("...verna de salteadores aos vossos olhos? Eis que, eu mesmo, vi isso, diz o Senhor.") e v12 ("Mas ide agora ao meu lugar, que estava em Siló, onde eu definir o meu nome no pr...")
- **JEREMIAS 22:[29]** — entre v28 ("...ma terra que não conhecem? . 29 Ó terra, terra, terra, ouvir a Palavra do Senhor") e v30 ("Assim diz o Senhor: Escrevei que este homem fica sem filhos, homem que não prosp...")
- **JEREMIAS 30:[22]** — entre v21 ("...im? diz o Senhor.Heb. 04:16. 22 E vós sereis o meu povo, e eu serei o vosso Deus") e v23 ("Eis que a tempestade do Senhor sai com fúria, um turbilhão de continuar: ela cai...")
- **JEREMIAS 35:[10]** — entre v9 ("... assim obedecemos e fazemos conforme tudo o que Jonadabe, nosso pai, nos ordenou") e v11 ("Mas aconteceu que, quando Nabucodonosor, rei de Babilônia, para a terra, dissemo...")
- **JEREMIAS 37:[10]** — entre v9 ("...eles, contudo se levantariam, cada um na sua tenda, e queimar a fogo esta cidade") e v11 ("E sucedeu que, que, quando o exército dos caldeus, foi quebrado a partir de Jeru...")
- **JEREMIAS 49:[27]** — entre v26 ("... E acenderei fogo no muro de Damasco, o qual consumirá os palácios de Ben-Hadade") e v28 ("No que diz respeito Kedar, e acerca dos reinos de Hazor, que Nabucodonosor, rei ...")
- **LAMENTAÇÕES DE JEREMIAS 1:[4]** — entre v3 ("...eus sacerdotes suspiram; as suas virgens estão tristes, e ela mesma tem amargura") e v5 ("Os seus adversários a dominam, os seus inimigos prosperam; porque o Senhor a afl...")
- **LAMENTAÇÕES DE JEREMIAS 3:[2]** — entre v1 ("...o seu furor. Heb. 1: 37:25. 2 Ele me guiou e me fez andar em trevas e não na luz") e v3 ("Certamente contra mim é Ele virou; Ele transforma sua mão contra mim o dia todo....")
- **LAMENTAÇÕES DE JEREMIAS 3:[5]** — entre v4 ("...ebrou os meus ossos. . 5 Ele construiu contra mim, e me cercou de fel e trabalho") e v6 ("Ele criou-me em lugares tenebrosos, como os que estavam mortos há muito....")
- **LAMENTAÇÕES DE JEREMIAS 3:[25]** — entre v24 ("...nele. . 25 O Senhor é bom para eles que esperam por ele, para a alma que o busca") e v26 ("É bom que um homem ter esperança, e aguardar em silêncio a salvação do Senhor. ....")
- **LAMENTAÇÕES DE JEREMIAS 3:[27]** — entre v26 ("...o a salvação do Senhor. . 27 É bom para um homem suportar o jugo na sua mocidade") e v28 ("Ele senta-se sozinho e mantém o silêncio, porque Ele tem que suportar em cima de...")
- **LAMENTAÇÕES DE JEREMIAS 3:[60]** — entre v59 ("...inha causa. . 60 Viste toda a sua vingança, todos os seus pensamentos contra mim") e v61 ("Ouviste as suas afrontas, Senhor, e todos os seus pensamentos contra mim ;...")
- **EZEQUIEL 1:[13]** — entre v12 ("...m por entre os seres viventes; eo fogo resplandecia, e do fogo saíam relâmpagos.") e v14 ("E os seres viventes corriam, e voltavam, à semelhança de um clarão de relâmpago....")
- **EZEQUIEL 16:[12]** — entre v11 ("...um pendente na testa, e brincos em suas orelhas, e uma linda coroa na sua cabeça") e v13 ("Assim você foi adornada com ouro e prata; e seu vestido foi de linho fino, de se...")
- **EZEQUIEL 20:[15]** — entre v14 ("...ue lhes tinha dado, que mana leite e mel, a qual é a glória de todas as terras ;") e v16 ("Porque rejeitaram os meus juízos, e não andaram nos meus estatutos, e profanaram...")
- **EZEQUIEL 32:[15]** — entre v14 ("..., quando eu ferir a todos os que nela habitam, então saberão que eu sou o SENHOR") e v16 ("Esta é a lamentação que se fará lamentar-la: as filhas das nações o lamentarão e...")
- **EZEQUIEL 34:[30]** — entre v29 ("...s, estou com elas, e que, mesmo a casa de Israel é o meu povo, diz o Senhor DEUS") e v31 ("E você meu rebanho, ovelhas do meu pasto, sois homens, e eu sou o vosso Deus, di...")
- **EZEQUIEL 36:[6]** — entre v5 ("...tenho falado no meu zelo e no meu furor, porque levastes a vergonha das nações :") e v7 ("Portanto assim diz o Senhor DEUS; Eu levantei a minha mão, Certamente as nações ...")
- **EZEQUIEL 43:[8]** — entre v7 ("...nome com as suas abominações que cometeram; por isso eu os consumi na minha ira.") e v9 ("Agora lancem eles para longe sua prostituição, e os cadáveres dos seus reis, lon...")
- **DANIEL 3:[22]** — entre v21 ("...ma do fogo matou aqueles homens que carregaram a Sadraque, Mesaque e Abede-Nego.") e v23 ("E estes três homens, Sadraque, Mesaque e Abede-Nego, caíram atados dentro da for...")
- **DANIEL 9:[14]** — entre v13 ("...or nosso Deus é justo em todas as obras que Ele faz.: Por que não obedeceu a voz") e v15 ("E agora, ó Senhor, nosso Deus, que trouxe seu povo para fora da terra do Egito c...")
- **DANIEL 11:[19]** — entre v18 ("...ra as fortalezas da sua própria terra, mas tropeçará, e cairá, e não será achado") e v20 ("Então se levantará em seu lugar um arrecadador de impostos na glória do reino; m...")
- **OSÉIAS 5:[3]** — entre v2 ("...o se me esconde: por agora, ó Efraim, você prostituem, e Israel está contaminado") e v4 ("Eles não vão enquadrar as suas ações para transformar a seu Deus, porque o espír...")
- **OSÉIAS 7:[15]** — entre v14 ("...im . 15 Apesar de eu ter ligado e fortaleci os braços, mas pensam mal contra mim") e v16 ("Eles voltam, mas não para o Altíssimo: eles são como um arco enganador: seus prí...")
- **OSÉIAS 9:[13]** — entre v12 ("...iro, está plantado num lugar aprazível; mas Efraim levará seus filhos ao matador") e v14 ("Dá-lhes, ó Senhor: o que você vai dar? dar-lhes uma madre que aborte e seios sec...")
- **OSÉIAS 12:[9, 10]** — entre v8 ("...tas, e multipliquei as visões, e usei de parábolas, pelo ministério dos Profetas") e v11 ("Há iniqüidade em Gileade? pura vaidade são: eles sacrificam bois em Gilgal; os s...")
- **JOEL 1:[16]** — entre v15 ("...antimento de diante de nossos olhos, a alegria eo regozijo da casa do nosso Deus") e v17 ("As sementes apodreceram debaixo dos seus torrões, os celeiros foram assolados, o...")
- **JOEL 2:[26]** — entre v25 ("...rocedeu para convosco maravilhosamente; eo meu povo nunca mais será envergonhado") e v27 ("E sabereis que eu estou no meio de Israel, e que eu sou o SENHOR vosso Deus, e n...")
- **JOEL 3:[12]** — entre v11 ("...o vale de Jeosafá; pois ali me assentarei, para julgar todas as nações em redor.") e v13 ("Lançai a foice, porque a colheita está madura: venha, te derrubar; porque o laga...")
- **JOEL 3:[20]** — entre v19 ("...erra. . 20 Mas Judá será habitada para sempre, e Jerusalém de geração em geração") e v21 ("Pois eu vou limpar o sangue que eu não tinha purificado;. Porque o Senhor habita...")
- **JOEL 3:[22, 23, 24, 25, 26, 27, 28]** — entre v21 ("...vou limpar o sangue que eu não tinha purificado;. Porque o Senhor habita em Sião") e v29 ("...")
- **AMOS 1:[4]** — entre v3 ("... 4 Por isso porei fogo à casa de Hazael, que consumirá os palácios de Ben-Hadade") e v5 ("E quebrarei o ferrolho de Damasco, e exterminarei o morador do vale de Aven, e e...")
- **AMOS 5:[9]** — entre v8 ("...fortalece destruição sobre o forte, de modo que a mimada virá contra a fortaleza") e v10 ("Eles odeiam ao que repreende na porta, e abominam ao que fala a verdade....")
- **AMOS 8:[7]** — entre v6 ("...ou pela glória de Jacó: Certamente nunca me esquecerei de nenhuma das suas obras") e v8 ("não estremecerá a terra para isso, e não chorará todo aquele que habita nela? e ...")
- **SOFONIAS 1:[2]** — entre v1 ("... de Judá. . 2 vou consumir por completo tudo sobre a face da terra, diz o SENHOR") e v3 ("I irá consumir homem e animal; Consumirei as aves do céu e os peixes do mar, e o...")
- **SOFONIAS 1:[17]** — entre v16 ("...m contra o SENHOR; eo seu sangue se derramará como pó, ea sua carne como esterco") e v18 ("Nem a sua prata nem o seu ouro os poderá livrar no dia da indignação do Senhor; ...")
- **SOFONIAS 1:[19, 20, 21]** — entre v18 ("...o, porque ele fará mesmo uma libertação rápida de todos os que habitam na terra.") e v22 ("...")
- **AGEU 1:[10]** — entre v9 ("... casa. . 10 Por isso, os céus sobre vós o orvalho, ea terra detém os seus frutos") e v11 ("E eu liguei para a seca sobre a terra, e sobre os montes, e sobre o trigo, e sob...")
- **ZACARIAS 3:[3]** — entre v2 ("...ão tirado do fogo? . 3 Ora Josué, vestido de vestes sujas, estava diante do anjo") e v4 ("E ele respondeu e falou aos que estavam diante dele, dizendo: Tirai-lhe estes tr...")
- **ZACARIAS 6:[6]** — entre v5 ("...norte do país; eo branco saem atrás deles; eo malhados saem para a terra do sul.") e v7 ("E a baía saiu e procurou ir que eles possam caminhar para lá e para cá através d...")
- **ZACARIAS 13:[10, 11, 12, 13]** — entre v9 ("...uvi-los: eu vou dizer, é minha povo; e ela dirá: O Senhor é meu Deus. Hos. 02:16") e v14 ("1413: 1...")
- **MATEUS 8:[18]** — entre v17 ("...ma grande multidão sobre Ele, Ele deu mandamento para partir para o outro lado .") e v19 ("E uma certa Scribe veio, e disse-lhe: Mestre, eu te seguirei aonde quer que vá....")
- **MATEUS 9:[30]** — entre v29 ("...am abertos ; Jesus ameaçou ordenou-lhes, dizendo: Vede que ninguém o saiba que .") e v31 ("Eles, porém, saíram, e divulgaram a sua fama por toda aquela terra ....")
- **MATEUS 13:[48]** — entre v47 ("...am para a praia, e sentou-se, puseram os bons em vasos, mas lançou o mau longe .") e v49 ("Assim será no fim do mundo : os anjos sairão, e separarão os maus dentre os just...")
- **MATEUS 15:[2]** — entre v1 ("...ransgridem a tradição dos anciãos para eles lavam as mãos quando não comem pão .") e v3 ("Ele, porém, respondendo, disse-lhes: , Por que transgredis vós também o mandamen...")
- **MATEUS 18:[26]** — entre v25 ("... caiu, eo adorou, dizendo: Senhor, tem paciência comigo, e eu lhe pagarei tudo .") e v27 ("Então o senhor daquele servo, movido de compaixão, soltou-o e perdoou-lhe a dívi...")
- **MATEUS 21:[10]** — entre v9 ("... E, quando chegou em Jerusalém, toda a cidade se alvoroçou, dizendo: Quem é este") e v11 ("E a multidão dizia: Este é Jesus, o Profeta de Nazaré da Galiléia ....")
- **MATEUS 26:[54]** — entre v53 ("...s? ? 54 Como, pois, se cumpririam as Escrituras, segundo as quais assim deve ser") e v55 ("Naquela mesma hora, disse Jesus às multidões , Você está vindo, como a um saltea...")
- **MARCOS 2:[13]** — entre v12 ("...13, e saiu novamente ao lado do mar ; e toda a multidão a Ele, e Ele os ensinou.") e v14 ("E, como Ele passou, viu a Levi o filho de Alfeu sentado na coletoria de costume ...")
- **MARCOS 11:[3]** — entre v2 ("...ê esta dizer-lhe que o Senhor precisa dele ; e logo , ele irá mandá-lo para cá .") e v4 ("E eles seguiram o seu caminho, e encontraram o jumentinho preso pela porta sem e...")
- **MARCOS 12:[9]** — entre v8 ("...o Senhor da vinha Ele virá e destruirá os lavradores , e dará a vinha a outros .") e v10 ("E não lestes esta passagem da Escritura ; A pedra que os construtores rejeitaram...")
- **MARCOS 14:[56]** — entre v55 ("...56 Para muitos falso testemunho contra ele, mas os testemunhos não concordavam .") e v57 ("E levantaram-se alguns , e falso testemunho contra ele, dizendo ,...")
- **MARCOS 16:[14]** — entre v13 ("...coração, porque eles acreditavam que não os que o tinham visto já ressuscitado .") e v15 ("E disse-lhes: Ide por todo o mundo , e pregai o Evangelho a toda a criatura ....")
- **LUCAS 1:[42]** — entre v41 ("...em-aventurados são vocês entre as mulheres , e bendito é o fruto do teu ventre .") e v43 ("E de onde é que isso me , que a mãe do meu Senhor venha me visitar?...")
- **LUCAS 3:[12]** — entre v11 ("...uns publicanos para serem batizados, e disseram-lhe: Mestre, o que devemos fazer") e v13 ("E ele lhes disse: Não peçais mais do que o que vos está ordenado ....")
- **LUCAS 6:[32]** — entre v31 ("...vos amam, que mérito há você para os pecadores também amam aqueles que os amam .") e v33 ("E se você fizer o bem para os que fazem o bem para você, que recompensa tendes? ...")
- **LUCAS 12:[14]** — entre v13 ("...a comigo . ? 14 E ele lhe disse: Homem, quem Me fez juiz ou repartidor entre vós") e v15 ("E disse-lhes: Acautelai-vos e guardai-vos da avareza : para a vida de um homem n...")
- **LUCAS 12:[28]** — entre v27 ("...e amanhã é lançada no forno ; quanto mais Ele vestirá a vós, homens de pouca fé?") e v29 ("E não buscais que haveis de comer, ou que haveis de beber , nem vos da mente duv...")
- **LUCAS 13:[33]** — entre v32 ("...e no dia seguinte , pois não é possível que um profeta morra fora de Jerusalém .") e v34 ("Jerusalém, Jerusalém , que mata os profetas e pedras daqueles que são enviados a...")
- **LUCAS 20:[44]** — entre v43 ("...os escabelo de teus pés . Portanto, 44 Davi chamou Senhor, como é ele seu filho?") e v45 ("Então na platéia de todas as pessoas que Ele disse aos seus discípulos ,...")
- **LUCAS 22:[11]** — entre v10 ("...você: Onde está o guestchamber, que hei de comer a Páscoa com os meus discípulos") e v12 ("E ele vos mostrará um grande cenáculo mobiliado : não fazer pronto ....")
- **JOÃO 4:[33]** — entre v32 ("...o os discípulos diziam uns aos outros: Será que alguém lhe trouxe deveria comer?") e v34 ("Jesus disse-lhes: A minha comida é fazer a vontade daquele que me enviou , e rea...")
- **JOÃO 6:[43]** — entre v42 ("...eu do céu? Portanto, 43 Jesus respondeu, e disse-lhes: Não murmureis entre vós .") e v44 ("Ninguém pode vir a Mim, se o Pai que me enviou não o trouxer : e eu o ressuscita...")
- **JOÃO 7:[3]** — entre v2 ("... para a Judéia, para que também os teus discípulos vejam as obras que tu fazes .") e v4 ("Para existe nenhum homem que faz qualquer coisa em segredo, e ele mesmo procura ...")
- **JOÃO 11:[32]** — entre v31 ("... Pés , dizendo-lhe: Senhor, se tu estivesses aqui, meu irmão não teria morrido .") e v33 ("Quando, pois, Jesus a viu chorar, e também chorando os judeus que com ela vinham...")
- **JOÃO 11:[54]** — entre v53 ("...a ao deserto, a uma cidade chamada Efraim, e ali continuou com seus discípulos .") e v55 ("E a Páscoa dos judeus estava próxima a mão ; e muitos saíram do país a Jerusalém...")
- **JOÃO 13:[24]** — entre v23 ("...sinal para ele , que ele deveria perguntar quem deveria ser de quem ele falava .") e v25 ("Ele, então, deitado sobre o peito de Jesus, disse-lhe: Senhor, quem é?...")
- **JOÃO 13:[39, 40, 41, 42, 43]** — entre v38 ("... verdade eu vos digo: O galo não cantará , até que me tenhas negado três vezes .") e v44 (". Você deve procurar-me : e como eu disse aos judeus, onde eu vou, vós não podei...")
- **JOÃO 16:[4]** — entre v3 ("...es . E essas coisas que eu não vos disse no início , porque eu estava com você .") e v5 ("Mas agora eu seguir meu caminho para aquele que me enviou ; e nenhum de vós me p...")
- **JOÃO 18:[37]** — entre v36 ("...m de dar testemunho da Verdade . Todo aquele que é da verdade ouve a minha voz .") e v38 ("Pilatos disse-lhe: Que é a Verdade? E, havendo dito isto, de novo saiu a ter com...")
- **JOÃO 19:[4]** — entre v3 ("...Eis que eu apresentá-lo a você, para que saibais que não acho nele crime algum .") e v5 ("Então, veio Jesus, trazendo a coroa de espinhos , eo manto de púrpura. E Pilatos...")
- **JOÃO 20:[3]** — entre v2 ("...puseram Ele . Portanto, 3 Pedro saiu, eo outro discípulo , e foram ao sepulcro .") e v4 ("Corriam os dois juntos, mas o outro discípulo fez correr mais que Pedro, e chego...")
- **JOÃO 20:[25]** — entre v24 ("... meter o dedo no sinal dos pregos, e enfiou a mão no seu lado, não acreditarei .") e v26 ("E oito dias depois estavam os discípulos outra vez dentro, e Tomé com eles : em ...")
- **ATOS DOS APÓSTOLOS 4:[16]** — entre v15 ("...es é manifesto para todos os que habitam em Jerusalém;e não podemos negar isso .") e v17 ("Mas que não se divulgue mais entre o povo , ameacemo- eles, que eles falem mais ...")
- **ATOS DOS APÓSTOLOS 5:[36]** — entre v35 ("...rto; e todos, a todos quantos lhe obedeciam foram dispersos e reduzidos a nada .") e v37 ("Depois deste levantou-se Judas, o galileu, nos dias do recenseamento, e levou mu...")
- **ATOS DOS APÓSTOLOS 6:[16, 17, 18, 19, 20, 21, 22]** — entre v15 ("...o Conselho , fixando os olhos nele , viram o seu rosto como o rosto de um anjo .") e v23 ("....")
- **ATOS DOS APÓSTOLOS 14:[3]** — entre v2 ("...avra da sua graça , e concedeu sinais e prodígios para ser feito por suas mãos .") e v4 ("Mas a multidão da cidade estava dividida : e parte realizadas com os judeus, e c...")
- **ATOS DOS APÓSTOLOS 19:[36]** — entre v35 ("...em ser ditas contra , você deve ficar quieto e não fazer nada precipitadamente .") e v37 ("Por que você trouxe para cá esses homens , que não são nem ladrões de igrejas, n...")
- **ATOS DOS APÓSTOLOS 22:[16]** — entre v15 ("...ará surgem, e ser batizado e lave os seus pecados , invocando o nome do Senhor .") e v17 ("E sucedeu que, que, quando eu tinha voltado a Jerusalém , enquanto orava no temp...")
- **ATOS DOS APÓSTOLOS 28:[23]** — entre v22 ("...e Jesus, tanto pela lei de Moisés, e de os profetas, desde a manhã até à noite .") e v24 ("E alguns criam no que se dizia, e alguns não acreditavam ....")
- **ROMANOS 3:[22]** — entre v21 ("...é em Jesus Cristo para todos e sobre todos os que crêem : para lá há diferença :") e v23 ("Porque todos pecaram , e vem curto da glória de Deus ;...")
- **ROMANOS 11:[10]** — entre v9 ("... os olhos escurecidos, que eles não podem ver , e curvar-lhes sempre as costas .") e v11 ("Digo, pois: Porventura tropeçaram, para que caíssem? Deus me livre, mas sim atra...")
- **ROMANOS 12:[6]** — entre v5 ("...aça que nos é dada , se Prophecy, vamos Profetiza acordo com a proporção da Fé ;") e v7 ("Ou Ministério , vamos esperar em nossa Ministrar : ou ele quem ensina, no ensino...")
- **ROMANOS 13:[2]** — entre v1 ("...te à ordenação de Deus ; e os que resistem trarão sobre si mesmos a condenação .") e v3 ("Porque os magistrados não são terror para as boas obras, mas para o mal . Você n...")
- **1 CORÍNTIOS 3:[13]** — entre v12 ("...erá revelada pelo fogo ; eo fogo provará o trabalho de cada homem de que tipo é.") e v14 ("Se a obra de alguém que respeitar ele construiu logo a seguir , ele deve receber...")
- **1 CORÍNTIOS 10:[31]** — entre v30 ("...s, quer bebais, ou façais outra qualquer coisa, fazei tudo para a glória de Deus") e v32 ("deis escândalo nem aos judeus, nem aos gregos, nem à igreja de Deus:...")
- **2 CORÍNTIOS 3:[8]** — entre v7 ("...r feito longe : ? 8 Como não será o ministério do Espírito ser bastante glorioso") e v9 ("Porque, se o ministério da condenação ser glória , muito mais faz o ministério d...")
- **2 CORÍNTIOS 4:[19, 20, 21, 22, 23]** — entre v18 ("...coisas que são vistassão temporais ; mas as coisas que se não vêem são eternas .") e v24 ("....")
- **2 CORÍNTIOS 11:[5]** — entre v4 ("...ele . 5 Porque eu suponho que eu não ficava atrás aos mais excelentes apóstolos.") e v6 ("Mas, embora eu seja rude na palavra , mas não no conhecimento ; mas nós foram ex...")
- **2 CORÍNTIOS 12:[19]** — entre v18 ("...s em Cristo , mas o que fazemos todas as coisas , amados, para vossa edificação.") e v20 ("Porque receio que, quando chegar, eu não encontrá-lo, como eu , e que eu seja ac...")
- **GÁLATAS 4:[24]** — entre v23 ("... os dois Pactos ; um do monte Sinai, gerando filhos para a servidão, que é Agar.") e v25 ("Por esta Hagar é o monte Sinai na Arábia e respostas para Jerusalém que agora ex...")
- **1 TESSALONICENSES 1:[4]** — entre v3 ("... vista de nosso Deus e Pai ; . 4 Sabendo, amados irmãos, a vossa eleição de Deus") e v5 ("porque o nosso evangelho não foi a vós somente em palavra , mas também em poder,...")
- **1 TESSALONICENSES 3:[2]** — entre v1 ("...erador no evangelho de Cristo, para vos , e para consolá-lo acerca da vossa fé :") e v3 ("Que nenhum homem deve ser abalado por estas tribulações : para vós mesmos sabeis...")
- **1 TESSALONICENSES 4:[17]** — entre v16 ("...ns , para encontrar o Senhor no ar , e assim estaremos para sempre com o Senhor.") e v18 ("Portanto, consolai uns aos outros com estas palavras....")
- **1 TIMÓTEO 5:[9]** — entre v8 ("...levados para o número menos de sessenta anos , tendo sido a esposa de um homem ,") e v10 ("Tendo testemunho de boas obras ; se ela criou os filhos , se exercitou hospitali...")
- **TITO 2:[7]** — entre v6 ("...m exemplo de boas obras; na doutrina mostra incorrupção, gravidade, sinceridade,") e v8 ("Som discurso, que não pode ser condenado ; que aquele que é da parte contrária s...")
- **HEBREUS 4:[17, 18, 19]** — entre v16 ("...s alcançar misericórdia , e acharmos graça para socorro em ocasião necessidade .") e v20 ("...")
- **HEBREUS 9:[29, 30, 31, 32]** — entre v28 ("... que olhar para Ele Ele deve aparecer a segunda vez, sem pecado para a salvação.") e v33 (", ea vara de Arão que floresceu , e as tábuas da aliança ;...")
- **HEBREUS 11:[19]** — entre v18 ("... de levantar -lhe até dentre os mortos ; de onde também recebeu-o em uma figura.") e v20 ("Pela fé Isaque abençoou Jacó e Esaú às coisas futuras....")
- **HEBREUS 12:[11]** — entre v10 ("... : mas depois produz os pacíficos . fruto da justiça para os que são exercitados") e v12 ("Portanto levantai as mãos que pendem , e os joelhos vacilantes ;...")
- **1 PEDRO 3:[21]** — entre v20 ("...ão de uma boa consciência para com Deus, ) , pela ressurreição de Jesus Cristo :") e v22 ("Quem foi para o Céu , e está à direita de Deus ; Anjos e autoridades e poderes e...")
- **2 PEDRO 2:[19]** — entre v18 ("...avos da corrupção : porque de quem um homem é vencido, do mesmo é feito escravo.") e v20 ("Porquanto se, depois de terem escapado das corrupções do mundo pelo pleno conhec...")
- **2 PEDRO 2:[23, 24, 25]** — entre v22 ("...é voltou ao seu próprio vômito; ea porca lavada voltou a revolver-se no lamaçal.") e v26 (", contrariado com a conversa suja dos ímpios :...")
- **2 PEDRO 3:[19, 20, 21]** — entre v18 ("... Senhor e Salvador Jesus Cristo. A Ele seja a glória, agora e para sempre. Amém.") e v22 ("...")
- **APOCALIPSE 7:[18]** — entre v17 ("... as fontes das águas da vida ; e Deus lhes enxugará toda lágrimas de seus olhos.") e v19 ("; e clamou com grande voz aos quatro anjos, a quem fora dado o poder de danifica...")
- **APOCALIPSE 11:[20]** — entre v19 ("...nça ; e houve relâmpagos, e vozes, e trovões, e um terremoto e grande saraivada.") e v21 ("; e eis que o terceiro ai vem rapidamente....")
- **APOCALIPSE 18:[10]** — entre v9 ("...dade, Babilônia, a cidade forte! para dentro de uma hora é o seu julgamento vir.") e v11 ("E os mercadores da terra choram e lamentam sobre ela; porque ninguém compra mais...")
- **APOCALIPSE 22:[22, 23, 24, 25, 26, 27, 28]** — entre v21 ("...Miquéias e Isaías no século 8 aC; Sofonias, Naum, Habacuque e Jeremias no século") e v29 ("ou 30 Segunda 8 Kislev Novembro-dezembro...")
- **APOCALIPSE 22:[32, 33]** — entre v31 ("...; ; ; Milagres de línguas") e v34 ("anos. Ele se instala em Cafarnaum, e ensina em público ... . 35 miraculosa de pe...")
- **APOCALIPSE 22:[35, 36, 37, 38, 39]** — entre v34 ("...or ... 58. Jesus atravessa o lago com seus discípulos, e acalma a tempestade ...") e v40 ("metros de altura, produzindo uma fruta que se assemelha, mas muito inferior à fi...")

---
## C. Números de versículo duplicados — 194 casos (PRIORIDADE MÉDIA)

O mesmo número de versículo aparece 2x no mesmo capítulo. Geralmente um dos dois está certo e o outro deveria ter outro número (o próximo da sequência, que aí ficaria faltando). Comparar os dois textos abaixo com a Bíblia física.

### GENESIS 1:12 (aparece 2x)
- "E a terra produziu erva , erva dando semente conforme a sua espécie, ea árvore que dá fruto, cuja semente está nela conforme a sua espécie : e Deus viu que isso era bom ."
- "."

### GENESIS 3:3 (aparece 2x)
- "Mas do fruto da árvore que está no meio do jardim, Deus disse: Não comereis dele, nem nele tocareis, para que não morra ."
- "; na tristeza você dará à luz filhos ; e teu desejo será para o teu marido, e ele te dominará ."

### GENESIS 3:15 (aparece 2x)
- "E porei inimizade entre ti ea mulher , e entre a tua descendência ea sua semente ; ele te ferirá a cabeça"
- ", e tu lhe ferirás o calcanhar ."

### GENESIS 6:14 (aparece 2x)
- "; porque toda a carne havia corrompido o seu caminho sobre a terra ."
- "Faze para ti uma arca de madeira de Gofer ; quartos farás na arca, e deve lançá-lo dentro e fora de campo."

### GENESIS 7:7 (aparece 2x)
- "."
- "Noé entrou, e seus filhos, sua mulher e as mulheres de seus filhos com ele na arca, por causa das águas do dilúvio ."

### GENESIS 18:15 (aparece 2x)
- "Então Sara negou, dizendo: Não me ri ; pois ela estava com medo . E Ele disse: Não; mas você fez rir ."
- "."

### GENESIS 20:3 (aparece 2x)
- "Deus, porém, veio a Abimeleque, em sonhos, de noite, e disse-lhe: Eis que você é, mas um homem morto, para a mulher que você tem tomado; pois ela é a esposa de um homem."
- "."

### GENESIS 21:1 (aparece 2x)
- "A ND o SENHOR visitou a Sara, como tinha dito, e fez o SENHOR a Sara como tinha falado ."
- ""

### GENESIS 28:2 (aparece 2x)
- "Levanta-te, vai a Padã-Arã, à casa de Betuel, pai de tua mãe; e levá-lo uma mulher dali das filhas de Labão, irmão de sua mãe ."
- ""

### GENESIS 31:20 (aparece 2x)
- "."
- "E Jacó roubou de surpresa na casa de Labão, o sírio, em que ele lhe disse que não, que ele fugiu."

### GENESIS 35:22 (aparece 2x)
- ", e armou a sua tenda além de Migdal-Eder."
- "E sucedeu que, quando Israel habitava naquela terra, foi Rúben e deitou-se com Bila, concubina de seu pai; e Israel o ouviu. Agora, os filhos de Jacó eram doze :"

### GENESIS 43:7 (aparece 2x)
- "E eles disseram: O homem perguntou-nos rigorosamente de nosso estado e de nossa parentela, dizendo: O seu pai ainda está vivo? você tem um irmão? e respondemos-lhe segundo o teor d"
- "."

### GENESIS 46:2 (aparece 2x)
- "E falou Deus a Israel em visões de noite , e disse: Jacó, Jacó . E ele disse: Eis-me aqui ."
- ": o medo de não ir para o Egito ; pois eu farei ali uma grande nação :"

### ÊXODO 12:19 (aparece 2x)
- ", ea praga não será contra vós para vos destruir, quando eu ferir a terra do Egito."
- "Por sete dias não se ache nenhum fermento nas vossas casas; porque qualquer que come que é levedado, aquela alma será cortada da congregação de Israel, assim o estrangeiro como o n"

### ÊXODO 14:14 (aparece 2x)
- ": para os egípcios que você viu hoje, você deve vê-los novamente não mais para sempre."
- "O Senhor pelejará por vós, e vós vos calareis."

### ÊXODO 15:1 (aparece 2x)
- "T HEN cantou Moisés e os filhos de Israel este cântico ao Senhor, e falou, dizendo , cantarei até o Senhor, porque Ele triunfou gloriosamente.: o cavalo eo seu cavaleiro que Ele te"
- ": e eles acamparam lá pelas águas ."

### ÊXODO 21:34 (aparece 2x)
- ""
- "O dono da cova deve fazê-lo bem, e dar dinheiro até ao seu proprietário; mas o animal morto será seu."

### ÊXODO 23:2 (aparece 2x)
- "Você não deve seguir a multidão para fazer o mal; nem você fala em causa a declinar após muitos arrancar julgamento :"
- ""

### ÊXODO 30:5 (aparece 2x)
- "Farás também os varais de madeira de acácia, e os cobrirás de ouro."
- "quinhentos siclos , e do doce metade da canela tanto, até duzentos e cinqüenta siclos , e do doce Cálamo dois Cento e cinqüenta siclos ,"

### LEVÍTICO 1:2 (aparece 2x)
- "Fala aos filhos de Israel, e dize-lhes: Quando algum de vós oferecer oferta ao SENHOR, trareis a vossa oferta de gado, mesmo de gado, e do rebanho. 1 Cor. 15:454"
- "; e os sacerdotes, filhos de Arão, polvilhe o sangue em redor sobre o Altar."

### LEVÍTICO 7:20 (aparece 2x)
- "Mas a pessoa que come da carne do sacrifício da oferta pacífica, que pertence ao Senhor, tendo a sua imundícia sobre ele, mesmo que a alma será extirpada do seu povo."
- ""

### LEVÍTICO 7:34 (aparece 2x)
- "."
- "porque o peito movido ea coxa alçada tenho tomado dos filhos de Israel, dos sacrifícios das suas ofertas pacíficas, e os tenho dado a Arão, o sacerdote, ea seus filhos por estatuto"

### LEVÍTICO 19:2 (aparece 2x)
- "Fala a toda a congregação dos filhos de Israel, e dize-lhes: Sereis santos porque eu, o Senhor vosso Deus, sou santo."
- ""

### LEVÍTICO 19:15 (aparece 2x)
- "Não farás injustiça no juízo: você não deve respeitar a pessoa do pobre, nem honrarás a pessoa do poderoso; mas com justiça não julgas teu vizinho ."
- "."

### LEVÍTICO 24:16 (aparece 2x)
- "."
- "E aquele que blasfemar o nome do Senhor, certamente será morto, e toda a congregação certamente o apedrejará; assim o estrangeiro , como aquele que é nascido na terra, quando ele b"

### LEVÍTICO 26:4 (aparece 2x)
- "4"
- "eu vos darei as vossas chuvas a seu tempo, ea terra dará a sua colheita, e as árvores do campo darão os seus frutos ."

### NÚMEROS 12:2 (aparece 2x)
- "E disseram: Será que o Senhor de fato falado somente por Moisés? Ele não tem falado também por nós? E o SENHOR o ouviu."
- "Esteja fechada fora do arraial por sete dias, e depois que deixá-la ser recebido novamente."

### NÚMEROS 24:16 (aparece 2x)
- "Ele disse, que ouviu as palavras de Deus, e sabia que o conhecimento do Altíssimo, que vê a visão do Todo-Poderoso, que cai, e se lhe abrem os olhos:"
- "; mas o seu fim será que ele perecerá para sempre ."

### NÚMEROS 33:2 (aparece 2x)
- "E escreveu Moisés as suas saídas, segundo as suas jornadas, conforme o mandado do Senhor; e estas são as suas jornadas segundo as suas saídas."
- ":"

### DEUTERONÔMIO 4:2 (aparece 2x)
- "Não acrescentareis à palavra que vos mando, nem diminuireis dela, para que guardeis os mandamentos do Senhor vosso Deus, que eu vos mando ."
- ""

### DEUTERONÔMIO 28:9 (aparece 2x)
- "O Senhor vos confirmará povo santo Si mesmo, como jurou a ti, se você deve manter os mandamentos do Senhor teu Deus, e andares nos seus caminhos ."
- ":"

### JOSUÉ 1:5 (aparece 2x)
- "."
- "Não será qualquer homem ser capaz de estar diante de vocês todos os dias de sua vida: como fui com Moisés, assim serei contigo.: Eu não te deixará, nem te desampararei"

### JOSUÉ 2:17 (aparece 2x)
- ""
- "E os homens disseram-lhe: Nós seremos inocentes no tocante a este juramento que nos fizeste jurar ."

### JOSUÉ 7:2 (aparece 2x)
- "Josué enviou de Jericó alguns homens a Ai, que está junto a Bete-Aven, na zona leste de Betel, e falou-lhes, dizendo: Subi, e ver o país. E os homens subiram e viram Ai."
- "2111 Cor. 1: 17-1821232: 2Gal. 6:14Col. 2: 14-15"

### JOSUÉ 7:18 (aparece 2x)
- ""
- "E ele trouxe a sua casa, homem por homem; e Acã, filho de Carmi, filho de Zabdi, filho de Zera, da tribo de Judá, foi levado."

### JOSUÉ 13:2 (aparece 2x)
- "Esta é a terra que ainda permanece: todas as regiões dos filisteus, e todos Geshuri ,"
- "211"

### JOSUÉ 16:3 (aparece 2x)
- "E desce para o oeste para a costa da Japhleti, até a costa de Bete-Horom a inferior, e Gezer; e os acontecimentos fora dele são no mar."
- ""

### JOSUÉ 17:13 (aparece 2x)
- "No entanto, sucedeu que, quando os filhos de Israel foram se fortalecia, que puseram os cananeus a trabalhos forçados; mas não os expulsou de todo."
- ""

### JOSUÉ 21:3 (aparece 2x)
- "E os filhos de Israel deram aos levitas, da sua herança, conforme a ordem do Senhor, as seguintes cidades e seus arrabaldes."
- "."

### JOSUÉ 24:14 (aparece 2x)
- "Agora, pois, temei o Senhor e servi-o com sinceridade e com verdade; e deitai fora os deuses que serviram vossos pais, no outro lado do rio e no Egito; e servi ao SENHOR."
- ""

### JUÍZES 13:18 (aparece 2x)
- "1821232: 2Gal. 06:14"
- "E o anjo do Senhor disse-lhe: Por que pedir-lhe, assim, depois de meu nome, visto que é maravilhoso?"

### 1 SAMUEL 2:1 (aparece 2x)
- "A ND Ana orou , e disse: O meu coração exulta no Senhor, a minha glória é exaltado no SENHOR; a minha boca se dilatou sobre os meus inimigos; porquanto me alegro na tua salvação ."
- ""

### 1 SAMUEL 16:23 (aparece 2x)
- ""
- "E aconteceu que, quando o espírito maligno da parte de Deus vinha sobre Saul, Davi tomava a harpa, ea tocava com a sua mão.: Então Saul sentia alívio, e se achava melhor, eo espíri"

### 1 SAMUEL 17:2 (aparece 2x)
- "Porém Saul e os homens de Israel se ajuntaram e acamparam no vale de Elá, e ordenaram a batalha contra os filisteus."
- ""

### 1 SAMUEL 31:8 (aparece 2x)
- ""
- "E aconteceu que, no dia seguinte, quando os filisteus vieram para despojar os mortos, acharam Saul e seus três filhos caídos no monte Gilboa."

### 2 SAMUEL 2:16 (aparece 2x)
- ""
- "E eles pegou cada um o seu companheiro pela cabeça , e enfiou a espada no lado de seu companheiro; assim caíram juntos; pelo que o lugar foi chamado Helcate-hazzurim, que está em G"

### 2 SAMUEL 8:15 (aparece 2x)
- ""
- "E Davi reinou sobre todo o Israel; e Davi juízo e justiça a todo o seu povo ."

### 2 SAMUEL 21:20 (aparece 2x)
- ", e que cingia uma espada nova, que teria matado Davi."
- "E ainda houve uma batalha em Gate, onde estava um homem de grande estatura, que tinha em cada mão seis dedos, e em cada pé seis dedos, vinte e quatro ao todo; e ele também nasceu p"

### 2 SAMUEL 22:15 (aparece 2x)
- "E disparou flechas, e os dissipou; relâmpago, e desbaratou-los ."
- "."

### 1 REIS 6:8 (aparece 2x)
- "A porta da câmara do meio estava ao lado direito da casa, e eles subiram com escadas em espiral para dentro da câmara do meio e do meio para o terceiro ."
- ""

### 1 REIS 8:12 (aparece 2x)
- "Então falou Salomão: O Senhor disse que habitaria na escuridão ."
- "."

### 1 REIS 11:2 (aparece 2x)
- "das nações de que o SENHOR disse aos filhos de Israel, você não estará com eles, nem elas virão em vós; pois certamente eles vão virar o vosso coração para seguirdes os seus deuses"
- "."

### 1 REIS 22:18 (aparece 2x)
- "E o rei de Israel disse a Jeosafá: Eu não disse a você que ele não profetizaria o bem a meu respeito, mas somente o mal?"
- ""

### 2 REIS 9:2 (aparece 2x)
- "E quando você vem para lá, procura a Jeú, filho de Jeosafá, filho de Ninsi, e entrar, e fazer ele se levante do meio de seus irmãos, e leva-o para uma câmara interior ;"
- ""

### 2 REIS 10:9 (aparece 2x)
- "E sucedeu que, pela manhã, que ele saiu, e ficou de pé, e disse a todas as pessoas, você ser justo: eis que conspiraram contra o meu senhor, eo matei, mas quem matou todos estes?"
- "."

### 2 REIS 16:18 (aparece 2x)
- "18Gal. 6:14Col. 2: 14-15"
- "Também o passadiço coberto para uso no sábado, que tinham construído na casa, ea entrada do rei externa, retirou da casa do Senhor, por causa do rei da Assíria ."

### 2 REIS 18:16 (aparece 2x)
- ""
- "Naquele tempo cortou Ezequias o ouro das portas do templo do Senhor, e dos umbrais que Ezequias, rei de Judá, as cobrira, eo deu ao rei da Assíria."

### 2 REIS 19:27 (aparece 2x)
- ""
- "Mas eu sei que a sua morada, e seu ir para fora, e sua entrada, e sua raiva contra mim ."

### 1 CRÔNICAS 1:1 (aparece 2x)
- "GENEALOGIAS DESDE ADÃO ATÉ O CATIVEIRO BABILÔNICO: DESCENDENTES DE ADÃO A NOÉA DAM, Sheth , Enos ,"
- ", Reuel, Jeús, Jalão e Corá."

### 1 CRÔNICAS 3:21 (aparece 2x)
- ","
- "E os filhos de Hananias: Pelatias e Jesaías: os filhos de Refaías, os filhos de Arnã, os filhos de Obadias, e os filhos de Secanias."

### 1 CRÔNICAS 16:3 (aparece 2x)
- "E repartiu a todos em Israel, tanto a homens como a mulheres, a cada um, um pão, e um bom pedaço de carne, e um frasco de vinho."
- ";"

### 1 CRÔNICAS 23:20 (aparece 2x)
- "."
- "Dos filhos de Uziel; Miquéias, o primeiro, e Issias o segundo."

### 2 CRÔNICAS 15:15 (aparece 2x)
- "E todo o Judá se alegrou deste juramento, porque eles tinham jurado de todo o coração, e procurou-o com toda a sua vontade; e Ele foi encontrado deles, eo SENHOR lhes deu repouso e"
- "."

### 2 CRÔNICAS 20:2 (aparece 2x)
- "Então vieram alguns que avisaram a Jeosafá, dizendo: Vem uma grande multidão contra você do outro lado do mar e da Síria; e eis que já estão em Hazazom-Tamar, que é En-Gedi ."
- "."

### 2 CRÔNICAS 20:15 (aparece 2x)
- "E ele disse: Ouvi você, todo o Judá, e vós, moradores de Jerusalém, e tu, ó rei Josafá: Assim diz o Senhor vos, Não temais, nem vos assusteis por causa desta grande multidão; pois "
- "15Rom. 8: 1-211"

### 2 CRÔNICAS 26:1 (aparece 2x)
- "T HEN todo o povo de Judá tomou a Uzias, que tinha dezesseis anos, eo fizeram rei em lugar de Amazias, seu pai ."
- "."

### 2 CRÔNICAS 26:8 (aparece 2x)
- "E os amonitas deram presentes a Uzias, e sua fama se espalhou até a entrada do Egito; para ele se fortaleceu muito ."
- "83437-38Lev. 16:13"

### 2 CRÔNICAS 28:9 (aparece 2x)
- "Mas um profeta do Senhor estava lá, cujo nome era Obede, o qual saiu ao encontro do exército que vinha para Samaria, e disse-lhes: Eis porque o Senhor Deus de vossos pais irou-se c"
- "."

### 2 CRÔNICAS 35:26 (aparece 2x)
- "."
- "Ora, o restante dos atos de Josias, e à sua bondade, de acordo com o que foi escrito na Lei do Senhor ,"

### 2 CRÔNICAS 36:8 (aparece 2x)
- "Ora, o restante dos atos de Jeoiaquim, e as abominações que fez, eo mais que se achou nele, eis que estão escritos no livro dos reis de Israel e Judá; e Joaquim, seu filho, reinou "
- ", e reinou três meses e dez dias em Jerusalém; e fez o que era mau aos olhos do Senhor."

### ESDRAS 7:18 (aparece 2x)
- "."
- "E tudo deve parecer bom para você, e para seus irmãos, a ver com o resto da prata e do ouro, o fareis conforme a vontade do vosso Deus ."

### NEEMIAS 9:5 (aparece 2x)
- "Então os levitas, Jesuá, e de Cadmiel, Bani, Hasabnéias, Serebias, Hodijah, Sebanias e Petaías, disseram: Levantai-vos, bendizei ao Senhor vosso Deus para todo o sempre: e bendito "
- ";) e retirou-se o ombro, endureceram a cerviz e não quiseram ouvir."

### ESTER 2:12 (aparece 2x)
- "Agora, quando a vez de cada donzela vir para ir ao rei Assuero, depois que ela tinha sido"
- "meses, de acordo com a lei das mulheres, (pois assim eram os dias das suas purificações realizado, a saber, seis meses com óleo de mirra, e seis meses com perfumes suaves, e com ou"

### JÓ 1:4 (aparece 2x)
- "E iam seus filhos e faziam banquetes em casa, cada um o seu dia ; e mandavam convidar as suas três irmãs para comerem e beberem com eles."
- ""

### JÓ 8:6 (aparece 2x)
- "Se você fosse puro e reto; certamente mesmo agora ele despertará por ti, e tornará segura a habitação da tua justiça próspera."
- ":"

### JÓ 26:4 (aparece 2x)
- "Para quem proferiste palavras? e cujo espírito veio de você?"
- "."

### JÓ 28:10 (aparece 2x)
- "Corta rios entre as rochas; e os seus olhos descobrem todas as coisas preciosas."
- "."

### JÓ 34:10 (aparece 2x)
- "Portanto, ouvi-me, vós homens de entendimento: longe de Deus, que Ele deve fazer maldade; e do Todo-Poderoso, que Ele deve praticar a iniqüidade ."
- ""

### SALMOS 18:2 (aparece 2x)
- ""
- "O Senhor é a minha rocha, a minha fortaleza eo meu libertador; o meu Deus, o meu rochedo, em quem me refugio; o meu escudo, a força da minha salvação, eo meu alto refúgio ."

### SALMOS 37:7 (aparece 2x)
- "Descansa no SENHOR e espera nele: traste não a si mesmo por causa daquele que prospera em seu caminho, por causa do homem que traz invenções malignas para passar"
- "."

### SALMOS 49:18 (aparece 2x)
- "."
- "Ainda que na sua vida ele bendisse a sua alma, e os homens te louvarão, quando você faz bem a si mesmo ."

### SALMOS 51:9 (aparece 2x)
- "9"
- "esconder seu rosto dos meus pecados e apaga todas as minhas iniqüidades."

### SALMOS 74:18 (aparece 2x)
- ""
- "Lembra-te disto: que o inimigo te afrontou, ó Senhor, e que um povo insensato ultrajou o teu nome."

### SALMOS 81:9 (aparece 2x)
- ""
- "Não deve deus estranho não estar em você; nem você adorar um deus estranho."

### SALMOS 87:2 (aparece 2x)
- "O Senhor ama as portas de Sião mais do que todas as habitações de Jacó."
- ""

### SALMOS 89:17 (aparece 2x)
- "Pois tu és a glória da sua força; e em seu favor o nosso poder será exaltado."
- ""

### SALMOS 104:2 (aparece 2x)
- "Quem cobre-se de luz como de um manto, que estende os céus como uma cortina :"
- "."

### SALMOS 106:2 (aparece 2x)
- "Quem pode referir os poderosos feitos do Senhor? que pode mostrar todo o seu louvor?"
- ""

### SALMOS 106:5 (aparece 2x)
- "para que eu veja o bem de seu escolhido, para que me alegre com a alegria da tua nação, e me glorie juntamente com a tua herança."
- ""

### PROVÉRBIOS 3:2 (aparece 2x)
- "Para longura de dias, e anos de vida e paz, que deve acrescentar-lhe. 23Não 3 Deixe a misericórdia ea verdade te desampararei: ata-as ao teu pescoço; escreva-os na tábua do seu cor"
- ""

### PROVÉRBIOS 8:3 (aparece 2x)
- "Ela chora às portas, à entrada da cidade, na vinda de às portas."
- ""

### PROVÉRBIOS 11:1 (aparece 2x)
- "A balança enganosa é abominação para o Senhor:., mas o peso justo é o seu prazer"
- ""

### CANTARES DE SALOMÃO 4:14 (aparece 2x)
- "nardo e açafrão; cálamo, eo cinamomo, com todas as árvores de incenso; mirra e aloés, com todas as principais especiarias:"
- "14"

### CANTARES DE SALOMÃO 7:5 (aparece 2x)
- "A tua cabeça sobre ti é como o monte Carmelo, e os cabelos da tua cabeça como a púrpura; o rei está preso nas galerias."
- "5"

### ISAÍAS 2:2 (aparece 2x)
- "E ela deve vir a passar nos últimos dias, que o monte da casa do Senhor será estabelecido no cume dos montes, e se elevará por cima dos outeiros; e todas as nações afluirão a ele."
- ":"

### ISAÍAS 2:17 (aparece 2x)
- ""
- "E a altivez do homem será humilhada, ea altivez dos varões será feito baixo, e só o Senhor será exaltado naquele dia."

### ISAÍAS 9:16 (aparece 2x)
- ""
- "Para os líderes desse povo levá-los a errar; e os que por eles são guiados são destruídos."

### ISAÍAS 14:23 (aparece 2x)
- ""
- "Também farei dela uma possessão de ouriços ea lagoas de águas;. E varrê-la-ei com a vassoura da destruição, diz o Senhor dos Exércitos"

### ISAÍAS 18:1 (aparece 2x)
- "W OE para a terra do roçar das asas, que está além dos rios da Etiópia :"
- "1Zc. 09:141 Tes. 04:16"

### ISAÍAS 25:2 (aparece 2x)
- "Para Você fez de uma cidade num montão; de uma cidade fortificada uma ruína, e do paço dos estranhos, que não seja mais cidade; ele nunca será construído."
- "2Ez. 25: 8-11"

### ISAÍAS 44:2 (aparece 2x)
- "Assim diz o Senhor que te fez, e te formou desde o ventre, e que irá ajudá-lo; Não temas, ó Jacó, meu servo; . e você, Jesurum, a quem escolhi"
- ""

### ISAÍAS 59:18 (aparece 2x)
- "De acordo com as suas obras, assim será retribuição, furor aos seus adversários, e recompensa aos seus inimigos; para as ilhas Ele a sua recompensa."
- ""

### ISAÍAS 60:1 (aparece 2x)
- "A elevação, brilho; para sua luz veio, ea glória do Senhor vai nascendo sobre ti."
- ""

### ISAÍAS 65:3 (aparece 2x)
- "povo que provoca-me à ira continuamente para o meu rosto; que sacrifica em jardins, e queima incenso sobre altares de tijolos : 4, que permanecem entre as sepulturas, e se aninham "
- ""

### JEREMIAS 5:10 (aparece 2x)
- "Vá-lo aos seus muros, e destruir; mas não façais uma destruição final: tirar suas muralhas; para eles não são. do Senhor"
- ""

### JEREMIAS 25:11 (aparece 2x)
- "E toda esta terra virá a ser um deserto e um espanto; e estas nações servirão ao rei de Babilônia setenta anos."
- ","

### JEREMIAS 25:14 (aparece 2x)
- "Para muitas nações e grandes reis se servirão deles também, e assim lhes retribuirei segundo os seus feitos, e segundo as obras das suas próprias mãos."
- ""

### JEREMIAS 25:16 (aparece 2x)
- "Para que bebam e tremam, e enlouqueçam, por causa da espada, que eu enviarei entre eles."
- ""

### JEREMIAS 29:23 (aparece 2x)
- ","
- "Porque eles cometeram vilania em Israel, e cometeram adultério com as mulheres de seus próximos, e anunciando falsamente em meu nome palavras, que eu não lhes mandei; Eu o sei, e s"

### JEREMIAS 31:18 (aparece 2x)
- ""
- "Tenho certeza de ouvido Efraim lamentando-se assim; Você me castigou, e fui castigado, como novilho ainda não domado: virá-lo de mim, e eu se converterá; pois tu és o Senhor meu De"

### JEREMIAS 31:36 (aparece 2x)
- "3637:2142:3743:33Deut. 21: 15-17"
- "Se estas ordenanças de diante de mim, diz o Senhor, em seguida, a semente de Israel também deixará de ser uma nação diante de mim para sempre."

### JEREMIAS 32:5 (aparece 2x)
- "E ele levará Zedequias para Babilônia, e ali estará até que eu o visite, diz o SENHOR: ainda que você luta com os caldeus, não prosperará."
- ""

### JEREMIAS 33:7 (aparece 2x)
- ""
- "E farei voltar o cativeiro de Judá eo cativeiro de Israel para voltar, e os edificarei como ao princípio."

### JEREMIAS 34:17 (aparece 2x)
- "Portanto assim diz o SENHOR; Você não me deram ouvidos, proclamando liberdade, cada um ao seu irmão, e cada um ao seu próximo: eis que eu proclamo a liberdade, diz o Senhor, para a"
- ","

### JEREMIAS 35:7 (aparece 2x)
- "Nem deve você construir a casa, nem semeareis semente, nem planta vinha, nem a possuireis; mas todos os seus dias, você deve habitam em tendas; para que vivais muitos dias na terra"
- ""

### EZEQUIEL 1:6 (aparece 2x)
- "E cada um tinha quatro rostos, como também cada um deles quatro asas."
- "6Num. 22:31Josh. 05:14Dan. 8:17Jo. 18: 6Atos 9: 4"

### EZEQUIEL 14:12 (aparece 2x)
- "A palavra do Senhor veio a mim, dizendo: ,"
- ""

### EZEQUIEL 19:6 (aparece 2x)
- "E ele foi para cima e para baixo entre os leões, veio a ser leão novo, e aprendeu a apanhar a presa, e devorou homens."
- ""

### EZEQUIEL 30:20 (aparece 2x)
- "E sucedeu que, no ano undécimo, no primeiro mês, no sétimo dia do mês, que a Palavra do Senhor veio a mim, dizendo:"
- ","

### EZEQUIEL 37:16 (aparece 2x)
- "Além disso, ó filho do homem, toma um pau, e escreve nele: Por Judá e pelos filhos de Israel, seus companheiros: eles toma outro pau, e escreve nele: Por José, vara de Efraim, e po"
- ""

### EZEQUIEL 38:3 (aparece 2x)
- "E dize: Assim diz o Senhor Deus; Eis que eu sou contra ti, ó Gogue, príncipe e chefe de Meseque e Tubal :"
- ""

### EZEQUIEL 41:1 (aparece 2x)
- "A FTERWARD Ele me levou ao templo, e mediu os cargos, seis côvados de largura de um lado, e seis côvados de largura do outro lado, que era a largura do tabernáculo."
- "1Ez. 43:16"

### EZEQUIEL 48:8 (aparece 2x)
- "Junto ao termo de Judá, desde o lado oriental até o lado ocidental, será a oferta que haveis de oferecer de vinte e cinco mil canas de largura, e do comprimento de uma das porções,"
- ""

### DANIEL 9:16 (aparece 2x)
- "Ó Senhor, segundo todas as tuas justiças, eu te suplico, deixe sua raiva e seu furor da tua cidade de Jerusalém, do teu santo monte; porque pelos nossos pecados, e por causa das in"
- ";"

### DANIEL 12:6 (aparece 2x)
- "611-15"
- "E perguntei ao homem vestido de linho, que estava sobre as águas do rio: Quanto tempo haverá até o fim destas maravilhas?"

### JOEL 2:7 (aparece 2x)
- "Correm como valentes; eles devem escalar o muro como homens de guerra; e marcham cada um nos seus caminhos e não se desviam de suas fileiras :"
- "7"

### JOEL 2:18 (aparece 2x)
- ";"
- "Então o Senhor se mostrou zeloso da sua terra, e se compadeceu do seu povo."

### OBADIAS 1:6 (aparece 2x)
- "Como são as coisas de Esaú procurou para fora! como são seus tesouros ocultos!"
- "Dan. 2: 44-45"

### JONAS 1:1 (aparece 2x)
- "N OW a Palavra do Senhor veio a Jonas, filho de Amitai, dizendo"
- ","

### MIQUÉIAS 5:6 (aparece 2x)
- "6"
- "Esses consumirão a terra da Assíria à espada, ea terra de Ninrode nas suas entradas: assim será Ele nos livrará da Assíria, quando vier à nossa terra, e quando calcar os nossos ter"

### AGEU 2:16 (aparece 2x)
- "Uma vez que naqueles dias eram, quando alguém vinha a um monte de vinte medidas, e havia somente dez; quando vinha ao pressfat para tirar cinqüenta embarcações fora da imprensa, ha"
- ""

### ZACARIAS 8:2 (aparece 2x)
- "Assim diz o SENHOR dos Exércitos; Eu estava com ciúmes por Sião com grande zelo, e eu estava com ciúmes por ela com grande furor."
- "2"

### ZACARIAS 13:3 (aparece 2x)
- "3"
- "E ela deve vir a passar, que, quando alguém ainda profetizar , seu pai e sua mãe, que gerou ele deve dizer-lhe: Você não viverá; para você falar mentiras em o nome do Senhor, e seu"

### ZACARIAS 14:3 (aparece 2x)
- "Então o Senhor sairá, e pelejará contra estas nações, como pelejou no dia da batalha. Ex. 14:1415:"
- "3"

### ZACARIAS 14:5 (aparece 2x)
- "E fugireis pelo vale dos montes; para o vale dos montes chegará até Azal: sim, você deve fugir, como como você fugiu de diante do terremoto nos dias de Uzias, rei de Judá, eo Senho"
- ""

### ZACARIAS 14:13 (aparece 2x)
- "E sucederá que, naquele dia, que uma grande perturbação do Senhor entre eles; e pegará cada um na mão do seu próximo, e sua mão se levantará contra a mão de seu vizinho."
- "13"

### ZACARIAS 14:21 (aparece 2x)
- ""
- "E todas as panelas em Jerusalém e Judá serão consagradas ao SENHOR dos Exércitos, e todos os que sacrificarem virão, e delas tomarão, e nelas cozerão; e naquele dia não haverá mais"

### MALAQUIAS 3:4 (aparece 2x)
- "Ex. 3: 2-6Atos 7:38"
- "Então a oferta de Judá e de Jerusalém será agradável ao Senhor, como nos dias antigos, e como nos primeiros anos."

### MATEUS 1:3 (aparece 2x)
- "."
- "E Judas gerou Farés e Zara de Thamar; a Farés nasceu Esrom; e Esrom gerou a Arão;"

### MATEUS 5:15 (aparece 2x)
- "Nem se acende a candeia e se coloca debaixo do alqueire, mas no velador ; e dá luz a todos que estão na casa ."
- "."

### MATEUS 5:37 (aparece 2x)
- ":"
- "Mas deixe que a sua comunicação seja , Sim, sim; Não, não; porque tudo o que é mais do que estes vem do mal ."

### MATEUS 13:15 (aparece 2x)
- "Porque o coração deste povo está endurecido , e os seus ouvidos estão surdos para ouvir , e seus olhos se fecharam ; para que em qualquer momento que não vejam com os seus olhos, e"
- ". Os servos lhe disseram: Será que você, então, que vamos arrancá-lo?"

### MATEUS 17:24 (aparece 2x)
- "."
- "E, quando chegaram a Cafarnaum, os que receberam homenagem dinheiro veio para Pedro, e disse: Será que não o seu tributo mestre de pagamento?"

### MATEUS 23:1 (aparece 2x)
- "T HEN falou Jesus à multidão, e aos seus discípulos ,"
- "."

### MATEUS 27:2 (aparece 2x)
- "E quando eles tinham ligado a Ele, eles levaram Ele distância , e entregaram a Pilatos, o governador ."
- ", e Maria, mãe de Tiago e José , e a mãe dos filhos de Zebedeu ."

### MATEUS 27:10 (aparece 2x)
- "E deu-lhes para o campo do oleiro, como o Senhor designou Me ."
- "E Jesus disse-lhe: Tu o dizes ."

### MARCOS 8:1 (aparece 2x)
- "I N esses dias a multidão sendo muito grande e que não têm nada para comer , Jesus chamou os seus discípulos para Ele , e disse-lhes:"
- ", e começou a discutir com ele , pedindo-lhe um sinal do céu, tentando-o ."

### MARCOS 9:33 (aparece 2x)
- "E Ele veio para Cafarnaum, e estar em casa Ele perguntou-lhes: O que foi que você discutindo pelo caminho?"
- "."

### MARCOS 10:1 (aparece 2x)
- "A ND Ele surgiu a partir dali , e vem para as costas da Judéia pelo lado mais distante da Jordânia : e as pessoas recorrem a Ele novamente ; e, como ele estava acostumado , Ele ens"
- "."

### LUCAS 1:4 (aparece 2x)
- "Para que você possa conhecer a verdade das coisas , no qual você tenha sido instruído ."
- ","

### LUCAS 7:6 (aparece 2x)
- "Então Jesus foi com eles. E quando Ele era agora não muito longe da casa, enviou o centurião amigos a Ele , dizendo-lhe: Senhor, não te incomodes, porque eu sou não digno de que en"
- "."

### LUCAS 9:2 (aparece 2x)
- "E enviou-os a pregar do Reino de Deus , e para curar os doentes ."
- ", Ele levou Pedro, João e Tiago, e subiu ao monte a orar ."

### LUCAS 9:34 (aparece 2x)
- "Enquanto ele ainda falava, veio uma nuvem , e cobriu; e se atemorizaram ao entrarem na nuvem ."
- "."

### LUCAS 10:15 (aparece 2x)
- "."
- "E você, Cafarnaum, que são exaltados para o Céu , serão lançados no inferno ."

### LUCAS 17:8 (aparece 2x)
- "E não lhe diga antes: ele, Prepara-me a ceia, e cinge-te, e serve-me, até que eu tenha comido e bebido; e depois você deve comer e beber?"
- "."

### LUCAS 21:29 (aparece 2x)
- "."
- "E falou-lhes uma parábola; Olhai para a figueira, e para todas as árvores ;"

### LUCAS 22:10 (aparece 2x)
- "E ele lhes disse: Eis que, quando você está entraram na cidade, haverá um homem conhecê-lo, levando um cântaro de água ; segui-o até a casa em que ele entra em . ? 11 E dirão: o do"
- "; fazei isto em memória de mim ."

### LUCAS 24:40 (aparece 2x)
- ","
- "E, havendo dito isto, mostrou-lhes Suas mãos e Seus pés ."

### JOÃO 1:13 (aparece 2x)
- "que nasceram, não do sangue , nem da vontade da carne , nem da vontade da homem , mas de Deus ."
- "."

### JOÃO 11:40 (aparece 2x)
- "."
- "Disse-lhe Jesus, disse que eu não vos que, se você crer, você verá a glória de Deus?"

### JOÃO 12:3 (aparece 2x)
- "; Marta servia, e Lázaro era um deles, que se sentou à mesa com Ele ."
- "Então Maria, tomando uma libra de bálsamo de nardo puro, muito caro , e ungiu os pés de Jesus, e os enxugou com os seus cabelos : ea casa estava cheia com o cheiro do bálsamo ."

### JOÃO 13:9 (aparece 2x)
- "Simão Pedro disse-lhe: Senhor, não somente os meus pés, mas também as minhas mãos ea minha cabeça ."
- "."

### ATOS DOS APÓSTOLOS 2:11 (aparece 2x)
- "cretenses e árabes, todos nós temos ouvido falar em nossas línguas as maravilhas de Deus ."
- ", que a sua alma não foi deixada no Inferno , nem a sua carne viu a corrupção ."

### ATOS DOS APÓSTOLOS 2:46 (aparece 2x)
- "."
- "E, perseverando unânimes todos os dias no templo , e partindo o pão de casa em casa , comiam com alegria e singeleza de coração ,"

### ATOS DOS APÓSTOLOS 7:17 (aparece 2x)
- "."
- "Mas, quando o tempo da promessa se aproximou , que Deus tinha feito a Abraão , as pessoas cresceu e se multiplicou no Egito,"

### ATOS DOS APÓSTOLOS 13:40 (aparece 2x)
- ", que são suas testemunhas para com o povo ."
- "Vede, pois, que não venha sobre vós o que está dito nos profetas ;"

### ATOS DOS APÓSTOLOS 21:30 (aparece 2x)
- ", e saudou os irmãos, ficamos com eles um dia."
- "E toda a cidade se comoveu , e houve ajuntamento do povo; e eles tomaram Paulo, e arrastaram para fora do templo : e imediatamente as portas foram fechadas ."

### ROMANOS 4:6 (aparece 2x)
- "Assim como Davi também descreve a bem-aventurança do homem , a quem Deus imputa a justiça sem as obras ,"
- ","

### ROMANOS 6:5 (aparece 2x)
- "fomos batizados na sua morte?"
- "Porque, se temos sido unidos na semelhança da sua morte , o seremos também na semelhança da Sua ressurreição :"

### ROMANOS 10:1 (aparece 2x)
- "B RETHREN, o desejo do meu coração ea oração a Deus por Israel é para que eles possam ser salvos ."
- ""

### ROMANOS 11:21 (aparece 2x)
- "Porque, se Deus não poupou os ramos naturais , tome cuidado para que Ele também não poupá-lo ."
- ", há Virá de Sião o Libertador , e desviará de Jacó as impiedades :"

### 1 CORÍNTIOS 15:15 (aparece 2x)
- "Sim, e nós também considerados como falsas testemunhas de Deus; pois testificamos de Deus, que ressuscitou a Cristo.: quem ele não ressuscitou, se é certo que os mortos não ressusc"
- ""

### 2 CORÍNTIOS 4:17 (aparece 2x)
- ""
- "Porque a nossa leve tribulação , o que é, mas por um momento , trabalha para nós cada vez mais abundantemente e eterno peso de glória ;"

### EFÉSIOS 4:6 (aparece 2x)
- "Um só Deus e Pai de todos , que é acima de tudo , e através de todos , e está em todos ."
- ", que se corrompe segundo as concupiscências do engano ;"

### EFÉSIOS 5:8 (aparece 2x)
- ""
- "Pois vocês eram, por vezes, a escuridão , mas agora está sois luz no Senhor : andai como filhos da Luz :"

### HEBREUS 2:11 (aparece 2x)
- "Pois tanto o que santifica como os que são santificados são todos de um ; por esta causa ele não se envergonha de lhes chamar irmãos ,"
- ", Ele é capaz de socorrer os que são tentados."

### HEBREUS 12:4 (aparece 2x)
- "Ainda não resististes até o sangue, combatendo contra o pecado."
- "; de que nenhuma raiz de amargura, brotando problemas você , e por ela muitos se contaminado ;"

### TIAGO 3:13 (aparece 2x)
- "Quem é o homem sábio e dotado de conhecimentos entre vós? deixá-lo mostrar a partir de uma boa conversa suas obras em mansidão de sabedoria ."
- ", Glória não , e mentira não contra a verdade."

### TIAGO 4:6 (aparece 2x)
- ", O Espírito que habita em nós anseia o ciúme?"
- "Todavia, dá maior graça. Por isso Ele disse : Deus resiste aos soberbos, mas dá graça aos humildes."

### 1 JOÃO 2:4 (aparece 2x)
- "Aquele que diz: Eu o conheço, e não guarda os seus mandamentos , é mentiroso, ea verdade não está nele."
- "; que, quando ele se manifestar , podemos ter confiança , e não sejamos confundidos por ele na sua vinda."

### 1 JOÃO 2:5 (aparece 2x)
- "Mas qualquer que guarda a Sua Palavra , nele, verdadeiramente, é o Amor de Deus aperfeiçoado : nisto conhecemos que estamos nele"
- "."

### JUDAS 1:4 (aparece 2x)
- "Porque se introduziram furtivamente certos homens desprevenidos , que já antes estavam escritos para este mesmo juízo, homens ímpios , transformando a graça de nosso Deus em libert"
- ", Ele tem reservado em prisões eternas na escuridão para o juízo do grande Dia ."

### APOCALIPSE 6:8 (aparece 2x)
- "E olhei, e eis um cavalo amarelo : e seu nome que estava assentado sobre ele tinha por Morte; eo inferno seguia com ele . E foi-lhe dada autoridade sobre a quarta parte da terra, p"
- "; e foi dito a eles, que eles deveriam descansar ainda um pouco de tempo, até que seus conservos e seus irmãos também, que devem ser mortos como eles foram , deve ser cumprida."

### APOCALIPSE 12:11 (aparece 2x)
- ", Agora é chegada a salvação, ea força, eo reino do nosso Deus , e o poder do seu Cristo :. porque já o acusador de nossos irmãos é derrubado, o qual os acusa diante do nosso Deus "
- "E eles o venceram pelo sangue do Cordeiro , e pela palavra do seu testemunho ; e não amaram as suas vidas até à morte."

### APOCALIPSE 14:6 (aparece 2x)
- ", e com Ele cento e quarenta equatro mil, tendo o nome do pai escrito em suas testas."
- "E vi outro anjo voar pelo meio do céu , e tinha o evangelho eterno, para o proclamar aos que habitam sobre a terra, ea toda a nação, e tribo, e língua, e as pessoas ,"

### APOCALIPSE 22:1 (aparece 5x)
- "A ND mostrou-me o rio puro da água da vida, claro como cristal ., que procedia do trono de Deus e do Cordeiro"
- "Aparições de Cristo após a Sua ressurreição"
- "Visões e revelações do Paulo"
- ""
- ""

### APOCALIPSE 22:2 (aparece 3x)
- "No meio da sua praça , e em ambos os lados do rio, estava lá o Árvore da Vida , que suportar doze tipos de frutos, e dando seu fruto todo mês ; e as folhas da árvore eram para a cu"
- "). Um grão amplamente cultivada na Palestina. Três formas foram cultivados: a cevada comum (Hordeum distichon) , cevada de inverno (H. hexastichon) e cevada de primavera (H. vulgar"
- ", "Poderes do mundo vindouro" ( ou seja , dos tempos do evangelho) ; As visões de João em Patmos ; ao fim do Livro Há muito tempo atrás, um carcereiro romano perguntou ao apóstolo "

### APOCALIPSE 22:3 (aparece 2x)
- "E não haverá mais maldição , mas o trono de Deus e do Cordeiro deve estar nele ; Os seus servos o servirão :"
- "aC, que a ordem dos livros foi alterado. Uma vez que a Septuaginta foi a Bíblia da Igreja cristã primitiva, sua ordem foi seguida. Assim, a maioria dos Escritos intercalados com os"

### APOCALIPSE 22:5 (aparece 2x)
- "E ali não haverá mais noite ; e não necessitarão de lâmpada nem de luz do sol; porque o Senhor Deus lhes dá luz ; e eles reinarão para sempre e sempre."
- "). (Veja .) Pedaço de prata. Equivalent da shekel de prata. Seu valor dependia de seu peso ( ; ). (Veja .) Pound ou maneh (mina). Igual a 100 dracmas de prata. O seu valor foi de c"

### APOCALIPSE 22:6 (aparece 2x)
- "E disse-me: Estas palavras são fiéis e verdadeiras : O Senhor Deus do Santo profetas enviou o seu anjo para mostrar aos seus servos, as coisas que devem acontecer em breve ."
- "). Antes deste tempo negociação foi feito pela troca de animais e de produtos agrícolas, bem como pela troca de metais. Muitas vezes, essas práticas existiram lado a lado, assim co"

### APOCALIPSE 22:7 (aparece 2x)
- "Eis que venho sem demora : bendito é ele que guarda as palavras da profecia deste livro."
- "aC; Ezequiel, Ageu e Zacarias, no século 6 aC; e Malaquias, Obadias, e Joel, no século 5 aC A data de Jonas, que completa a lista dos 15 escritos proféticos, é amplamente contestad"

### APOCALIPSE 22:12 (aparece 3x)
- "E eis que cedo venho ; eo meu galardão está comigo , para dar a cada um segundo a sua obra."
- "; ; , e muitas outras passagens). Este é libani Cedrus , o famoso cedro do Líbano, as maiores árvores com que os israelitas foram familiarizados, crescendo a alturas de"
- ") 29. Passando por Samaria, Ele converte uma mulher de ... ... ... Sicar, e através dela muitos samaritanos, quatro meses antes da colheita 30. Início de Seu ministério público na "

### APOCALIPSE 22:20 (aparece 2x)
- "Aquele que testifica estas coisas diz: Certamente cedo venho . Amém.Mesmo assim, vem, Senhor Jesus ."
- "alguns debate tem-se centrado sobre esta suposição. As cartas do Novo Testamento falam de muitas das igrejas fundadas por Paulo e revelam até mesmo detalhes íntimos e pessoais de r"

### APOCALIPSE 22:29 (aparece 3x)
- "ou 30 Segunda 8 Kislev Novembro-dezembro"
- "ou 30 3ª 9 ( ) Festa da Dedicação do Templo Dia -25th (durou 8 dias) Tebete ( ) Dezembro-janeiro 29 4 10 Shebaṭ ( ) Janeiro-fevereiro 30 Quinta 11º ( ) Fevereiro-março"
- "ou 30 6 12º Festa de Purim -14th-Dia 15 Nisan ou ABIB ( ) Março-abril 30 7 Primeiro Páscoa -14th Para 21 dias IVAR ou ZIF ( ) Abril-MAY 29 8 Segunda ( ) Maio-Junho 30 9 3ª Festas d"

---
## D. Versículos sem comentário — 5936/31143 (19.1%) (PRIORIDADE BAIXA — provavelmente normal)

A Bíblia de Estudo do Expositor não comenta todo versículo — capítulos de genealogia, listas de nomes e divisão de terras (Números, 1 Crônicas, Josué) legitimamente não têm comentário do Swaggart no original. Por isso a % alta nesses livros abaixo NÃO é necessariamente erro de extração. Só vale a pena conferir manualmente se, ao usar o app, você notar um versículo específico que devia ter comentário e não tem.

| Livro | Sem comentário | Total | % |
|---|---|---|---|
| NÚMEROS | 676 | 1287 | 53% |
| 1 CRÔNICAS | 618 | 943 | 66% |
| GENESIS | 408 | 1541 | 26% |
| JOSUÉ | 398 | 665 | 60% |
| DEUTERONÔMIO | 362 | 961 | 38% |
| JÓ | 291 | 1072 | 27% |
| LEVÍTICO | 279 | 854 | 33% |
| 1 REIS | 265 | 817 | 32% |
| 1 SAMUEL | 260 | 811 | 32% |
| JUÍZES | 252 | 617 | 41% |
| 2 SAMUEL | 252 | 699 | 36% |
| ÊXODO | 237 | 1213 | 20% |
| NEEMIAS | 223 | 407 | 55% |
| 2 CRÔNICAS | 219 | 829 | 26% |
| SALMOS | 176 | 2446 | 7% |
| 2 REIS | 160 | 724 | 22% |
| ESDRAS | 154 | 283 | 54% |
| EZEQUIEL | 131 | 1276 | 10% |
| PROVÉRBIOS | 98 | 904 | 11% |
| MATEUS | 68 | 1074 | 6% |
| JEREMIAS | 57 | 1368 | 4% |
| ESTER | 53 | 168 | 32% |
| LUCAS | 53 | 1152 | 5% |
| ISAÍAS | 40 | 1288 | 3% |
| MARCOS | 31 | 678 | 5% |
| DANIEL | 29 | 357 | 8% |
| ATOS DOS APÓSTOLOS | 29 | 1007 | 3% |
| ECLESIASTES | 21 | 222 | 9% |
| CANTARES DE SALOMÃO | 18 | 119 | 15% |
| JOÃO | 14 | 873 | 2% |
| ZACARIAS | 11 | 220 | 5% |
| ROMANOS | 7 | 433 | 2% |
| RUTE | 6 | 84 | 7% |
| 1 CORÍNTIOS | 6 | 436 | 1% |
| AMOS | 5 | 144 | 3% |
| APOCALIPSE | 5 | 431 | 1% |
| 2 CORÍNTIOS | 4 | 256 | 2% |
| HEBREUS | 4 | 305 | 1% |
| LAMENTAÇÕES DE JEREMIAS | 3 | 148 | 2% |
| GÁLATAS | 3 | 148 | 2% |
| OSÉIAS | 2 | 192 | 1% |
| EFÉSIOS | 2 | 157 | 1% |
| FILEMON | 2 | 25 | 8% |
| FILIPENSES | 1 | 104 | 1% |
| 1 TIMÓTEO | 1 | 110 | 1% |
| 2 TIMÓTEO | 1 | 83 | 1% |
| TIAGO | 1 | 110 | 1% |
| JOEL | 0 | 72 | 0% |
| OBADIAS | 0 | 22 | 0% |
| JONAS | 0 | 49 | 0% |
| MIQUÉIAS | 0 | 106 | 0% |
| NAUM | 0 | 48 | 0% |
| HABACUQUE | 0 | 56 | 0% |
| SOFONIAS | 0 | 52 | 0% |
| AGEU | 0 | 40 | 0% |
| MALAQUIAS | 0 | 58 | 0% |
| COLOSSENSES | 0 | 95 | 0% |
| 1 TESSALONICENSES | 0 | 86 | 0% |
| 2 TESSALONICENSES | 0 | 47 | 0% |
| TITO | 0 | 45 | 0% |
| 1 PEDRO | 0 | 104 | 0% |
| 2 PEDRO | 0 | 62 | 0% |
| 1 JOÃO | 0 | 107 | 0% |
| 2 JOÃO | 0 | 13 | 0% |
| 3 JOÃO | 0 | 14 | 0% |
| JUDAS | 0 | 26 | 0% |
