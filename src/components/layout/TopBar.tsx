'use client';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleSidebar } from '@/store/slices/uiSlice';

interface Props { title: string; }

export function TopBar({ title }: Props) {
  const dispatch = useAppDispatch();
  const user     = useAppSelector((s) => s.auth.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger — hidden on md+ */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">
            {user?.fullName?.[0] ?? 'U'}
          </span>
        </div>
        <div className="hidden md:block text-sm">
          <p className="font-medium text-gray-800 truncate max-w-[140px]">{user?.fullName}</p>
          <p className="text-gray-400 text-xs capitalize">{user?.role?.toLowerCase().replace('_', ' ')}</p>
        </div>
      </div>
    </header>
  );
}
