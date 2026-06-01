'use client';
import { ReactNode } from 'react';
import { Sidebar }   from './Sidebar';
import { TopBar }    from './TopBar';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleSidebar } from '@/store/slices/uiSlice';

interface Props { title: string; children: ReactNode; }

export function DashboardLayout({ title, children }: Props) {
  const dispatch    = useAppDispatch();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden items-stretch">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <Sidebar />

      {/* Main area — on mobile takes full width; on md+ shifts right */}
      <div
        className={`
          flex-1 flex flex-col overflow-hidden transition-all duration-300
          md:${sidebarOpen ? 'ml-64' : 'ml-16'}
        `}
      >
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
