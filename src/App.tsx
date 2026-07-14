import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './lib/AppContext';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SearchOverlay } from './components/SearchOverlay';
import { Toast } from './components/Toast';
import { ReadingView } from './views/ReadingView';
import { FavoritesView } from './views/FavoritesView';
import { HistoryView } from './views/HistoryView';
import styles from './App.module.css';

const DEFAULT_PATH = '/joao/3/16';

function Shell() {
  return (
    <div className={styles.app}>
      <TopBar />
      <div className={styles.bodyRow}>
        <Sidebar />
        <main className={styles.mainArea}>
          <Routes>
            <Route path="/" element={<Navigate to={DEFAULT_PATH} replace />} />
            <Route path="/favoritos" element={<FavoritesView />} />
            <Route path="/historico" element={<HistoryView />} />
            <Route path="/:bookSlug/:chapter/:verse?" element={<ReadingView />} />
            <Route path="*" element={<Navigate to={DEFAULT_PATH} replace />} />
          </Routes>
        </main>
      </div>
      <BottomNav />
      <SearchOverlay />
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
