import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Calculator,
  CheckCircle2,
  HelpCircle,
  Landmark,
  Search,
  ShieldCheck,
  User,
  Users,
  Zap,
} from 'lucide-react';

const heroImage = '/images/Rwandan%20Hills.png';
const cashImage = '/images/Container.png';
const servicePigIcon = '/images/Container%20(1).png';

const stats = [
  { value: '50k+', label: 'Active Members' },
  { value: '30+', label: 'Districts Served' },
  { value: '9.5%', label: 'Avg. Dividends' },
  { value: '24/7', label: 'Digital Access' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7fbf0] text-[#102312]">
      <header className="sticky top-0 z-40 border-b border-[#e5edde] bg-[#f7fbf0]/90 backdrop-blur">
        <div className="mx-auto flex h-11 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[14px] font-extrabold tracking-[-0.04em] text-[#0c7025]">
              SACCOPlus
            </Link>
            <nav className="hidden items-center gap-5 text-[10px] font-bold text-[#52604d] md:flex">
              <Link href="#home" className="text-[#0c7025]">Home</Link>
              <Link href="#services">Savings</Link>
              <Link href="#loans">Loans</Link>
              <Link href="#contact">Impact</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[#dfe8db] bg-white px-3 py-1 text-[#52604d] shadow-sm md:flex">
              <Search className="h-3.5 w-3.5" />
              <input
                type="text"
                placeholder="Search SACCO..."
                className="w-[160px] bg-transparent text-[10px] font-medium text-[#52604d] placeholder:text-[#94a47d] focus:outline-none"
              />
            </div>
            <button className="hidden h-9 w-9 items-center justify-center rounded-full bg-white text-[#52604d] shadow-sm md:flex">
              <Bell className="h-4 w-4" />
            </button>
            <button className="hidden h-9 w-9 items-center justify-center rounded-full bg-white text-[#52604d] shadow-sm md:flex">
              <HelpCircle className="h-4 w-4" />
            </button>
            <Link
              href="/auth/login"
              className="whitespace-nowrap rounded-full bg-[#0d7327] px-3 py-2 text-[10px] font-extrabold text-white shadow-[0_8px_18px_rgba(13,115,39,0.2)] sm:px-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section id="home" className="mx-auto grid w-full max-w-[1200px] items-center gap-8 overflow-hidden px-4 pt-9 pb-16 sm:px-6 md:grid-cols-[0.88fr_1.12fr] md:overflow-visible md:pt-11 md:pb-32">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e9f7e6] px-3 py-1.5 text-[11px] font-extrabold text-[#0d7327]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d7327]" />
            Community finance in Rwanda
          </div>

          <h1 className="mt-5 text-left text-[40px] font-extrabold leading-[0.96] text-[#142116] sm:text-[56px] md:text-[64px]">
            <span className="block text-[52px] uppercase leading-[0.98] sm:text-[70px] md:text-[78px]">Growth</span>
            <span className="block text-[30px] font-semibold italic text-[#0d7327] sm:text-[36px] md:text-[42px]">Together.</span>
          </h1>

          <p className="mt-4 max-w-[500px] text-[13px] leading-6 text-[#586352]">
            Join over 50,000 Rwandans building wealth through collective
            savings. Secure savings, fair loans, and financial inclusion for
            every district.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/login"
              className="rounded-full bg-[#0d7327] px-5 py-2.5 text-[11px] font-extrabold text-white shadow-[0_10px_24px_rgba(13,115,39,0.24)]"
            >
              Join SACCOPlus
            </Link>
            <Link
              href="#services"
              className="flex items-center gap-2 rounded-full bg-[#eef5e8] px-5 py-2.5 text-[11px] font-extrabold text-[#0d7327]"
            >
              Calculate interest
              <Calculator className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] overflow-visible md:ml-auto">
          <div className="relative aspect-[0.96] w-full overflow-hidden rounded-[24px] bg-[#dcead5] shadow-[0_28px_70px_rgba(16,35,18,0.18)] sm:rounded-[40px]">
            <img src={heroImage} alt="Rwandan hills" className="h-full w-full object-cover" />
          </div>

          <div className="relative z-10 mx-auto mt-4 w-full max-w-[280px] rounded-[22px] bg-white/95 p-5 shadow-[0_24px_56px_rgba(16,35,18,0.18)] backdrop-blur-sm sm:absolute sm:top-[74%] sm:left-[-20px] sm:mt-0 sm:w-[260px] sm:-translate-y-1/2 sm:rounded-[32px] md:left-[-44px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7b8675]">
              Total Community Growth
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-2">
              <span className="text-[26px] font-extrabold text-[#0d7327] sm:text-[28px]">
                1 200 000
              </span>
              <span className="pb-1 text-[12px] font-extrabold text-[#0d7327]">
                RWF
              </span>
            </div>
            <p className="mt-2 text-[11px] font-medium text-[#5f6c57]">
              Average monthly member contribution
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
                ].map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Member ${index + 1}`}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="inline-flex items-center rounded-full bg-[#e6f7e9] px-3 py-1 text-[10px] font-extrabold text-[#0d7327] shadow-sm">
                +50K
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f2f7ee]">
        <div className="mx-auto max-w-[1136px] px-3 py-16 sm:px-4 md:py-[74px]">
          <div className="relative">
            <div className="max-w-[470px]">
              <h2 className="text-[24px] font-extrabold leading-tight text-[#06110a] sm:text-[32px]">
                Financial inclusion <span className="text-[#006ac8]">for all</span>
              </h2>
              <p className="mt-3 max-w-[470px] text-[12px] font-medium leading-[1.6] text-[#263326]">
                We've reimagined traditional SACCO mechanics for the digital age, keeping the heart of community while adding world-class security.
              </p>
            </div>
            <div className="pointer-events-none absolute right-0 top-5 hidden h-12 w-12 items-center justify-center rounded-[14px] bg-[#eef6ea] md:flex">
              <img src={servicePigIcon} alt="" className="h-8 w-8 object-contain opacity-25" />
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3">
            <article className="relative min-h-[324px] overflow-hidden rounded-[18px] bg-white lg:col-span-2">
              <img
                src={cashImage}
                alt="Rwandan francs"
                className="absolute inset-y-0 right-0 hidden h-full w-[52%] object-cover object-center opacity-75 sm:block"
              />
              <div className="relative z-10 flex min-h-[300px] max-w-full flex-col px-6 py-8 sm:min-h-[324px] sm:w-[48%] sm:px-10 sm:py-10">
                <div className="mb-7 flex h-8 w-8 items-center justify-center text-[#006f2c]">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="text-[18px] font-extrabold text-[#07120a]">
                  Individual Savings
                </h3>
                <p className="mt-5 max-w-[345px] text-[12px] font-medium leading-[1.65] text-[#1f2a21]">
                  Personal accounts with competitive interest rates and no hidden maintenance fees. Start your journey with as little as 500 RWF.
                </p>
                <Link href="/auth/login" className="mt-auto inline-flex items-center gap-2 text-[12px] font-extrabold text-[#00702e]">
                  Open Account <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            <article className="flex min-h-[300px] flex-col rounded-[18px] bg-[#086c1d] px-6 py-8 text-white sm:min-h-[324px] sm:px-9 sm:py-10">
              <div className="mb-7 flex h-8 w-8 items-center justify-center text-[#78f05f]">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-[18px] font-extrabold">
                Quick Loans
              </h3>
              <p className="mt-5 max-w-[270px] text-[12px] font-bold leading-[1.65] text-white/90">
                Instant credit decisions based on your community trust score. No collateral needed for silver-tier members.
              </p>
              <div className="mt-auto flex items-end gap-2">
                <span className="pb-1 text-[10px] font-extrabold text-white/60">Rates from</span>
                <span className="text-[34px] font-extrabold leading-none">12%</span>
                <span className="pb-1 text-[13px] font-bold text-white/75">p.a.</span>
              </div>
            </article>

            <article className="flex min-h-[300px] flex-col rounded-[18px] bg-[#0a65bb] px-6 py-8 text-white sm:min-h-[364px] sm:px-9 sm:py-10">
              <div className="mb-7 flex h-8 w-8 items-center justify-center text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-[18px] font-extrabold">
                Community Trust
              </h3>
              <p className="mt-5 max-w-[285px] text-[12px] font-bold leading-[1.65] text-white/90">
                Our unique trust-based lending model leverages the strength of your savings group connections.
              </p>
              <div className="mt-auto border-t border-white/10 pt-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/14 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <span className="text-[12px] font-extrabold text-white">
                    99.8% Repayment Rate
                  </span>
                </div>
              </div>
            </article>

            <article className="min-h-[320px] overflow-hidden rounded-[18px] bg-white sm:min-h-[364px] lg:col-span-2">
              <div className="grid h-full gap-8 p-6 sm:p-9 md:grid-cols-[1fr_236px] md:items-center">
                <div className="flex h-full flex-col">
                  <div className="mb-7 flex h-8 w-8 items-center justify-center text-[#b1123c]">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <h3 className="text-[18px] font-extrabold text-[#07120a]">
                    Group Savings
                  </h3>
                  <p className="mt-5 max-w-[470px] text-[12px] font-medium leading-[1.65] text-[#1f2a21]">
                    Digital Tontines (ibimina) simplified. Manage group contributions, track transparency, and grow your local cooperative together.
                  </p>
                  <ul className="mt-8 space-y-4 text-[12px] font-bold text-[#172317]">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#00702e]" />
                      Automated payouts
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#00702e]" />
                      Multi-signature security
                    </li>
                  </ul>
                </div>
                <div className="flex min-h-[236px] items-center justify-center rounded-[18px] bg-[#ecf1e7]">
                  <div className="text-center">
                    <div className="relative mx-auto flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[conic-gradient(#0a6f2c_0_75%,#91b9ff_75%_100%)]">
                      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#ecf1e7]">
                        <span className="text-[16px] font-extrabold text-[#142116]">75%</span>
                      </div>
                    </div>
                    <p className="mt-7 text-[12px] font-medium text-[#2f3b31]">
                      Monthly Goal Reached
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[920px] px-4 py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[26px] font-extrabold tracking-[-0.05em] text-[#102312]">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6d7868]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[920px] px-4 pb-10">
        <div className="overflow-hidden rounded-[22px] bg-[#0d7327] p-7 text-center text-white shadow-[0_20px_42px_rgba(13,115,39,0.22)] md:p-9">
          <h2 className="text-[28px] font-extrabold tracking-[-0.05em]">
            Ready to grow your future?
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[13px] leading-6 text-white/80">
            It takes less than 3 minutes to set up your SACCOPlus account. Join
            the community today.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth/login" className="rounded-full bg-white px-5 py-2.5 text-[11px] font-extrabold text-[#0d7327]">
              Join SACCOPlus
            </Link>
            <Link href="/auth/login" className="rounded-full bg-white/12 px-5 py-2.5 text-[11px] font-extrabold text-white">
              Contact Agent
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e5edde]">
        <div className="mx-auto flex max-w-[920px] flex-col gap-4 px-4 py-6 text-[10px] uppercase tracking-[0.16em] text-[#98a293] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] font-extrabold normal-case tracking-[-0.04em] text-[#0d7327]">
              SACCOPlus
            </p>
            <p className="mt-2">(c) 2026 SACCOPlus. Rooted in Rwanda.</p>
          </div>
          <div className="flex flex-wrap gap-8">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">RWF Rates</Link>
            <Link href="#" className="underline underline-offset-4">Contact Us</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
