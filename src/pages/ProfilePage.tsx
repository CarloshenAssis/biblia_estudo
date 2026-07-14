import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import { Header } from '../components/Header';
import { MoonIcon, SunIcon } from '../components/Icons';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { authUser, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();

  const initial = authUser?.email.charAt(0).toUpperCase() ?? '?';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Header variant="simple" simpleTitle="Perfil" />
      <div className={styles.wrap}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>{initial}</div>
          <div className={styles.email}>{authUser?.email}</div>
        </div>

        <div className={styles.sectionLabel}>Preferências</div>
        <div className={styles.settingsList}>
          <button className={styles.settingRow} onClick={toggleTheme}>
            <span>Tema {theme === 'dark' ? 'escuro' : 'claro'}</span>
            {theme === 'dark' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
          <div className={styles.settingRow}>
            <span>Notificações de leitura</span>
            <span className={styles.settingStub}>Em breve</span>
          </div>
          <div className={styles.settingRow}>
            <span>Tamanho da fonte</span>
            <span className={styles.settingStub}>Em breve</span>
          </div>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    </>
  );
}
