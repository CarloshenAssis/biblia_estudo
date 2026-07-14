import type { Book } from '../types';

// value/label/slug/testament/chapters — chapters conferidos contra a tabela `verses` real.
const RAW: Array<[string, string, string, 'AT' | 'NT', number]> = [
  ['GENESIS', 'Gênesis', 'genesis', 'AT', 50],
  ['ÊXODO', 'Êxodo', 'exodo', 'AT', 40],
  ['LEVÍTICO', 'Levítico', 'levitico', 'AT', 27],
  ['NÚMEROS', 'Números', 'numeros', 'AT', 36],
  ['DEUTERONÔMIO', 'Deuteronômio', 'deuteronomio', 'AT', 34],
  ['JOSUÉ', 'Josué', 'josue', 'AT', 24],
  ['JUÍZES', 'Juízes', 'juizes', 'AT', 21],
  ['RUTE', 'Rute', 'rute', 'AT', 4],
  ['1 SAMUEL', '1 Samuel', '1-samuel', 'AT', 31],
  ['2 SAMUEL', '2 Samuel', '2-samuel', 'AT', 24],
  ['1 REIS', '1 Reis', '1-reis', 'AT', 22],
  ['2 REIS', '2 Reis', '2-reis', 'AT', 25],
  ['1 CRÔNICAS', '1 Crônicas', '1-cronicas', 'AT', 29],
  ['2 CRÔNICAS', '2 Crônicas', '2-cronicas', 'AT', 36],
  ['ESDRAS', 'Esdras', 'esdras', 'AT', 10],
  ['NEEMIAS', 'Neemias', 'neemias', 'AT', 13],
  ['ESTER', 'Ester', 'ester', 'AT', 10],
  ['JÓ', 'Jó', 'jo', 'AT', 42],
  ['SALMOS', 'Salmos', 'salmos', 'AT', 150],
  ['PROVÉRBIOS', 'Provérbios', 'proverbios', 'AT', 31],
  ['ECLESIASTES', 'Eclesiastes', 'eclesiastes', 'AT', 12],
  ['CANTARES DE SALOMÃO', 'Cantares de Salomão', 'cantares-de-salomao', 'AT', 8],
  ['ISAÍAS', 'Isaías', 'isaias', 'AT', 66],
  ['JEREMIAS', 'Jeremias', 'jeremias', 'AT', 52],
  ['LAMENTAÇÕES DE JEREMIAS', 'Lamentações de Jeremias', 'lamentacoes-de-jeremias', 'AT', 5],
  ['EZEQUIEL', 'Ezequiel', 'ezequiel', 'AT', 48],
  ['DANIEL', 'Daniel', 'daniel', 'AT', 12],
  ['OSÉIAS', 'Oséias', 'oseias', 'AT', 14],
  ['JOEL', 'Joel', 'joel', 'AT', 3],
  ['AMOS', 'Amós', 'amos', 'AT', 9],
  ['OBADIAS', 'Obadias', 'obadias', 'AT', 1],
  ['JONAS', 'Jonas', 'jonas', 'AT', 4],
  ['MIQUÉIAS', 'Miquéias', 'miqueias', 'AT', 7],
  ['NAUM', 'Naum', 'naum', 'AT', 3],
  ['HABACUQUE', 'Habacuque', 'habacuque', 'AT', 3],
  ['SOFONIAS', 'Sofonias', 'sofonias', 'AT', 3],
  ['AGEU', 'Ageu', 'ageu', 'AT', 2],
  ['ZACARIAS', 'Zacarias', 'zacarias', 'AT', 14],
  ['MALAQUIAS', 'Malaquias', 'malaquias', 'AT', 4],
  ['MATEUS', 'Mateus', 'mateus', 'NT', 28],
  ['MARCOS', 'Marcos', 'marcos', 'NT', 16],
  ['LUCAS', 'Lucas', 'lucas', 'NT', 24],
  ['JOÃO', 'João', 'joao', 'NT', 21],
  ['ATOS DOS APÓSTOLOS', 'Atos dos Apóstolos', 'atos', 'NT', 28],
  ['ROMANOS', 'Romanos', 'romanos', 'NT', 16],
  ['1 CORÍNTIOS', '1 Coríntios', '1-corintios', 'NT', 16],
  ['2 CORÍNTIOS', '2 Coríntios', '2-corintios', 'NT', 13],
  ['GÁLATAS', 'Gálatas', 'galatas', 'NT', 6],
  ['EFÉSIOS', 'Efésios', 'efesios', 'NT', 6],
  ['FILIPENSES', 'Filipenses', 'filipenses', 'NT', 4],
  ['COLOSSENSES', 'Colossenses', 'colossenses', 'NT', 4],
  ['1 TESSALONICENSES', '1 Tessalonicenses', '1-tessalonicenses', 'NT', 5],
  ['2 TESSALONICENSES', '2 Tessalonicenses', '2-tessalonicenses', 'NT', 3],
  ['1 TIMÓTEO', '1 Timóteo', '1-timoteo', 'NT', 6],
  ['2 TIMÓTEO', '2 Timóteo', '2-timoteo', 'NT', 4],
  ['TITO', 'Tito', 'tito', 'NT', 3],
  ['FILEMON', 'Filemom', 'filemom', 'NT', 1],
  ['HEBREUS', 'Hebreus', 'hebreus', 'NT', 13],
  ['TIAGO', 'Tiago', 'tiago', 'NT', 5],
  ['1 PEDRO', '1 Pedro', '1-pedro', 'NT', 5],
  ['2 PEDRO', '2 Pedro', '2-pedro', 'NT', 3],
  ['1 JOÃO', '1 João', '1-joao', 'NT', 5],
  ['2 JOÃO', '2 João', '2-joao', 'NT', 1],
  ['3 JOÃO', '3 João', '3-joao', 'NT', 1],
  ['JUDAS', 'Judas', 'judas', 'NT', 1],
  ['APOCALIPSE', 'Apocalipse', 'apocalipse', 'NT', 22],
];

