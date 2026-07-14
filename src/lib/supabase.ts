import { createClient } from '@supabase/supabase-js';
import type { ApNote, SearchResults, Verse } from '../types';
import { BOOK_BY_VALUE } from './books';

const SUPABASE_URL = 'https://hkfmhkvinuahkhdwkgwo.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZm1oa3ZpbnVhaGtoZHdrZ3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MDkzMTIsImV4cCI6MjA5OTQ4NTMxMn0.ZOUKn8iUcpVRi77ka3d3IfLJc63FPuRGhfolDI2_ESQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchVerse(book: string, chapter: number, verse: number): Promise<Verse | null> {
  const { data, error } = await supabase
    .from('verses')
    .select('*')
    .eq('book', book)
    .eq('chapter', chapter)
    .eq('verse', verse)
    .limit(1);
  if (error || !data || data.length === 0) return null;
  return data[0] as Verse;
}

export async function fetchChapterVerses(book: string, chapter: number): Promise<Verse[]> {
  const { data, error } = await supabase
    .from('verses')
    .select('*')
    .eq('book', book)
    .eq('chapter', chapter)
    .order('verse', { ascending: true });
  if (error || !data) return [];
  return data as Verse[];
}

export async function fetchApNotes(book: string, chapter: number, verse: number): Promise<ApNote[]> {
  const { data, error } = await supabase.rpc('get_ap_notes', {
    p_book: book,
    p_chapter: chapter,
    p_verse: verse,
  });
  if (error || !data) return [];
  return data as ApNote[];
}

export async function fetchAdjacentVerse(
  bookOrder: number,
  chapter: number,
  verse: number,
  direction: 'next' | 'prev'
): Promise<Verse | null> {
  if (direction === 'next') {
    let { data } = await supabase
      .from('verses')
      .select('*')
      .eq('book_order', bookOrder)
      .eq('chapter', chapter)
      .gt('verse', verse)
      .order('verse', { ascending: true })
      .limit(1);
    if (data && data.length) return data[0] as Verse;

    ({ data } = await supabase
      .from('verses')
      .select('*')
      .eq('book_order', bookOrder)
      .gt('chapter', chapter)
      .order('chapter', { ascending: true })
      .order('verse', { ascending: true })
      .limit(1));
    if (data && data.length) return data[0] as Verse;

    ({ data } = await supabase
      .from('verses')
      .select('*')
      .gt('book_order', bookOrder)
      .order('book_order', { ascending: true })
      .order('chapter', { ascending: true })
      .order('verse', { ascending: true })
      .limit(1));
    return data && data.length ? (data[0] as Verse) : null;
  }

  let { data } = await supabase
    .from('verses')
    .select('*')
    .eq('book_order', bookOrder)
    .eq('chapter', chapter)
    .lt('verse', verse)
    .order('verse', { ascending: false })
    .limit(1);
  if (data && data.length) return data[0] as Verse;

  ({ data } = await supabase
    .from('verses')
    .select('*')
    .eq('book_order', bookOrder)
    .lt('chapter', chapter)
    .order('chapter', { ascending: false })
    .order('verse', { ascending: false })
    .limit(1));
  if (data && data.length) return data[0] as Verse;

  ({ data } = await supabase
    .from('verses')
    .select('*')
    .lt('book_order', bookOrder)
    .order('book_order', { ascending: false })
    .order('chapter', { ascending: false })
    .order('verse', { ascending: false })
    .limit(1));
  return data && data.length ? (data[0] as Verse) : null;
}

function refLabel(book: string, chapter: number, verse: number): string {
  const label = BOOK_BY_VALUE.get(book)?.label ?? book;
  return `${label} ${chapter}:${verse}`;
}

export async function runSearch(query: string): Promise<SearchResults> {
  const q = query.trim();
  const empty: SearchResults = { verses: [], comments: [], history: [] };
  if (!q) return empty;

  const [{ data: verseRows }, { data: expRows }, { data: apRows }] = await Promise.all([
    supabase.rpc('search_verse_text', { query: q }),
    supabase.rpc('search_expositor_comments', { query: q }),
    supabase.rpc('search_ap_comments', { query: q }),
  ]);

  const verses = (verseRows ?? []).map((r: Verse) => ({
    ref: refLabel(r.book, r.chapter, r.verse),
    snippet: r.text,
    book: r.book,
    chapter: r.chapter,
    verse: r.verse,
  }));

  const comments = [
    ...(expRows ?? []).map((r: Verse) => ({
      ref: refLabel(r.book, r.chapter, r.verse),
      source: 'Expositor' as const,
      snippet: r.comment,
      book: r.book,
      chapter: r.chapter,
      verse: r.verse,
    })),
    ...(apRows ?? []).map((r: ApNote) => ({
      ref: refLabel(r.book, r.chapter_start, r.verse_start),
      source: 'Aplicação Pessoal' as const,
      snippet: r.comment,
      book: r.book,
      chapter: r.chapter_start,
      verse: r.verse_start,
    })),
  ];

  return { verses, comments, history: [] };
}
