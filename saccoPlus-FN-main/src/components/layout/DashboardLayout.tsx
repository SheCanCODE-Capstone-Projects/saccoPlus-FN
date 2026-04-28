'use client';
import { ReactNode } from 'react';
import { Sidebar }   from './Sidebar';
import { TopBar }    from './TopBar';
import { useAppSelector } from '@/hooks/redux';

interface Props { title: string; children: ReactNode; }

export function DashboardLayout({ title, children }: Props) {
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
