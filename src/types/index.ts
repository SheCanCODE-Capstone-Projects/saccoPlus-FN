export type UserRole = 'MEMBER' | 'GROUP_MEMBER' | 'GROUP_LEADER' | 'LOAN_OFFICER' | 'ADMIN';
export type AccountType = 'INDIVIDUAL' | 'GROUP';

export interface User {
  id:          string;
  fullName:    string;
  email:       string;
  phone:       string;
  nationalId:  string;
  role:        UserRole;
  accountType: AccountType;
  isActive:    boolean;
  createdAt:   string;
}

export type TransactionType   = 'DEPOSIT' | 'WITHDRAWAL';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Transaction {
  id:          string;
  type:        TransactionType;
  amount:      number;
  status:      TransactionStatus;
  reference:   string;
  description: string;
  createdAt:   string;
}

export interface SavingsAccount {
  id:        string;
  userId:    string;
  balance:   number;
  createdAt: string;
}

export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'INFO_REQUIRED' | 'DISBURSED';

export interface LoanApplication {
  id:              string;
  applicantId:     string;
  applicantName:   string;
  amount:          number;
  durationMonths:  number;
  purpose:         string;
  documentUrl?:    string;
  status:          LoanStatus;
  reviewedBy?:     string;
  reviewerComment?: string;
  createdAt:       string;
  reviewedAt?:     string;
}

export interface LoanInstallment {
  installmentNumber: number;
  dueDate:           string;
  principalAmount:   number;
  interestAmount:    number;
  totalAmount:       number;
  paidAmount:        number;
  status:            'PENDING' | 'PAID' | 'LATE' | 'PARTIAL';
}

export interface Loan {
  id:                 string;
  applicationId:      string;
  principal:          number;
  interestRate:       number;
  totalAmount:        number;
  outstandingBalance: number;
  status:             'ACTIVE' | 'PAID_OFF' | 'DEFAULTED';
  disbursedAt:        string;
  installments:       LoanInstallment[];
}

export interface Group {
  id:                    string;
  name:                  string;
  leaderId:              string;
  payoutModel:           'ROTATIONAL' | 'POOLED';
  contributionAmount:    number;
  contributionFrequency: 'WEEKLY' | 'MONTHLY';
  walletBalance:         number;
  isActive:              boolean;
  members:               GroupMember[];
}

export interface GroupMember {
  userId:       string;
  fullName:     string;
  joinedAt:     string;
  payoutOrder:  number;
}

export interface ApiError {
  message:   string;
  status:    number;
  timestamp: string;
}

export interface PageResponse<T> {
  content:       T[];
  totalElements: number;
  totalPages:    number;
  size:          number;
  number:        number;
}
