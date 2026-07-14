import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../lib/books';
import type { Book } from '../types';
import { useApp } from '../lib/AppContext';
import styles from '../App.module.css';

function BookRow({ book, isOpen, onToggle }: { book: Book; isOpen: boolean; onToggle: () => void }) {
  const navigate = useNavigate();
  const { closeNav } = useApp();
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <div>
      <button className={`${styles.bookRow} ${isOpen ? styles.open : ''}`} onClick={onToggle}>
        <span>{book.label}</span>
        <span className={`${styles.bookChevron} ${isOpen ? styles.open : ''}`}>›</span>
      </button>
      {isOpen && (
        <div className={styles.chapterGrid}>
          {chapters.map((n) => (
            <button
              key={n}
              className={`${styles.chapterChip} ${styles.available}`}
              onClick={() => {
                navigate(`/${book.slug}/${n}/1`);
                closeNav();
              }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { navOpen, closeNav } = useApp();
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const atBooks = BOOKS.filter((b) => b.testament === 'AT');
  const ntBooks = BOOKS.filter((b) => b.testament === 'NT');

  const toggle = (name: string) => setExpandedBook((prev) => (prev === name ? null : name));

  return (
    <>
      {navOpen && <button className={styles.backdrop} aria-label="Fechar menu" onClick={closeNav} />}
      <nav className={`${styles.sidebar} ${navOpen ? styles.open : ''}`} aria-label="Navegação bíblica">
        <div className={styles.sidebarHeaderRow}>
          <div className={styles.sidebarHeader}>Navegação bíblica</div>
          <button className={styles.sidebarClose} onClick={closeNav} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className={styles.testamentLabel}>Antigo Testamento</div>
        {atBooks.map((b) => (
          <BookRow key={b.value} book={b} isOpen={expandedBook === b.value} onToggle={() => toggle(b.value)} />
        ))}

        <div className={styles.testamentLabel}>Novo Testamento</div>
        {ntBooks.map((b) => (
          <BookRow key={b.value} book={b} isOpen={expandedBook === b.value} onToggle={() => toggle(b.value)} />
        ))}
      </nav>
    </>
  );
}
