import apiClient from './client';
import type { ApplyLoanRequest, RepaymentRequest, ReviewLoanRequest, LoanResponse, Loan, Installment } from '@/types';

export const loansApi = {
  apply:     (data: ApplyLoanRequest)                    => apiClient.post<LoanResponse>('/api/v1/loans/apply', data),
  repay:     (data: RepaymentRequest)                    => apiClient.post<LoanResponse>('/api/v1/loans/repay', data),
  pending:   ()                                          => apiClient.get<Loan[]>('/api/v1/loans/pending'),
  schedule:  (loanId: number)                            => apiClient.get<Installment[]>(`/api/v1/loans/${loanId}/schedule`),
  approve:   (loanId: number, data: ReviewLoanRequest)   => apiClient.post<LoanResponse>(`/api/v1/loans/${loanId}/approve`, data),
  reject:    (loanId: number, data: ReviewLoanRequest)   => apiClient.post<LoanResponse>(`/api/v1/loans/${loanId}/reject`, data),
  info:      (loanId: number, data: ReviewLoanRequest)   => apiClient.post<LoanResponse>(`/api/v1/loans/${loanId}/info`, data),
  disburse:  (loanId: number)                            => apiClient.post<LoanResponse>(`/api/v1/loans/${loanId}/disburse`),
};
