import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react';

const memberAvatars = [
  { initials: 'JP', tone: 'from-[#0f6d2b] to-[#2d9a4a]' },
  { initials: 'AN', tone: 'from-[#b6692f] to-[#d38f53]' },
  { initials: 'MK', tone: 'from-[#2d5f9a] to-[#5e8fd0]' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#1f1f1f] px-3 py-3 sm:px-6 sm:py-6">
      <section className="relative mx-auto min-h-[calc(100vh-1.5rem)] w-full max-w-[1280px] overflow-hidden bg-[#eef3e1] shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:min-h-[calc(100vh-3rem)]">

        {/* BACKGROUND BASE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.92),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,247,210,0.34),transparent_20%),linear-gradient(135deg,rgba(247,247,239,0.98),rgba(229,239,208,0.92))]" />

        {/* 🌿 HILLS SVG (BOTTOM LEFT → TOP RIGHT FLOW) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1440 600"
            className="absolute bottom-0 left-0 w-full h-full rotate-[-18deg] scale-125 origin-bottom-left"
            preserveAspectRatio="none"
          >
            <path
              d="M0,420 C220,320 420,520 650,420 C900,320 1100,480 1440,400 L1440,600 L0,600 Z"
              fill="rgba(120,160,90,0.35)"
            />
            <path
              d="M0,470 C260,360 500,540 780,450 C1000,380 1200,520 1440,440 L1440,600 L0,600 Z"
              fill="rgba(160,190,120,0.25)"
            />
            <path
              d="M0,520 C300,440 650,580 1000,500 C1200,460 1350,540 1440,500 L1440,600 L0,600 Z"
              fill="rgba(200,220,150,0.2)"
            />
          </svg>
        </div>

        
        <div className="relative z-10 grid min-h-[calc(100vh-1.5rem)] w-full gap-10 px-8 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">

          {/* LEFT SECTION */}
          <section className="flex flex-col justify-between lg:py-6">
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16772f] text-white shadow-[0_10px_20px_rgba(22,119,47,0.26)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 3l8 5v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V8l8-5z" />
                  </svg>
                </span>
                <span className="text-[18px] font-semibold text-[#18461f]">
                  SACCOPlus
                </span>
              </div>

              <h1 className="mt-12 max-w-[470px] text-[50px] font-semibold leading-[0.93] tracking-[-0.055em] text-[#111111] sm:text-[58px] lg:text-[68px]">
                Nurturing <span className="text-[#22803a]">Community</span> Wealth.
              </h1>

              <p className="mt-5 max-w-[420px] text-[17px] leading-7 text-[#4d4d4d] font-semibold text-lg">
                Access your savings, manage group contributions, and grow your future with SACCOPlus.
              </p>
            </div>
            {/* MEMBERS */}
            <div className="mt-12 inline-flex w-fit items-center gap-4 rounded-full bg-white/60 px-4 py-3 backdrop-blur-sm">
              <div className="flex -space-x-2">
                {memberAvatars.map((a) => (
                  <span
                    key={a.initials}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${a.tone} text-[10px] font-semibold text-white`}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-[14px] font-semibold">50 000+</p>
                <p className="text-[12px] text-[#666]">Members across Rwanda</p>
              </div>
            </div>
          </section>

          {/* RIGHT LOGIN */}
           <section className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[468px] rounded-[28px] border-white/35 bg-white/30 p-4 ">
            <div className="rounded-[24px] bg-[rgba(248,247,239,0.86)] px-6 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:px-7 sm:py-8">
                <h2 className="text-[31px] font-semibold tracking-[-0.03em] text-[#111111]">Welcome Back</h2>
                 <p className="mt-1.5 text-[13px] leading-5 text-[#666666]">
                  Please enter your credentials to access your account.
                 </p>

                <form className="mt-8 space-y-4">
                   <label className="block">
                   <span className="mb-2 block text-[12px] font-medium text-[#222222]">Phone Number or National ID</span>
                    <div className="flex items-center gap-3 rounded-[10px] border border-[#ebe7d9] bg-[rgba(240,237,228,0.94)] px-4 py-3 shadow-sm transition focus-within:border-[#22803a] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#22803a]/10">
                      <UserRound className="h-3.5 w-3.5 text-[#676767]" />
                     <input
                        type="text"
                        placeholder="+250 78X XXX XXX"
                        className="w-full bg-transparent text-[13px] text-[#111111] outline-none placeholder:text-[#9e9e9e]"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-[12px] font-medium text-[#222222]">Password</span>
                      <Link href="#" className="text-[12px] font-semibold text-[#22803a] transition hover:text-[#196229]">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 rounded-[10px] border border-[#ebe7d9] bg-[rgba(240,237,228,0.94)] px-4 py-3 shadow-sm transition focus-within:border-[#22803a] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#22803a]/10">
                      <LockKeyhole className="h-3.5 w-3.5 text-[#676767]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        className="w-full bg-transparent text-[13px] text-[#111111] outline-none placeholder:text-[#9e9e9e]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="text-[#676767] transition hover:text-[#333333]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="mt-1 w-full rounded-[10px] bg-[#22803a] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(34,128,58,0.34)] transition hover:bg-[#1a6a2f]"
                  >
                    Log Into Account
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <p className="text-[13px] text-[#777777]">or</p>
                  <p className="mt-4 text-[12px] text-[#666666]">Don&apos;t have an account yet?</p>
                  <Link
                    href="/register"
                    className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#22803a] transition hover:text-[#196229]"
                  >
                    Register for SACCOPlus
                    <span aria-hidden="true"></span>
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[#6b6b6b]">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Service</Link>
                <Link href="#">Contact Support</Link>
              </div>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}