import type { ReadingMission } from '../types';
import { BOOK_BY_VALUE } from '../lib/books';
import styles from '../pages/MissionsPage.module.css';

interface MissionHistoryProps {
  mission: ReadingMission;
}

export function MissionHistory({ mission }: MissionHistoryProps) {
  const items = [...mission.finishedChapters].reverse();

  if (items.length === 0) {
    return <div className={styles.historyEmpty}>Nenhum capítulo concluído ainda. Marque capítulos como concluídos durante a leitura.</div>;
  }

  return (
    <div className={styles.historyList}>
      {items.map((c, i) => {
        const label = BOOK_BY_VALUE.get(c.book)?.label ?? c.book;
        const bookDone = mission.finishedBooks.includes(c.book);
        return (
          <div key={`${c.book}-${c.chapter}-${i}`} className={styles.historyRow}>
            <span className={styles.historyRef}>
              {label} {c.chapter}
            </span>
            {bookDone && <span className={styles.historyBadge}>Livro completo</span>}
          </div>
        );
      })}
    </div>
  );
}
