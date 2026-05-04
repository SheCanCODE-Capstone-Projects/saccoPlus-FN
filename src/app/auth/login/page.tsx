'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/hooks/redux';
import { loginUser } from '@/store/slices/authSlice';

// ── Validation Schema ──
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ── Component ──
export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      
      // Route based on user role
      const roleRoutes: Record<string, string> = {
        MEMBER: '/dashboard/member',
        GROUP_MEMBER: '/dashboard/member',
        GROUP_LEADER: '/dashboard/group',
        LOAN_OFFICER: '/dashboard/loan-officer',
        ADMIN: '/dashboard/admin',
      };

      router.push(roleRoutes[result.user.role] ?? '/dashboard/member');
    } catch (error: any) {
      toast.error(error?.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
          {/* Background Image */}
          <div className="relative w-full aspect-video">
            <Image
              src="/login-showcase.jpeg"
              alt="SACCOPlus Login Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-white/5" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center px-6 py-8 sm:px-10 lg:px-16">
            <div className="grid w-full gap-12 items-center lg:grid-cols-2">
              {/* ── Left Section: Branding ── */}
              <LeftSection />

              {/* ── Right Section: Login Form ── */}
              <RightSection 
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                loading={loading}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// ── Left Section: Branding ──
function LeftSection() {
  return (
    <div className="max-w-md space-y-8">
      {/* Logo & Brand */}
      <div className="inline-flex items-center gap-3 rounded-full bg-white/85 px-4 py-2 backdrop-blur shadow-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sacco-green text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2L3 7v7c0 5 3.3 9.7 9 11 5.7-1.3 9-6 9-11V7l-9-5z" />
          </svg>
        </div>
        <span className="text-lg font-semibold text-sacco-green">SACCOPlus</span>
      </div>

      {/* Headline */}
      <div className="space-y-3">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
          Nurturing <span className="text-sacco-green italic">Community</span> Wealth.
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Access your savings, manage group contributions, and grow your future with the digital heart of Rwandan finance.
        </p>
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-4">
        {/* Avatars */}
        <div className="flex -space-x-3">
          {['AN', 'JM', 'KL'].map((initials, idx) => (
            <div
              key={initials}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md"
              style={{
                backgroundColor: ['#38bdf8', '#fbbf24', '#10b981'][idx],
              }}
            >
              {initials}
            </div>
          ))}
        </div>
        <div>
          <p className="font-semibold text-slate-900">50,000+ Members</p>
          <p className="text-sm text-slate-600">Across Rwanda</p>
        </div>
      </div>
    </div>
  );
}

// ── Right Section: Login Form ──
interface RightSectionProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  register: any;
  errors: any;
  loading: boolean;
}

function RightSection({ onSubmit, register, errors, loading }: RightSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md lg:justify-self-end">
      {/* Card */}
      <div className="rounded-3xl border border-white/50 bg-white/90 backdrop-blur px-8 py-10 shadow-2xl shadow-slate-400/20">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-600">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <FormField
            label="Phone Number or Email"
            error={errors.email?.message}
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                {...register('email')}
                type="email"
                placeholder="+250 78X XXX XXX"
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm transition focus:border-sacco-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sacco-green/20"
              />
            </div>
          </FormField>

          {/* Password Field */}
          <FormField
            label="Password"
            error={errors.password?.message}
            action={
              <a href="#" className="text-xs font-semibold text-sacco-green hover:text-sacco-dark">
                Forgot password?
              </a>
            }
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-sm transition focus:border-sacco-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sacco-green/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM10 3.5a6.5 6.5 0 014.72 11.043l-1.29-1.29A4.5 4.5 0 105.57 7.57L4.28 8.86A6.471 6.471 0 0110 3.5zm0 13a6.471 6.471 0 01-5.72-3.5H.5a8 8 0 0015-4.72l1.29 1.29A6.5 6.5 0 0110 16.5z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </FormField>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sacco-green px-4 py-3 font-semibold text-white transition hover:bg-sacco-dark active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-sacco-green/30"
          >
            {loading ? 'Logging in...' : 'Log Into Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-slate-600">
          Don't have an account yet?{' '}
          <Link href="/register" className="font-semibold text-sacco-green hover:text-sacco-dark">
            Register for SACCOPlus →
          </Link>
        </p>
      </div>

      {/* Footer Links */}
      <div className="mt-6 flex justify-center gap-2 text-xs text-slate-600">
        <a href="#" className="hover:text-slate-900 transition">Privacy Policy</a>
        <span className="text-slate-400">•</span>
        <a href="#" className="hover:text-slate-900 transition">Terms of Service</a>
        <span className="text-slate-400">•</span>
        <a href="#" className="hover:text-slate-900 transition">Contact Support</a>
      </div>
    </div>
  );
}

// ── Helper Component: Form Field ──
interface FormFieldProps {
  label: string;
  error?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function FormField({ label, error, action, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
          {label}
        </label>
        {action}
      </div>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

