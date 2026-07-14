import type { AuthUser } from '../types';

const AUTH_KEY = 'be_auth';

/**
 * Gate local (sem backend) — mesmo nível de fidelidade do protótipo: valida
 * formato de e-mail/senha e guarda a sessão no localStorage. Não é
 * autenticação real (sem verificação de credencial, sem Supabase Auth).
 * Ver relatorio_redesign_v2.md para a decisão e como evoluir pra login real.
 */
export function loadAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function saveAuthUser(user: AuthUser | null): void {
  try {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignora */
  }
}

export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password.trim()) return 'Preencha e-mail e senha para continuar.';
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) return 'Informe um e-mail válido.';
  return null;
}
