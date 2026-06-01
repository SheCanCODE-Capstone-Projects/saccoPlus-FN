'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { logoutUser } from '@/store/slices/authSlice';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, ArrowLeftRight, Users, CreditCard,
  ShieldCheck, BarChart3, HelpCircle, LogOut,
  ChevronLeft, ChevronRight, Settings2,
} from 'lucide-react';

interface NavItem { href: string; label: string; icon: React.ReactNode; }

const memberNav: NavItem[] = [
  { href: '/user',         label: 'Dashboard',    icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { href: '/transactions', label: 'Transactions', icon: <ArrowLeftRight  className="w-[18px] h-[18px]" /> },
  { href: '/groups',       label: 'Groups',       icon: <Users           className="w-[18px] h-[18px]" /> },
  { href: '/loans',        label: 'Loans',        icon: <CreditCard      className="w-[18px] h-[18px]" /> },
  { href: '/reports',      label: 'Reports',      icon: <BarChart3       className="w-[18px] h-[18px]" /> },
  { href: '/settings',     label: 'Settings',     icon: <Settings2       className="w-[18px] h-[18px]" /> },
];

const adminNav: NavItem[] = [
  { href: '/dashboard/admin', label: 'Dashboard',    icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { href: '/transactions',    label: 'Transactions', icon: <ArrowLeftRight  className="w-[18px] h-[18px]" /> },
  { href: '/groups',          label: 'Groups',       icon: <Users           className="w-[18px] h-[18px]" /> },
  { href: '/loans',           label: 'Loans',        icon: <CreditCard      className="w-[18px] h-[18px]" /> },
  { href: '/reports',         label: 'Reports',      icon: <BarChart3       className="w-[18px] h-[18px]" /> },
  { href: '/settings',        label: 'Settings',     icon: <Settings2       className="w-[18px] h-[18px]" /> },
];

const navByRole: Record<string, NavItem[]> = {
  MEMBER: memberNav, GROUP_MEMBER: memberNav,
  GROUP_LEADER: memberNav, LOAN_OFFICER: memberNav,
  ADMIN: adminNav,
};

export function Sidebar() {
  const pathname    = usePathname();
  const dispatch    = useAppDispatch();
  const router      = useRouter();
  const user        = useAppSelector((s) => s.auth.user);
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  // TEMP: mock user — TODO: remove when real auth is wired
  const MOCK_USER = { fullName: 'Admin User', email: 'admin@saccoplus.rw', role: 'ADMIN' };
  const displayUser = user ?? MOCK_USER;
  const nav = navByRole[displayUser.role] ?? adminNav;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    // TODO: change to router.push('/auth/login') when backend is ready
    router.push('/dashboard/admin');
  };

  const closeMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) dispatch(toggleSidebar());
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col
        transition-all duration-300 ease-in-out shrink-0
        ${sidebarOpen ? 'w-56 translate-x-0' : 'w-16 -translate-x-full md:translate-x-0'}
      `}
      style={{
        background: '#F1F5EB',
        opacity: 1
      }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center h-14 px-4 shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-white text-[10px]"
          style={{ backgroundColor: '#2d6a4f' }}
        >
          S+
        </div>
        {sidebarOpen && (
          <div className="ml-3 overflow-hidden">
            <p className="font-bold text-black text-xs leading-tight">SACCOPlus</p>
            <p className="text-[9px]" style={{ color: 'rgba(0,0,0,0.35)' }}>Rwanda</p>
          </div>
        )}
      </div>

      {/* ── Collapse toggle (desktop) ── */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="hidden md:flex absolute -right-3 top-16 w-6 h-6 rounded-full items-center justify-center shadow-lg z-10"
        style={{ backgroundColor: '#2d6a4f', border: '2px solid #1e1e1e' }}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen
          ? <ChevronLeft  className="w-3 h-3 text-black" />
          : <ChevronRight className="w-3 h-3 text-black" />
        }
      </button>

      {/* ── Nav ── */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {sidebarOpen && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] px-3 mb-3"
            style={{ color: 'rgba(0,0,0,0.25)' }}>
            Menu
          </p>
        )}
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={closeMobile}
              title={!sidebarOpen ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group relative"
              style={{
                backgroundColor: active ? '#f7fbf0' : 'transparent',
                color: active ? '#1e1e1e' : 'rgba(0,0,0,0.55)',
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.06)'; (e.currentTarget as HTMLElement).style.color = 'black'; }}
              onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.55)'; } }}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {!sidebarOpen && (
                <span className="absolute left-full ml-3 px-2.5 py-1.5 text-black text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg"
                  style={{ backgroundColor: '#f0f0f0' }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom ── */}
      <div className="px-2 pt-2 pb-3 space-y-0.5 shrink-0" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Link
          href="/support"
          onClick={closeMobile}
          title={!sidebarOpen ? 'Support' : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group relative"
          style={{ color: 'rgba(0,0,0,0.55)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.06)'; (e.currentTarget as HTMLElement).style.color = 'black'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.55)'; }}
        >
          <HelpCircle className="w-[18px] h-[18px] shrink-0" />
          {sidebarOpen && <span>Support</span>}
          {!sidebarOpen && (
            <span className="absolute left-full ml-3 px-2.5 py-1.5 text-black text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg" style={{ backgroundColor: '#f0f0f0' }}>Support</span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          title={!sidebarOpen ? 'Logout' : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group relative"
          style={{ color: 'rgba(0,0,0,0.55)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(239,68,68,0.12)'; (e.currentTarget as HTMLElement).style.color = '#f87171'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.55)'; }}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {sidebarOpen && <span>Logout</span>}
          {!sidebarOpen && (
            <span className="absolute left-full ml-3 px-2.5 py-1.5 text-black text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg" style={{ backgroundColor: '#f0f0f0' }}>Logout</span>
          )}
        </button>

        {/* User strip */}
        {sidebarOpen && (
          <div className="mt-2 mx-0.5 p-3 rounded-xl flex items-center gap-2.5" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#2d6a4f' }}>
              <span className="text-white text-xs font-bold">{displayUser.fullName?.[0] ?? 'U'}</span>
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-semibold text-black truncate">{displayUser.fullName}</p>
              <p className="text-[10px] truncate capitalize" style={{ color: 'rgba(0,0,0,0.4)' }}>
                {displayUser.role?.toLowerCase().replace('_', ' ')}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
