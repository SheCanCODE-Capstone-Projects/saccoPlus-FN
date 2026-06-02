'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f8ee] px-4 text-[#20271f]">

      {/* Decorative background number */}
      <div
        aria-hidden
        className="pointer-events-none absolute select-none text-[clamp(160px,30vw,320px)] font-extrabold leading-none tracking-tighter text-[#e8f3e4]"
      >
        404
      </div>

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-[28px] bg-white px-8 py-12 text-center shadow-sm ring-1 ring-[#e8eee2]">

        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4e8]">
          <Search className="h-7 w-7 text-[#0f6f29]" strokeWidth={2} />
        </div>
        {/* Headline */}
        <h1 className="mt-3 text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-[#1f251e]">
          404
        </h1>
        {/* Eyebrow */}
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#899384]">
          Page not found
        </p>

        {/* Headline */}
        <h1 className="mt-3 text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-[#1f251e]">
          This page doesn&apos;t exist
        </h1>

        {/* Body */}
        <p className="mt-3 text-[13px] leading-6 text-[#596256]">
          The route you followed may have moved, been removed, or never
          existed. Check the URL or navigate back to a known page.
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-[#f0f4eb]" />

        {/* Actions */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/member"
            className="flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#0f6f29] px-5 py-3.5 text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(15,111,41,0.2)] transition hover:bg-[#0d5f23] active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex flex-1 items-center justify-center gap-2 rounded-[12px] border-2 border-[#dfe7d9] px-5 py-3.5 text-[13px] font-extrabold text-[#596256] transition hover:bg-[#eef4e8] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-8 w-full">
          <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#899384]">
            Or go to
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Loans',        href: '/loans'            },
              { label: 'Transactions', href: '/transactions'     },
              { label: 'Groups',       href: '/groups'           },
              { label: 'Withdraw',     href: '/withdraw'         },
              { label: 'Support',      href: '/support'          },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-[#f0f5eb] px-4 py-1.5 text-[12px] font-extrabold text-[#3f493e] transition hover:bg-[#0f6f29] hover:text-white active:scale-95"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-8 text-[11px] font-semibold tracking-wide text-[#b0b9aa]">
        SACCOPlus · Rooted in Rwanda
      </p>
    </main>
  );
}
