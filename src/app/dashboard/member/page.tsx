'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard }        from '@/components/shared/StatCard';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { useAppSelector }  from '@/hooks/redux';
import { Transaction }     from '@/types';

// TODO [BACKEND]: Replace MOCK_STATS with data from GET /savings/account
const MOCK_STATS = {
  balance:     125000,
  totalSaved:  340000,
  activeLoan:  50000,
  nextPayment: 8500,
};

// TODO [BACKEND]: Replace MOCK_TRANSACTIONS with data from GET /savings/transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1', type: 'DEPOSIT',    amount: 20000, status: 'COMPLETED',
    reference: 'TXN-001', description: 'Monthly savings', createdAt: '2024-05-01T10:00:00Z',
  },
  {
    id: '2', type: 'WITHDRAWAL', amount: 5000,  status: 'COMPLETED',
    reference: 'TXN-002', description: 'Emergency withdrawal', createdAt: '2024-05-03T14:30:00Z',
  },
  {
    id: '3', type: 'DEPOSIT',    amount: 15000, status: 'PENDING',
    reference: 'TXN-003', description: 'Group contribution', createdAt: '2024-05-07T09:15:00Z',
  },
];

export default function MemberDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          Welcome back, {user?.fullName ?? 'Member'} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Here&apos;s a summary of your account activity.
        </p>
      </div>

      {/* Stat cards — 1 col mobile, 2 col sm, 4 col lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Savings Balance"
          value={`RWF ${MOCK_STATS.balance.toLocaleString()}`}
          icon="💰"
          color="green"
          sub="Available balance"
        />
        <StatCard
          label="Total Saved"
          value={`RWF ${MOCK_STATS.totalSaved.toLocaleString()}`}
          icon="📈"
          color="blue"
          sub="All time deposits"
        />
        <StatCard
          label="Active Loan"
          value={`RWF ${MOCK_STATS.activeLoan.toLocaleString()}`}
          icon="🏦"
          color="yellow"
          sub="Outstanding balance"
        />
        <StatCard
          label="Next Payment"
          value={`RWF ${MOCK_STATS.nextPayment.toLocaleString()}`}
          icon="📅"
          color="red"
          sub="Due in 7 days"
        />
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800">Recent Transactions</h3>
          {/* TODO [BACKEND]: Link to full transactions page */}
          <a href="/savings" className="text-xs font-semibold hover:underline" style={{ color: '#166534' }}>
            View all →
          </a>
        </div>
        <TransactionTable transactions={MOCK_TRANSACTIONS} />
      </div>
    </DashboardLayout>
  );
}
