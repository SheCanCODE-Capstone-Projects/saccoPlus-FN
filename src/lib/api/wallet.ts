import apiClient from './client';
import type { DepositRequest, WithdrawalRequest } from '@/types';

export const walletApi = {
  deposit:  (data: DepositRequest)    => apiClient.post<string>('/api/v1/wallet/deposit', data),
  withdraw: (data: WithdrawalRequest)  => apiClient.post<string>('/api/v1/wallet/withdraw', data),
};
