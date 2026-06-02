import RegisterSidebar from './RegisterSidebar';
import RegisterRightPanel from './RegisterRightPanel';

interface Step {
  n: number;
  label: string;
  sub: string;
  done?: boolean;
  active?: boolean;
}

interface Props {
  steps: Step[];
  children: React.ReactNode;
}

export default function RegisterLayout({ steps, children }: Props) {
  return (
    // h-screen + overflow-hidden on root: prevents the page itself from scrolling
    <div className="h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#EEF2E8' }}>

      {/* Mobile-only progress bar — sits above the 3-column row */}
      <div className="md:hidden shrink-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{
                backgroundColor: s.done || s.active ? '#166534' : '#e5e7eb',
                color:           s.done || s.active ? '#fff'    : '#9ca3af',
              }}
            >
              {s.done && !s.active ? '✓' : s.n}
            </div>
            {i < steps.length - 1 && (
              <div className="w-6 h-px" style={{ backgroundColor: s.done ? '#166534' : '#e5e7eb' }} />
            )}
          </div>
        ))}
        <span className="text-xs text-gray-500 ml-1">
          {steps.find((s) => s.active)?.label}
        </span>
      </div>

      {/* 3-column row — fills remaining height, no overflow of its own */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — sticky, never scrolls */}
        <div className="hidden md:flex flex-col w-[260px] lg:w-[280px] shrink-0 h-full overflow-hidden">
          <RegisterSidebar steps={steps} />
        </div>

        {/* Main content — THE ONLY scrollable area */}
        <main className="flex-1 h-full overflow-y-auto flex flex-col items-center justify-start px-4 md:px-6">
          {children}

          {/* Footer lives inside the scroll area so it appears after content */}
          <footer className="w-full mt-auto px-4 md:px-8 py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>© 2024 SACCOPLUS. ROOTED IN RWANDA.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {['PRIVACY POLICY', 'TERMS OF SERVICE', 'CONTACT US'].map((t) => (
                <a key={t} href="#" className="hover:text-gray-600 uppercase tracking-wide">{t}</a>
              ))}
            </div>
          </footer>
        </main>

        {/* Right panel — xl only, never scrolls */}
        <div className="hidden xl:flex flex-col w-[320px] shrink-0 h-full overflow-hidden">
          <RegisterRightPanel />
        </div>
      </div>
    </div>
  );
}