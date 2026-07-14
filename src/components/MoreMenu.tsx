import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { MoonIcon, SunIcon, HistoryIcon } from './Icons';
import styles from './Header.module.css';

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function MissionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M4 4v16l6-4 6 4V4z" />
    </svg>
  );
}

export function MoreMenu() {
  const navigate = useNavigate();
  const { moreOpen, closeMore, theme, toggleTheme, logout } = useApp();

  if (!moreOpen) return null;

  const go = (path: string) => {
    closeMore();
    navigate(path);
  };

  return (
    <>
      <button className={styles.backdrop} aria-label="Fechar menu" onClick={closeMore} />
      <div className={styles.sheet}>
        <div className={styles.sheetHandle} />
        <button className={styles.sheetRow} onClick={() => go('/historico')}>
          <HistoryIcon size={18} />
          Histórico de navegação
        </button>
        <button className={styles.sheetRow} onClick={() => go('/missao')}>
          <MissionIcon />
          Histórico da missão
        </button>
        <button className={styles.sheetRow} onClick={() => go('/perfil')}>
          <ProfileIcon />
          Perfil e configurações
        </button>
        <button
          className={styles.sheetRow}
          onClick={() => {
            closeMore();
            toggleTheme();
          }}
        >
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        </button>
        <button
          className={`${styles.sheetRow} ${styles.danger}`}
          onClick={() => {
            closeMore();
            logout();
            navigate('/login');
          }}
        >
          <LogoutIcon />
          Sair
        </button>
      </div>
    </>
  );
}
