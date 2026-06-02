import Cookies from 'js-cookie';
import { authService } from './api';
import type { AuthResponse } from '@/types';

const ACCESS_TOKEN_KEY  = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/** Store tokens after a successful login response */
export function storeTokens(accessToken: string, refreshToken: string) {
  Cookies.set(ACCESS_TOKEN_KEY,  accessToken,  { expires: 1, secure: true, sameSite: 'strict' });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
}

/** Read the current access token (used by axios interceptor) */
export function getToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

/** Remove all auth tokens (call on logout) */
export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await authService.login(email, password);
  storeTokens(data.accessToken, data.refreshToken);
  return data;
}

export function logout() {
  clearTokens();
  window.location.href = '/auth/login';
}

/** Returns true if a token is currently stored */
export function isAuthenticated(): boolean {
  return !!getToken();
}
