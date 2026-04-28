'use client';
import Link from 'next/link';
import { Users, User, ChevronRight } from 'lucide-react';

export default function RegisterSelectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col">

      {/* Top nav */}
      <header className="flex items-center justify-between px-8 py-5">
        <span className="font-bold text-xl text-primary-700 tracking-tight">SACCOPlus</span>
        <p className="text-sm text-gray-600">
          Already a member?{' '}
          <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10 max-w-5xl mx-auto w-full">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="font-black text-4xl md:text-5xl text-gray-900 leading-tight mb-4">
            How would you like to join?
          </h1>
          <p className="text-gray-500 text-base max-w-md leading-relaxed">
            Choose the path that best suits your financial goals. Whether
            you&apos;re building personal wealth or growing your community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-12">

          {/* Individual Member */}
          <div className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-5">
              <User size={22} className="text-primary-600" />
            </div>
            <h2 className="font-bold text-xl text-gray-900 mb-3">Individual Member</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Join as a single user to save, borrow, and manage your personal
              finances with the security of Rwanda&apos;s leading SACCO network.
            </p>
            <Link
              href="/auth/register/individual"
              className="btn-secondary flex items-center justify-between w-full"
            >
              <span>Get Started</span>
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Community Group */}
          <div className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-5">
              <Users size={22} className="text-primary-600" />
            </div>
            <h2 className="font-bold text-xl text-gray-900 mb-3">Community Group</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Register your cooperative, family savings circle, or investment
              group to collectively grow your assets and support each other.
            </p>
            <Link
              href="/auth/register/group"
              className="btn-primary flex items-center justify-between w-full"
            >
              <span>Register Group</span>
              <ChevronRight size={18} />
            </Link>
          </div>

        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5 border border-gray-200 self-start shadow-sm">
          <div className="flex">
            {[
              { initials: 'AK', bg: 'bg-primary-700' },
              { initials: 'JM', bg: 'bg-primary-600' },
              { initials: 'UM', bg: 'bg-primary-500' },
            ].map(({ initials, bg }, i) => (
              <div
                key={initials}
                className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold ${bg}`}
                style={{ marginLeft: i === 0 ? 0 : '-8px', position: 'relative', zIndex: 3 - i }}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Joined by <span className="font-semibold text-gray-900">12,000+</span> members across Rwanda
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 md:px-16 lg:px-24 py-6 border-t border-gray-200 gap-4">
        <div>
          <span className="font-black text-primary-700 text-base">SACCOPlus</span>
          <p className="text-xs text-gray-400 mt-0.5">© 2024 SACCOPLUS. ROOTED IN RWANDA.</p>
        </div>
        <div className="flex gap-6 flex-wrap">
          {['Privacy Policy', 'Terms of Service', 'RWF Rates', 'Contact Us'].map((item) => (
            <Link key={item} href="#" className="text-xs text-gray-400 hover:text-primary-600 transition-colors uppercase tracking-widest">
              {item}
            </Link>
          ))}
        </div>
      </footer>

    </div>
  );
}