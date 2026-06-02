import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { mockLogin, delay } from '@/lib/mockData';

interface AuthUser {
  id:       number;
  fullName: string;
  email:    string;
  role:     string;
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

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      await delay(800);
      const data = mockLogin(credentials.email, credentials.password);
      Cookies.set('accessToken',  data.accessToken,  { expires: 1, secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', data.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
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
        state.user    = { id: payload.userId, fullName: payload.fullName, email: payload.email, role: payload.role };
        Cookies.set('userRole', payload.role, { expires: 1, secure: true, sameSite: 'strict' });
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
