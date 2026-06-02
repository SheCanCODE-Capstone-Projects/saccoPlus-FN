'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  CircleDollarSign,
  CircleHelp,
  Database,
  Download,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Transactions', icon: ArrowLeftRight },
  { label: 'Groups', icon: Users },
  { label: 'Loans', icon: Landmark, href: '/loans' },
  { label: 'Admin Hub', icon: ShieldCheck },
  { label: 'Reports', icon: BarChart3 },
];

const stats = [
  {
    label: 'Total System Savings',
    value: '150 000 000',
    suffix: 'RWF',
    change: '+12.5%',
    tone: 'green',
    icon: CircleDollarSign,
  },
  {
    label: 'Total Active Loans',
    value: '85 000 000',
    suffix: 'RWF',
    change: '+4.2%',
    tone: 'blue',
    icon: Landmark,
  },
  {
    label: 'Active Members',
    value: '12 450',
    suffix: 'Members',
    change: '+120 new',
    tone: 'rose',
    icon: UserPlus,
  },
];

const savingsBars = [38, 45, 52, 50, 64, 61, 73, 82, 78, 91, 88, 100];

const healthItems = [
  { label: 'API Gateway', status: 'Stable', tone: 'green', icon: Wifi },
  { label: 'Database Latency', status: '12ms', tone: 'green', icon: Database },
  { label: 'RWF Exchange Feed', status: 'Syncing', tone: 'blue', icon: Zap },
  { label: 'Loan Default Alerts', status: '4 Unresolved', tone: 'red', icon: CircleHelp },
];

const activity = [
  {
    initials: 'JM',
    user: 'Jean-Marie Vianney',
    action: 'Approved Omuka Loan #8821',
    time: '2 mins ago',
    status: 'Success',
  },
  {
    initials: 'AK',
    user: 'Alice Kagame',
    action: 'Bulk member onboarding (24)',
    time: '15 mins ago',
    status: 'Success',
  },
  {
    initials: 'BM',
    user: 'System Bot',
    action: 'Auto-reconciliation cash check',
    time: '1 hour ago',
    status: 'Pending',
  },
];

const sectionDetails: Record<string, { eyebrow: string; title: string; description: string }> = {
  Dashboard: {
    eyebrow: 'System / Command Center',
    title: 'Admin Dashboard',
    description:
      'A manager view for system-wide savings, members, loans, approvals, and operational health.',
  },
  Transactions: {
    eyebrow: 'System / Transactions',
    title: 'All System Transactions',
    description:
      'Review money movement across every SACCO group, member wallet, loan repayment, and payout.',
  },
  Groups: {
    eyebrow: 'Community / Groups',
    title: 'Group Management',
    description:
      'Monitor SACCO clusters, contribution health, member growth, and group-level risk signals.',
  },
  Loans: {
    eyebrow: 'Credit / Portfolio',
    title: 'Loan Portfolio',
    description:
      'Track active loans, default exposure, approvals, disbursements, and repayment performance.',
  },
  'Admin Hub': {
    eyebrow: 'System / Overview',
    title: 'Admin Hub',
    description:
      'Managing the financial pulse of Rwanda\'s collective growth. Real-time metrics across all SACCO clusters.',
  },
  Reports: {
    eyebrow: 'Insights / Reports',
    title: 'System Reports',
    description:
      'Generate operational, financial, compliance, and performance reports for the full platform.',
  },
};

