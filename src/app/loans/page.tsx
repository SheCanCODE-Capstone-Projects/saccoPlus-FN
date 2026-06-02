'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plus,
  Send,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';

/* ─── Types ─── */
type LoanStatus = 'Active' | 'Pending' | 'Completed' | 'Rejected';

interface Loan {
  id: string;
  purpose: string;
  amount: number;
  amountRepaid: number;
  monthlyInstalment: number;
  nextDueDate: string;
  startDate: string;
  duration: number;         // months
  status: LoanStatus;
  ref: string;
}

/* ─── Mock data ─── */
const mockLoans: Loan[] = [
  {
    id: '1',
    purpose: 'Business Expansion',
    amount: 1250000,
    amountRepaid: 875000,
    monthlyInstalment: 45000,
    nextDueDate: 'Nov 02, 2024',
    startDate: 'Jan 2024',
    duration: 24,
    status: 'Active',
    ref: 'LN-2024-00421',
  },
  {
    id: '2',
    purpose: 'Agriculture',
    amount: 500000,
    amountRepaid: 500000,
    monthlyInstalment: 28500,
    nextDueDate: '—',
    startDate: 'Jun 2023',
    duration: 18,
    status: 'Completed',
    ref: 'LN-2023-00219',
  },
  {
    id: '3',
    purpose: 'School Fees',
    amount: 300000,
    amountRepaid: 0,
    monthlyInstalment: 26000,
    nextDueDate: '—',
    startDate: '—',
    duration: 12,
    status: 'Pending',
    ref: 'LN-2024-00538',
  },
];

/* ─── Helpers ─── */
function fmtRwf(n: number) {
  return Math.round(n).toLocaleString('fr-RW').replace(/,/g, ' ');
}

const statusStyles: Record<LoanStatus, { pill: string; dot: string; label: string }> = {
  Active:    { pill: 'bg-[#e8f7ee] text-[#0f6f29]',  dot: 'bg-[#0f6f29]',  label: 'Active'    },
  Pending:   { pill: 'bg-[#e9f2ff] text-[#1d6fcb]',  dot: 'bg-[#1d6fcb]',  label: 'Pending'   },
  Completed: { pill: 'bg-[#e8efe1] text-[#4b5947]',  dot: 'bg-[#4b5947]',  label: 'Completed' },
  Rejected:  { pill: 'bg-[#fff0ef] text-[#e12626]',  dot: 'bg-[#e12626]',  label: 'Rejected'  },
};

const navItems = [
  { label: 'Dashboard',    icon: LayoutDashboard, href: '/dashboard/member' },
  { label: 'Transactions', icon: Send,             href: '/transactions'     },
  { label: 'Groups',       icon: Users,            href: '/groups'           },
  { label: 'Loans',        icon: CreditCard,       href: '/loans'            },
  { label: 'Reports',      icon: BarChart3,        href: '/reports'          },
  { label: 'Settings',     icon: Settings,         href: '/settings'         },
];

