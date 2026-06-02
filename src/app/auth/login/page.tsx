'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/hooks/redux';
import { loginUser } from '@/store/slices/authSlice';

const loginSchema = z.object({
  email: z.string().min(3, 'Please enter your phone number or national ID'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const backgroundImage = '/images/Hero%20Background%20Canvas.png';
const brandingImage =
  '/images/Branding%20%26%20Value%20Proposition%20%28Editorial%20Side%29.png';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await dispatch(loginUser(data)).unwrap();

      const roleRoutes: Record<string, string> = {
        MEMBER: '/dashboard/member',
        GROUP_MEMBER: '/dashboard/member',
        GROUP_LEADER: '/dashboard/group',
        LOAN_OFFICER: '/dashboard/loan-officer',
        ADMIN: '/dashboard/admin',
      };

      const from = searchParams.get('from');
      router.push(from ?? roleRoutes[result.user.role] ?? '/dashboard/member');
    } catch (error: any) {
      toast.error(error?.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-[#eef3e7] text-[#20241f]">
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      <div className="relative z-10 grid min-h-screen w-full grid-cols-[minmax(290px,1fr)_minmax(360px,0.9fr)] items-center gap-8 px-[clamp(16px,4.4vw,60px)] py-[clamp(22px,4vh,48px)] max-md:grid-cols-1 max-md:gap-4">
        <section className="flex h-full items-center max-md:hidden">
          <img
            src={brandingImage}
            alt="SACCOPlus nurturing community wealth"
            className="w-[clamp(350px,43vw,514px)] max-w-full select-none"
            draggable={false}
          />
        </section>

        <section className="flex h-full flex-col items-center justify-center md:items-end">
          <LoginForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            loading={loading}
          />
        </section>
      </div>
    </main>
  );
}

interface LoginFormProps {
  onSubmit: () => Promise<void>;
  register: ReturnType<typeof useForm<LoginFormData>>['register'];
  errors: ReturnType<typeof useForm<LoginFormData>>['formState']['errors'];
  loading: boolean;
}

function LoginForm({ onSubmit, register, errors, loading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[560px] md:max-w-[378px] lg:max-w-[560px]">
      <div className="rounded-[22px] bg-[#f7f9ef]/80 px-[clamp(18px,4.1vw,52px)] py-[clamp(24px,5.1vh,42px)] shadow-[0_22px_60px_rgba(72,86,61,0.12)] backdrop-blur-md sm:rounded-[28px]">
        <div>
          <h1 className="text-[clamp(22px,2.1vw,24px)] font-extrabold tracking-[-0.03em] text-[#20241f]">
            Welcome Back
          </h1>
          <p className="mt-2 text-[13px] leading-5 text-[#62695f]">
            Please enter your credentials to access your account.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-[clamp(24px,4vh,32px)] space-y-[clamp(16px,2.8vh,20px)]"
        >
          <FormField
            label="Phone Number or National ID"
            error={errors.email?.message}
          >
            <div className="flex h-[42px] items-center gap-4 rounded-[10px] bg-[#e9ede1] px-4 text-[#5b6359] transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#197b2f]/20 lg:h-14">
              <UserRound
                className="h-[16px] w-[16px] shrink-0"
                strokeWidth={2.1}
              />
              <input
                {...register('email')}
                type="text"
                placeholder="+250 78X XXX XXX"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#20241f] outline-none placeholder:text-[#8c938a]"
              />
            </div>
          </FormField>

          <FormField
            label="Password"
            error={errors.password?.message}
            action={
              <a
                href="#"
                className="whitespace-nowrap text-[12px] font-extrabold text-[#117028] transition hover:text-[#0d5b20]"
              >
                Forgot Password?
              </a>
            }
          >
            <div className="flex h-[42px] items-center gap-4 rounded-[10px] bg-[#e9ede1] px-4 text-[#5b6359] transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#197b2f]/20 lg:h-14">
              <LockKeyhole
                className="h-[16px] w-[16px] shrink-0"
                strokeWidth={2.1}
              />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#20241f] outline-none placeholder:text-[#6d746b]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="shrink-0 text-[#485046] transition hover:text-[#20241f]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-[16px] w-[16px]" />
                ) : (
                  <Eye className="h-[16px] w-[16px]" />
                )}
              </button>
            </div>
          </FormField>

          <button
            type="submit"
            disabled={loading}
            className="h-[42px] w-full rounded-[10px] bg-[#238035] text-[13px] font-extrabold text-white shadow-[0_12px_20px_rgba(35,128,53,0.32)] transition hover:bg-[#1b6f2c] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 lg:h-14"
          >
            {loading ? 'Logging in...' : 'Log Into Account'}
          </button>
        </form>

        <div className="my-[clamp(16px,3vh,22px)] flex items-center gap-5">
          <div className="h-px flex-1 bg-[#dde3d5]" />
          <span className="text-[12px] text-[#777f74]">or</span>
          <div className="h-px flex-1 bg-[#dde3d5]" />
        </div>

        <p className="text-center text-[12px] text-[#5d665b]">
          Don&apos;t have an account yet?
          <Link
            href="/auth/register"
            className="mt-3 flex items-center justify-center gap-2 font-extrabold text-[#117028] transition hover:text-[#0d5b20]"
          >
            Register for SACCOPlus <span aria-hidden="true">-&gt;</span>
          </Link>
        </p>
      </div>

      <footer className="mt-[clamp(18px,4vh,28px)] flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] text-[#71786e]">
        <a href="#" className="transition hover:text-[#20241f]">
          Privacy Policy
        </a>
        <a href="#" className="transition hover:text-[#20241f]">
          Terms of Service
        </a>
        <a href="#" className="transition hover:text-[#20241f]">
          Contact Support
        </a>
      </footer>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

function FormField({ label, error, action, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label className="block text-[12px] font-bold text-[#20241f]">
          {label}
        </label>
        {action}
      </div>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
