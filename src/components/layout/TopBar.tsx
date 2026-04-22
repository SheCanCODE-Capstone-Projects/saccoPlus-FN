'use client';
import { useAppSelector } from '@/hooks/redux';

interface Props { title: string; }

export function TopBar({ title }: Props) {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {user?.fullName?.[0] ?? 'U'}
          </span>
        </div>
        <div className="hidden md:block text-sm">
          <p className="font-medium text-gray-800">{user?.fullName}</p>
          <p className="text-gray-400 text-xs capitalize">{user?.role?.toLowerCase().replace('_', ' ')}</p>
        </div>
      </div>
    </header>
  );
}