/* ─── Page ─── */
export default function LoansPage() {
  const [loans] = useState<Loan[]>(mockLoans);

  const activeLoans    = loans.filter((l) => l.status === 'Active');
  const hasLoans       = loans.length > 0;

  const totalBorrowed  = loans.reduce((s, l) => s + l.amount, 0);
  const totalRepaid    = loans.reduce((s, l) => s + l.amountRepaid, 0);
  const activeBalance  = activeLoans.reduce((s, l) => s + (l.amount - l.amountRepaid), 0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8ee] text-[#20271f]">
      <div className="flex min-h-screen w-full flex-col border border-[#dfe6d7] lg:flex-row">

        {/* ── Sidebar ── */}
        <aside className="flex w-full shrink-0 flex-col border-b border-[#e0e7d8] bg-[#eef4e8] lg:w-[250px] lg:border-b-0 lg:border-r">
          <div className="flex h-14 items-center px-4 sm:px-6 lg:h-16">
            <span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">SACCOPlus</span>
          </div>
          <div className="hidden px-7 pt-8 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#879181]">Member Portal</p>
            <p className="mt-1 text-[12px] font-bold text-[#0f6f29]">Community Growth</p>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:mt-8 lg:block lg:space-y-2 lg:px-5 lg:pb-0">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-10 shrink-0 items-center gap-3 rounded-[8px] px-3 text-[13px] font-semibold transition hover:bg-white hover:text-[#0f6f29] hover:shadow-sm lg:w-full ${
                  item.label === 'Loans'
                    ? 'bg-white text-[#0f6f29] shadow-sm'
                    : 'text-[#3f493e]'
                }`}
              >
                <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto hidden border-t border-[#dfe7d9] px-6 py-7 lg:block">
            <Link href="#" className="flex h-9 items-center gap-3 text-[13px] font-medium text-[#3f493e]">
              <LifeBuoy className="h-[16px] w-[16px]" /> Support
            </Link>
            <Link href="/auth/login" className="mt-2 flex h-9 items-center gap-3 text-[13px] font-medium text-[#3f493e]">
              <LogOut className="h-[16px] w-[16px]" /> Log Out
            </Link>
          </div>
        </aside>

        {/* ── Main ── */}
        <section className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-[#e0e7d8] bg-[#f9fbf3]/90 px-4 py-3 backdrop-blur md:px-9">
            <span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">SACCOPlus</span>
            <div className="flex items-center gap-4 text-[#596256]">
              <Bell className="h-[17px] w-[17px]" />
              <CircleHelp className="h-[17px] w-[17px]" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#172118] text-xs font-bold text-white">JC</div>
            </div>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-[940px]">

              {/* Page header */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
                    Credit / <span className="text-[#0f6f29]">Loans</span>
                  </p>
                  <h1 className="mt-2 text-[28px] font-extrabold leading-tight tracking-[-0.03em] text-[#1f251e] sm:text-[32px]">
                    Loan Center
                  </h1>
                  <p className="mt-2 max-w-md text-[13px] leading-5 text-[#596256]">
                    Review your active loans, repayment progress, and credit history.
                  </p>
                </div>
                <Link
                  href="/loans/apply"
                  className="flex shrink-0 items-center gap-2 rounded-[10px] bg-[#0f6f29] px-5 py-3 text-[13px] font-extrabold text-white shadow-[0_10px_20px_rgba(15,111,41,0.22)] transition hover:bg-[#0d5f23] active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  Apply for a Loan
                </Link>
              </div>

              {/* ── Summary cards ── */}
              {hasLoans && (
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <SummaryCard
                    label="Active Balance"
                    value={`${fmtRwf(activeBalance)} RWF`}
                    note={`${activeLoans.length} active loan${activeLoans.length !== 1 ? 's' : ''}`}
                    accent
                  />
                  <SummaryCard
                    label="Total Borrowed"
                    value={`${fmtRwf(totalBorrowed)} RWF`}
                    note="Across all loan cycles"
                  />
                  <SummaryCard
                    label="Total Repaid"
                    value={`${fmtRwf(totalRepaid)} RWF`}
                    note={`${Math.round((totalRepaid / totalBorrowed) * 100)}% of all loans`}
                  />
                </div>
              )}

              {/* ── Loan list or empty state ── */}
              {hasLoans ? (
                <div className="space-y-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#899384]">
                    Loan History
                  </p>
                  {loans.map((loan) => (
                    <LoanCard key={loan.id} loan={loan} />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}

              {/* Footer */}
              <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#dfe7d9] py-6 text-[11px] text-[#9aa397] md:flex-row md:items-end">
                <div>
                  <p className="text-[13px] font-extrabold text-[#0f6f29]">SACCOPlus</p>
                  <p className="mt-1 uppercase tracking-[0.16em]">© 2026 SACCOPlus. Rooted in Rwanda.</p>
                </div>
                <div className="flex flex-wrap gap-4 uppercase tracking-[0.14em] sm:gap-8">
                  <Link href="#">Privacy Policy</Link>
                  <Link href="#">Terms of Service</Link>
                  <Link href="#">RWF Rates</Link>
                  <Link href="#" className="underline underline-offset-4">Contact Us</Link>
                </div>
              </footer>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ─── Sub-components ─── */

function SummaryCard({
  label,
  value,
  note,
  accent = false,
}: {
  label: string;
  value: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] p-5 ${
        accent
          ? 'bg-gradient-to-br from-[#1c862f] to-[#0f6f29] text-white shadow-[0_10px_24px_rgba(15,111,41,0.22)]'
          : 'bg-white shadow-sm ring-1 ring-[#e8eee2]'
      }`}
    >
      <p className={`text-[10px] font-extrabold uppercase tracking-[0.16em] ${accent ? 'text-white/60' : 'text-[#899384]'}`}>
        {label}
      </p>
      <p className={`mt-3 text-[20px] font-extrabold tracking-tight ${accent ? 'text-white' : 'text-[#1f251e]'}`}>
        {value}
      </p>
      <p className={`mt-1.5 text-[12px] font-semibold ${accent ? 'text-white/70' : 'text-[#65705f]'}`}>
        {note}
      </p>
    </div>
  );
}

