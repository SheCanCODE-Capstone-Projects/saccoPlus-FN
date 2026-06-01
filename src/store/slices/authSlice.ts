/**
 * store/slices/authSlice.ts
 * Redux auth slice — loginUser is mocked while backend is not ready.
 *
 * TODO: Enable login when backend JWT API is ready.
 *   1. Uncomment the real loginUser thunk body
 *   2. Remove the MOCK_USER block
 *   3. Restore the authApi import
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// TODO: Enable login when backend JWT API is ready — restore this import:
// import { authApi, LoginRequest } from '@/lib/api/auth';
import type { LoginRequest } from '@/lib/api/auth';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  accountType: string;
}

interface AuthState {
  user:    AuthUser | null;
  isAuth:  boolean;
  loading: boolean;
  error:   string | null;
}

const initialState: AuthState = {
  user:    null,
  isAuth:  false,
  loading: false,
  error:   null,
};

// TEMP: mock user returned by loginUser while backend is not ready
// TODO: Enable login when backend JWT API is ready — remove MOCK_USER
const MOCK_USER: AuthUser = {
  id:          'mock-001',
  fullName:    'Admin User',
  email:       'admin@saccoplus.rw',
  role:        'ADMIN',
  accountType: 'INDIVIDUAL',
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (_credentials: LoginRequest, { rejectWithValue }) => {
    try {
      // TODO: Enable login when backend JWT API is ready — replace mock with:
      // const { data } = await authApi.login(_credentials);
      // Cookies.set('accessToken',  data.accessToken,  { expires: 1, secure: true, sameSite: 'strict' });
      // Cookies.set('refreshToken', data.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      // return data;

      // TEMP: return mock data without hitting the API
      return { user: MOCK_USER, accessToken: '', refreshToken: '' };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  // Clears tokens — safe to keep active even without real auth
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user   = action.payload;
      state.isAuth = true;
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuth  = true;
        state.user    = payload.user;
        Cookies.set('userRole', payload.user.role, { expires: 1, secure: true, sameSite: 'strict' });
      })
      .addCase(loginUser.rejected,  (state, { payload }) => {
        state.loading = false;
        state.error   = payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user   = null;
        state.isAuth = false;
        Cookies.remove('userRole');
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
