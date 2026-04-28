'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ChevronRight, User, Phone, Lock, Eye, EyeOff, Shield, Building } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters').max(100),
  nationalId: z
    .string()
    .length(16, 'National ID must be exactly 16 digits')
    .regex(/^\d{16}$/, 'National ID must contain only digits'),
  phone: z
    .string()
    .regex(/^(\+?250|0)[78]\d{8}$/, 'Enter a valid Rwandan number (+250 or 07x/08x)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

const STEPS = [
  { label: 'Account Type',    sub: 'Selected: Individual' },
  { label: 'Personal Details', sub: 'Step 2 of 3' },
  { label: 'Verification',    sub: 'Documents & Biometrics' },
];

export default function RegisterIndividualPage() {
  const router = useRouter();
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      // TODO: replace with real API call → POST /api/v1/auth/register
      await new Promise((r) => setTimeout(r, 1200));
      toast.success('Account created! Please verify your details.');
      router.push('/auth/register/verify');
    } catch (err: any) {
      toast.error(err?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">

      {/* ── Left sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-8 shrink-0">
        <div className="mb-12">
          <span className="font-black text-xl text-primary-700 tracking-tight">SACCOPlus</span>
          <p className="text-xs text-gray-500 mt-1">Community Growth</p>
        </div>

        <div className="mb-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Registration Progress
          </p>
          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const isDone   = i === 0;
              const isActive = i === 1;
              return (
                <div key={step.label} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold
                    ${isDone || isActive ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold
                      ${isActive ? 'text-primary-600' : isDone ? 'text-gray-700' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400">{step.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-primary-50 rounded-xl p-4 border border-primary-100">
          <div className="flex items-start gap-2">
            <Shield size={16} className="text-primary-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1">Secure & Encrypted</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your data is protected by bank-grade AES-256 encryption and Rwandan data privacy laws.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main form area ── */}
      <main className="flex-1 flex flex-col">

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <span className="font-black text-lg text-primary-700">SACCOPlus</span>
          <Link href="/auth/register" className="text-sm text-primary-600 font-semibold">← Back</Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <h1 className="font-black text-3xl text-gray-900 mb-2">Join the Community</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tell us a bit about yourself. This information helps us secure your
                account and tailor our services to your needs.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="e.g., Aline Uwimana"
                    className="input-field pl-9"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              {/* National ID + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">National ID</label>
                  <div className="relative">
                    <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('nationalId')}
                      type="text"
                      maxLength={16}
                      placeholder="16-digit ID"
                      className="input-field pl-9"
                    />
                  </div>
                  {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+250 78X XXX XXX"
                      className="input-field pl-9"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Security Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input-field pl-9 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters with one number.</p>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('confirmPassword')}
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input-field pl-9 pr-10"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Link href="/auth/register" className="btn-secondary flex items-center gap-2">
                  Back
                </Link>
                <button type="submit" disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>Continue to Step 3 <ChevronRight size={16} /></>
                  )}
                </button>
              </div>

            </form>

            <p className="text-center text-xs text-gray-400 mt-8">
              Need help?{' '}
              <Link href="#" className="text-primary-600 hover:underline">Visit our Help Center</Link>
              {' '}or call <span className="font-semibold text-gray-600">0780 000 000</span>.
            </p>

          </div>
        </div>

        <footer className="px-8 py-5 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3 bg-white/50">
          <p className="text-xs text-gray-400">© 2024 SACCOPLUS. ROOTED IN RWANDA.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'RWF Rates', 'Contact Us'].map((item) => (
              <Link key={item} href="#" className="text-xs text-gray-400 hover:text-primary-600 uppercase tracking-widest transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </footer>

      </main>
    </div>
  );
}