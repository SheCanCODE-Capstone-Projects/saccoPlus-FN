import apiClient from './client';

export interface LoginRequest  { email: string; password: string; }
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: { id: string; fullName: string; email: string; role: string; accountType: string; };
}

export interface RegisterIndividualRequest {
  fullName: string; nationalId: string; email: string; phone: string; password: string;
}

export interface RegisterGroupRequest {
  groupName: string; representativeName: string; representativeNationalId: string;
  representativeEmail: string; phone: string; password: string;
  members: { name: string; nationalId: string; phone: string }[];
}

export const authApi = {
  login:              (data: LoginRequest)               => apiClient.post<LoginResponse>('/auth/login', data),
  registerIndividual: (data: RegisterIndividualRequest)  => apiClient.post('/auth/register/individual', data),
  registerGroup:      (data: RegisterGroupRequest)       => apiClient.post('/auth/register/group', data),
  refresh:            (refreshToken: string)             => apiClient.post('/auth/refresh', { refreshToken }),
  forgotPassword:     (email: string)                    => apiClient.post('/auth/forgot-password', { email }),
  resetPassword:      (token: string, password: string)  => apiClient.post('/auth/reset-password', { token, password }),
};
