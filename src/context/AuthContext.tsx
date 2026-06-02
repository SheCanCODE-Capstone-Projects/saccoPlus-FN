'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logout as logoutService, isAuthenticated } from '@/services/auth';
import { mockLogin, mockGetProfile, delay } from '@/lib/mockData';

interface AuthUser {
  id:          number;
  fullName:    string;
  email:       string;
  phoneNumber: string;
  role:        string;
  active:      boolean;
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

  useEffect(() => {
    if (!isAuthenticated()) { setLoading(false); return; }
    delay(300).then(() => {
      const profile = mockGetProfile(1);
      setUser({
        id: profile.userId,
        fullName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        role: profile.role,
        active: profile.active,
      });
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await delay(600);
      const authData = mockLogin(email, password);
      setUser({
        id:          authData.userId,
        fullName:    authData.fullName,
        email:       authData.email,
        phoneNumber: '',
        role:        authData.role,
        active:      true,
      });
    } catch (err: any) {
      setError(err.message ?? 'Login failed. Please try again.');
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

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
