export const MOCK_USERS = {
  admin: {
    id: 1,
    fullName: 'Admin User',
    email: 'admin@saccoplus.rw',
    password: 'admin123',
    role: 'ADMIN',
    phoneNumber: '+250788000001',
    nationalId: '1198000000000000',
    active: true,
  },
  member: {
    id: 2,
    fullName: 'Jean Claude',
    email: 'member@saccoplus.rw',
    password: 'member123',
    role: 'MEMBER',
    phoneNumber: '+250788000002',
    nationalId: '1198000000000001',
    active: true,
  },
  loanOfficer: {
    id: 3,
    fullName: 'Alice Kagame',
    email: 'officer@saccoplus.rw',
    password: 'officer123',
    role: 'LOAN_OFFICER',
    phoneNumber: '+250788000003',
    nationalId: '1198000000000002',
    active: true,
  },
} as const;

export const MOCK_CREDENTIALS: Record<string, { id: number; fullName: string; email: string; role: string }> = {
  'admin@saccoplus.rw': { id: 1, fullName: 'Admin User', email: 'admin@saccoplus.rw', role: 'ADMIN' },
  'member@saccoplus.rw': { id: 2, fullName: 'Jean Claude', email: 'member@saccoplus.rw', role: 'MEMBER' },
  'officer@saccoplus.rw': { id: 3, fullName: 'Alice Kagame', email: 'officer@saccoplus.rw', role: 'LOAN_OFFICER' },
};

export function mockLogin(identifier: string, _password: string) {
  const knownUser =
    MOCK_CREDENTIALS[identifier] ??
    Object.values(MOCK_USERS).find(
      (u) => u.phoneNumber === identifier || u.nationalId === identifier
    );
  if (knownUser) {
    return {
      userId: knownUser.id,
      fullName: knownUser.fullName,
      email: knownUser.email,
      role: knownUser.role,
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
    };
  }
  return {
    userId: 2,
    fullName: 'Jean Claude',
    email: identifier,
    role: 'MEMBER' as const,
    accessToken: 'mock-access-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
  };
}

export function mockRegister(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
}) {
  return {
    userId: Math.floor(Math.random() * 10000) + 10,
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    nationalId: data.nationalId,
    role: 'MEMBER' as const,
    message: 'Account created successfully! Please log in.',
  };
}

export function mockGroupRegister(data: {
  groupName: string;
  representativeFirstName: string;
  representativeLastName: string;
  representativePhone: string;
  members: { firstName: string; lastName: string; phoneNumber: string }[];
}) {
  return {
    groupId: Math.floor(Math.random() * 10000) + 10,
    groupName: data.groupName,
    representativeName: `${data.representativeFirstName} ${data.representativeLastName}`,
    memberCount: data.members.length + 1,
    message: 'Group account created successfully! Please log in.',
  };
}

export function mockLoanApplication(data: {
  amount: number;
  duration: number;
  purpose: string;
}) {
  const id = 'LN-' + Date.now().toString(36).toUpperCase();
  const monthly = Math.round((data.amount * 0.125 / 12) / (1 - Math.pow(1 + 0.125 / 12, -data.duration)));
  return {
    loanId: id,
    amount: data.amount,
    duration: data.duration,
    purpose: data.purpose,
    monthlyInstalment: monthly,
    status: 'Pending' as const,
    message: 'Loan application submitted successfully!',
  };
}

export function mockWithdraw(_userId: number, amount: number) {
  return {
    transactionId: 'TXN-' + Date.now().toString(36).toUpperCase(),
    amount,
    netAmount: amount - Math.min(Math.round(amount * 0.01), 500),
    fee: Math.min(Math.round(amount * 0.01), 500),
    status: 'Success' as const,
    message: 'Withdrawal request submitted successfully!',
  };
}

export function mockGetProfile(userId: number) {
  const user = Object.values(MOCK_USERS).find((u) => u.id === userId) ?? MOCK_USERS.member;
  return {
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    active: user.active,
  };
}

export function delay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
