import apiClient from './client';

export const loansApi = {
  apply:           (data: { amount: number; durationMonths: number; purpose: string; documentUrl?: string }) =>
    apiClient.post('/loans/apply', data),
  getMyApplications: ()              => apiClient.get('/loans/my-applications'),
  getMyLoans:        ()              => apiClient.get('/loans/my-loans'),
  getSchedule:       (id: string)    => apiClient.get(`/loans/${id}/schedule`),
  repay:             (id: string, amount: number) => apiClient.post(`/loans/${id}/repay`, { amount }),
  // Loan Officer
  getPending:        (page = 0, size = 20) => apiClient.get('/loans/pending', { params: { page, size } }),
  review:            (id: string, data: { decision: 'APPROVED' | 'REJECTED' | 'INFO_REQUIRED'; comment: string }) =>
    apiClient.put(`/loans/${id}/review`, data),
  disburse:          (id: string)    => apiClient.post(`/loans/${id}/disburse`),
};
