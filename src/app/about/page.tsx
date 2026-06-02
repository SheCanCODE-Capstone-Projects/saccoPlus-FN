import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Globe,
  HandHeart,
  HelpCircle,
  Landmark,
  Lightbulb,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Amina Uwase',
    role: 'Chief Executive Officer',
    district: 'Kigali',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Jean-Pierre Habimana',
    role: 'Head of Finance',
    district: 'Musanze',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Claudine Mukamana',
    role: 'Community Director',
    district: 'Huye',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Eric Niyonzima',
    role: 'Head of Technology',
    district: 'Rubavu',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
  },
];

const values = [
  {
    icon: HandHeart,
    title: 'Community First',
    description:
      'Every decision we make starts with one question: does this benefit our members and their families?',
    accent: '#0d7327',
    bg: '#e9f7e6',
  },
  {
    icon: ShieldCheck,
    title: 'Transparency',
    description:
      'Open books, clear fees, honest reporting. Our members always know where their money is and how it grows.',
    accent: '#0a65bb',
    bg: '#e8f0fb',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Blending the trusted traditions of ibimina with modern digital tools to serve 21st-century Rwanda.',
    accent: '#b1123c',
    bg: '#fce8ee',
  },
  {
    icon: Globe,
    title: 'Inclusion',
    description:
      'Financial services should reach every district, every village. No Rwandan left behind in the digital economy.',
    accent: '#0d7327',
    bg: '#e9f7e6',
  },
];

const milestones = [
  { year: '2018', event: 'Founded in Kigali with 120 charter members' },
  { year: '2019', event: 'Expanded to 12 districts; launched group savings module' },
  { year: '2021', event: 'Crossed 10,000 active members; introduced digital loan decisions' },
  { year: '2023', event: 'Launched SACCOPlus mobile app across all 30 districts' },
  { year: '2024', event: '50,000+ members; RWF 6 billion in managed savings' },
];

