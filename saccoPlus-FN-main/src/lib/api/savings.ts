import apiClient from './client';

export const savingsApi = {
  getAccount:      ()                                    => apiClient.get('/savings/account'),
  deposit:         (amount: number, description?: string) => apiClient.post('/savings/deposit', { amount, description }),
  withdraw:        (amount: number, description?: string) => apiClient.post('/savings/withdraw', { amount, description }),
  getTransactions: (page = 0, size = 20, type?: string)  =>
    apiClient.get('/savings/transactions', { params: { page, size, type } }),
  getTransaction:  (id: string)                          => apiClient.get(`/savings/transactions/${id}`),
};
