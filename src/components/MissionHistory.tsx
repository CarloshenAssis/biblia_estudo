import { useNavigate } from 'react-router-dom';
import type { ReadingMission } from '../types';
import { BOOK_BY_VALUE } from '../lib/books';
import styles from '../pages/MissionsPage.module.css';
import pageStyles from '../pages/PageList.module.css';

interface MissionHistoryProps {
  mission: ReadingMission;
}

/** Trilha de leitura verso a verso, interna à missão — não tem relação com o histórico geral de navegação. */
function MissionReadTrail({ mission }: MissionHistoryProps) {
  const navigate = useNavigate();

  if (mission.readHistory.length === 0) {
    return <div className={styles.historyEmpty}>Nenhuma leitura registrada nesta missão ainda.</div>;
  }

  return (
    <>
      {mission.readHistory.map((h, i) => (
        <div key={h.ref} className={pageStyles.card}>
          <div className={pageStyles.cardTop}>
            <span className={pageStyles.ref}>{h.ref}</span>
            {i === 0 && <span className={styles.historyBadge}>Última leitura</span>}
          </div>
          <p className={pageStyles.snippet}>{h.text}</p>
          <button
            className={pageStyles.resumeBtn}
            onClick={() => {
              const slug = BOOK_BY_VALUE.get(h.book)?.slug ?? h.book.toLowerCase();
              navigate(`/${slug}/${h.chapter}/${h.verse}`);
            }}
          >
            Ir para este versículo →
          </button>
        </div>
      ))}
    </>
  );
}

export function MissionHistory({ mission }: MissionHistoryProps) {
  const items = [...mission.finishedChapters].reverse();

  return (
    <>
      <div className={styles.sectionLabel}>Última leitura da missão</div>
      <div className={styles.readTrail}>
        <MissionReadTrail mission={mission} />
      </div>

      <div className={styles.sectionLabel}>Capítulos concluídos</div>
      {items.length === 0 ? (
        <div className={styles.historyEmpty}>Nenhum capítulo concluído ainda. Marque capítulos como concluídos durante a leitura.</div>
      ) : (
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
      )}
    </>
  );
}
