import { authApi } from '@/lib/api/auth';
import { loansApi } from '@/lib/api/loans';
import { walletApi } from '@/lib/api/wallet';
import { groupsApi } from '@/lib/api/groups';

export const authService = {
  login: (email: string, password: string) =>
    authApi.login({ email, password }),

  register: (data: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    nationalId: string;
    role?: 'MEMBER' | 'LOAN_OFFICER' | 'ADMIN';
  }) => authApi.register(data),
};

export const userService = {
  getProfile: () => authApi.me(),
};

export const walletService = {
  deposit: (userId: number, amount: number) =>
    walletApi.deposit({ userId, amount }),
  withdraw: (userId: number, amount: number) =>
    walletApi.withdraw({ userId, amount }),
};

export const loansService = {
  apply: (data: { userId: number; amount: number; duration: number; documents?: string }) =>
    loansApi.apply(data),
  getSchedule: (loanId: number) => loansApi.schedule(loanId),
  repay: (loanId: number, amount: number) =>
    loansApi.repay({ loanId, amount }),
  getPending: () => loansApi.pending(),
  approve: (loanId: number, comment: string) =>
    loansApi.approve(loanId, { comment }),
  reject: (loanId: number, comment: string) =>
    loansApi.reject(loanId, { comment }),
  info: (loanId: number, comment: string) =>
    loansApi.info(loanId, { comment }),
  disburse: (loanId: number) =>
    loansApi.disburse(loanId),
};

export const groupsService = {
  register: (data: {
    groupName: string;
    representativeFirstName: string;
    representativeLastName: string;
    representativePhone: string;
    password: string;
    members: { firstName: string; lastName: string; phoneNumber: string }[];
  }) => groupsApi.register(data),
};
