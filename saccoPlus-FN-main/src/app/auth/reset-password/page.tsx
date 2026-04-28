'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { authApi } from '@/lib/api/auth';
import Link from 'next/link';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link. Please request a new password reset.');
      router.push('/auth/forgot-password');
    }
  }, [token, router]);

  const onSubmit = async ({ password }: ResetPasswordForm) => {
    if (!token) return;

    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      toast.success('Password reset successfully. You can now log in with your new password.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Unable to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
        <div className="card w-full max-w-md text-center">
          <p className="text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">S+</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
            <input
              {...register('password')}
              type="password"
              className="input-field"
              placeholder="Enter new password"
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="input-field"
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Resetting password...' : 'Reset password'}
          </button>
        </form>

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