'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
} from 'lucide-react';

const offices = [
  {
    city: 'Kigali (HQ)',
    address: 'KG 7 Ave, Gasabo District, Kigali',
    phone: '+250 788 123 456',
    email: 'kigali@saccoplus.rw',
    hours: 'Mon – Fri: 8 am – 5 pm',
  },
  {
    city: 'Musanze',
    address: 'Musanze District, Northern Province',
    phone: '+250 788 234 567',
    email: 'musanze@saccoplus.rw',
    hours: 'Mon – Fri: 8 am – 4 pm',
  },
  {
    city: 'Huye',
    address: 'Huye District, Southern Province',
    phone: '+250 788 345 678',
    email: 'huye@saccoplus.rw',
    hours: 'Mon – Fri: 8 am – 4 pm',
  },
];

const faqs = [
  {
    q: 'How do I open a SACCOPlus account?',
    a: 'You can register online in under 3 minutes. Click "Get Started" in the top-right corner, choose Individual or Group savings, and follow the guided steps.',
  },
  {
    q: 'What documents do I need to join?',
    a: 'A valid National ID (or passport for non-citizens) and a Rwandan phone number. Group accounts additionally require a letter of association.',
  },
  {
    q: 'How long does a loan decision take?',
    a: 'Decisions for Silver-tier members are instant. New applicants typically receive a decision within 24 hours of submitting all required information.',
  },
  {
    q: 'Is my money safe with SACCOPlus?',
    a: 'Yes. SACCOPlus is licensed and supervised by the National Bank of Rwanda. All deposits are protected under the Rwanda Deposit Guarantee Fund.',
  },
];

