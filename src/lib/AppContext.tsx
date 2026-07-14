import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { FavoriteItem, HistoryItem, Theme, Verse } from '../types';
import { loadFavorites, loadHistory, loadTheme, saveFavorites, saveHistory, saveTheme } from './storage';
import { BOOK_BY_VALUE } from './books';

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;

  navOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;

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
}

const AppContext = createContext<AppContextValue | null>(null);

function refOf(book: string, chapter: number, verse: number): string {
  const label = BOOK_BY_VALUE.get(book)?.label ?? book;
  return `${label} ${chapter}:${verse}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => loadFavorites());
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());
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

  const openNav = useCallback(() => setNavOpen(true), []);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const toggleNav = useCallback(() => setNavOpen((v) => !v), []);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const isFavorite = useCallback(
    (ref: string) => favorites.some((f) => f.ref === ref),
    [favorites]
  );

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

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme,
      navOpen,
      openNav,
      closeNav,
      toggleNav,
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
    }),
    [
      theme, toggleTheme, navOpen, openNav, closeNav, toggleNav, searchOpen, openSearch, closeSearch,
      toast, showToast, favorites, isFavorite, toggleFavorite, removeFavorite, history, addHistory,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return ctx;
}
