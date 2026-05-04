'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Users, User, CreditCard, Phone, Lock, Plus, Trash2 } from 'lucide-react';
import RegisterLayout from '@/components/auth/RegisterLayout';
// TODO [BACKEND]: Replace with authService.registerGroup() when backend is ready
import { authService } from '@/services/api';

const memberSchema = z.object({
  name:       z.string().min(2, 'Required'),
  nationalId: z.string().length(16, '16 chars'),
  phone:      z.string().regex(/^\+?250[0-9]{9}$/, 'Invalid phone'),
});

const schema = z.object({
  groupName:                z.string().min(2, 'Group name is required'),
  representativeName:       z.string().min(2, 'Representative name is required'),
  phone:                    z.string().regex(/^\+?250[0-9]{9}$/, 'Enter a valid Rwandan phone number'),
  representativeNationalId: z.string().length(16, 'National ID must be 16 characters'),
  password:                 z.string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[0-9]/, 'Must contain at least one number'),
  members: z.array(memberSchema).optional(),
});
type FormData = z.infer<typeof schema>;

const steps = [
  { n: 1, label: 'Account Type',  sub: 'Selected: Group', done: true   },
  { n: 2, label: 'Group Details', sub: 'Step 2 of 3',     active: true },
  { n: 3, label: 'Verification',  sub: 'Documents & Biometrics'         },
];

const inputCls = 'w-full bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:border-transparent shadow-sm';
const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5';

export default function GroupRegisterPage() {
  const router = useRouter();
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { members: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'members' });

  useEffect(() => {
    if (fields.length > 0) {
      const timer = setTimeout(() => {
        memberRefs.current[fields.length - 1]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [fields.length]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // TODO [BACKEND]: authService.registerGroup() connects to POST /auth/register/group
      await authService.registerGroup({
        groupName:                data.groupName,
        representativeName:       data.representativeName,
        representativeNationalId: data.representativeNationalId,
        phone:                    data.phone,
        password:                 data.password,
        members:                  data.members ?? [],
        accountType:              'GROUP',
      });
      toast.success('Group account created! Please log in.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterLayout steps={steps}>
      <div className="w-full max-w-[600px] px-4 md:px-6 pt-6 md:pt-8 lg:pt-12 pb-12">

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Register Your Group</h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Set up your community group account. You can add more members after registration.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">

          {/* Group Name */}
          <div>
            <label className={labelCls}>Group Name</label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('groupName')}
                className={inputCls}
                style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                placeholder="e.g., Kigali Savings Circle"
              />
            </div>
            {errors.groupName && <p className="text-red-500 text-xs mt-1">{errors.groupName.message}</p>}
          </div>

          {/* Representative Name */}
          <div>
            <label className={labelCls}>Representative Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('representativeName')}
                className={inputCls}
                style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                placeholder="e.g., Aline Uwimana"
              />
            </div>
            {errors.representativeName && <p className="text-red-500 text-xs mt-1">{errors.representativeName.message}</p>}
          </div>

          {/* National ID + Phone — 1 col mobile, 2 col md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>National ID Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('representativeNationalId')}
                  className={inputCls}
                  style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                  placeholder="1 19XX B XXXX XXX X XX"
                  maxLength={16}
                />
              </div>
              {errors.representativeNationalId && <p className="text-red-500 text-xs mt-1">{errors.representativeNationalId.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('phone')}
                  className={inputCls}
                  style={{ height: '44px', paddingLeft: '36px', paddingRight: '14px' }}
                  placeholder="+250 7X XXX XXX"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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

          {/* Initial Members */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls + ' mb-0'}>
                Initial Members{' '}
                <span className="normal-case font-normal tracking-normal text-gray-400">(optional)</span>
              </label>
              <button
                type="button"
                onClick={() => append({ name: '', nationalId: '', phone: '' })}
                className="flex items-center gap-1 text-xs font-bold hover:opacity-75"
                style={{ color: '#166534' }}
              >
                <Plus className="w-3.5 h-3.5" /> Add Member
              </button>
            </div>
            {fields.length === 0 && (
              <p className="text-xs text-gray-400 italic">
                You can add group members after registration.
              </p>
            )}
            {fields.map((field, i) => (
              <div
                key={field.id}
                ref={(el) => { memberRefs.current[i] = el; }}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">Member {i + 1}</span>
                  <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    {...register(`members.${i}.name`)}
                    className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]"
                    placeholder="Full Name"
                  />
                  {/* Member ID + Phone — 1 col mobile, 2 col sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      {...register(`members.${i}.nationalId`)}
                      className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]"
                      placeholder="National ID"
                      maxLength={16}
                    />
                    <input
                      {...register(`members.${i}.phone`)}
                      className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]"
                      placeholder="+250 7X XXX XXX"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons — full width on mobile, auto on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center font-semibold text-sm text-white rounded-full shadow-md disabled:opacity-50 hover:opacity-90 transition-opacity px-7 w-full sm:w-auto"
              style={{ height: '44px', backgroundColor: '#166534' }}
            >
              {loading ? 'Creating group...' : 'Continue to Step 3 →'}
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
