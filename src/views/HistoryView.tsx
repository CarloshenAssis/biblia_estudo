import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { BOOK_BY_VALUE } from '../lib/books';
import styles from './PageList.module.css';

export function HistoryView() {
  const { history } = useApp();
  const navigate = useNavigate();

  const openVerse = (book: string, chapter: number, verse: number) => {
    const slug = BOOK_BY_VALUE.get(book)?.slug ?? book.toLowerCase();
    navigate(`/${slug}/${chapter}/${verse}`);
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitle}>Histórico de leitura</div>
      </div>

      {history.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>◔</div>
          <div className={styles.emptyTitle}>Ainda sem histórico</div>
          <div className={styles.emptyBody}>Os versículos que você ler aparecerão aqui para você retomar o estudo.</div>
        </div>
      )}

      {history.map((h) => (
        <div key={h.ref} className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.ref}>{h.ref}</span>
            <span className={styles.date}>{new Date(h.ts).toLocaleDateString('pt-BR')}</span>
          </div>
          <p className={styles.snippet}>{h.text}</p>
          <button className={styles.resumeBtn} onClick={() => openVerse(h.book, h.chapter, h.verse)}>
            Continuar leitura →
          </button>
        </div>
      ))}
    </div>
  );
}
