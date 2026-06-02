'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Radio,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
  WalletMinimal,
  X,
} from 'lucide-react';

type Method = 'momo' | 'airtel' | 'bank';

interface MethodOption {
  id: Method;
  label: string;
  detail: string;
  fee: string;
  feeAmount: number;
  processingTime: string;
  icon: React.ReactNode;
  iconBg: string;
}

const methods: MethodOption[] = [
  {
    id: 'momo',
    label: 'MTN MoMo',
    detail: 'Instant processing',
    fee: '1% fee (max 500 RWF)',
    feeAmount: 100,
    processingTime: 'Instant',
    icon: <Smartphone className="h-5 w-5 text-white" />,
    iconBg: 'bg-yellow-400',
  },
  {
    id: 'airtel',
    label: 'Airtel Money',
    detail: 'Instant processing',
    fee: '1% fee (max 500 RWF)',
    feeAmount: 100,
    processingTime: 'Instant',
    icon: <Radio className="h-5 w-5 text-white" />,
    iconBg: 'bg-red-600',
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    detail: '1–2 business days',
    fee: '200 RWF flat fee',
    feeAmount: 200,
    processingTime: '1–2 Business Days',
    icon: <Building2 className="h-5 w-5 text-white" />,
    iconBg: 'bg-[#005db7]',
  },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/member' },
  { label: 'Transactions', icon: Send, href: '/transactions' },
  { label: 'Groups', icon: Users, href: '/groups' },
  { label: 'Loans', icon: CreditCard, href: '/loans' },
  { label: 'Reports', icon: BarChart3, href: '/reports' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

const AVAILABLE_BALANCE = 840250;

function formatRwf(n: number) {
  return n.toLocaleString('fr-RW').replace(/,/g, ' ');
}

export default function WithdrawPage() {
  const [selected, setSelected] = useState<Method>('momo');
  const [rawAmount, setRawAmount] = useState('');

  const selectedMethod = methods.find((m) => m.id === selected)!;

  const numericAmount = parseInt(rawAmount.replace(/\s/g, ''), 10) || 0;
  const fee =
    selected === 'bank'
      ? 200
      : Math.min(Math.round(numericAmount * 0.01), 500);
  const netAmount = Math.max(0, numericAmount - fee);

  const isValid = numericAmount >= 1000 && numericAmount <= AVAILABLE_BALANCE;

  function handleQuickAmount(amount: number) {
    setRawAmount(formatRwf(amount));
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/[^\d]/g, '');
    if (!digits) { setRawAmount(''); return; }
    setRawAmount(formatRwf(parseInt(digits, 10)));
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8ee] text-[#20271f]">
      <div className="flex min-h-screen w-full flex-col border border-[#dfe6d7] bg-[#f5f8ee] lg:flex-row">

        {/* ── Sidebar ── */}
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
              <Link
                key={item.label}
                href={item.href}
                className="flex h-10 shrink-0 items-center gap-3 rounded-[8px] px-3 text-[13px] font-semibold text-[#3f493e] transition hover:bg-white hover:text-[#0f6f29] hover:shadow-sm lg:w-full"
              >
                <item.icon className="h-[17px] w-[17px]" strokeWidth={2} />
                {item.label}
              </Link>
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

        {/* ── Main Content ── */}
        <section className="flex min-w-0 flex-1 flex-col">

          {/* Top Bar */}
          <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-[#e0e7d8] bg-[#f9fbf3]/90 px-4 py-3 backdrop-blur md:px-9">
            <span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#0f6f29]">
              SACCOPlus
            </span>
            <div className="flex items-center gap-4 text-[#596256]">
              <Bell className="h-[17px] w-[17px]" />
              <CircleHelp className="h-[17px] w-[17px]" />
              <div className="h-8 w-8 overflow-hidden rounded-full bg-[#172118]">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                  JB
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-11 lg:py-10">
            <div className="mx-auto max-w-[960px]">

              {/* Editorial Header */}
              <header className="mb-10">
                <Link
                  href="/dashboard/member"
                  className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e8f3e4] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0f6f29] transition hover:bg-[#d6ecce]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Savings
                </Link>
                <h1 className="mt-4 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#1f251e] sm:text-[40px]">
                  Release Your{' '}
                  <span className="text-[#0f6f29]">Savings</span>
                </h1>
                <p className="mt-3 max-w-lg text-[14px] leading-6 text-[#596256]">
                  Transfer funds from your SACCO wallet to your preferred
                  mobile money or bank account. Withdrawals are processed
                  securely under Bank of Rwanda guidelines.
                </p>
              </header>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                {/* ── Form Column ── */}
                <div className="flex flex-col gap-y-6 lg:col-span-7">

                  {/* Step 1: Destination */}
                  <section className="rounded-[24px] bg-white p-7 shadow-sm ring-1 ring-[#e8eee2]">
                    <h2 className="mb-5 text-[16px] font-extrabold text-[#1f251e]">
                      1. Select Destination
                    </h2>
                    <div className="space-y-3">
                      {methods.map((method) => {
                        const active = selected === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelected(method.id)}
                            className={`flex w-full items-center rounded-[14px] p-4 text-left transition-all ${
                              active
                                ? 'border-2 border-[#0f6f29] bg-[#f0faf2]'
                                : 'border-2 border-transparent bg-[#f5f8ee] hover:border-[#c6d9be]'
                            }`}
                          >
                            <div
                              className={`mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] ${method.iconBg}`}
                            >
                              {method.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-extrabold text-[#1f251e]">
                                {method.label}
                              </p>
                              <p className="mt-0.5 text-[11px] text-[#65705f]">
                                {method.detail} &bull; {method.fee}
                              </p>
                            </div>
                            <div
                              className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                                active
                                  ? 'border-[#0f6f29]'
                                  : 'border-[#c2cbb9]'
                              }`}
                            >
                              {active && (
                                <div className="h-2.5 w-2.5 rounded-full bg-[#0f6f29]" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Step 2: Amount */}
                  <section className="rounded-[24px] bg-white p-7 shadow-sm ring-1 ring-[#e8eee2]">
                    <h2 className="mb-5 text-[16px] font-extrabold text-[#1f251e]">
                      2. Enter Withdrawal Amount
                    </h2>

                    {/* Balance chip */}
                    <div className="mb-5 flex items-center gap-2 rounded-[10px] bg-[#eef4e8] px-4 py-2.5">
                      <WalletMinimal className="h-4 w-4 text-[#0f6f29]" />
                      <span className="text-[12px] font-semibold text-[#3f493e]">
                        Available balance:&nbsp;
                        <span className="font-extrabold text-[#0f6f29]">
                          {formatRwf(AVAILABLE_BALANCE)} RWF
                        </span>
                      </span>
                    </div>

                    {/* Amount input */}
                    <div className="mb-6">
                      <label className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0f6f29]">
                        Amount in RWF
                      </label>
                      <div className="flex items-baseline border-b-4 border-[#e8eee2] pb-2 focus-within:border-[#0f6f29] transition-colors">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="10 000"
                          value={rawAmount}
                          onChange={handleAmountChange}
                          className="w-full bg-transparent text-[40px] font-extrabold tracking-tight text-[#1f251e] outline-none placeholder:text-[#d1d8ca] sm:text-[48px]"
                        />
                        <span className="ml-3 shrink-0 text-[20px] font-bold text-[#899384]">
                          RWF
                        </span>
                      </div>
                      {numericAmount > AVAILABLE_BALANCE && (
                        <p className="mt-2 text-[12px] font-semibold text-red-600">
                          Amount exceeds your available balance.
                        </p>
                      )}
                      {numericAmount > 0 && numericAmount < 1000 && (
                        <p className="mt-2 text-[12px] font-semibold text-red-600">
                          Minimum withdrawal is 1 000 RWF.
                        </p>
                      )}
                    </div>

                    {/* Quick amounts */}
                    <div className="mb-4 grid grid-cols-3 gap-3">
                      {[5000, 20000, 50000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleQuickAmount(amt)}
                          className="rounded-[10px] bg-[#f0f5eb] py-3.5 text-[13px] font-extrabold text-[#0f6f29] transition hover:bg-[#0f6f29] hover:text-white active:scale-95"
                        >
                          {formatRwf(amt)}
                        </button>
                      ))}
                    </div>

                    <p className="text-center text-[11px] italic text-[#899384]">
                      Minimum withdrawal: 1 000 RWF
                    </p>
                  </section>
                </div>

                {/* ── Summary Sidebar ── */}
                <div className="flex flex-col gap-y-5 lg:col-span-5">

                  {/* Transaction summary */}
                  <div className="relative overflow-hidden rounded-[24px] bg-[#f0faf2] p-7">
                    <div className="absolute right-4 top-4 opacity-[0.07]">
                      <Send className="h-24 w-24 text-[#0f6f29]" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="mb-5 flex items-center gap-2 text-[13px] font-extrabold text-[#0f6f29]">
                        <ShieldCheck className="h-4 w-4" />
                        Transaction Summary
                      </h3>

                      <div className="space-y-0">
                        <div className="flex items-center justify-between border-t border-[#0f6f29]/10 py-3">
                          <span className="text-[13px] text-[#3f493e]">
                            Withdrawal Amount
                          </span>
                          <span className="text-[13px] font-extrabold text-[#1f251e]">
                            {numericAmount > 0
                              ? `${formatRwf(numericAmount)} RWF`
                              : '— RWF'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#0f6f29]/10 py-3">
                          <span className="text-[13px] text-[#3f493e]">
                            Processing Fee
                          </span>
                          <span className="text-[13px] font-extrabold text-red-600">
                            {numericAmount > 0
                              ? `− ${formatRwf(fee)} RWF`
                              : '—'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t-2 border-[#0f6f29]/20 py-4 mt-1">
                          <span className="text-[14px] font-extrabold text-[#1f251e]">
                            You&apos;ll Receive
                          </span>
                          <span className="text-[22px] font-extrabold text-[#0f6f29]">
                            {numericAmount > 0
                              ? `${formatRwf(netAmount)} RWF`
                              : '— RWF'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 rounded-[10px] bg-white/70 px-4 py-3">
                        <p className="text-[11px] font-semibold text-[#596256]">
                          <span className="font-extrabold text-[#1f251e]">
                            Destination:
                          </span>{' '}
                          {selectedMethod.label}
                        </p>
                        <p className="mt-1 text-[11px] font-semibold text-[#596256]">
                          <span className="font-extrabold text-[#1f251e]">
                            Processing time:
                          </span>{' '}
                          {selectedMethod.processingTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trust badge */}
                  <div className="flex items-center gap-4 rounded-[14px] bg-white p-4 ring-1 ring-[#e8eee2]">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-[#0f6f29]" strokeWidth={2} />
                    <p className="text-[11px] leading-5 text-[#65705f]">
                      Secured by Bank of Rwanda regulations. Withdrawals are
                      protected under the Umurenge SACCO framework.
                    </p>
                  </div>

                  {/* Warning notice */}
                  <div className="rounded-[14px] border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-[11px] font-semibold leading-5 text-amber-800">
                      <span className="font-extrabold">Please note:</span>{' '}
                      Withdrawal requests cannot be cancelled once submitted.
                      Ensure your destination details are correct before confirming.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="button"
                      disabled={!isValid}
                      className="flex w-full items-center justify-center gap-3 rounded-[14px] bg-gradient-to-br from-[#1c862f] to-[#0f6f29] py-5 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(23,122,45,0.28)] transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Confirm Withdrawal
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link
                      href="/dashboard/member"
                      className="flex w-full items-center justify-center rounded-[14px] border-2 border-[#dfe7d9] py-4 text-[13px] font-extrabold text-[#596256] transition hover:bg-[#eef4e8] active:scale-95"
                    >
                      Cancel
                    </Link>
                  </div>

                  {/* Decorative image strip */}
                  <div className="relative mt-2 h-44 overflow-hidden rounded-[20px] shadow-md">
                    <div className="h-full w-full bg-gradient-to-br from-[#1c862f] to-[#3f9650]" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-[#0f6f29]/80 to-transparent p-6">
                      <p className="text-[13px] font-semibold leading-snug text-white">
                        &quot;Inyungu z&apos;umuntu ni inyungu z&apos;umuryango.&quot;
                      </p>
                      <p className="mt-1 text-[11px] text-white/70">
                        One&apos;s prosperity is the community&apos;s prosperity.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#dfe7d9] py-6 text-[11px] text-[#9aa397] md:flex-row md:items-end">
                <div>
                  <p className="text-[13px] font-extrabold text-[#0f6f29]">SACCOPlus</p>
                  <p className="mt-1 uppercase tracking-[0.16em]">
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
    </main>
  );
}
