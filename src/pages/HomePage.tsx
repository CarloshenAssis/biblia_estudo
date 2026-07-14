import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { LastReadCard } from '../components/LastReadCard';
import { ReadingMissionCard } from '../components/ReadingMissionCard';
import { QuickActions } from '../components/QuickActions';
import { useApp } from '../lib/AppContext';
import styles from './HomePage.module.css';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia!';
  if (h < 18) return 'Boa tarde!';
  return 'Boa noite!';
}

export function HomePage() {
  const { activeMission } = useApp();

  return (
    <>
      <Header variant="home" />
      <div className={styles.wrap}>
        <div className={styles.greeting}>{greeting()} 👋</div>
        <div className={styles.greetingSub}>Que a Palavra de Deus ilumine o seu dia.</div>

        <SearchBar />

        <div className={styles.sectionLabel}>Último versículo lido</div>
        <LastReadCard />

        <div className={styles.sectionLabel}>{activeMission ? `Sua missão: ${activeMission.title}` : 'Missão de leitura'}</div>
        <ReadingMissionCard />

        <div className={styles.sectionLabel}>Acesso rápido</div>
        <QuickActions />
      </div>
    </>
  );
}