function LoanCard({ loan }: { loan: Loan }) {
  const pct = Math.round((loan.amountRepaid / loan.amount) * 100);
  const remaining = loan.amount - loan.amountRepaid;
  const style = statusStyles[loan.status];

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-[#e8eee2] transition hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Left info */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-extrabold text-[#1f251e]">{loan.purpose}</h3>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${style.pill}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {style.label}
            </span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-[#899384]">Ref: {loan.ref}</p>
        </div>

        {/* Amount */}
        <div className="text-right">
          <p className="text-[20px] font-extrabold tracking-tight text-[#1f251e]">
            {fmtRwf(loan.amount)}{' '}
            <span className="text-[12px] font-semibold text-[#899384]">RWF</span>
          </p>
          <p className="text-[11px] font-semibold text-[#65705f]">
            {loan.duration}-month term · started {loan.startDate}
          </p>
        </div>
      </div>

      {/* Progress bar (only for Active / Completed) */}
      {loan.status !== 'Pending' && loan.status !== 'Rejected' && (
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-[#65705f]">
            <span>{pct}% repaid</span>
            <span>{fmtRwf(remaining)} RWF remaining</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8eee2]">
            <div
              className="h-full rounded-full bg-[#0f6f29] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#f0f4eb] pt-4 text-[12px]">
        {loan.status === 'Active' && (
          <>
            <MetaItem label="Monthly Instalment" value={`${fmtRwf(loan.monthlyInstalment)} RWF`} />
            <MetaItem label="Next Due Date" value={loan.nextDueDate} highlight />
          </>
        )}
        {loan.status === 'Completed' && (
          <MetaItem label="Fully Repaid" value={`${fmtRwf(loan.amount)} RWF`} />
        )}
        {loan.status === 'Pending' && (
          <MetaItem label="Monthly Instalment" value={`${fmtRwf(loan.monthlyInstalment)} RWF (estimated)`} />
        )}
        <MetaItem label="Amount Repaid" value={`${fmtRwf(loan.amountRepaid)} RWF`} />
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        {loan.status === 'Active' && (
          <button className="flex items-center gap-1.5 rounded-[8px] bg-[#0f6f29] px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-[#0d5f23] active:scale-95">
            Make Payment <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        <button className="flex items-center gap-1.5 rounded-[8px] bg-[#f0f5eb] px-4 py-2 text-[12px] font-extrabold text-[#3f493e] transition hover:bg-[#e4ecdc] active:scale-95">
          View Schedule
        </button>
        {loan.status === 'Rejected' && (
          <Link
            href="/loans/apply"
            className="flex items-center gap-1.5 rounded-[8px] bg-[#0f6f29] px-4 py-2 text-[12px] font-extrabold text-white transition hover:bg-[#0d5f23] active:scale-95"
          >
            Reapply <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

function MetaItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#899384]">{label}</p>
      <p className={`mt-0.5 font-extrabold ${highlight ? 'text-[#0f6f29]' : 'text-[#1f251e]'}`}>{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] bg-white px-8 py-20 text-center shadow-sm ring-1 ring-[#e8eee2]">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4e8]">
        <Wallet className="h-8 w-8 text-[#0f6f29]" />
      </div>
      <h2 className="text-[20px] font-extrabold text-[#1f251e]">No loans yet</h2>
      <p className="mt-2 max-w-xs text-[13px] leading-6 text-[#596256]">
        You haven&apos;t applied for any loans. When you do, your full loan history and
        repayment progress will appear here.
      </p>
      <div className="mt-6 flex items-center gap-3 rounded-[12px] bg-[#eef4e8] px-5 py-3 text-[12px] text-[#3f493e]">
        <ShieldCheck className="h-4 w-4 text-[#0f6f29]" />
        Loans are protected under Bank of Rwanda guidelines
      </div>
      <Link
        href="/loans/apply"
        className="mt-8 flex items-center gap-2 rounded-[12px] bg-[#0f6f29] px-8 py-4 text-[14px] font-extrabold text-white shadow-[0_10px_24px_rgba(15,111,41,0.22)] transition hover:bg-[#0d5f23] active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" />
        Apply for Your First Loan
      </Link>
    </div>
  );
}