const managerCards: Record<string, { title: string; value: string; note: string; tone: string }[]> = {
  Dashboard: [
    { title: 'Pending Approvals', value: '42', note: '12 high-priority requests', tone: 'green' },
    { title: 'Daily Transaction Volume', value: '18.4M RWF', note: '+6.8% from yesterday', tone: 'blue' },
    { title: 'Risk Watchlist', value: '9 Groups', note: '4 unresolved loan alerts', tone: 'rose' },
  ],
  Groups: [
    { title: 'Active SACCO Groups', value: '326', note: '24 groups added this quarter', tone: 'green' },
    { title: 'Contribution Compliance', value: '91%', note: 'Above target by 7%', tone: 'blue' },
    { title: 'Groups Needing Review', value: '14', note: 'Low activity or missing records', tone: 'rose' },
  ],
  Loans: [
    { title: 'Loans Awaiting Approval', value: '28', note: 'RWF 13.2M requested', tone: 'green' },
    { title: 'Portfolio Repayment Rate', value: '87%', note: 'Improved 4.2% this month', tone: 'blue' },
    { title: 'Default Exposure', value: '4.8M RWF', note: '4 unresolved alerts', tone: 'rose' },
  ],
  Reports: [
    { title: 'Monthly Finance Report', value: 'Ready', note: 'October 2024 generated', tone: 'green' },
    { title: 'Compliance Pack', value: '6 Files', note: 'Awaiting manager review', tone: 'blue' },
    { title: 'Audit Exceptions', value: '3', note: 'Need reconciliation notes', tone: 'rose' },
  ],
};

