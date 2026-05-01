/**
 * hooks/useAuth.ts
 * Convenience hook — exposes auth state and actions.
 * Uses Redux store (authSlice) as the source of truth for user/loading/error.
 *
 * Usage:
 *   const { user, isAuth, loading, error, login, logout } = useAuth();
 */
import { useAppDispatch, useAppSelector } from './redux';
import { loginUser, logoutUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router   = useRouter();
  const { user, isAuth, loading, error } = useAppSelector((s) => s.auth);

  // TODO [BACKEND]: login dispatches loginUser thunk → POST /auth/login
  const login = async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      router.push('/dashboard/member');
    }
  };

  // TODO [BACKEND]: logout dispatches logoutUser thunk → clears cookies
  const logout = async () => {
    await dispatch(logoutUser());
    router.push('/auth/login');
  };

  return {
    user,
    isAuth,
    loading,
    error,
    login,
    logout,
    clearError: () => dispatch(clearError()),
  };
}
