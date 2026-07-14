import { useApp } from '../lib/AppContext';
import { SearchIcon } from './Icons';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const { openSearch } = useApp();

  return (
    <button className={styles.bar} onClick={openSearch}>
      <SearchIcon size={17} />
      <span>Buscar palavra ou referência…</span>
    </button>
  );
}