const subjects = [
  'General Inquiry',
  'Account Opening',
  'Loan Application',
  'Group Savings',
  'Technical Support',
  'Complaint',
  'Other',
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
              <Link href="/about">About Us</Link>
              <Link href="/contact" className="text-[#0c7025]">Contact</Link>
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
      <section className="mx-auto max-w-[1200px] px-4 pt-14 pb-12 sm:px-6 md:pt-20 md:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e9f7e6] px-3 py-1.5 text-[11px] font-extrabold text-[#0d7327]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d7327]" />
          We're here to help
        </div>
        <h1 className="mt-5 text-[40px] font-extrabold leading-[0.96] text-[#142116] sm:text-[56px]">
          <span className="block text-[52px] uppercase leading-[0.98] sm:text-[68px]">Get in</span>
          <span className="block text-[30px] font-semibold italic text-[#0d7327] sm:text-[38px]">
            Touch.
          </span>
        </h1>
        <p className="mt-4 max-w-[520px] text-[13px] leading-6 text-[#586352]">
          Have a question, want to open an account, or need help with a loan? Our team is ready
          to assist you in Kinyarwanda or English — by phone, email, or in person.
        </p>
      </section>

      {/* ── Contact Cards ── */}
      <section className="bg-[#f2f7ee]">
        <div className="mx-auto max-w-[1136px] px-4 py-12 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-[18px] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(16,35,18,0.07)]">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#e9f7e6] text-[#0d7327]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6d7868]">Call Us</p>
                <p className="mt-1 text-[14px] font-extrabold text-[#07120a]">+250 788 123 456</p>
                <p className="mt-1 text-[11px] font-medium text-[#586352]">Mon – Fri, 8 am – 5 pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[18px] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(16,35,18,0.07)]">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#e8f0fb] text-[#0a65bb]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6d7868]">Email Us</p>
                <p className="mt-1 text-[14px] font-extrabold text-[#07120a]">hello@saccoplus.rw</p>
                <p className="mt-1 text-[11px] font-medium text-[#586352]">We reply within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[18px] bg-white px-6 py-7 shadow-[0_4px_24px_rgba(16,35,18,0.07)]">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[12px] bg-[#fce8ee] text-[#b1123c]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#6d7868]">Visit Us</p>
                <p className="mt-1 text-[14px] font-extrabold text-[#07120a]">KG 7 Ave, Gasabo</p>
                <p className="mt-1 text-[11px] font-medium text-[#586352]">Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form + Offices ── */}
      <section className="mx-auto max-w-[1136px] px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">

          {/* Contact Form */}
          <div>
            <h2 className="text-[22px] font-extrabold text-[#06110a]">Send us a message</h2>
            <p className="mt-2 text-[12px] font-medium text-[#586352]">
              Fill in the form and a member of our team will get back to you shortly.
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-[18px] bg-[#e9f7e6] px-8 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-[#0d7327]" />
                <p className="text-[18px] font-extrabold text-[#07120a]">Message received!</p>
                <p className="max-w-[320px] text-[12px] font-medium text-[#3a4a3c]">
                  Thank you, <span className="font-bold">{form.name}</span>. We'll be in touch
                  within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-2 rounded-full bg-[#0d7327] px-5 py-2.5 text-[11px] font-extrabold text-white shadow-[0_10px_24px_rgba(13,115,39,0.24)]"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52604d]">
                      Full Name
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Amina Uwase"
                      className="w-full rounded-[12px] border border-[#dfe8db] bg-white px-4 py-3 text-[12px] font-medium text-[#102312] placeholder:text-[#b0bba8] focus:border-[#0d7327] focus:outline-none focus:ring-2 focus:ring-[#0d7327]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52604d]">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+250 7XX XXX XXX"
                      className="w-full rounded-[12px] border border-[#dfe8db] bg-white px-4 py-3 text-[12px] font-medium text-[#102312] placeholder:text-[#b0bba8] focus:border-[#0d7327] focus:outline-none focus:ring-2 focus:ring-[#0d7327]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52604d]">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-[12px] border border-[#dfe8db] bg-white px-4 py-3 text-[12px] font-medium text-[#102312] placeholder:text-[#b0bba8] focus:border-[#0d7327] focus:outline-none focus:ring-2 focus:ring-[#0d7327]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52604d]">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      required
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-[12px] border border-[#dfe8db] bg-white px-4 py-3 text-[12px] font-medium text-[#102312] focus:border-[#0d7327] focus:outline-none focus:ring-2 focus:ring-[#0d7327]/20"
                    >
                      <option value="" disabled>Select a subject…</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a47d]" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#52604d]">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full resize-none rounded-[12px] border border-[#dfe8db] bg-white px-4 py-3 text-[12px] font-medium text-[#102312] placeholder:text-[#b0bba8] focus:border-[#0d7327] focus:outline-none focus:ring-2 focus:ring-[#0d7327]/20"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0d7327] py-3 text-[12px] font-extrabold text-white shadow-[0_10px_24px_rgba(13,115,39,0.24)] transition-opacity hover:opacity-90"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Branch Offices */}
          <div>
            <h2 className="text-[22px] font-extrabold text-[#06110a]">Our offices</h2>
            <p className="mt-2 text-[12px] font-medium text-[#586352]">
              Walk-ins are welcome during business hours.
            </p>

            <div className="mt-6 space-y-4">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="rounded-[16px] border border-[#e5edde] bg-white px-6 py-5"
                >
                  <p className="text-[14px] font-extrabold text-[#07120a]">{office.city}</p>
                  <div className="mt-3 space-y-2 text-[11px] font-medium text-[#586352]">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-px h-3.5 w-3.5 flex-shrink-0 text-[#0d7327]" />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 flex-shrink-0 text-[#0d7327]" />
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 flex-shrink-0 text-[#0d7327]" />
                      {office.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0 text-[#0d7327]" />
                      {office.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#f2f7ee]">
        <div className="mx-auto max-w-[780px] px-4 py-16 sm:px-6 md:py-20">
          <div className="text-center">
            <h2 className="text-[24px] font-extrabold text-[#06110a] sm:text-[32px]">
              Frequently asked <span className="text-[#0d7327]">questions</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[460px] text-[12px] font-medium leading-[1.6] text-[#263326]">
              Quick answers to the questions we hear most often.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[14px] border border-[#e5edde] bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-[13px] font-extrabold text-[#07120a]">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-[#0d7327] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-[#e5edde] px-6 py-4">
                    <p className="text-[12px] font-medium leading-[1.7] text-[#3a4a3c]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-[920px] px-4 py-10">
        <div className="overflow-hidden rounded-[22px] bg-[#0d7327] p-7 text-center text-white shadow-[0_20px_42px_rgba(13,115,39,0.22)] md:p-9">
          <h2 className="text-[28px] font-extrabold tracking-[-0.05em]">
            Ready to grow your future?
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[13px] leading-6 text-white/80">
            It takes less than 3 minutes to set up your SACCOPlus account. Join the community
            today.
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
            <Link href="/contact" className="underline underline-offset-4">Contact Us</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
