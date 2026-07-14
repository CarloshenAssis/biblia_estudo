import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { SearchIcon, StarIcon, HistoryIcon } from './Icons';
import styles from '../pages/HomePage.module.css';

function NavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function QuickActions() {
  const navigate = useNavigate();
  const { toggleNav, openSearch, favorites } = useApp();

  return (
    <div className={styles.quickGrid}>
      <button className={styles.quickTile} onClick={toggleNav}>
        <NavIcon />
        <span>Navegação Bíblica</span>
      </button>
      <button className={styles.quickTile} onClick={openSearch}>
        <SearchIcon size={20} />
        <span>Buscar</span>
      </button>
      <button className={styles.quickTile} onClick={() => navigate('/favoritos')}>
        <StarIcon size={20} filled={favorites.length > 0} />
        <span>Favoritos</span>
      </button>
      <button className={styles.quickTile} onClick={() => navigate('/historico')}>
        <HistoryIcon size={20} />
        <span>Histórico</span>
      </button>
    </div>
  );
}
