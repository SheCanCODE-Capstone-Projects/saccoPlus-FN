/**
 * services/api.ts
 * Central API service — all HTTP calls go through here.
 * TODO [BACKEND]: Ensure NEXT_PUBLIC_API_URL is set in .env.local
 */
import apiClient from '@/lib/api/client';

// ─── Auth ────────────────────────────────────────────────────────────────────
// TODO [BACKEND]: POST /auth/login        → { accessToken, refreshToken, user }
// TODO [BACKEND]: POST /auth/register/individual
// TODO [BACKEND]: POST /auth/register/group
// TODO [BACKEND]: POST /auth/refresh      → { accessToken }
// TODO [BACKEND]: POST /auth/forgot-password
// TODO [BACKEND]: POST /auth/reset-password

export const authService = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  registerIndividual: (data: {
    fullName: string;
    nationalId: string;
    phone: string;
    password: string;
    accountType: 'INDIVIDUAL';
  }) => apiClient.post('/auth/register/individual', data),

  registerGroup: (data: {
    groupName: string;
    representativeName: string;
    representativeNationalId: string;
    phone: string;
    password: string;
    members: { name: string; nationalId: string; phone: string }[];
    accountType: 'GROUP';
  }) => apiClient.post('/auth/register/group', data),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password }),
};

// ─── User ────────────────────────────────────────────────────────────────────
// TODO [BACKEND]: GET /user/profile → User object

export const userService = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data: Partial<{ fullName: string; phone: string }>) =>
    apiClient.put('/user/profile', data),
};

// ─── Savings ─────────────────────────────────────────────────────────────────
// TODO [BACKEND]: GET  /savings/account
// TODO [BACKEND]: POST /savings/deposit
// TODO [BACKEND]: POST /savings/withdraw
// TODO [BACKEND]: GET  /savings/transactions

export const savingsService = {
  getAccount: () => apiClient.get('/savings/account'),
  deposit: (amount: number, description?: string) =>
    apiClient.post('/savings/deposit', { amount, description }),
  withdraw: (amount: number, description?: string) =>
    apiClient.post('/savings/withdraw', { amount, description }),
  getTransactions: (page = 0, size = 20, type?: string) =>
    apiClient.get('/savings/transactions', { params: { page, size, type } }),
};

// ─── Loans ───────────────────────────────────────────────────────────────────
// TODO [BACKEND]: POST /loans/apply
// TODO [BACKEND]: GET  /loans/my-applications
// TODO [BACKEND]: GET  /loans/my-loans
// TODO [BACKEND]: GET  /loans/:id/schedule
// TODO [BACKEND]: POST /loans/:id/repay

export const loansService = {
  apply: (data: {
    amount: number;
    durationMonths: number;
    purpose: string;
    documentUrl?: string;
  }) => apiClient.post('/loans/apply', data),
  getMyApplications: () => apiClient.get('/loans/my-applications'),
  getMyLoans: () => apiClient.get('/loans/my-loans'),
  getSchedule: (id: string) => apiClient.get(`/loans/${id}/schedule`),
  repay: (id: string, amount: number) =>
    apiClient.post(`/loans/${id}/repay`, { amount }),
};
