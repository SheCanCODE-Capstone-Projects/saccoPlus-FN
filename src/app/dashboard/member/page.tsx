'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContributionForm from '@/components/savings/ContributionForm';
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  HandCoins,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Trash2,
  UserRound,
  X,
  Users,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Transactions', icon: ArrowLeftRight },
  { label: 'Groups', icon: Users },
  { label: 'Loans', icon: Landmark },
  { label: 'Savings', icon:  HandCoins },
  { label: 'Admin Hub', icon: ShieldCheck },
  { label: 'Reports', icon: BarChart3 },
];

const transactions = [
  {
    date: '24 Oct, 2024',
    time: '12:42 GMT+2',
    title: 'MTN MoMo Deposit',
    detail: 'Wallet Ref. 892031129',
    category: 'Deposit',
    amount: '150 000 RWF',
    status: 'Success',
    tone: 'blue',
    icon: Smartphone,
  },
  {
    date: '22 Oct, 2024',
    time: '09:15 GMT+2',
    title: 'Group Contribution',
    detail: 'Umurenge Savings Circle',
    category: 'Contribution',
    amount: '50 000 RWF',
    status: 'Success',
    tone: 'green',
    icon: Users,
  },
  {
    date: '18 Oct, 2024',
    time: '16:45 GMT+2',
    title: 'Loan Repayment',
    detail: 'Business Growth Loan #4421',
    category: 'Loan',
    amount: '245 000 RWF',
    status: 'Pending',
    tone: 'rose',
    icon: HandCoins,
  },
  {
    date: '12 Oct, 2024',
    time: '11:02 GMT+2',
    title: 'Withdrawal',
    detail: 'Personal Bank Account Transfer',
    category: 'Payout',
    amount: '75 000 RWF',
    status: 'Success',
    tone: 'red',
    icon: Send,
  },
];

const sectionDetails: Record<string, { eyebrow: string; title: string; description: string }> = {
  Dashboard: {
    eyebrow: 'Member / Overview',
    title: 'Member Dashboard',
    description:
      'A clear view of savings, contributions, loan activity, and group performance in one place.',
  },
  Transactions: {
    eyebrow: 'Activity / History',
    title: 'Transaction History',
    description:
      'Monitor your contributions, deposits, and loan cycles within the SACCOPlus ecosystem.',
  },
  Groups: {
    eyebrow: 'Community / Groups',
    title: 'Savings Groups',
    description:
      'Track group membership, contribution cycles, meeting status, and shared savings goals.',
  },
  Loans: {
    eyebrow: 'Credit / Loans',
    title: 'Loan Center',
    description:
      'Review active loans, repayment progress, upcoming dues, and new credit opportunities.',
  },
  'Admin Hub': {
    eyebrow: 'Operations / Admin',
    title: 'Admin Hub',
    description:
      'Manage member requests, approvals, verification tasks, and operational alerts.',
  },
  Reports: {
    eyebrow: 'Insights / Reports',
    title: 'Reports',
    description:
      'Export summaries and review performance reports across savings, loans, and groups.',
  },
};

const overviewCards = [
  { label: 'Savings Balance', value: '840 250 RWF', note: '+8.4% this month' },
  { label: 'Group Contributions', value: '1 240 500 RWF', note: '4 active groups' },
  { label: 'Loan Balance', value: '520 000 RWF', note: '70% repaid' },
  { label: 'Next Payment', value: '45 000 RWF', note: 'Due Nov 02, 2024' },
];

