import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { BOOK_BY_VALUE } from '../lib/books';
import { BookIcon } from './Icons';
import styles from '../pages/HomePage.module.css';

function formatDateLabel(ts: number): string {
  const d = new Date(ts);
  return `Lido em ${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

export function LastReadCard() {
  const { history } = useApp();
  const navigate = useNavigate();
  const last = history[0];

  const ref = last ? last.ref : 'João 3:16';
  const snippet = last ? last.text : 'Toque para começar sua leitura.';
  const dateLabel = last ? formatDateLabel(last.ts) : 'Ainda não lido';

  const handleClick = () => {
    if (last) {
      const slug = BOOK_BY_VALUE.get(last.book)?.slug ?? last.book.toLowerCase();
      navigate(`/${slug}/${last.chapter}/${last.verse}`);
    } else {
      navigate('/joao/3/16');
    }
  };

  return (
    <button className={styles.lastCard} onClick={handleClick}>
      <div className={styles.lastIconWrap}>
        <BookIcon size={20} />
      </div>
      <div className={styles.lastBody}>
        <div className={styles.lastRef}>{ref}</div>
        <p className={styles.lastSnippet}>{snippet}</p>
        <div className={styles.lastDate}>{dateLabel}</div>
      </div>
      <span className={styles.lastChevron}>›</span>
    </button>
  );
}
