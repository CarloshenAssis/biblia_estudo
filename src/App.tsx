import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './lib/AppContext';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SearchOverlay } from './components/SearchOverlay';
import { MoreMenu } from './components/MoreMenu';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ReaderPage } from './pages/ReaderPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HistoryPage } from './pages/HistoryPage';
import { MissionsPage } from './pages/MissionsPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import styles from './App.module.css';

function Shell() {
  const { authUser } = useApp();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  if (!authUser && !isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.app}>
      <div className={styles.bodyRow}>
        {!isLogin && <Sidebar />}
        <main className={styles.mainArea}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/missao" element={<MissionsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/:bookSlug/:chapter/:verse?" element={<ReaderPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      {!isLogin && <BottomNav />}
      {!isLogin && <SearchOverlay />}
      {!isLogin && <MoreMenu />}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Shell />
      </AppProvider>
    </BrowserRouter>
  );
}
