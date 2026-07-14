import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { SearchIcon, StarIcon, HistoryIcon, MoonIcon, SunIcon, MenuIcon } from './Icons';
import styles from '../App.module.css';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, openSearch, toggleNav, favorites } = useApp();

  return (
    <header className={styles.topBar}>
      <button className={styles.logoWrap} onClick={() => navigate('/')} aria-label="Ir para a leitura">
        <span className={styles.logoMark}>℞</span>
        <span className={styles.logoText}>Bíblia Expositor</span>
      </button>

      <button className={styles.searchTrigger} onClick={openSearch}>
        <SearchIcon size={16} />
        <span>Buscar um versículo, tema ou palavra…</span>
      </button>

      <div className={styles.topIconRow}>
        <button
          className={`${styles.iconBtn} ${location.pathname === '/favoritos' ? styles.active : ''}`}
          onClick={() => navigate('/favoritos')}
          title="Favoritos"
        >
          <StarIcon size={19} filled={favorites.length > 0} />
        </button>
        <button
          className={`${styles.iconBtn} ${location.pathname === '/historico' ? styles.active : ''}`}
          onClick={() => navigate('/historico')}
          title="Histórico"
        >
          <HistoryIcon size={19} />
        </button>
        <button className={styles.iconBtn} onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
        </button>
        <button className={styles.iconBtn} onClick={toggleNav} title="Menu">
          <MenuIcon size={19} />
        </button>
      </div>
    </header>
  );
}
