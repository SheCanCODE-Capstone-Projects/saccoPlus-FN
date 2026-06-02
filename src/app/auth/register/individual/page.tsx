'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, User, CreditCard, Phone, Lock } from 'lucide-react';
import RegisterLayout from '@/components/auth/RegisterLayout';
import { mockRegister, delay } from '@/lib/mockData';

const schema = z.object({
  fullName:   z.string().min(2, 'Full name is required'),
  email:      z.string().email('Enter a valid email address'),
  nationalId: z.string().min(16, 'Enter a valid National ID').max(16, 'Must be 16 characters'),
  phoneNumber: z.string().regex(/^\+?250[0-9]{9}$/, 'Enter a valid Rwandan phone number (+250...)'),
  password:   z.string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[0-9]/, 'Must contain at least one number'),
});
type FormData = z.infer<typeof schema>;

const steps = [
  { n: 1, label: 'Account Type',     sub: 'Selected: Individual', done: true   },
  { n: 2, label: 'Personal Details', sub: 'Step 2 of 3',          active: true },
  { n: 3, label: 'Verification',     sub: 'Documents & Biometrics'              },
];

const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent shadow-sm';
const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5';

export default function IndividualRegisterPage() {
  const router = useRouter();
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await delay(800);
      mockRegister({
        fullName:    data.fullName,
        email:       data.email,
        phoneNumber: data.phoneNumber,
        nationalId:  data.nationalId,
      });
      toast.success('Account created! Please log in.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterLayout steps={steps}>
      <div className="w-full max-w-[600px] px-4 md:px-6 pt-6 md:pt-8 lg:pt-12 pb-12">

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Join the Community</h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Tell us a bit about yourself. This information helps us secure your account
          and tailor our services to your needs.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">

          {/* Full Name */}
          <div>
            <label className={labelCls}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('fullName')}
                className={inputCls}
                style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                placeholder="e.g., Aline Uwimana"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                className={inputCls}
                style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                placeholder="e.g., aline@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* National ID + Phone — 1 col mobile, 2 col md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>National ID Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('nationalId')}
                  className={inputCls}
                  style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                  placeholder="1 19XX B XXXX XXX X XX"
                  maxLength={16}
                />
              </div>
              {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('phoneNumber')}
                  className={inputCls}
                  style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                  placeholder="+250 7X XXX XXX"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={labelCls}>Security Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('password')}
                type={showPass ? 'text' : 'password'}
                className={inputCls}
                style={{ height: '44px', paddingLeft: '36px', paddingRight: '40px' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              ⓘ Must be at least 8 characters with one number.
            </p>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Buttons — full width on mobile, auto on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center font-semibold text-sm text-white rounded-full shadow-md disabled:opacity-50 hover:opacity-90 transition-opacity px-7 w-full sm:w-auto"
              style={{ height: '44px', backgroundColor: '#166534' }}
            >
              {loading ? 'Creating account...' : 'Continue to Step 3 →'}
            </button>
            <Link
              href="/auth/register"
              className="flex items-center justify-center text-sm text-gray-500 hover:text-gray-700 font-medium w-full sm:w-auto"
              style={{ height: '44px' }}
            >
              Back
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden mb-2 mx-auto">
            <Image src="/images/Img - SACCOPlus.png" alt="SACCOPlus" fill className="object-cover" />
          </div>
          <p className="text-xs text-gray-400 text-center">
            Need help with your registration?{' '}
            <a href="#" className="font-semibold hover:underline" style={{ color: '#166534' }}>
              Visit our Help Center
            </a>{' '}
            or call 0780 000 000.
          </p>
        </div>
      </div>
    </RegisterLayout>
  );
}
