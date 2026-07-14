import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../lib/AppContext';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) {
      setError(err);
      return;
    }
    navigate('/');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <img className={styles.logoMark} src="/icons/app-icon.svg" alt="Bíblia Expositor" width={64} height={64} />
        <div className={styles.title}>Bíblia Expositor</div>
        <p className={styles.subtitle}>Entre para acessar seus favoritos, histórico e missões de leitura.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            E-mail
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              autoComplete="email"
            />
          </label>
          <label className={styles.label}>
            Senha
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.submitBtn} type="submit">
            Entrar
          </button>
        </form>

        <p className={styles.note}>Este acesso é local ao seu dispositivo — não envolve criação de conta em servidor.</p>
      </div>
    </div>
  );
}
