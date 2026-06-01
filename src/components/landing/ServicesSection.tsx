'use client';
import Image from 'next/image';
import { ArrowRight, Zap, Users, Shield, Building2, CheckCircle2 } from 'lucide-react';

/* ── SVG Progress Ring ───────────────────────────────────────────────────── */
function ProgressRing({
  pct = 75,
  size = 108,
  stroke = 10,
}: {
  pct?: number;
  size?: number;
  stroke?: number;
}) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#d1dbd3" strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#0d631b" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black leading-none" style={{ fontSize: 22, color: '#111' }}>
          {pct}%
        </span>
      </div>
    </div>
  );
}

/* ── Services Section ────────────────────────────────────────────────────── */
export function ServicesSection() {
  return (
    <section className="w-full" style={{ backgroundColor: '#f1f5eb' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">

        {/* ── Section header ── */}
        <div className="mb-10">
          <h2
            className="font-black leading-tight mb-3"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)',
              color: '#1a1a1a',
              letterSpacing: '-0.025em',
            }}
          >
            Financial inclusion{' '}
            {/* Amber/orange highlight — matched from pixel data #b26b17 / #d59540 */}
            <span
              style={{
                background: 'linear-gradient(135deg, #f5c842 0%, #e8a020 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for all
            </span>
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: '#6b7280', maxWidth: 460 }}
          >
            We&apos;ve reimagined traditional SACCO mechanics for the digital age,
            keeping the heart of community while adding world-class security.
          </p>
        </div>

        {/* ── 2 × 2 card grid ── */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
          }}
        >

          {/* ══ CARD 1 — Individual Savings (white + dashboard image) ══ */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 22,
              minHeight: 230,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}
          >
            {/* Left text content */}
            <div
              className="relative z-10 flex flex-col h-full"
              style={{ padding: '28px 28px 28px 28px', maxWidth: '55%' }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center mb-4 shrink-0"
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  backgroundColor: '#dcfce7',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <polyline
                    points="2,14 5,9 8,11 12,5 16,8"
                    stroke="#0d631b" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <h3
                className="font-bold leading-tight mb-2"
                style={{ fontSize: 16, color: '#111' }}
              >
                Individual Savings
              </h3>
              <p
                className="text-xs leading-relaxed mb-5"
                style={{ color: '#6b7280' }}
              >
                Build personal wealth with automated savings plans, competitive
                interest rates, and real-time tracking.
              </p>

              <a
                href="/auth/register/individual"
                className="inline-flex items-center gap-1 font-semibold mt-auto"
                style={{ fontSize: 13, color: '#0d631b' }}
              >
                Open Account <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Dashboard screenshot — right portion */}
            <div
              className="absolute top-0 right-0 bottom-0"
              style={{ width: '48%', borderRadius: '0 22px 22px 0', overflow: 'hidden' }}
            >
              {/* Left fade */}
              <div
                className="absolute inset-y-0 left-0 z-10"
                style={{
                  width: 48,
                  background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
                }}
              />
              <Image
                src="/images/Container.png"
                alt="Dashboard"
                fill
                className="object-cover object-left-top"
                style={{ opacity: 0.9 }}
              />
            </div>
          </div>

          {/* ══ CARD 2 — Quick Loans (dark green) ══ */}
          <div
            className="relative overflow-hidden flex flex-col justify-between"
            style={{
              backgroundColor: '#0d631b',
              borderRadius: 22,
              minHeight: 230,
              padding: '28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            }}
          >
            {/* Subtle circle decorations */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 160, height: 160,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                top: -50, right: -50,
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                width: 100, height: 100,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.04)',
                bottom: -30, left: -30,
              }}
            />

            {/* Top content */}
            <div className="relative z-10">
              <div
                className="flex items-center justify-center mb-5 shrink-0"
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  backgroundColor: 'rgba(255,255,255,0.14)',
                }}
              >
                <Zap className="w-5 h-5" style={{ color: '#86efac' }} />
              </div>

              <h3 className="font-bold text-white mb-2" style={{ fontSize: 16 }}>
                Quick Loans
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 210 }}
              >
                Instant access to emergency funds and business loans with
                minimal paperwork and fast approval.
              </p>
            </div>

            {/* Rate display */}
            <div className="relative z-10">
              <p
                className="font-medium mb-1"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}
              >
                Rates from
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-black leading-none"
                  style={{ fontSize: 46, color: '#86efac', letterSpacing: '-0.03em' }}
                >
                  12%
                </span>
                <span
                  className="font-semibold"
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}
                >
                  p.a.
                </span>
              </div>
            </div>
          </div>

          {/* ══ CARD 3 — Community Trust (blue) ══ */}
          <div
            className="relative overflow-hidden flex flex-col justify-between"
            style={{
              backgroundColor: '#005db7',
              borderRadius: 22,
              minHeight: 210,
              padding: '28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            }}
          >
            {/* Circle decorations */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 140, height: 140,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.07)',
                top: -40, right: -40,
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                width: 90, height: 90,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.04)',
                bottom: -20, right: 40,
              }}
            />

            {/* Top content */}
            <div className="relative z-10">
              <div
                className="flex items-center justify-center mb-5 shrink-0"
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  backgroundColor: 'rgba(255,255,255,0.14)',
                }}
              >
                <Users className="w-5 h-5 text-white" />
              </div>

              <h3 className="font-bold text-white mb-2" style={{ fontSize: 16 }}>
                Community Trust
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 230 }}
              >
                Join thousands of Rwandans building wealth together through
                transparent, community-governed savings circles.
              </p>
            </div>

            {/* Divider + shield stat */}
            <div className="relative z-10">
              <div
                className="w-full mb-4"
                style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.15)' }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 32, height: 32,
                    borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                  }}
                >
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p
                    className="font-medium"
                    style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}
                  >
                    Repayment Rate
                  </p>
                  <p className="font-bold text-white" style={{ fontSize: 14 }}>
                    99.8%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ══ CARD 4 — Group Savings (white + sage ring panel) ══ */}
          <div
            className="relative overflow-hidden flex items-stretch"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 22,
              minHeight: 210,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}
          >
            {/* Left text content */}
            <div
              className="flex flex-col flex-1 min-w-0"
              style={{ padding: '28px 20px 28px 28px' }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center mb-4 shrink-0"
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  backgroundColor: '#fee2e2',
                }}
              >
                <Building2 style={{ width: 18, height: 18, color: '#dc2626' }} />
              </div>

              <h3
                className="font-bold leading-tight mb-2"
                style={{ fontSize: 16, color: '#111' }}
              >
                Group Savings
              </h3>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: '#6b7280', maxWidth: 180 }}
              >
                Pool resources with your community group for larger goals,
                shared investments, and collective growth.
              </p>

              {/* Bullet list */}
              <ul className="space-y-2 mt-auto">
                {['Automated payouts', 'Multi-signature security'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2
                      style={{ width: 15, height: 15, color: '#0d631b', flexShrink: 0 }}
                    />
                    <span
                      className="font-medium"
                      style={{ fontSize: 12, color: '#374151' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right sage panel with progress ring */}
            <div
              className="flex flex-col items-center justify-center shrink-0"
              style={{
                width: 140,
                backgroundColor: '#ebefe5',
                borderRadius: '0 22px 22px 0',
                padding: '24px 16px',
                gap: 10,
              }}
            >
              <ProgressRing pct={75} size={108} stroke={10} />
              <p
                className="font-semibold text-center leading-tight"
                style={{ fontSize: 11, color: '#4b5563', maxWidth: 90 }}
              >
                Monthly Goal<br />Reached
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
