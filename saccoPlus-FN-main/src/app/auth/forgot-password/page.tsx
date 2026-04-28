'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { authApi } from '@/lib/api/auth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ email }: ForgotPasswordForm) => {
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      setSubmittedEmail(email);
      toast.success('Password reset instructions sent to your email.');
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Unable to send reset instructions right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">S+</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email address and we&apos;ll send you reset instructions.
          </p>
        </div>

        {submittedEmail ? (
          <div className="space-y-5">
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-900">
              We&apos;ve sent a password reset link to <span className="font-semibold">{submittedEmail}</span>.
              Check your inbox and spam folder, then follow the link to create a new password.
            </div>

            <button
              type="button"
              onClick={() => setSubmittedEmail(null)}
              className="btn-secondary w-full"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                {...register('email')}
                type="email"
                className="input-field"
                placeholder="your@email.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Sending reset link...' : 'Send reset link'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{' '}
          <Link href="/auth/login" className="text-primary-600 font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