const workspaceCards: Record<string, { title: string; value: string; note: string }[]> = {
  Groups: [
    { title: 'Umurenge Savings Circle', value: '18 Members', note: 'Next contribution due Friday' },
    { title: 'Women Enterprise Fund', value: '92% Goal', note: 'RWF 3.2M saved collectively' },
    { title: 'Youth Growth Group', value: 'Active', note: '2 pending member invitations' },
  ],
  Loans: [
    { title: 'Business Expansion', value: '70% Repaid', note: 'Eligible for limit review in 3 months' },
    { title: 'Upcoming Installment', value: '45 000 RWF', note: 'Due Nov 02, 2024' },
    { title: 'Credit Health', value: 'Excellent', note: 'No late repayments recorded' },
  ],
  'Admin Hub': [
    { title: 'Pending Requests', value: '6', note: '2 require document review' },
    { title: 'Member Verification', value: '94%', note: 'Community Growth portal status' },
    { title: 'Operational Alerts', value: '1', note: 'Contribution reminder scheduled' },
  ],
  Reports: [
    { title: 'Monthly Statement', value: 'Ready', note: 'October 2024 report generated' },
    { title: 'Savings Growth', value: '+12%', note: 'Compared with last quarter' },
    { title: 'Loan Portfolio', value: 'Healthy', note: 'Pending ratio below threshold' },
  ],
};

