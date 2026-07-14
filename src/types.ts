export interface Book {
  value: string; // valor usado no banco, ex: "GENESIS", "1 SAMUEL"
  label: string; // nome de exibição, ex: "Gênesis", "1 Samuel"
  slug: string; // usado na URL, ex: "genesis", "1-samuel"
  testament: 'AT' | 'NT';
  bookOrder: number;
  chapters: number;
}

export interface Verse {
  id: number;
  book: string;
  book_order: number;
  chapter: number;
  verse: number;
  text: string;
  comment: string;
}

export interface ApNote {
  id: number;
  book: string;
  book_order: number;
  chapter_start: number;
  verse_start: number;
  chapter_end: number;
  verse_end: number;
  comment: string;
}

export interface Reference {
  book: string;
  chapter: number;
  verse: number;
}

export interface FavoriteItem extends Reference {
  ref: string;
  book_order: number;
  text: string;
  savedAt: number;
}

export interface HistoryItem extends Reference {
  ref: string;
  book_order: number;
  text: string;
  ts: number;
}

export type Theme = 'light' | 'dark';
export type ViewName = 'reading' | 'favorites' | 'history';
export type CommentTab = 'expositor' | 'aplicacao';

/** Missão de leitura: opcional, progresso marcado explicitamente pelo usuário (não pelo histórico comum). */
export interface ReadingMission {
  id: string;
  title: string;
  startDate: string;
  finishedBooks: string[];
  finishedChapters: Array<{ book: string; chapter: number }>;
  progress: number;
  paused: boolean;
}

export interface AuthUser {
  email: string;
}

export interface SearchResults {
  verses: Array<{ ref: string; snippet: string; book: string; chapter: number; verse: number }>;
  comments: Array<{ ref: string; source: 'Expositor' | 'Aplicação Pessoal'; snippet: string; book: string; chapter: number; verse: number }>;
  history: Array<{ ref: string; snippet: string; book: string; chapter: number; verse: number }>;
}