const stats = [
  { value: '50k+', label: 'Active Members' },
  { value: '30+', label: 'Districts Served' },
  { value: '9.5%', label: 'Avg. Dividends' },
  { value: '99.8%', label: 'Repayment Rate' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7fbf0] text-[#102312]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-[#e5edde] bg-[#f7fbf0]/90 backdrop-blur">
        <div className="mx-auto flex h-11 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[14px] font-extrabold tracking-[-0.04em] text-[#0c7025]">
              SACCOPlus
            </Link>
            <nav className="hidden items-center gap-5 text-[10px] font-bold text-[#52604d] md:flex">
              <Link href="/landingpage">Home</Link>
              <Link href="/landingpage#services">Savings</Link>
              <Link href="/landingpage#loans">Loans</Link>
              <Link href="/landingpage#contact">Impact</Link>
              <Link href="/about" className="text-[#0c7025]">About Us</Link>
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

      {/* ── Hero ── */}
      <section className="mx-auto max-w-[1200px] px-4 pt-14 pb-20 sm:px-6 md:pt-20 md:pb-28">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e9f7e6] px-3 py-1.5 text-[11px] font-extrabold text-[#0d7327]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d7327]" />
          Our Story
        </div>
        <div className="mt-5 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h1 className="text-[40px] font-extrabold leading-[0.96] text-[#142116] sm:text-[56px] md:text-[64px]">
              <span className="block text-[52px] uppercase leading-[0.98] sm:text-[68px]">Built for</span>
              <span className="block text-[30px] font-semibold italic text-[#0d7327] sm:text-[38px] md:text-[42px]">Rwanda.</span>
            </h1>
            <p className="mt-5 max-w-[500px] text-[13px] leading-6 text-[#586352]">
              SACCOPlus was born from a simple belief — that every Rwandan deserves access to
              fair, transparent financial services. We digitise the cooperative spirit of
              <em> ibimina</em> so communities can save, borrow, and grow together, wherever
              they are.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="rounded-full bg-[#0d7327] px-5 py-2.5 text-[11px] font-extrabold text-white shadow-[0_10px_24px_rgba(13,115,39,0.24)]"
              >
                Join the Community
              </Link>
              <a
                href="#mission"
                className="flex items-center gap-2 rounded-full bg-[#eef5e8] px-5 py-2.5 text-[11px] font-extrabold text-[#0d7327]"
              >
                Our Mission <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[18px] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(16,35,18,0.07)]"
              >
                <p className="text-[32px] font-extrabold tracking-[-0.04em] text-[#0d7327]">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6d7868]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section id="mission" className="bg-[#f2f7ee]">
        <div className="mx-auto max-w-[1136px] px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="flex min-h-[280px] flex-col rounded-[18px] bg-[#0d7327] px-8 py-10 text-white">
              <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/14 text-[#78f05f]">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="text-[22px] font-extrabold">Our Mission</h2>
              <p className="mt-4 text-[13px] font-medium leading-[1.7] text-white/85">
                To empower Rwandan communities through accessible, technology-driven cooperative
                finance — enabling every member to save confidently, borrow fairly, and build
                generational wealth.
              </p>
            </article>

            <article className="flex min-h-[280px] flex-col rounded-[18px] bg-[#0a65bb] px-8 py-10 text-white">
              <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/14 text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="text-[22px] font-extrabold">Our Vision</h2>
              <p className="mt-4 text-[13px] font-medium leading-[1.7] text-white/85">
                A Rwanda where every household — urban or rural — participates in a thriving
                digital cooperative economy, building prosperity together through the strength of
                community trust.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="mx-auto max-w-[1136px] px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-[470px]">
          <h2 className="text-[24px] font-extrabold leading-tight text-[#06110a] sm:text-[32px]">
            What we <span className="text-[#006ac8]">stand for</span>
          </h2>
          <p className="mt-3 text-[12px] font-medium leading-[1.6] text-[#263326]">
            Our values are not slogans on a wall — they shape every product decision, every
            member interaction, every line of code.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <article
              key={v.title}
              className="flex flex-col rounded-[18px] bg-white p-7 shadow-[0_4px_24px_rgba(16,35,18,0.07)]"
            >
              <div
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-[12px]"
                style={{ background: v.bg, color: v.accent }}
              >
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#07120a]">{v.title}</h3>
              <p className="mt-3 text-[12px] font-medium leading-[1.65] text-[#3a4a3c]">
                {v.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Our Journey ── */}
      <section className="bg-[#f2f7ee]">
        <div className="mx-auto max-w-[1136px] px-4 py-16 sm:px-6 md:py-20">
          <div className="max-w-[470px]">
            <h2 className="text-[24px] font-extrabold leading-tight text-[#06110a] sm:text-[32px]">
              Our <span className="text-[#0d7327]">journey</span>
            </h2>
            <p className="mt-3 text-[12px] font-medium leading-[1.6] text-[#263326]">
              From 120 founding members in Kigali to a nationwide cooperative platform serving
              all 30 districts.
            </p>
          </div>

          <div className="mt-10 space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative flex gap-6">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0d7327] text-[10px] font-extrabold text-white shadow-[0_4px_12px_rgba(13,115,39,0.3)]">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="mt-1 h-full min-h-[40px] w-px bg-[#c5dfc0]" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0d7327]">
                    {m.year}
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-[#263326]">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="mx-auto max-w-[1136px] px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-[470px]">
          <h2 className="text-[24px] font-extrabold leading-tight text-[#06110a] sm:text-[32px]">
            The people <span className="text-[#006ac8]">behind it</span>
          </h2>
          <p className="mt-3 text-[12px] font-medium leading-[1.6] text-[#263326]">
            A small, committed team of finance professionals, technologists, and community
            advocates — all Rwandan, all passionate about inclusion.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-[18px] bg-white shadow-[0_4px_24px_rgba(16,35,18,0.07)]"
            >
              <div className="h-[180px] w-full overflow-hidden bg-[#dcead5]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-5 py-5">
                <p className="text-[14px] font-extrabold text-[#07120a]">{member.name}</p>
                <p className="mt-1 text-[11px] font-bold text-[#0d7327]">{member.role}</p>
                <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#7b8675]">
                  <Landmark className="h-3 w-3" /> {member.district}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[#f2f7ee]">
        <div className="mx-auto max-w-[1136px] px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-[24px] font-extrabold leading-tight text-[#06110a] sm:text-[32px]">
                Why Rwandans <span className="text-[#0d7327]">trust us</span>
              </h2>
              <p className="mt-3 max-w-[440px] text-[12px] font-medium leading-[1.6] text-[#263326]">
                We combine the accountability of a regulated cooperative with the convenience of a
                modern digital platform, so you never have to choose between safety and speed.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Licensed by the National Bank of Rwanda',
                  'End-to-end encrypted transactions',
                  'Member-elected board of directors',
                  'Real-time audit trail for every transaction',
                  'Dedicated support in Kinyarwanda & English',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[12px] font-bold text-[#172317]">
                    <CheckCircle2 className="mt-px h-4 w-4 flex-shrink-0 text-[#00702e]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-h-[340px] flex-col items-center justify-center gap-8 rounded-[22px] bg-white p-8 shadow-[0_12px_40px_rgba(16,35,18,0.10)]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f7e6] text-[#0d7327]">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[28px] font-extrabold tracking-[-0.04em] text-[#0d7327]">50,000+</p>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6d7868]">Trusted Members</p>
                </div>
              </div>
              <div className="h-px w-full bg-[#e5edde]" />
              <div className="relative mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[conic-gradient(#0a6f2c_0_75%,#91b9ff_75%_100%)]">
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full bg-white">
                  <span className="text-[18px] font-extrabold text-[#142116]">9.5%</span>
                </div>
              </div>
              <p className="text-center text-[12px] font-medium text-[#2f3b31]">
                Average annual dividend — consistently above market
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-[920px] px-4 py-10">
        <div className="overflow-hidden rounded-[22px] bg-[#0d7327] p-7 text-center text-white shadow-[0_20px_42px_rgba(13,115,39,0.22)] md:p-9">
          <h2 className="text-[28px] font-extrabold tracking-[-0.05em]">
            Be part of the story
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[13px] leading-6 text-white/80">
            Join 50,000 Rwandans who are already growing their wealth together. It takes less
            than 3 minutes to open your account.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/login"
              className="rounded-full bg-white px-5 py-2.5 text-[11px] font-extrabold text-[#0d7327]"
            >
              Join SACCOPlus
            </Link>
            <Link
              href="/auth/login"
              className="rounded-full bg-white/12 px-5 py-2.5 text-[11px] font-extrabold text-white"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
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