export default function MemberDashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountPanelOpen, setAccountPanelOpen] = useState(false);
  const [deletePanelOpen, setDeletePanelOpen] = useState(false);
  const activeSection = sectionDetails[activeNav];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8ee] text-[#20271f]">
      <div className="flex min-h-screen w-full flex-col border border-[#dfe6d7] bg-[#f5f8ee] lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-[#e0e7d8] bg-[#eef4e8] lg:w-[250px] lg:border-b-0 lg:border-r">
          <div className="flex h-14 items-center px-4 sm:px-6 lg:h-16">
            <span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">
              SACCOPlus
            </span>
          </div>

          <div className="hidden px-7 pt-8 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#879181]">
              Member Portal
            </p>
            <p className="mt-1 text-[12px] font-bold text-[#0f6f29]">
              Community Growth
            </p>
          </div>

          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:mt-8 lg:block lg:space-y-2 lg:px-5 lg:pb-0">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`flex h-10 shrink-0 items-center gap-3 rounded-[8px] px-3 text-[13px] font-semibold transition hover:bg-white hover:text-[#0f6f29] hover:shadow-sm lg:w-full ${
                  activeNav === item.label
                    ? 'bg-white text-[#3f493e] shadow-sm'
                    : 'text-[#3f493e]'
                }`}
              >
                <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto hidden border-t border-[#dfe7d9] px-6 py-7 lg:block">
            <Link
              href="#"
              className="flex h-9 items-center gap-3 text-[13px] font-medium text-[#3f493e]"
            >
              <LifeBuoy className="h-[16px] w-[16px]" />
              Support
            </Link>
            <Link
              href="/auth/login"
              className="mt-2 flex h-9 items-center gap-3 text-[13px] font-medium text-[#3f493e]"
            >
              <LogOut className="h-[16px] w-[16px]" />
              Log Out
            </Link>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#e0e7d8] bg-[#f9fbf3]/90 px-4 py-3 backdrop-blur md:px-9">
            <div className="flex min-w-0 items-center gap-4">
              <span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">
                SACCOPlus
              </span>
              <div className="hidden h-9 w-[210px] items-center gap-2 rounded-full bg-[#eef3e9] px-4 text-[#7b8477] sm:flex">
                <Search className="h-[14px] w-[14px]" />
                <input
                  placeholder="Search transactions..."
                  className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#8a9485]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#596256] sm:gap-5">
              <Bell className="h-[17px] w-[17px]" />
              <CircleHelp className="h-[17px] w-[17px]" />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSettingsOpen((current) => !current)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#eef3e9] hover:text-[#0f6f29]"
                  aria-label="Open account settings"
                >
                  <Settings className="h-[17px] w-[17px]" />
                </button>

                {settingsOpen && (
                  <div className="absolute right-0 top-11 z-30 w-[240px] rounded-[16px] border border-[#e0e7d8] bg-white p-2 shadow-[0_18px_50px_rgba(38,48,36,0.14)]">
                    <button
                      type="button"
                      onClick={() => {
                        setSettingsOpen(false);
                        setAccountPanelOpen(true);
                      }}
                      className="flex w-full items-start gap-3 rounded-[12px] px-3 py-3 text-left transition hover:bg-[#f5f8ee]"
                    >
                      <UserRound className="mt-0.5 h-[17px] w-[17px] text-[#0f6f29]" />
                      <span>
                        <span className="block text-[13px] font-extrabold text-[#1f251e]">
                          Account Settings
                        </span>
                        <span className="mt-1 block text-[11px] leading-4 text-[#697463]">
                          Update your personal profile details.
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSettingsOpen(false);
                        setDeletePanelOpen(true);
                      }}
                      className="mt-1 flex w-full items-start gap-3 rounded-[12px] px-3 py-3 text-left transition hover:bg-[#fff3f1]"
                    >
                      <Trash2 className="mt-0.5 h-[17px] w-[17px] text-[#c9342a]" />
                      <span>
                        <span className="block text-[13px] font-extrabold text-[#8d201a]">
                          Delete Account
                        </span>
                        <span className="mt-1 block text-[11px] leading-4 text-[#7b625f]">
                          Permanently remove this member account.
                        </span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-[#172118]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-11 lg:py-8">
            <div className="mx-auto max-w-[940px]">
              {activeNav !== 'Loans' && activeNav !== 'Savings' && (
                <div className="flex flex-col items-stretch justify-between gap-5 md:flex-row md:items-end">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7d8779]">
                      {activeSection.eyebrow.split(' / ')[0]} /{' '}
                      <span className="text-[#0f6f29]">
                        {activeSection.eyebrow.split(' / ')[1]}
                      </span>
                    </p>
                    <h1 className="mt-2 text-[28px] font-extrabold leading-tight text-[#1f251e] sm:text-[32px]">
                      {activeSection.title}
                    </h1>
                    <p className="mt-3 max-w-[540px] text-[13px] leading-5 text-[#596256]">
                      {activeSection.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button className="flex h-11 items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-[13px] font-bold text-[#20271f] shadow-sm">
                      <Download className="h-[15px] w-[15px]" />
                      Export
                    </button>
                    <button className="flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#177a2d] px-5 text-[13px] font-bold text-white shadow-[0_12px_22px_rgba(23,122,45,0.24)]">
                      <Plus className="h-[15px] w-[15px]" />
                      New Transaction
                    </button>
                  </div>
                </div>
              )}

              {activeNav === 'Savings' ? (
                <ContributionForm />
              ) : activeNav === 'Transactions' ? (
                <TransactionsSection />
              ) : activeNav === 'Dashboard' ? (
                <DashboardOverview />
              ) : (
                <WorkspaceSection section={activeNav} />
              )}

              <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-transparent py-6 text-[11px] text-[#9aa397] md:mt-24 md:flex-row md:items-end">
                <div>
                  <p className="text-[13px] font-extrabold text-[#0f6f29]">
                    SACCOPlus
                  </p>
                  <p className="mt-2 uppercase tracking-[0.16em]">
                    © 2026 SACCOPlus. Rooted in Rwanda.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 uppercase tracking-[0.14em] sm:gap-8">
                  <Link href="#">Privacy Policy</Link>
                  <Link href="#">Terms of Service</Link>
                  <Link href="#">RWF Rates</Link>
                  <Link href="#" className="underline underline-offset-4">
                    Contact Us
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </section>
      </div>

      {accountPanelOpen && (
        <AccountSettingsPanel onClose={() => setAccountPanelOpen(false)} />
      )}

      {deletePanelOpen && (
        <DeleteAccountPanel onClose={() => setDeletePanelOpen(false)} />
      )}
    </main>
  );
}

function DashboardOverview() {
  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="min-w-0 rounded-[18px] bg-white p-5 shadow-sm ring-1 ring-[#e8eee2]"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
              {card.label}
            </p>
            <p className="mt-4 break-words text-[22px] font-extrabold text-[#1f251e]">
              {card.value}
            </p>
            <p className="mt-2 text-[12px] font-semibold text-[#65705f]">
              {card.note}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
                Activity Snapshot
              </p>
              <h2 className="mt-2 text-[18px] font-extrabold text-[#1f251e]">
                Recent Movement
              </h2>
            </div>
            <span className="rounded-full bg-[#e8f3e4] px-3 py-1 text-[11px] font-extrabold text-[#0f6f29]">
              Healthy
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {transactions.slice(0, 3).map((transaction) => (
              <div
                key={transaction.title}
                className="flex flex-col items-start justify-between gap-2 rounded-[14px] bg-[#f6f9f1] px-4 py-3 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-[13px] font-extrabold text-[#1f251e]">
                    {transaction.title}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-[#7a8475]">
                    {transaction.date}
                  </p>
                </div>
                <p className="text-[13px] font-extrabold text-[#1f251e]">
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-[#e6ecdf] p-6 shadow-sm">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6f7a68]">
            Contribution Goal
          </p>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#0f6f29_0_76%,#cfd9ca_76%_100%)]">
              <div className="flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-[#f7faf1]">
                <span className="text-[22px] font-extrabold text-[#1f251e]">
                  76%
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#5e675a]">
                  Goal
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-[18px] font-extrabold text-[#1f251e]">
                Community Growth Target
              </h2>
              <p className="mt-2 text-[12px] leading-5 text-[#596256]">
                Your groups are on track for the current savings cycle. Keep
                contributions consistent to unlock stronger loan eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AccountSettingsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b2418]/35 px-4 backdrop-blur-sm">
      <section className="w-full max-w-[560px] rounded-[24px] bg-[#fbfcf7] p-6 shadow-[0_24px_70px_rgba(28,36,25,0.22)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
              Profile / Account
            </p>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.03em] text-[#1f251e]">
              Account Settings
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-[#65705f]">
              Update the information shown on your SACCOPlus member account.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef3e9] text-[#596256] transition hover:bg-[#e1e9da]"
            aria-label="Close account settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AccountInput label="Full Name" defaultValue="Jean Baptiste" />
          <AccountInput label="Phone Number" defaultValue="+250 78X XXX XXX" />
          <AccountInput label="National ID" defaultValue="1198 0000 0000 0000" />
          <AccountInput label="Email Address" defaultValue="member@saccoplus.rw" />
          <label className="sm:col-span-2">
            <span className="mb-2 block text-[12px] font-extrabold text-[#1f251e]">
              Address
            </span>
            <textarea
              defaultValue="Kigali, Rwanda"
              rows={3}
              className="w-full resize-none rounded-[12px] border border-[#e1e8db] bg-white px-4 py-3 text-[13px] font-semibold text-[#1f251e] outline-none transition focus:border-[#0f6f29] focus:ring-2 focus:ring-[#0f6f29]/10"
            />
          </label>
        </form>

        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-[10px] px-5 text-[13px] font-extrabold text-[#596256] transition hover:bg-[#eef3e9]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-11 rounded-[10px] bg-[#177a2d] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_22px_rgba(23,122,45,0.2)] transition hover:bg-[#116825]"
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}

function AccountInput({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-[12px] font-extrabold text-[#1f251e]">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="h-11 w-full rounded-[12px] border border-[#e1e8db] bg-white px-4 text-[13px] font-semibold text-[#1f251e] outline-none transition focus:border-[#0f6f29] focus:ring-2 focus:ring-[#0f6f29]/10"
      />
    </label>
  );
}

function DeleteAccountPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b2418]/35 px-4 backdrop-blur-sm">
      <section className="w-full max-w-[480px] rounded-[24px] bg-[#fbfcf7] p-6 shadow-[0_24px_70px_rgba(28,36,25,0.22)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff0ee] text-[#c9342a]">
              <Trash2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#b06a64]">
                Permanent Action
              </p>
              <h2 className="mt-2 text-[22px] font-extrabold tracking-[-0.03em] text-[#1f251e]">
                Delete Account Permanently
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef3e9] text-[#596256] transition hover:bg-[#e1e9da]"
            aria-label="Close delete account panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 text-[13px] leading-6 text-[#65705f]">
          This front-end flow can later permanently delete the member account
          when the API is connected. This action should remove account access
          and cannot be undone from the member portal.
        </p>

        <div className="mt-5 rounded-[16px] bg-[#fff6f4] p-4 text-[12px] leading-5 text-[#7b514c]">
          Permanent deletion should require confirmation, preserve legally
          required financial records, revoke login access, and store an audit
          trail for administrators.
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[12px] font-extrabold text-[#1f251e]">
            Reason
          </span>
          <textarea
            placeholder="Tell us why this account should be deleted..."
            rows={3}
            className="w-full resize-none rounded-[12px] border border-[#e1e8db] bg-white px-4 py-3 text-[13px] font-semibold text-[#1f251e] outline-none transition placeholder:text-[#9aa397] focus:border-[#c9342a] focus:ring-2 focus:ring-[#c9342a]/10"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-[12px] font-extrabold text-[#1f251e]">
            Type DELETE to confirm
          </span>
          <input
            placeholder="DELETE"
            className="h-11 w-full rounded-[12px] border border-[#e1e8db] bg-white px-4 text-[13px] font-semibold text-[#1f251e] outline-none transition placeholder:text-[#9aa397] focus:border-[#c9342a] focus:ring-2 focus:ring-[#c9342a]/10"
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-[10px] px-5 text-[13px] font-extrabold text-[#596256] transition hover:bg-[#eef3e9]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-11 rounded-[10px] bg-[#c9342a] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_22px_rgba(201,52,42,0.2)] transition hover:bg-[#a92922]"
          >
            Delete Permanently
          </button>
        </div>
      </section>
    </div>
  );
}

function TransactionsSection() {
  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_0.56fr_0.6fr]">
        <FilterCard label="Date Range">
          <CalendarDays className="h-[16px] w-[16px] text-[#6e786a]" />
          <span>Oct 01, 2024 - Oct 31, 2024</span>
          <ChevronRight className="ml-auto h-[14px] w-[14px] rotate-90 text-[#7a8475]" />
        </FilterCard>
        <FilterCard label="Transaction Type">
          <span>All Activities</span>
          <SlidersHorizontal className="ml-auto h-[15px] w-[15px] text-[#6e786a]" />
        </FilterCard>
        <div>
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
            Quick Search
          </p>
          <input
            placeholder="Ref ID, Name..."
            className="h-11 w-full rounded-[10px] bg-white px-4 text-[12px] font-semibold outline-none placeholder:text-[#9aa397] shadow-sm"
          />
        </div>
      </section>

      <section className="mt-8 overflow-x-auto rounded-[18px] bg-white shadow-sm">
        <div className="min-w-[760px]">
        <div className="grid grid-cols-[1fr_1.55fr_0.95fr_0.85fr_0.8fr] border-b border-[#edf1e8] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#858f80]">
          <span>Date</span>
          <span>Description</span>
          <span>Category</span>
          <span className="text-right">Amount (RWF)</span>
          <span className="text-center">Status</span>
        </div>

        {transactions.map((transaction) => (
          <TransactionRow key={transaction.title} transaction={transaction} />
        ))}

        <div className="flex items-center justify-between gap-3 px-6 py-4 text-[12px] text-[#566052]">
          <span>Showing 4 of 128 transactions</span>
          <div className="flex items-center gap-3">
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f4eb]">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button className="h-8 w-8 rounded-[8px] bg-[#0f6f29] text-xs font-bold text-white">
              1
            </button>
            <button className="h-8 w-8 rounded-[8px] text-xs font-bold text-[#596256]">
              2
            </button>
            <button className="h-8 w-8 rounded-[8px] text-xs font-bold text-[#596256]">
              3
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f4eb]">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[0.82fr_1.52fr]">
        <div className="rounded-[24px] bg-gradient-to-br from-[#1c862f] to-[#3f9650] p-6 text-white shadow-[0_20px_35px_rgba(28,134,47,0.23)] sm:rounded-[28px] sm:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
            Total Contributions
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <span className="text-[28px] font-extrabold leading-none sm:text-[31px]">
              1 240 500
            </span>
            <span className="pb-1 text-[12px] font-bold">RWF</span>
          </div>
          <p className="mt-5 text-[12px] font-medium text-white/80">
            +12% increase from last quarter
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 rounded-[24px] bg-[#e6ecdf] p-6 sm:flex-row sm:items-center sm:rounded-[28px] sm:p-8">
          <div className="relative flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#0f6f29_0_70%,#cfd9ca_70%_100%)]">
            <div className="flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-[#f7faf1]">
              <span className="text-[22px] font-extrabold text-[#1f251e]">
                70%
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#5e675a]">
                Goal
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="text-[18px] font-extrabold tracking-[-0.02em] text-[#1f251e]">
              Loan Progress: Business Expansion
            </h2>
            <p className="mt-2 max-w-[480px] text-[12px] leading-5 text-[#596256]">
              You&apos;ve successfully repaid 70% of your current loan. You are
              eligible for a credit limit increase in 3 months.
            </p>
            <div className="mt-5 flex flex-wrap gap-5">
              <Link href="#" className="text-[13px] font-extrabold text-[#0f6f29]">
                View Schedule -&gt;
              </Link>
              <Link href="#" className="text-[13px] font-extrabold text-[#0f6f29]">
                Early Repay -&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WorkspaceSection({ section }: { section: string }) {
  const cards = workspaceCards[section] ?? [];

  return (
    <section className="mt-8 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[18px] bg-[#f5f8ee] p-5">
            <p className="text-[12px] font-extrabold text-[#1f251e]">
              {card.title}
            </p>
            <p className="mt-4 text-[24px] font-extrabold tracking-[-0.03em] text-[#0f6f29]">
              {card.value}
            </p>
            <p className="mt-2 text-[12px] leading-5 text-[#65705f]">
              {card.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[18px] border border-dashed border-[#cfd9ca] bg-[#fbfcf7] p-6">
        <p className="text-[13px] font-extrabold text-[#1f251e]">
          {section} workspace
        </p>
        <p className="mt-2 max-w-[620px] text-[12px] leading-5 text-[#65705f]">
          This area is ready for your real backend data. The layout already
          keeps actions, summaries, and detailed records inside the dashboard
          shell so each module feels connected and professional.
        </p>
      </div>
    </section>
  );
}

function FilterCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
        {label}
      </p>
      <button className="flex h-11 w-full items-center gap-3 rounded-[10px] bg-white px-4 text-left text-[12px] font-semibold text-[#263024] shadow-sm">
        {children}
      </button>
    </div>
  );
}

function TransactionRow({
  transaction,
}: {
  transaction: (typeof transactions)[number];
}) {
  const Icon = transaction.icon;
  const toneStyles: Record<string, string> = {
    blue: 'bg-[#e9f3ff] text-[#1f7eea]',
    green: 'bg-[#eaf6e7] text-[#0f7b30]',
    rose: 'bg-[#ffeaf0] text-[#be4266]',
    red: 'bg-[#fff0ef] text-[#e12626]',
  };

  return (
    <div className="grid grid-cols-[1fr_1.55fr_0.95fr_0.85fr_0.8fr] items-center gap-4 border-b border-[#edf1e8] px-6 py-5 text-[12px] last:border-b-0">
      <div>
        <p className="font-extrabold text-[#1f251e]">{transaction.date}</p>
        <p className="mt-1 text-[10px] font-semibold text-[#8b9586]">
          {transaction.time}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            toneStyles[transaction.tone]
          }`}
        >
          <Icon className="h-[15px] w-[15px]" strokeWidth={2.2} />
        </span>
        <div>
          <p className="font-extrabold text-[#1f251e]">{transaction.title}</p>
          <p className="mt-1 text-[10px] font-semibold text-[#7f897a]">
            {transaction.detail}
          </p>
        </div>
      </div>

      <div>
        <span className="rounded-full bg-[#e8efe1] px-3 py-1 text-[10px] font-extrabold uppercase text-[#4b5947]">
          {transaction.category}
        </span>
      </div>

      <p
        className={`text-right font-extrabold ${
          transaction.tone === 'red' ? 'text-[#d21414]' : 'text-[#141b13]'
        }`}
      >
        {transaction.amount}
      </p>

      <div className="text-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase ${
            transaction.status === 'Pending'
              ? 'bg-[#e9f2ff] text-[#1d6fcb]'
              : 'bg-[#e9f7e9] text-[#178034]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {transaction.status}
        </span>
      </div>
    </div>
  );
}
