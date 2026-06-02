/**
 * hooks/useAuth.ts
 * Auth hook — login is mocked while backend is not ready.
 *
 * TODO: Reconnect login page when backend auth is ready.
 *   1. Remove MOCK_USER and isAuthenticated = true
 *   2. Uncomment the real loginUser dispatch
 *   3. Change logout redirect back to '/auth/login'
 */
import { useAppDispatch, useAppSelector } from './redux';
import { logoutUser, setUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';import Cookies from 'js-cookie';
const MOCK_USER = {
  id:       1,
  fullName: 'Admin User',
  email:    'admin@saccoplus.rw',
  role:     'ADMIN',
};

export function useAuth() {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { user, isAuth, loading, error } = useAppSelector((s) => s.auth);

  /**
   * login — MOCKED while backend is not ready.
   * TODO: Reconnect login page when backend auth is ready.
   * Replace mock block below with:
   *   const result = await dispatch(loginUser({ email, password }));
   *   if (loginUser.fulfilled.match(result)) router.push('/dashboard/admin');
   */
  const login = async (_email: string, _password: string) => {
    // TEMP: inject mock user directly into Redux store
    dispatch(setUser(MOCK_USER));
    Cookies.set('userRole', MOCK_USER.role, { expires: 1, secure: true, sameSite: 'strict' });
    router.push(MOCK_USER.role === 'ADMIN' ? '/dashboard/admin' : '/user');
  };

  /**
   * logout — clears store and redirects to dashboard (not login) while login is disabled.
   * TODO: Reconnect login page when backend is ready.
   * Change redirect to: router.push('/auth/login')
   */
  const logout = async () => {
    await dispatch(logoutUser());
    Cookies.remove('userRole');
    // TEMP: redirect to root so App Router chooses the correct next route
    router.push('/');
  };

  return {
    user,
    // TEMP: always treat as authenticated — TODO: remove when real auth is wired
    isAuth: true,
    loading,
    error,
    login,
    logout,
    clearError: () => dispatch(clearError()),
  };
}
