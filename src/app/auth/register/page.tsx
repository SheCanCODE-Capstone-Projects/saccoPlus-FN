import Link from 'next/link';
import { User, Users } from 'lucide-react';

export default function RegisterSelectPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EEF2E8' }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 bg-white border-b border-gray-100 shrink-0">
        <span className="text-lg font-bold" style={{ color: '#166534' }}>SACCOPlus</span>
        <p className="text-xs text-gray-500">
          Already a member?{' '}
          <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: '#166534' }}>
            Log In
          </Link>
        </p>
      </nav>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-10">

        {/* Heading */}
        <div className="text-center mb-8 max-w-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How would you like to join?
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Choose the path that best suits your financial goals. Whether you&apos;re
            building personal wealth or growing your community.
          </p>
        </div>

        {/* Cards — stack on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-xl">

          {/* Individual */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2E8' }}>
              <User className="w-5 h-5" style={{ color: '#166534' }} />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-2">Individual Member</h2>
            <p className="text-xs text-gray-500 flex-1 mb-5 leading-relaxed">
              Join as a single user to save, borrow, and manage your personal finances
              with the security of Rwanda&apos;s leading SACCO network.
            </p>
            <Link
              href="/auth/register/individual"
              className="flex items-center justify-center border border-gray-300 rounded-full py-2 px-5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Get Started →
            </Link>
          </div>

          {/* Group */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#EEF2E8' }}>
              <Users className="w-5 h-5" style={{ color: '#166534' }} />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-2">Community Group</h2>
            <p className="text-xs text-gray-500 flex-1 mb-5 leading-relaxed">
              Register your cooperative, family savings circle, or investment group to
              collectively grow your assets and support each other.
            </p>
            <Link
              href="/auth/register/group"
              className="flex items-center justify-center rounded-full py-2 px-5 text-xs font-semibold text-white hover:opacity-90 transition-opacity w-full sm:w-auto"
              style={{ backgroundColor: '#166534' }}
            >
              Register Group →
            </Link>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-8 text-xs text-gray-500">
          <div className="flex -space-x-2">
            {['#e57373', '#81c784', '#64b5f6'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span>Joined by 12,000+ members across Rwanda</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-8 py-3 bg-white border-t border-gray-100 shrink-0 text-xs text-gray-400 gap-2">
        <div className="text-center sm:text-left">
          <p className="font-bold text-gray-600 text-xs">SACCOPlus</p>
          <p>© 2024 SACCOPLUS. ROOTED IN RWANDA.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {['Privacy Policy', 'Terms of Service', 'RWF Rates', 'Contact Us'].map((t) => (
            <a key={t} href="#" className="hover:text-gray-600 transition-colors">{t}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
