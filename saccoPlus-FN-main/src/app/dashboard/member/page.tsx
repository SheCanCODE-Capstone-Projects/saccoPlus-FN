'use client';
import { useQuery } from '@tanstack/react-query';
import { savingsApi } from '@/lib/api/savings';
import { loansApi }   from '@/lib/api/loans';
import { useAppSelector } from '@/hooks/redux';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard }        from '@/components/shared/StatCard';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { formatCurrency }  from '@/lib/utils/format';

export default function MemberDashboard() {
  const user = useAppSelector((s) => s.auth.user);

  const { data: account }      = useQuery({ queryKey: ['savings-account'],  queryFn: () => savingsApi.getAccount().then((r) => r.data) });
  const { data: transactions }  = useQuery({ queryKey: ['transactions'],     queryFn: () => savingsApi.getTransactions(0, 5).then((r) => r.data) });
  const { data: loans }         = useQuery({ queryKey: ['my-loans'],         queryFn: () => loansApi.getMyLoans().then((r) => r.data) });

  const activeLoans  = (loans ?? []).filter((l: any) => l.status === 'ACTIVE');
  const activeLoan   = activeLoans[0];

  return (
    <DashboardLayout title={`Welcome back, ${user?.fullName?.split(' ')[0] ?? 'Member'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Savings Balance"
          value={formatCurrency(account?.balance ?? 0)}
          icon="💰"
          color="green"
        />
        <StatCard
          label="Active Loan"
          value={activeLoan ? formatCurrency(activeLoan.outstandingBalance) : 'None'}
          icon="🏦"
          color="blue"
        />
        <StatCard
          label="Loan Status"
          value={activeLoan?.status ?? 'No active loan'}
          icon="📋"
          color="yellow"
        />
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <TransactionTable transactions={transactions?.content ?? []} />
      </div>
    </DashboardLayout>
  );
}
