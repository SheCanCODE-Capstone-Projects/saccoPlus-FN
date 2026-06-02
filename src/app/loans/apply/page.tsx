'use client';

import Link from 'next/link';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { mockLoanApplication, delay } from '@/lib/mockData';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  LogOut,
  MessageSquare,
  Phone,
  Send,
  Settings,
  ShieldCheck,
  Upload,
  Users,
  X,
} from 'lucide-react';

/* ─── Constants ─── */
const ANNUAL_RATE = 0.125;
const MIN_AMOUNT = 500000;
const MAX_AMOUNT = 5000000;
const AMOUNT_STEP = 50000;

const DURATIONS = [
  { label: '6 Months', value: 6 },
  { label: '12 Months', value: 12 },
  { label: '18 Months', value: 18 },
  { label: '24 Months', value: 24 },
];

const LOAN_PURPOSES = [
  'Agriculture',
  'Business Expansion',
  'School Fees',
  'Healthcare',
  'Home Improvement',
  'Emergency',
];

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/member' },
  { label: 'Transactions', icon: Send, href: '/transactions' },
  { label: 'Groups', icon: Users, href: '/groups' },
  { label: 'Loans', icon: CreditCard, href: '/loans' },
  { label: 'Reports', icon: BarChart3, href: '/reports' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

const STEPS = ['Details', 'Documents', 'Review'];

/* ─── Helpers ─── */
function fmtRwf(n: number) {
  return Math.round(n)
    .toLocaleString('fr-RW')
    .replace(/,/g, ' ');
}

function calcMonthly(principal: number, months: number) {
  const r = ANNUAL_RATE / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

interface UploadedFile {
  name: string;
  size: number;
}

/* ─── Page ─── */
export default function LoanApplicationPage() {
  const router = useRouter();
  const userId = useSelector((s: RootState) => s.auth.user?.id);
  const [submitting, setSubmitting] = useState(false);

  /* step */
  const [step, setStep] = useState(1);

  /* step 1 */
  const [amount, setAmount] = useState(1250000);
  const [duration, setDuration] = useState(12);
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');

  /* step 2 */
  const [nationalId, setNationalId] = useState<UploadedFile | null>(null);
  const [proofOfIncome, setProofOfIncome] = useState<UploadedFile | null>(null);
  const [businessPlan, setBusinessPlan] = useState<UploadedFile | null>(null);

  const idRef = useRef<HTMLInputElement>(null);
  const incomeRef = useRef<HTMLInputElement>(null);
  const planRef = useRef<HTMLInputElement>(null);

  /* live calc */
  const monthly = calcMonthly(amount, duration);
  const totalRepayment = monthly * duration;
  const totalInterest = totalRepayment - amount;

  /* validation */
  const step1Valid = purpose !== '' && description.trim().length >= 10;
  const step2Valid = nationalId !== null && proofOfIncome !== null;

  const sliderPct = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  async function handleSubmitApplication() {
    if (!userId) { toast.error('You must be logged in to apply.'); return; }
    setSubmitting(true);
    try {
      await delay(800);
      const data = mockLoanApplication({ amount, duration, purpose });
      toast.success(data.message || 'Loan application submitted!');
      router.push('/loans');
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to submit loan application.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleFile(
    e: ChangeEvent<HTMLInputElement>,
    setter: (f: UploadedFile | null) => void,
  ) {
    const file = e.target.files?.[0];
    if (file) setter({ name: file.name, size: file.size });
    e.target.value = '';
  }

  function fmtBytes(b: number) {
    return b < 1024 * 1024
      ? `${(b / 1024).toFixed(0)} KB`
      : `${(b / (1024 * 1024)).toFixed(1)} MB`;
  }

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
                  item.label === 'Loans' ? 'bg-white text-[#0f6f29] shadow-sm' : 'text-[#3f493e]'
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
            <div className="mx-auto max-w-[1100px]">

              {/* Back link */}
              <Link
                href="/loans"
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e8f3e4] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0f6f29] transition hover:bg-[#d6ecce]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Loans
              </Link>

              <div className="flex flex-col gap-8 lg:flex-row">

                {/* ─── Left: Form ─── */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <header className="mb-8">
                    <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.03em] text-[#0f6f29] sm:text-[36px]">
                      Loan Application
                    </h1>
                    <p className="mt-2 text-[14px] leading-6 text-[#596256]">
                      Hello, <span className="font-extrabold text-[#1f251e]">Jean Claude</span>. Let&apos;s
                      get your project funded. Every step forward is a step toward community growth.
                    </p>
                  </header>

                  {/* Stepper */}
                  <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-1">
                    {STEPS.map((label, i) => {
                      const n = i + 1;
                      const done = step > n;
                      const active = step === n;
                      return (
                        <div key={label} className="flex items-center gap-3">
                          <div className="flex shrink-0 items-center gap-2">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-extrabold transition-colors ${
                                done
                                  ? 'bg-[#0f6f29] text-white'
                                  : active
                                  ? 'bg-[#0f6f29] text-white'
                                  : 'bg-[#e5eadf] text-[#899384]'
                              }`}
                            >
                              {done ? <Check className="h-4 w-4" /> : n}
                            </span>
                            <span
                              className={`text-[13px] font-extrabold ${
                                active ? 'text-[#0f6f29]' : done ? 'text-[#596256]' : 'text-[#899384]'
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`h-px w-8 shrink-0 ${step > n ? 'bg-[#0f6f29]' : 'bg-[#dfe7d9]'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Form Card */}
                  <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2] md:p-8">

                    {/* ── Step 1: Loan Details ── */}
                    {step === 1 && (
                      <div className="space-y-8">
                        {/* Amount Slider */}
                        <div className="space-y-3">
                          <div className="flex items-end justify-between">
                            <label className="text-[14px] font-extrabold text-[#1f251e]">
                              Amount Requested
                            </label>
                            <span className="text-[22px] font-extrabold text-[#0f6f29]">
                              {fmtRwf(amount)}{' '}
                              <span className="text-[12px] font-semibold text-[#899384]">RWF</span>
                            </span>
                          </div>
                          <input
                            type="range"
                            min={MIN_AMOUNT}
                            max={MAX_AMOUNT}
                            step={AMOUNT_STEP}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
                            style={{
                              background: `linear-gradient(to right, #0f6f29 ${sliderPct}%, #e8eee2 ${sliderPct}%)`,
                              accentColor: '#0f6f29',
                            }}
                          />
                          <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#899384]">
                            <span>500 000 RWF</span>
                            <span>5 000 000 RWF</span>
                          </div>
                        </div>

                        {/* Duration + Purpose */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-[13px] font-extrabold text-[#1f251e]">
                              Repayment Duration
                            </label>
                            <div className="relative">
                              <select
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="w-full appearance-none rounded-[12px] border border-[#e1e8db] bg-[#f5f8ee] px-4 py-3 text-[13px] font-semibold text-[#1f251e] outline-none transition focus:border-[#0f6f29] focus:ring-2 focus:ring-[#0f6f29]/10"
                              >
                                {DURATIONS.map((d) => (
                                  <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#899384]" />
                            </div>
                            <p className="text-[11px] italic text-[#899384]">
                              Longer terms offer lower monthly payments.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[13px] font-extrabold text-[#1f251e]">
                              Purpose of Loan
                            </label>
                            <div className="relative">
                              <select
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                className="w-full appearance-none rounded-[12px] border border-[#e1e8db] bg-[#f5f8ee] px-4 py-3 text-[13px] font-semibold text-[#1f251e] outline-none transition focus:border-[#0f6f29] focus:ring-2 focus:ring-[#0f6f29]/10"
                              >
                                <option value="">Select a purpose</option>
                                {LOAN_PURPOSES.map((p) => (
                                  <option key={p} value={p}>{p}</option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#899384]" />
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <label className="text-[13px] font-extrabold text-[#1f251e]">
                            Brief Description
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Briefly describe how you plan to use this loan and how you intend to repay it..."
                            className="w-full resize-none rounded-[12px] border border-[#e1e8db] bg-[#f5f8ee] px-4 py-3 text-[13px] font-medium text-[#1f251e] outline-none transition placeholder:text-[#b0b9aa] focus:border-[#0f6f29] focus:ring-2 focus:ring-[#0f6f29]/10"
                          />
                          <p className={`text-right text-[11px] font-semibold ${description.trim().length < 10 && description.length > 0 ? 'text-red-500' : 'text-[#899384]'}`}>
                            {description.trim().length} / 10 min. characters
                          </p>
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            disabled={!step1Valid}
                            onClick={() => setStep(2)}
                            className="flex items-center gap-3 rounded-[14px] bg-gradient-to-br from-[#1c862f] to-[#0f6f29] px-8 py-4 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(23,122,45,0.28)] transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Continue to Documents
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── Step 2: Documents ── */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-[16px] font-extrabold text-[#1f251e]">Required Documents</h2>
                          <p className="mt-1 text-[13px] text-[#596256]">
                            Upload clear scans or photos. Accepted formats: PDF, JPG, PNG — max 5 MB each.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <UploadZone
                            label="National ID"
                            hint="Front & back scan"
                            icon={<FileText className="h-7 w-7" />}
                            file={nationalId}
                            required
                            onClear={() => setNationalId(null)}
                            onClick={() => idRef.current?.click()}
                          />
                          <input
                            ref={idRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFile(e, setNationalId)}
                          />

                          <UploadZone
                            label="Proof of Income"
                            hint="Last 3 payslips or bank statement"
                            icon={<FileText className="h-7 w-7" />}
                            file={proofOfIncome}
                            required
                            onClear={() => setProofOfIncome(null)}
                            onClick={() => incomeRef.current?.click()}
                          />
                          <input
                            ref={incomeRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFile(e, setProofOfIncome)}
                          />

                          <UploadZone
                            label="Business Plan"
                            hint="Optional — may improve approval odds"
                            icon={<FileText className="h-7 w-7" />}
                            file={businessPlan}
                            required={false}
                            onClear={() => setBusinessPlan(null)}
                            onClick={() => planRef.current?.click()}
                          />
                          <input
                            ref={planRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFile(e, setBusinessPlan)}
                          />
                        </div>

                        {/* Trust note */}
                        <div className="flex items-start gap-3 rounded-[12px] bg-[#eef4e8] p-4">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6f29]" />
                          <p className="text-[12px] leading-5 text-[#3f493e]">
                            Your documents are encrypted and stored securely in compliance with Rwanda&apos;s Data
                            Protection Act. They are only used for loan processing.
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex items-center justify-center gap-2 rounded-[14px] border-2 border-[#dfe7d9] px-6 py-3.5 text-[13px] font-extrabold text-[#596256] transition hover:bg-[#eef4e8] active:scale-95"
                          >
                            <ArrowLeft className="h-4 w-4" /> Back
                          </button>
                          <button
                            type="button"
                            disabled={!step2Valid}
                            onClick={() => setStep(3)}
                            className="flex items-center gap-3 rounded-[14px] bg-gradient-to-br from-[#1c862f] to-[#0f6f29] px-8 py-3.5 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(23,122,45,0.28)] transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Review Application
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── Step 3: Review ── */}
                    {step === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-[16px] font-extrabold text-[#1f251e]">Review Your Application</h2>
                          <p className="mt-1 text-[13px] text-[#596256]">
                            Please confirm all details are correct before submitting.
                          </p>
                        </div>

                        {/* Loan details summary */}
                        <div className="rounded-[16px] bg-[#f5f8ee] p-5">
                          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#899384]">
                            Loan Details
                          </p>
                          <div className="space-y-3">
                            <ReviewRow label="Loan Amount" value={`${fmtRwf(amount)} RWF`} />
                            <ReviewRow label="Repayment Duration" value={`${duration} Months`} />
                            <ReviewRow label="Purpose" value={purpose} />
                            <ReviewRow label="Monthly Instalment" value={`${fmtRwf(monthly)} RWF`} highlight />
                            <ReviewRow label="Total Interest" value={`${fmtRwf(totalInterest)} RWF`} />
                            <ReviewRow label="Total Repayment" value={`${fmtRwf(totalRepayment)} RWF`} />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="rounded-[16px] bg-[#f5f8ee] p-5">
                          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#899384]">
                            Your Description
                          </p>
                          <p className="text-[13px] leading-6 text-[#3f493e]">{description}</p>
                        </div>

                        {/* Documents */}
                        <div className="rounded-[16px] bg-[#f5f8ee] p-5">
                          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#899384]">
                            Uploaded Documents
                          </p>
                          <div className="space-y-2.5">
                            <DocRow label="National ID" file={nationalId} />
                            <DocRow label="Proof of Income" file={proofOfIncome} />
                            {businessPlan && <DocRow label="Business Plan" file={businessPlan} />}
                          </div>
                        </div>

                        {/* Declaration */}
                        <div className="rounded-[16px] border border-[#e1e8db] bg-white p-5 text-[12px] leading-6 text-[#596256]">
                          By submitting this application, I confirm that all information provided is accurate and
                          complete. I understand that providing false information may result in immediate loan
                          cancellation and legal consequences as governed by the National Bank of Rwanda.
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="flex items-center justify-center gap-2 rounded-[14px] border-2 border-[#dfe7d9] px-6 py-3.5 text-[13px] font-extrabold text-[#596256] transition hover:bg-[#eef4e8] active:scale-95"
                          >
                            <ArrowLeft className="h-4 w-4" /> Edit Documents
                          </button>
                          <button
                            type="button"
                            disabled={submitting}
                            onClick={handleSubmitApplication}
                            className="flex items-center gap-3 rounded-[14px] bg-gradient-to-br from-[#1c862f] to-[#0f6f29] px-8 py-3.5 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(23,122,45,0.28)] transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {submitting ? 'Submitting...' : 'Submit Application'}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* ─── Right: Sticky sidebar ─── */}
                <div className="w-full lg:w-[320px] lg:shrink-0">
                  <div className="flex flex-col gap-5 lg:sticky lg:top-6">

                    {/* Repayment estimate */}
                    <div className="relative overflow-hidden rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2]">
                      <div className="absolute right-4 top-4 opacity-[0.06]">
                        <CreditCard className="h-20 w-20 text-[#0f6f29]" />
                      </div>
                      <p className="mb-5 text-[10px] font-extrabold uppercase tracking-widest text-[#899384]">
                        Estimated Repayment
                      </p>
                      <div className="mb-6">
                        <span className="text-[44px] font-extrabold leading-none tracking-tight text-[#0f6f29]">
                          {fmtRwf(monthly)}
                        </span>
                        <span className="ml-2 text-[15px] font-bold text-[#899384]">RWF</span>
                        <p className="mt-1 text-[13px] text-[#596256]">Monthly instalment</p>
                      </div>
                      <div className="space-y-0">
                        <div className="flex justify-between border-b border-[#f0f4eb] py-3">
                          <span className="text-[12px] text-[#899384]">Interest Rate (Annual)</span>
                          <span className="text-[12px] font-extrabold text-[#1f251e]">12.5%</span>
                        </div>
                        <div className="flex justify-between border-b border-[#f0f4eb] py-3">
                          <span className="text-[12px] text-[#899384]">Total Interest</span>
                          <span className="text-[12px] font-extrabold text-[#1f251e]">
                            {fmtRwf(totalInterest)} RWF
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[12px] text-[#899384]">Total Repayment</span>
                          <span className="text-[12px] font-extrabold text-[#1f251e]">
                            {fmtRwf(totalRepayment)} RWF
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Member tip */}
                    <div className="rounded-[24px] bg-[#dce8ff] p-6">
                      <div className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                          <Lightbulb className="h-4 w-4 text-[#005db7]" strokeWidth={2} />
                        </div>
                        <div>
                          <h5 className="text-[13px] font-extrabold text-[#1a2e4a]">Member Tip</h5>
                          <p className="mt-1.5 text-[12px] leading-5 text-[#1a2e4a]/75">
                            Jean Claude, members who select{' '}
                            <span className="font-bold">Agriculture</span> may qualify for
                            our <span className="font-bold">Green Growth</span> subsidy,
                            reducing interest by 0.5%.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Support */}
                    <div className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-[#e8eee2]">
                      <h5 className="mb-4 text-[13px] font-extrabold text-[#1f251e]">Need help?</h5>
                      <div className="flex flex-col gap-3">
                        <a
                          href="tel:+250788000000"
                          className="flex items-center gap-3 text-[13px] font-semibold text-[#0f6f29] hover:underline"
                        >
                          <Phone className="h-4 w-4 shrink-0" />
                          Call +250 788 000 000
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-3 text-[13px] font-semibold text-[#0f6f29] hover:underline"
                        >
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          Live Chat with an Agent
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

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

function UploadZone({
  label,
  hint,
  icon,
  file,
  required,
  onClick,
  onClear,
}: {
  label: string;
  hint: string;
  icon: React.ReactNode;
  file: UploadedFile | null;
  required: boolean;
  onClick: () => void;
  onClear: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed p-6 text-center transition-all ${
        file
          ? 'border-[#0f6f29] bg-[#f0faf2]'
          : 'border-[#c6d9be] bg-[#f5f8ee] hover:border-[#0f6f29] hover:bg-[#eef4e8]'
      }`}
    >
      {file ? (
        <>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0f6f29]">
            <Check className="h-5 w-5 text-white" />
          </div>
          <p className="max-w-[160px] truncate text-[13px] font-extrabold text-[#0f6f29]">{file.name}</p>
          <p className="mt-0.5 text-[11px] text-[#65705f]">
            {file.size < 1024 * 1024
              ? `${(file.size / 1024).toFixed(0)} KB`
              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
          </p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-700"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        </>
      ) : (
        <>
          <div className="mb-2 text-[#899384] group-hover:text-[#0f6f29] transition-colors">
            {icon}
          </div>
          <p className="text-[13px] font-extrabold text-[#1f251e]">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </p>
          <p className="mt-0.5 text-[11px] text-[#899384]">{hint}</p>
          <div className="mt-3 flex items-center gap-1.5 rounded-full bg-[#e8f3e4] px-3 py-1 text-[11px] font-extrabold text-[#0f6f29]">
            <Upload className="h-3 w-3" /> Upload
          </div>
        </>
      )}
    </div>
  );
}

function ReviewRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#e8eee2] pb-3 last:border-0 last:pb-0">
      <span className="text-[12px] text-[#65705f]">{label}</span>
      <span className={`text-[13px] font-extrabold ${highlight ? 'text-[#0f6f29]' : 'text-[#1f251e]'}`}>
        {value}
      </span>
    </div>
  );
}

function DocRow({ label, file }: { label: string; file: UploadedFile | null }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${file ? 'bg-[#0f6f29]' : 'bg-[#e8eee2]'}`}>
        {file
          ? <Check className="h-3.5 w-3.5 text-white" />
          : <X className="h-3.5 w-3.5 text-[#899384]" />
        }
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[13px] font-extrabold text-[#1f251e]">{label}</span>
        {file && (
          <span className="ml-2 max-w-[180px] truncate text-[11px] text-[#65705f]">
            — {file.name}
          </span>
        )}
      </div>
    </div>
  );
}