export const BOOKS: Book[] = RAW.map(([value, label, slug, testament, chapters], i) => ({
  value,
  label,
  slug,
  testament,
  bookOrder: i,
  chapters,
}));

export const BOOK_BY_VALUE = new Map(BOOKS.map((b) => [b.value, b]));
export const BOOK_BY_SLUG = new Map(BOOKS.map((b) => [b.slug, b]));

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

// apelidos -> value do banco (chaves já normalizadas, sem acento)
const ALIASES: Record<string, string> = {
  genesis: 'GENESIS', gn: 'GENESIS',
  exodo: 'ÊXODO', ex: 'ÊXODO',
  levitico: 'LEVÍTICO', lv: 'LEVÍTICO',
  numeros: 'NÚMEROS', nm: 'NÚMEROS',
  deuteronomio: 'DEUTERONÔMIO', dt: 'DEUTERONÔMIO',
  josue: 'JOSUÉ', js: 'JOSUÉ',
  juizes: 'JUÍZES', jz: 'JUÍZES',
  rute: 'RUTE', rt: 'RUTE',
  '1samuel': '1 SAMUEL', '1 samuel': '1 SAMUEL', '1sm': '1 SAMUEL',
  '2samuel': '2 SAMUEL', '2 samuel': '2 SAMUEL', '2sm': '2 SAMUEL',
  '1reis': '1 REIS', '1 reis': '1 REIS', '1rs': '1 REIS',
  '2reis': '2 REIS', '2 reis': '2 REIS', '2rs': '2 REIS',
  '1cronicas': '1 CRÔNICAS', '1 cronicas': '1 CRÔNICAS', '1cr': '1 CRÔNICAS',
  '2cronicas': '2 CRÔNICAS', '2 cronicas': '2 CRÔNICAS', '2cr': '2 CRÔNICAS',
  esdras: 'ESDRAS', ed: 'ESDRAS',
  neemias: 'NEEMIAS', ne: 'NEEMIAS',
  ester: 'ESTER', et: 'ESTER',
  jo: 'JÓ', job: 'JÓ',
  salmos: 'SALMOS', sl: 'SALMOS', salmo: 'SALMOS',
  proverbios: 'PROVÉRBIOS', pv: 'PROVÉRBIOS',
  eclesiastes: 'ECLESIASTES', ec: 'ECLESIASTES',
  cantares: 'CANTARES DE SALOMÃO', 'cantares de salomao': 'CANTARES DE SALOMÃO', ct: 'CANTARES DE SALOMÃO',
  isaias: 'ISAÍAS', is: 'ISAÍAS',
  jeremias: 'JEREMIAS', jr: 'JEREMIAS',
  lamentacoes: 'LAMENTAÇÕES DE JEREMIAS', lm: 'LAMENTAÇÕES DE JEREMIAS',
  ezequiel: 'EZEQUIEL', ez: 'EZEQUIEL',
  daniel: 'DANIEL', dn: 'DANIEL',
  oseias: 'OSÉIAS', os: 'OSÉIAS',
  joel: 'JOEL', jl: 'JOEL',
  amos: 'AMOS', am: 'AMOS',
  obadias: 'OBADIAS', ob: 'OBADIAS',
  jonas: 'JONAS', jn: 'JONAS',
  miqueias: 'MIQUÉIAS', mq: 'MIQUÉIAS',
  naum: 'NAUM', na: 'NAUM',
  habacuque: 'HABACUQUE', hc: 'HABACUQUE',
  sofonias: 'SOFONIAS', sf: 'SOFONIAS',
  ageu: 'AGEU', ag: 'AGEU',
  zacarias: 'ZACARIAS', zc: 'ZACARIAS',
  malaquias: 'MALAQUIAS', ml: 'MALAQUIAS',
  mateus: 'MATEUS', mt: 'MATEUS',
  marcos: 'MARCOS', mc: 'MARCOS',
  lucas: 'LUCAS', lc: 'LUCAS',
  joao: 'JOÃO',
  atos: 'ATOS DOS APÓSTOLOS', at: 'ATOS DOS APÓSTOLOS',
  romanos: 'ROMANOS', rm: 'ROMANOS',
  '1corintios': '1 CORÍNTIOS', '1 corintios': '1 CORÍNTIOS', '1co': '1 CORÍNTIOS',
  '2corintios': '2 CORÍNTIOS', '2 corintios': '2 CORÍNTIOS', '2co': '2 CORÍNTIOS',
  galatas: 'GÁLATAS', gl: 'GÁLATAS',
  efesios: 'EFÉSIOS', ef: 'EFÉSIOS',
  filipenses: 'FILIPENSES', fp: 'FILIPENSES',
  colossenses: 'COLOSSENSES', cl: 'COLOSSENSES',
  '1tessalonicenses': '1 TESSALONICENSES', '1ts': '1 TESSALONICENSES',
  '2tessalonicenses': '2 TESSALONICENSES', '2ts': '2 TESSALONICENSES',
  '1timoteo': '1 TIMÓTEO', '1 timoteo': '1 TIMÓTEO', '1tm': '1 TIMÓTEO',
  '2timoteo': '2 TIMÓTEO', '2 timoteo': '2 TIMÓTEO', '2tm': '2 TIMÓTEO',
  tito: 'TITO',
  filemon: 'FILEMON', filemom: 'FILEMON', fm: 'FILEMON',
  hebreus: 'HEBREUS', hb: 'HEBREUS',
  tiago: 'TIAGO', tg: 'TIAGO',
  '1pedro': '1 PEDRO', '1pe': '1 PEDRO',
  '2pedro': '2 PEDRO', '2pe': '2 PEDRO',
  '1joao': '1 JOÃO', '1jo': '1 JOÃO',
  '2joao': '2 JOÃO', '2jo': '2 JOÃO',
  '3joao': '3 JOÃO', '3jo': '3 JOÃO',
  judas: 'JUDAS', jd: 'JUDAS',
  apocalipse: 'APOCALIPSE', ap: 'APOCALIPSE',
};

export interface ParsedReference {
  book: string;
  chapter: number;
  verse: number | null;
}

/** Interpreta "João 3:16", "jo 3:16", "1 samuel 2", "romanos 8" etc. */
export function parseReference(query: string): ParsedReference | null {
  const m = query.trim().match(/^(\d?\s?[a-zA-ZÀ-ú çãõéíóáâêôü]+)\s+(\d+)(?::(\d+))?$/i);
  if (!m) return null;
  const bookRaw = normalize(m[1].trim().replace(/\s+/g, ' '));
  const bookKey = bookRaw.replace(/\s/g, '');
  const book = ALIASES[bookRaw] || ALIASES[bookKey];
  if (!book) return null;
  return { book, chapter: parseInt(m[2], 10), verse: m[3] ? parseInt(m[3], 10) : null };
}

export { normalize };
