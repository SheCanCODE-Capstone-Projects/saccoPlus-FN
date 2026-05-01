'use client';
/**
 * context/AuthContext.tsx
 * Provides auth state (user, loading, error) and helpers (login, logout)
 * to the entire component tree.
 *
 * TODO [BACKEND]: On app load, call GET /user/profile with the stored token
 * to rehydrate the user session (see useEffect below).
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, logout as logoutService, isAuthenticated } from '@/services/auth';
import { userService } from '@/services/api';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  accountType: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  // TODO [BACKEND]: Rehydrate session on mount — fetch profile if token exists
  useEffect(() => {
    if (!isAuthenticated()) { setLoading(false); return; }
    userService.getProfile()
      .then(({ data }) => setUser(data))
      .catch(() => { /* token expired — silently clear */ })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginService(email, password);
      setUser(userData);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    logoutService();
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, isAuth: !!user, loading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — use inside any client component */
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
