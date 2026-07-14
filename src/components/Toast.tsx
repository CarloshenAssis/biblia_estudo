import { useApp } from '../lib/AppContext';
import styles from './Toast.module.css';

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className={styles.toast} role="status">
      {toast}
    </div>
  );
}
