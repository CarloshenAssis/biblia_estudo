import { Header } from '../components/Header';
import { ReadingHistory } from '../components/ReadingHistory';
import styles from './PageList.module.css';

export function HistoryPage() {
  return (
    <>
      <Header variant="simple" simpleTitle="Histórico" />
      <div className={styles.pageWrap}>
        <div className={styles.pageHeader}>
          <div className={styles.pageTitle}>Histórico de leitura</div>
        </div>
        <ReadingHistory />
      </div>
    </>
  );
}
