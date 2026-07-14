import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, FavoriteItem, HistoryItem, ReadingMission, Theme, Verse } from '../types';
import { loadFavorites, loadHistory, loadTheme, saveFavorites, saveHistory, saveTheme } from './storage';
import { loadAuthUser, saveAuthUser, validateLogin } from './auth';
import {
  createMission,
  loadActiveMissionId,
  loadMissions,
  pushMissionRead,
  saveActiveMissionId,
  saveMissions,
  toggleChapterFinished as toggleChapterFinishedImpl,
} from './missions';
import { BOOK_BY_VALUE } from './books';

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;

  navOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;

  moreOpen: boolean;
  toggleMore: () => void;
  closeMore: () => void;

  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  toast: string | null;
  showToast: (msg: string) => void;

  favorites: FavoriteItem[];
  isFavorite: (ref: string) => boolean;
  toggleFavorite: (v: Verse) => void;
  removeFavorite: (ref: string) => void;

  history: HistoryItem[];
  addHistory: (v: Verse) => void;
  markMissionRead: (v: Verse) => void;

  authUser: AuthUser | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;

  missions: ReadingMission[];
  activeMission: ReadingMission | null;
  startMission: (title: string) => void;
  pauseOrResumeMission: () => void;
  restartMission: () => void;
  toggleChapterFinished: (book: string, chapter: number) => void;
  isChapterMarked: (book: string, chapter: number) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

function refOf(book: string, chapter: number, verse: number): string {
  const label = BOOK_BY_VALUE.get(book)?.label ?? book;
  return `${label} ${chapter}:${verse}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());
  const [navOpen, setNavOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => loadFavorites());
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => loadAuthUser());
  const [missions, setMissions] = useState<ReadingMission[]>(() => loadMissions());
  const [activeMissionId, setActiveMissionIdState] = useState<string | null>(() => loadActiveMissionId());
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      saveTheme(next);
      return next;
    });
  }, []);

  const openNav = useCallback(() => {
    setNavOpen(true);
    setMoreOpen(false);
  }, []);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const toggleNav = useCallback(() => {
    setNavOpen((v) => !v);
    setMoreOpen(false);
  }, []);

  const toggleMore = useCallback(() => {
    setMoreOpen((v) => !v);
    setNavOpen(false);
  }, []);
  const closeMore = useCallback(() => setMoreOpen(false), []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const isFavorite = useCallback((ref: string) => favorites.some((f) => f.ref === ref), [favorites]);

  const toggleFavorite = useCallback(
    (v: Verse) => {
      const ref = refOf(v.book, v.chapter, v.verse);
      setFavorites((prev) => {
        const exists = prev.some((f) => f.ref === ref);
        let next: FavoriteItem[];
        if (exists) {
          next = prev.filter((f) => f.ref !== ref);
          showToast('Removido dos favoritos');
        } else {
          next = [
            { ref, book: v.book, book_order: v.book_order, chapter: v.chapter, verse: v.verse, text: v.text, savedAt: Date.now() },
            ...prev,
          ];
          showToast('Adicionado aos favoritos');
        }
        saveFavorites(next);
        return next;
      });
    },
    [showToast]
  );

  const removeFavorite = useCallback((ref: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.ref !== ref);
      saveFavorites(next);
      return next;
    });
  }, []);

  const addHistory = useCallback((v: Verse) => {
    const ref = refOf(v.book, v.chapter, v.verse);
    setHistory((prev) => {
      const next = [
        { ref, book: v.book, book_order: v.book_order, chapter: v.chapter, verse: v.verse, text: v.text, ts: Date.now() },
        ...prev.filter((h) => h.ref !== ref),
      ].slice(0, 12);
      saveHistory(next);
      return next;
    });
  }, []);

  const login = useCallback((email: string, password: string): string | null => {
    const error = validateLogin(email, password);
    if (error) return error;
    const user: AuthUser = { email: email.trim() };
    saveAuthUser(user);
    setAuthUser(user);
    return null;
  }, []);

  const logout = useCallback(() => {
    saveAuthUser(null);
    setAuthUser(null);
  }, []);

  const activeMission = useMemo(
    () => missions.find((m) => m.id === activeMissionId) ?? null,
    [missions, activeMissionId]
  );

  const startMission = useCallback((title: string) => {
    const mission = createMission(title);
    setMissions((prev) => {
      const next = [...prev, mission];
      saveMissions(next);
      return next;
    });
    setActiveMissionIdState(mission.id);
    saveActiveMissionId(mission.id);
    showToast(`Nova missão: ${title}`);
  }, [showToast]);

  const updateActiveMission = useCallback(
    (updater: (m: ReadingMission) => ReadingMission) => {
      if (!activeMissionId) return;
      setMissions((prev) => {
        const next = prev.map((m) => (m.id === activeMissionId ? updater(m) : m));
        saveMissions(next);
        return next;
      });
    },
    [activeMissionId]
  );

  const markMissionRead = useCallback(
    (v: Verse) => {
      if (!activeMission || activeMission.paused) return;
      updateActiveMission((m) => pushMissionRead(m, v));
    },
    [activeMission, updateActiveMission]
  );

  const pauseOrResumeMission = useCallback(() => {
    if (!activeMission) return;
    const nextPaused = !activeMission.paused;
    updateActiveMission((m) => ({ ...m, paused: nextPaused }));
    showToast(nextPaused ? 'Missão pausada' : 'Missão retomada');
  }, [activeMission, updateActiveMission, showToast]);

  const restartMission = useCallback(() => {
    if (!activeMission) return;
    updateActiveMission((m) => ({
      ...m,
      startDate: new Date().toISOString(),
      finishedBooks: [],
      finishedChapters: [],
      progress: 0,
      paused: false,
      readHistory: [],
    }));
    showToast('Missão reiniciada');
  }, [activeMission, updateActiveMission, showToast]);

  const toggleChapterFinished = useCallback(
    (book: string, chapter: number) => {
      if (!activeMission) return;
      updateActiveMission((m) => toggleChapterFinishedImpl(m, book, chapter));
    },
    [activeMission, updateActiveMission]
  );

  const isChapterMarked = useCallback(
    (book: string, chapter: number) =>
      !!activeMission && activeMission.finishedChapters.some((c) => c.book === book && c.chapter === chapter),
    [activeMission]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme,
      navOpen,
      openNav,
      closeNav,
      toggleNav,
      moreOpen,
      toggleMore,
      closeMore,
      searchOpen,
      openSearch,
      closeSearch,
      toast,
      showToast,
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      history,
      addHistory,
      markMissionRead,
      authUser,
      login,
      logout,
      missions,
      activeMission,
      startMission,
      pauseOrResumeMission,
      restartMission,
      toggleChapterFinished,
      isChapterMarked,
    }),
    [
      theme, toggleTheme, navOpen, openNav, closeNav, toggleNav, moreOpen, toggleMore, closeMore,
      searchOpen, openSearch, closeSearch,
      toast, showToast, favorites, isFavorite, toggleFavorite, removeFavorite, history, addHistory, markMissionRead,
      authUser, login, logout, missions, activeMission, startMission, pauseOrResumeMission, restartMission,
      toggleChapterFinished, isChapterMarked,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return ctx;
}
