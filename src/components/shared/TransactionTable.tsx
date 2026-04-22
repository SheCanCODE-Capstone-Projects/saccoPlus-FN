import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils/format';

const statusColors: Record<string, string> = {
  COMPLETED: 'bg-green-100 text-green-700',
  PENDING:   'bg-yellow-100 text-yellow-700',
  FAILED:    'bg-red-100 text-red-700',
};

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (!transactions.length) {
    return <p className="text-gray-400 text-sm text-center py-8">No transactions yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Reference</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="py-3 text-gray-600">{formatDate(tx.createdAt)}</td>
              <td className="py-3">
                <span className={tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}>
                  {tx.type === 'DEPOSIT' ? '↑ Deposit' : '↓ Withdrawal'}
                </span>
              </td>
              <td className={`py-3 font-medium ${tx.type === 'DEPOSIT' ? 'text-green-700' : 'text-red-700'}`}>
                {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(tx.amount)}
              </td>
              <td className="py-3 text-gray-500 font-mono text-xs">{tx.reference}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[tx.status]}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
