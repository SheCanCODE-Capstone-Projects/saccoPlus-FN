'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { logoutUser } from '@/store/slices/authSlice';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { useRouter } from 'next/navigation';

const navByRole: Record<string, { href: string; label: string; icon: string }[]> = {
  MEMBER: [
    { href: '/dashboard/member', label: 'Dashboard',    icon: '🏠' },
    { href: '/savings',          label: 'Savings',       icon: '💰' },
    { href: '/loans',            label: 'Loans',         icon: '🏦' },
    { href: '/reports',          label: 'Reports',       icon: '📄' },
    { href: '/settings',         label: 'Settings',      icon: '⚙️'  },
  ],
  GROUP_LEADER: [
    { href: '/dashboard/group',  label: 'Dashboard',    icon: '🏠' },
    { href: '/savings',          label: 'Group Savings', icon: '💰' },
    { href: '/loans',            label: 'Loans',         icon: '🏦' },
    { href: '/reports',          label: 'Reports',       icon: '📄' },
    { href: '/settings',         label: 'Settings',      icon: '⚙️'  },
  ],
  LOAN_OFFICER: [
    { href: '/dashboard/loan-officer', label: 'Dashboard',    icon: '🏠' },
    { href: '/loans',                  label: 'Loan Queue',   icon: '📋' },
    { href: '/reports',                label: 'Reports',      icon: '📄' },
  ],
  ADMIN: [
    { href: '/dashboard/admin', label: 'Dashboard',    icon: '🏠' },
    { href: '/savings',         label: 'Savings',       icon: '💰' },
    { href: '/loans',           label: 'Loans',         icon: '🏦' },
    { href: '/reports',         label: 'Reports',       icon: '📄' },
    { href: '/settings',        label: 'System Config', icon: '⚙️'  },
  ],
};

export function Sidebar() {
  const pathname    = usePathname();
  const dispatch    = useAppDispatch();
  const router      = useRouter();
  const user        = useAppSelector((s) => s.auth.user);
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  const role = user?.role ?? 'MEMBER';
  const nav  = navByRole[role] ?? navByRole['MEMBER'];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/auth/login');
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-primary-900 text-white transition-all ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col`}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-primary-700">
        <div className="w-8 h-8 bg-sacco-gold rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-primary-900 font-bold text-sm">S+</span>
        </div>
        {sidebarOpen && <span className="ml-3 font-bold text-lg">SACCOPlus</span>}
      </div>

      {/* Toggle */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-3 top-20 bg-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
      >
        {sidebarOpen ? '◀' : '▶'}
      </button>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${pathname === item.href ? 'bg-primary-600 text-white' : 'text-primary-200 hover:bg-primary-800 hover:text-white'}`}
          >
            <span className="text-lg">{item.icon}</span>
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-primary-700 p-4">
        {sidebarOpen && (
          <div className="mb-2 text-xs text-primary-300 truncate">{user?.email}</div>
        )}
        <button onClick={handleLogout} className="flex items-center text-primary-200 hover:text-white text-sm w-full">
          <span className="text-lg">🚪</span>
          {sidebarOpen && <span className="ml-3">Sign out</span>}
        </button>
      </div>
    </div>
  );
}
