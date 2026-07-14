import type { HistoryItem, ReadingMission, Verse } from '../types';
import { BOOKS, BOOK_BY_VALUE } from './books';

const MISSIONS_KEY = 'be_missions';
const ACTIVE_MISSION_KEY = 'be_active_mission';
const MISSION_READ_HISTORY_LIMIT = 30;

const TOTAL_CHAPTERS = BOOKS.reduce((sum, b) => sum + b.chapters, 0);

export function loadMissions(): ReadingMission[] {
  try {
    const raw = localStorage.getItem(MISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ReadingMission[];
    return parsed.map((m) => ({ ...m, readHistory: m.readHistory ?? [] }));
  } catch {
    return [];
  }
}

export function saveMissions(list: ReadingMission[]): void {
  try {
    localStorage.setItem(MISSIONS_KEY, JSON.stringify(list));
  } catch {
    /* ignora */
  }
}

export function loadActiveMissionId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_MISSION_KEY);
  } catch {
    return null;
  }
}

export function saveActiveMissionId(id: string | null): void {
  try {
    if (id) localStorage.setItem(ACTIVE_MISSION_KEY, id);
    else localStorage.removeItem(ACTIVE_MISSION_KEY);
  } catch {
    /* ignora */
  }
}

export function createMission(title: string): ReadingMission {
  return {
    id: `mission_${Date.now()}`,
    title,
    startDate: new Date().toISOString(),
    finishedBooks: [],
    finishedChapters: [],
    progress: 0,
    paused: false,
    readHistory: [],
  };
}

/**
 * Registra o versículo lido na trilha interna da missão — separada do histórico geral
 * de navegação. É o que permite retomar exatamente onde parou (ex.: no meio de Salmos 119).
 */
export function pushMissionRead(mission: ReadingMission, v: Verse): ReadingMission {
  const label = BOOK_BY_VALUE.get(v.book)?.label ?? v.book;
  const ref = `${label} ${v.chapter}:${v.verse}`;
  const entry: HistoryItem = { ref, book: v.book, book_order: v.book_order, chapter: v.chapter, verse: v.verse, text: v.text, ts: Date.now() };
  const readHistory = [entry, ...mission.readHistory.filter((h) => h.ref !== ref)].slice(0, MISSION_READ_HISTORY_LIMIT);
  return { ...mission, readHistory };
}

/** Progresso 0–100, proporcional aos 1.189 capítulos da Bíblia inteira. */
export function computeProgress(mission: ReadingMission): number {
  if (TOTAL_CHAPTERS === 0) return 0;
  return Math.round((mission.finishedChapters.length / TOTAL_CHAPTERS) * 100);
}

export function isChapterFinished(mission: ReadingMission, book: string, chapter: number): boolean {
  return mission.finishedChapters.some((c) => c.book === book && c.chapter === chapter);
}

export function isBookFinished(mission: ReadingMission, book: string): boolean {
  return mission.finishedBooks.includes(book);
}

/** Marca (ou desmarca) um capítulo como concluído; recalcula livros completos e progresso. */
export function toggleChapterFinished(mission: ReadingMission, book: string, chapter: number): ReadingMission {
  const already = isChapterFinished(mission, book, chapter);
  const finishedChapters = already
    ? mission.finishedChapters.filter((c) => !(c.book === book && c.chapter === chapter))
    : [...mission.finishedChapters, { book, chapter }];

  const bookMeta = BOOKS.find((b) => b.value === book);
  let finishedBooks = mission.finishedBooks;
  if (bookMeta) {
    const doneInBook = finishedChapters.filter((c) => c.book === book).length;
    const bookIsDone = doneInBook >= bookMeta.chapters;
    const wasDone = finishedBooks.includes(book);
    if (bookIsDone && !wasDone) finishedBooks = [...finishedBooks, book];
    else if (!bookIsDone && wasDone) finishedBooks = finishedBooks.filter((b) => b !== book);
  }

  const next: ReadingMission = { ...mission, finishedChapters, finishedBooks };
  next.progress = computeProgress(next);
  return next;
}

export function daysSince(startDate: string): number {
  const start = new Date(startDate).getTime();
  return Math.max(0, Math.floor((Date.now() - start) / 86400000));
}

export const TOTAL_BOOKS = BOOKS.length;
export { TOTAL_CHAPTERS };

export const MISSION_TEMPLATES = ['Ler a Bíblia em 1 ano', 'Novo Testamento', 'Salmos e Provérbios', 'Plano personalizado'];
