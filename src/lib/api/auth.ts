import apiClient from './client';
import type { AuthResponse, RegisterRequest, UserProfile } from '@/types';

export interface LoginRequest  { email: string; password: string; }

export const authApi = {
  login:    (data: LoginRequest)           => apiClient.post<AuthResponse>('/api/auth/login', data),
  register: (data: RegisterRequest)        => apiClient.post<AuthResponse>('/api/auth/register', data),
  refresh:  (refreshToken: string)         => apiClient.post<AuthResponse>('/api/auth/refresh', { refreshToken }),
  me:       ()                             => apiClient.get<UserProfile>('/api/auth/me'),
};
