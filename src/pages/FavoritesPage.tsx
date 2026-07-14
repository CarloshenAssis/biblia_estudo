import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { normalize, BOOK_BY_VALUE } from '../lib/books';
import { Header } from '../components/Header';
import styles from './PageList.module.css';

export function FavoritesPage() {
  const { favorites, removeFavorite } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query);
    return q ? favorites.filter((f) => normalize(f.ref + ' ' + f.text).includes(q)) : favorites;
  }, [favorites, query]);

  const groups = useMemo(() => {
    const byBook = new Map<string, typeof filtered>();
    filtered.forEach((f) => {
      const list = byBook.get(f.book) ?? [];
      list.push(f);
      byBook.set(f.book, list);
    });
    return Array.from(byBook.entries()).sort((a, b) => (BOOK_BY_VALUE.get(a[0])?.bookOrder ?? 0) - (BOOK_BY_VALUE.get(b[0])?.bookOrder ?? 0));
  }, [filtered]);

  const openVerse = (book: string, chapter: number, verse: number) => {
    const slug = BOOK_BY_VALUE.get(book)?.slug ?? book.toLowerCase();
    navigate(`/${slug}/${chapter}/${verse}`);
  };

  return (
    <>
      <Header variant="simple" simpleTitle="Favoritos" />
      <div className={styles.pageWrap}>
        <div className={styles.pageHeader}>
          <div className={styles.pageTitle}>Favoritos</div>
          <input
            className={styles.pageSearchInput}
            placeholder="Buscar nos favoritos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {favorites.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>☆</div>
            <div className={styles.emptyTitle}>Nenhum versículo favoritado</div>
            <div className={styles.emptyBody}>Toque na estrela ao lado de um versículo durante a leitura para salvá-lo aqui.</div>
          </div>
        )}

        {groups.map(([book, items]) => (
          <div key={book} className={styles.groupBlock}>
            <div className={styles.groupLabel}>{BOOK_BY_VALUE.get(book)?.label ?? book}</div>
            {items.map((f) => (
              <div key={f.ref} className={`${styles.card} ${styles.cardClickable}`} onClick={() => openVerse(f.book, f.chapter, f.verse)}>
                <div className={styles.cardTop}>
                  <span className={styles.ref}>{f.ref}</span>
                  <span className={styles.date}>{new Date(f.savedAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className={styles.snippet}>{f.text}</p>
                <button
                  className={styles.textBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(f.ref);
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
