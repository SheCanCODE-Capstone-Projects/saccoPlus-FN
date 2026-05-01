import { Star, Users, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function RegisterRightPanel() {
  return (
    <aside className="hidden xl:flex flex-col h-full relative overflow-hidden w-[320px] shrink-0">
      <Image src="/images/Community Background.png" alt="Community" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col h-full p-5">

        <div className="flex-1" />

        {/* Testimonial card */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-blue-500 text-blue-500" />
            ))}
          </div>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">
            &ldquo;Joining this SACCO was the best decision for my small business.
            The registration process was seamless.&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ backgroundColor: '#166534' }}
            >
              AU
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Aline Uwimana</p>
              <p className="text-[10px] text-gray-400">Market Vendor, Kigali</p>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Trust badges */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xs text-white font-medium drop-shadow">
              Join 50,000+ Rwandans growing together.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-xs text-white font-medium drop-shadow">
              Regulated by the National Bank of Rwanda.
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
}