const systemTransactions = [
  { ref: 'SYS-9021', source: 'Kigali Women SACCO', type: 'Deposit', amount: '4 800 000 RWF', status: 'Success' },
  { ref: 'SYS-9018', source: 'Musanze Growth Group', type: 'Loan Disbursement', amount: '7 250 000 RWF', status: 'Success' },
  { ref: 'SYS-8994', source: 'Huye Farmers Circle', type: 'Repayment', amount: '1 120 000 RWF', status: 'Pending' },
  { ref: 'SYS-8977', source: 'Rubavu Youth Fund', type: 'Withdrawal', amount: '680 000 RWF', status: 'Review' },
];

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const activeSection = sectionDetails[activeNav];

  return (
    <main className="h-screen overflow-auto bg-[#f5f8ee] text-[#20271f]">
      <div className="flex h-full min-w-[1180px] border border-[#dfe6d7] bg-[#f5f8ee]">
        <aside className="flex w-[238px] shrink-0 flex-col border-r border-[#e0e7d8] bg-[#eef4e8]">
          <div className="px-5 pt-8">
            <p className="text-[18px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">
              SACCOPlus
            </p>
            <p className="mt-1 text-[11px] font-semibold text-[#5f6b5a]">
              Community Growth
            </p>
          </div>

          <nav className="mt-20 space-y-2 px-5">
            {navItems.map((item) => {
              const cls = `flex h-10 items-center gap-3 rounded-[8px] px-3 text-[13px] font-semibold transition hover:bg-white hover:text-[#0f6f29] hover:shadow-sm ${
                activeNav === item.label
                  ? 'bg-white text-[#3f493e] shadow-sm'
                  : 'text-[#3f493e]'
              }`;
              return item.href ? (
                <Link key={item.label} href={item.href} className={cls}>
                  <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href="#"
                  onClick={() => setActiveNav(item.label)}
                  className={cls}
                >
                  <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-[#dfe7d9] px-6 py-7">
            <Link href="#" className="flex h-9 items-center gap-3 text-[13px] font-medium text-[#3f493e]">
              <LifeBuoy className="h-[16px] w-[16px]" />
              Support
            </Link>
            <Link href="/auth/login" className="mt-2 flex h-9 items-center gap-3 text-[13px] font-medium text-[#3f493e]">
              <LogOut className="h-[16px] w-[16px]" />
              Log Out
            </Link>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#e0e7d8] bg-[#f9fbf3]/90 px-5 backdrop-blur md:px-9">
            <div className="flex min-w-0 items-center gap-4">
              <span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">
                SACCOPlus
              </span>
              <div className="flex h-10 w-[440px] items-center gap-3 rounded-full bg-[#e9efe3] px-4 text-[#778171]">
                <Search className="h-[15px] w-[15px]" />
                <input
                  placeholder="Search system logs or members..."
                  className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#8a9485]"
                />
              </div>
            </div>

            <div className="flex items-center gap-5 text-[#52604f]">
              <Bell className="h-[17px] w-[17px] text-[#0f6f29]" />
              <CircleHelp className="h-[17px] w-[17px]" />
              <Settings className="h-[17px] w-[17px] text-[#0f6f29]" />
              <div className="h-8 w-8 overflow-hidden rounded-full bg-[#172118]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-11 py-8">
            <div className="mx-auto max-w-[940px]">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0f6f29]">
                    {activeSection.eyebrow}
                  </p>
                  <h1 className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.04em] text-[#1f251e]">
                    {activeSection.title}
                  </h1>
                  <p className="mt-3 max-w-[560px] text-[13px] leading-5 text-[#596256]">
                    {activeSection.description}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="flex h-11 items-center gap-2 rounded-[9px] bg-[#e7ecdf] px-5 text-[13px] font-bold text-[#263024]">
                    <Download className="h-[15px] w-[15px]" />
                    Export Data
                  </button>
                  <button className="flex h-11 items-center gap-2 rounded-[9px] bg-[#177a2d] px-5 text-[13px] font-bold text-white shadow-[0_12px_22px_rgba(23,122,45,0.24)]">
                    <Plus className="h-[15px] w-[15px]" />
                    New Transaction
                  </button>
                </div>
              </div>

              {activeNav === 'Dashboard' ? (
                <ManagerOverview section="Dashboard" />
              ) : activeNav === 'Transactions' ? (
                <SystemTransactions />
              ) : activeNav === 'Admin Hub' ? (
                <AdminHubOverview />
              ) : (
                <ManagerOverview section={activeNav} />
              )}

              <footer className="mt-24 flex items-end justify-between gap-4 py-6 text-[11px] text-[#9aa397]">
                <div>
                  <p className="text-[13px] font-extrabold text-[#0f6f29]">
                    SACCOPlus
                  </p>
                  <p className="mt-2 uppercase tracking-[0.16em]">
                    © 2026 SACCOPlus. Rooted in Rwanda.
                  </p>
                </div>
                <div className="flex flex-wrap gap-8 uppercase tracking-[0.14em]">
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
    </main>
  );
}

function ManagerOverview({ section }: { section: string }) {
  const cards = managerCards[section] ?? managerCards.Dashboard;

  return (
    <>
      <section className="mt-8 grid grid-cols-3 gap-6">
        {cards.map((card) => (
          <ManagerCard key={card.title} card={card} />
        ))}
      </section>

      <section className="mt-8 grid grid-cols-[1.05fr_0.95fr] gap-8">
        <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
                Manager Queue
              </p>
              <h2 className="mt-2 text-[18px] font-extrabold tracking-[-0.02em]">
                Priority Work
              </h2>
            </div>
            <span className="rounded-full bg-[#e8f3e4] px-3 py-1 text-[11px] font-extrabold text-[#0f6f29]">
              Live
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {activity.map((item) => (
              <div
                key={`${section}-${item.user}`}
                className="flex items-center justify-between rounded-[14px] bg-[#f5f8ee] px-4 py-3"
              >
                <div>
                  <p className="text-[13px] font-extrabold text-[#1f251e]">
                    {item.user}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-[#7a8475]">
                    {item.action}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                    item.status === 'Pending'
                      ? 'bg-[#e9f2ff] text-[#0969bd]'
                      : 'bg-[#e9f7e9] text-[#178034]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] bg-[#e6ecdf] p-6 shadow-sm">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6f7a68]">
            System Control
          </p>
          <h2 className="mt-2 text-[18px] font-extrabold tracking-[-0.02em]">
            {section} Workspace
          </h2>
          <p className="mt-3 text-[12px] leading-5 text-[#596256]">
            This section is prepared for real backend data and manager actions.
            It keeps summaries, queues, records, and approvals inside the admin
            shell so the system feels complete and controlled.
          </p>

          <div className="mt-6 grid gap-3">
            <button className="h-11 rounded-[10px] bg-[#177a2d] px-4 text-left text-[13px] font-extrabold text-white shadow-[0_12px_22px_rgba(23,122,45,0.18)]">
              Review Pending Items
            </button>
            <button className="h-11 rounded-[10px] bg-white px-4 text-left text-[13px] font-extrabold text-[#263024]">
              Export {section} Summary
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function ManagerCard({
  card,
}: {
  card: { title: string; value: string; note: string; tone: string };
}) {
  const toneStyles: Record<string, string> = {
    green: 'bg-[#e7f3e5] text-[#0f6f29]',
    blue: 'bg-[#e9f3ff] text-[#0969bd]',
    rose: 'bg-[#ffeaf1] text-[#a3315d]',
  };

  return (
    <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2]">
      <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${toneStyles[card.tone]}`}>
        Manager Metric
      </span>
      <p className="mt-5 text-[12px] font-extrabold text-[#1f251e]">
        {card.title}
      </p>
      <p className="mt-4 text-[26px] font-extrabold tracking-[-0.04em] text-[#1f251e]">
        {card.value}
      </p>
      <p className="mt-2 text-[12px] leading-5 text-[#65705f]">{card.note}</p>
    </div>
  );
}

function SystemTransactions() {
  return (
    <section className="mt-8 overflow-hidden rounded-[18px] bg-white shadow-sm ring-1 ring-[#e8eee2]">
        <div className="flex items-center justify-between gap-3 border-b border-[#edf1e8] px-6 py-5">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
            System Ledger
          </p>
          <h2 className="mt-2 text-[18px] font-extrabold tracking-[-0.02em]">
            Platform Transaction Monitor
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="h-10 rounded-[9px] bg-[#eef4e8] px-4 text-[12px] font-extrabold text-[#263024]">
            Filter
          </button>
          <button className="h-10 rounded-[9px] bg-[#177a2d] px-4 text-[12px] font-extrabold text-white">
            Reconcile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[0.75fr_1.35fr_1fr_0.9fr_0.75fr] border-b border-[#edf1e8] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#858f80]">
        <span>Ref ID</span>
        <span>Source</span>
        <span>Type</span>
        <span>Amount</span>
        <span>Status</span>
      </div>

      {systemTransactions.map((item) => (
        <div
          key={item.ref}
          className="grid grid-cols-[0.75fr_1.35fr_1fr_0.9fr_0.75fr] items-center gap-3 border-b border-[#edf1e8] px-6 py-5 text-[12px] last:border-b-0"
        >
          <p className="font-extrabold text-[#1f251e]">{item.ref}</p>
          <p className="font-semibold text-[#596256]">{item.source}</p>
          <p className="font-extrabold text-[#1f251e]">{item.type}</p>
          <p className="font-extrabold text-[#1f251e]">{item.amount}</p>
          <span
            className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
              item.status === 'Success'
                ? 'bg-[#e9f7e9] text-[#178034]'
                : item.status === 'Pending'
                  ? 'bg-[#e9f2ff] text-[#0969bd]'
                  : 'bg-[#fff0ee] text-[#c9342a]'
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </section>
  );
}

function AdminHubOverview() {
  return (
    <>
      <section className="mt-8 grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="mt-8 grid grid-cols-[1fr_1fr] gap-8">
        <SavingsGrowthCard />
        <DisbursementCard />
      </section>

      <section className="mt-8 grid grid-cols-[0.78fr_1.22fr] gap-8">
        <SystemHealthPanel />
        <RecentActivityPanel />
      </section>
    </>
  );
}

function SavingsGrowthCard() {
  return (
    <div className="rounded-[12px] bg-[#eef4e8] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-extrabold tracking-[-0.02em]">
          Savings Growth
        </h2>
        <div className="flex rounded-full bg-white p-1 text-[10px] font-extrabold text-[#566052]">
          <button className="rounded-full bg-[#e7efe1] px-3 py-1">12 Months</button>
          <button className="px-3 py-1">6 Months</button>
        </div>
      </div>
      <div className="mt-8 flex h-[240px] items-end gap-3 px-4">
        {savingsBars.map((height, index) => (
          <div
            key={index}
            className={`w-full rounded-t-[8px] ${
              index === savingsBars.length - 1 ? 'bg-[#0f6f29]' : 'bg-[#c7dac3]'
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-between px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b9586]">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Dec</span>
      </div>
    </div>
  );
}

function DisbursementCard() {
  return (
    <div className="rounded-[12px] bg-[#eef4e8] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-extrabold tracking-[-0.02em]">
          Disbursement Trends
        </h2>
        <span className="text-[10px] font-bold text-[#7a8475]">
          Real-time update
        </span>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="relative flex h-[176px] w-[176px] items-center justify-center rounded-full bg-[conic-gradient(#0868bb_0_72%,#b9d2ff_72%_100%)]">
          <div className="flex h-[132px] w-[132px] flex-col items-center justify-center rounded-full bg-[#f5f8ee]">
            <span className="text-[31px] font-extrabold tracking-[-0.04em]">
              72%
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#667160]">
              Target Met
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-12 text-[12px] font-bold text-[#566052]">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0868bb]" />
          Agricultural Loans
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#b9d2ff]" />
          SME Credit
        </span>
      </div>
    </div>
  );
}

function SystemHealthPanel() {
  return (
    <div>
      <h2 className="text-[17px] font-extrabold tracking-[-0.02em]">
        System Health
      </h2>
      <div className="mt-5 space-y-4">
        {healthItems.map((item) => (
          <HealthRow key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function RecentActivityPanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-extrabold tracking-[-0.02em]">
          Recent System Activity
        </h2>
        <Link href="#" className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0f6f29]">
          View All Logs
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-[12px] bg-white shadow-sm">
        <div className="grid grid-cols-[1.35fr_0.8fr_0.55fr] border-b border-[#edf1e8] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8b9586]">
          <span>User / Action</span>
          <span>Timestamp</span>
          <span>Status</span>
        </div>
        {activity.map((item) => (
          <ActivityRow key={`${item.user}-${item.time}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const Icon = stat.icon;
  const toneStyles: Record<string, string> = {
    green: 'bg-[#e7f3e5] text-[#0f6f29]',
    blue: 'bg-[#e9f3ff] text-[#0969bd]',
    rose: 'bg-[#ffeaf1] text-[#a3315d]',
  };

  return (
    <div className="rounded-[12px] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-[9px] ${toneStyles[stat.tone]}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${toneStyles[stat.tone]}`}>
          {stat.change}
        </span>
      </div>
      <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7f897a]">
        {stat.label}
      </p>
      <p className="mt-2 text-[25px] font-extrabold tracking-[-0.04em] text-[#1f251e]">
        {stat.value}{' '}
        <span className={`text-[13px] uppercase ${stat.tone === 'blue' ? 'text-[#0969bd]' : stat.tone === 'rose' ? 'text-[#a3315d]' : 'text-[#0f6f29]'}`}>
          {stat.suffix}
        </span>
      </p>
    </div>
  );
}

function HealthRow({ item }: { item: (typeof healthItems)[number] }) {
  const Icon = item.icon;
  const toneStyles: Record<string, string> = {
    green: 'bg-[#e4f1dd] text-[#0f6f29]',
    blue: 'bg-[#e8f2ff] text-[#0969bd]',
    red: 'bg-[#fff0ee] text-[#c9342a]',
  };

  return (
    <div className={`flex h-12 items-center justify-between rounded-[10px] px-4 ${toneStyles[item.tone]}`}>
      <span className="flex items-center gap-3 text-[13px] font-extrabold text-[#1f251e]">
        <Icon className={`h-[17px] w-[17px] ${item.tone === 'red' ? 'text-[#c9342a]' : item.tone === 'blue' ? 'text-[#0969bd]' : 'text-[#0f6f29]'}`} />
        {item.label}
      </span>
      <span className="text-[11px] font-extrabold">{item.status}</span>
    </div>
  );
}

function ActivityRow({ item }: { item: (typeof activity)[number] }) {
  return (
    <div className="grid grid-cols-[1.35fr_0.8fr_0.55fr] items-center border-b border-[#edf1e8] px-5 py-4 text-[12px] last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#edf2ff] text-[11px] font-extrabold text-[#3368c7]">
          {item.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-extrabold text-[#1f251e]">{item.user}</p>
          <p className="mt-1 truncate text-[11px] font-semibold text-[#7a8475]">
            {item.action}
          </p>
        </div>
      </div>
      <span className="font-semibold text-[#596256]">{item.time}</span>
      <span
        className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
          item.status === 'Pending'
            ? 'bg-[#e9f2ff] text-[#0969bd]'
            : 'bg-[#e9f7e9] text-[#178034]'
        }`}
      >
        {item.status}
      </span>
    </div>
  );
}
