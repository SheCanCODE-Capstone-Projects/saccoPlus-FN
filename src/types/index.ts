// ─── Auth ──────────────────────────────────────────────────────────────────
export type UserRole = 'MEMBER' | 'LOAN_OFFICER' | 'ADMIN';

export interface AuthResponse {
  accessToken:  string;
  refreshToken: string;
  tokenType:    string;
  userId:       number;
  email:        string;
  fullName:     string;
  role:         string;
}

export interface RegisterRequest {
  fullName:    string;
  email:       string;
  password:    string;
  phoneNumber: string;
  nationalId:  string;
  role?:       UserRole;
}

export interface LoginRequest {
  email:    string;
  password: string;
}

export interface UserProfile {
  userId:      number;
  email:       string;
  fullName:    string;
  phoneNumber: string;
  role:        string;
  active:      boolean;
}

// ─── Wallet ────────────────────────────────────────────────────────────────
export interface Wallet {
  id:      number;
  balance: number;
}

export interface DepositRequest {
  userId: number;
  amount: number;
}

export interface WithdrawalRequest {
  userId: number;
  amount: number;
}

// ─── Loan ──────────────────────────────────────────────────────────────────
export type LoanStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'INFO_REQUIRED'
  | 'DISBURSED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'DEFAULTED';

export interface ApplyLoanRequest {
  userId:    number;
  amount:    number;
  duration:  number;
  documents?: string;
}

export interface RepaymentRequest {
  loanId: number;
  amount: number;
}

export interface ReviewLoanRequest {
  comment: string;
}

export interface LoanResponse {
  message:          string;
  amount:           number;
  remainingBalance: number;
  status:           LoanStatus;
}

export interface IndividualUser {
  id:        number;
  firstName: string;
  lastName:  string;
  phoneNumber: string;
  role:      UserRole;
  wallet:    Wallet;
}

export interface Loan {
  id:               number;
  amount:           number;
  duration:         number;
  interestRate:     number;
  remainingBalance: number;
  documents?:       string;
  officerComment?:  string;
  status:           LoanStatus;
  user:             IndividualUser;
}

export interface Installment {
  id:                number;
  installmentNumber: number;
  dueDate:           string;
  principal:         number;
  interest:          number;
  totalAmount:       number;
  remainingBalance:  number;
  paymentStatus:     'PAID' | 'UNPAID';
  loan:              Loan;
}

// ─── Group ─────────────────────────────────────────────────────────────────
export interface MemberDto {
  firstName: string;
  lastName:  string;
  phoneNumber: string;
}

export interface RegisterGroupRequest {
  groupName:               string;
  representativeFirstName: string;
  representativeLastName:  string;
  representativePhone:     string;
  password:                string;
  members:                 MemberDto[];
}

// ─── UI types (not in API, used by components) ─────────────────────────────
export interface Transaction {
  id:          string;
  type:        'DEPOSIT' | 'WITHDRAWAL';
  amount:      number;
  status:      'PENDING' | 'COMPLETED' | 'FAILED';
  reference:   string;
  description: string;
  createdAt:   string;
}

export interface ApiError {
  message:   string;
  status:    number;
  timestamp: string;
}
