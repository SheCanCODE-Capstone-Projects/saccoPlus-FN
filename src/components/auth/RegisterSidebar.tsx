import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface Step {
  n: number;
  label: string;
  sub: string;
  done?: boolean;
  active?: boolean;
}

export default function RegisterSidebar({ steps }: { steps: Step[] }) {
  return (
    <aside className="bg-white flex flex-col h-full px-6 py-8 overflow-hidden sticky top-0">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold block" style={{ color: '#166534' }}>
          SACCOPlus
        </Link>
        <p className="text-xs text-gray-400 mt-1">Community Growth</p>
      </div>

      {/* Progress label */}
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        Registration Progress
      </p>

      {/* Vertical stepper */}
      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div key={s.n} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: s.done || s.active ? '#166534' : '#e5e7eb',
                  color:           s.done || s.active ? '#fff' : '#9ca3af',
                }}
              >
                {s.done && !s.active ? '✓' : s.n}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-px my-1"
                  style={{ minHeight: '24px', backgroundColor: s.done ? '#166534' : '#e5e7eb' }}
                />
              )}
            </div>
            <div className="pb-5 pt-1">
              <p
                className="text-xs font-semibold leading-tight"
                style={{ color: s.active ? '#111827' : s.done ? '#6b7280' : '#9ca3af' }}
              >
                {s.label}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      {/* Secure card */}
      <div className="rounded-2xl p-5 border" style={{ borderColor: '#dbe4d2', backgroundColor: '#f9fdf6' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#166534' }}>
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
        </div>
        <p className="text-xs font-bold text-gray-800 mb-1">Secure & Encrypted</p>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Your data is protected by bank-grade AES-256 encryption and Rwandan data privacy laws.
        </p>
      </div>
    </aside>
  );
}
