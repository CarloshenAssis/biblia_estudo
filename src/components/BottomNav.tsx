import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { BookIcon, StarIcon } from './Icons';
import styles from '../App.module.css';

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { moreOpen, toggleMore, favorites } = useApp();

  const isHome = location.pathname === '/';
  const isReading = !isHome && location.pathname !== '/favoritos' && location.pathname !== '/historico' && location.pathname !== '/missao' && location.pathname !== '/perfil';

  return (
    <nav className={styles.bottomNav} aria-label="Navegação principal">
      <button className={`${styles.bnBtn} ${isHome ? styles.active : ''}`} onClick={() => navigate('/')}>
        <HomeIcon />
        <span>Início</span>
      </button>
      <button className={`${styles.bnBtn} ${isReading ? styles.active : ''}`} onClick={() => navigate('/joao/3/16')}>
        <BookIcon size={18} />
        <span>Bíblia</span>
      </button>
      <button className={`${styles.bnBtn} ${location.pathname === '/favoritos' ? styles.active : ''}`} onClick={() => navigate('/favoritos')}>
        <StarIcon size={18} filled={favorites.length > 0} />
        <span>Favoritos</span>
      </button>
      <button className={`${styles.bnBtn} ${moreOpen ? styles.active : ''}`} onClick={toggleMore}>
        <MoreIcon />
        <span>Mais</span>
      </button>
    </nav>
  );
}
