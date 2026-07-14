import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { runSearch } from '../lib/supabase';
import { BOOK_BY_VALUE } from '../lib/books';
import { normalize } from '../lib/books';
import type { SearchResults } from '../types';
import { SearchIcon } from './Icons';
import styles from './SearchOverlay.module.css';

const EMPTY: SearchResults = { verses: [], comments: [], history: [] };

export function SearchOverlay() {
  const { searchOpen, closeSearch, history } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setResults(EMPTY);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [searchOpen]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!q) {
      setResults(EMPTY);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const remote = await runSearch(q);
      const nq = normalize(q);
      const historyMatches = history
        .filter((h) => normalize(h.ref + ' ' + h.text).includes(nq))
        .map((h) => ({ ref: h.ref, snippet: h.text, book: h.book, chapter: h.chapter, verse: h.verse }));
      setResults({ ...remote, history: historyMatches });
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [query, history]);

  if (!searchOpen) return null;

  function goTo(book: string, chapter: number, verse: number, tab?: 'expositor' | 'aplicacao') {
    closeSearch();
    const slug = BOOK_BY_VALUE.get(book)?.slug ?? book.toLowerCase();
    navigate(`/${slug}/${chapter}/${verse}`, { state: tab ? { commentTab: tab } : undefined });
  }

  const hasVerses = results.verses.length > 0;
  const hasComments = results.comments.length > 0;
  const hasHistory = results.history.length > 0;
  const noResults = normalize(query) !== '' && !hasVerses && !hasComments && !hasHistory;

  return (
    <div className={styles.overlay} onClick={closeSearch}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <SearchIcon size={18} />
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Ex.: João 3:16, jo 3:16, romanos 8, amor, fé…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={closeSearch}>
            Fechar
          </button>
        </div>

        <div className={styles.resultsWrap}>
          {hasVerses && (
            <>
              <div className={styles.sectionLabel}>Versículos</div>
              {results.verses.map((r, i) => (
                <button key={`v-${i}`} className={styles.resultRow} onClick={() => goTo(r.book, r.chapter, r.verse)}>
                  <span className={styles.resultRef}>{r.ref}</span>
                  <p className={styles.resultSnippet}>{r.snippet}</p>
                </button>
              ))}
            </>
          )}

          {hasComments && (
            <>
              <div className={styles.sectionLabel}>Comentários</div>
              {results.comments.map((r, i) => (
                <button
                  key={`c-${i}`}
                  className={styles.resultRow}
                  onClick={() => goTo(r.book, r.chapter, r.verse, r.source === 'Expositor' ? 'expositor' : 'aplicacao')}
                >
                  <span className={styles.resultRef}>
                    {r.ref} · {r.source}
                  </span>
                  <p className={styles.resultSnippet}>{r.snippet}</p>
                </button>
              ))}
            </>
          )}

          {hasHistory && (
            <>
              <div className={styles.sectionLabel}>Histórico recente</div>
              {results.history.map((r, i) => (
                <button key={`h-${i}`} className={styles.resultRow} onClick={() => goTo(r.book, r.chapter, r.verse)}>
                  <span className={styles.resultRef}>{r.ref}</span>
                  <p className={styles.resultSnippet}>{r.snippet}</p>
                </button>
              ))}
            </>
          )}

          {noResults && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⌕</div>
              <div className={styles.emptyTitle}>Nenhum resultado encontrado</div>
              <div className={styles.emptyBody}>Tente "João 3:16", "salmos 23" ou uma palavra como "amor".</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
