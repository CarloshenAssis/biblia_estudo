import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { SearchIcon, StarIcon, MoonIcon, SunIcon } from './Icons';
import styles from './Header.module.css';

const LOGO_SRC = '/icons/app-icon.svg?v=6';

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

interface HeaderProps {
  variant: 'home' | 'reading' | 'simple';
  simpleTitle?: string;
  readingCrumb?: { book: string; chapter: number; verseLabel: string };
  currentFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function Header({ variant, simpleTitle, readingCrumb, currentFavorite, onToggleFavorite }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, openSearch, toggleNav, toggleMore, favorites, moreOpen } = useApp();

  const isHome = location.pathname === '/';

  return (
    <header className={styles.topBar}>
      {variant === 'home' && (
        <>
          <button className={styles.logoWrap} onClick={() => navigate('/')}>
            <img className={styles.logoMark} src={LOGO_SRC} alt="" width={32} height={32} />
            <div className={styles.logoStack}>
              <span className={styles.logoLine1}>BÍBLIA</span>
              <span className={styles.logoLine2}>EXPOSITOR</span>
            </div>
          </button>
          <nav className={styles.topNavRow}>
            <button className={`${styles.topNavBtn} ${isHome ? styles.active : ''}`} onClick={() => navigate('/')}>
              Início
            </button>
            <button className={styles.topNavBtn} onClick={() => navigate('/joao/3/16')}>
              Bíblia
            </button>
            <button className={styles.topNavBtn} onClick={() => navigate('/missao')}>
              Missão
            </button>
          </nav>
        </>
      )}

      {variant === 'reading' && readingCrumb && (
        <>
          <button className={styles.logoMarkOnly} onClick={() => navigate('/')}>
            <img src={LOGO_SRC} alt="" width={28} height={28} />
          </button>
          <button className={styles.crumbChip} onClick={toggleNav}>
            {readingCrumb.book} <span className={styles.chevInline}>⌄</span>
          </button>
          <button className={styles.crumbChip} onClick={toggleNav}>
            {readingCrumb.chapter} <span className={styles.chevInline}>⌄</span>
          </button>
          <button className={styles.crumbChip} onClick={toggleNav}>
            {readingCrumb.verseLabel} <span className={styles.chevInline}>⌄</span>
          </button>
        </>
      )}

      {variant === 'simple' && (
        <>
          <button className={styles.logoWrap} onClick={() => navigate('/')}>
            <img className={styles.logoMark} src={LOGO_SRC} alt="" width={30} height={30} />
          </button>
          <div className={styles.simpleTitle}>{simpleTitle}</div>
        </>
      )}

      <div className={styles.topIconRow}>
        {variant === 'home' && (
          <button className={styles.iconBtn} onClick={openSearch} title="Buscar">
            <SearchIcon size={18} />
          </button>
        )}
        {variant === 'home' && (
          <button
            className={`${styles.iconBtn} ${location.pathname === '/favoritos' ? styles.active : ''}`}
            onClick={() => navigate('/favoritos')}
            title="Favoritos"
          >
            <StarIcon size={18} filled={favorites.length > 0} />
          </button>
        )}
        {variant === 'reading' && (
          <button className={styles.iconBtn} onClick={onToggleFavorite} title="Favoritar">
            <StarIcon size={18} filled={!!currentFavorite} />
          </button>
        )}
        <button className={styles.iconBtn} onClick={toggleTheme} title="Tema">
          {theme === 'dark' ? <MoonIcon size={17} /> : <SunIcon size={17} />}
        </button>
        {variant !== 'simple' && (
          <button className={`${styles.iconBtn} ${moreOpen ? styles.active : ''}`} onClick={toggleMore} title="Mais">
            <MoreIcon />
          </button>
        )}
      </div>
    </header>
  );
}
