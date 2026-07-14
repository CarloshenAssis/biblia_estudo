import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { BookIcon, SearchIcon, StarIcon, HistoryIcon, MenuIcon } from './Icons';
import styles from '../App.module.css';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { navOpen, toggleNav, openSearch, searchOpen, favorites } = useApp();

  const isReading = location.pathname !== '/favoritos' && location.pathname !== '/historico';

  return (
    <nav className={styles.bottomNav} aria-label="Navegação principal">
      <button className={`${styles.bnBtn} ${isReading ? styles.active : ''}`} onClick={() => navigate('/')}>
        <BookIcon size={18} />
        <span>Ler</span>
      </button>
      <button className={`${styles.bnBtn} ${searchOpen ? styles.active : ''}`} onClick={openSearch}>
        <SearchIcon size={18} />
        <span>Buscar</span>
      </button>
      <button className={`${styles.bnBtn} ${location.pathname === '/favoritos' ? styles.active : ''}`} onClick={() => navigate('/favoritos')}>
        <StarIcon size={18} filled={favorites.length > 0} />
        <span>Favoritos</span>
      </button>
      <button className={`${styles.bnBtn} ${location.pathname === '/historico' ? styles.active : ''}`} onClick={() => navigate('/historico')}>
        <HistoryIcon size={18} />
        <span>Histórico</span>
      </button>
      <button className={`${styles.bnBtn} ${navOpen ? styles.active : ''}`} onClick={toggleNav}>
        <MenuIcon size={18} />
        <span>Menu</span>
      </button>
    </nav>
  );
}
