'use client';

import { useState } from 'react';
import { ArrowRight, Heart, AlertCircle, CheckCircle, Download, HelpCircle } from 'lucide-react';
import Image from 'next/image';

type PaymentMethod = 'mtn' | 'airtel' | 'bank' | null;

const paymentMethods = [
  {
    id: 'mtn',
    name: 'MTN MoMo',
    description: 'Instant deposit (min 1 000 RWF)',
    icon: '📱',
    color: 'yellow',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    description: 'Instant deposit (+0.5% fee)',
    icon: '🔴',
    color: 'red',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: '1-2 Business days (500 RWF min)',
    icon: '🏦',
    color: 'blue',
  },
];

const presetAmounts = [5000, 10000, 50000];

export default function ContributionForm() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [depositAmount, setDepositAmount] = useState('10000');
  const [communityFee, setCommunityFee] = useState(50);
  const [showSuccess, setShowSuccess] = useState(false);

  const amount = parseInt(depositAmount) || 0;
  const total = amount + communityFee;

  return (
    <div className="space-y-8">
      {/* Back to Savings */}
      <div className="flex items-center gap-2 text-sm font-medium text-[#0f6f29]">
        <span>←</span>
        <span>BACK TO SAVINGS</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Grow Your Contribution</h1>
        <p className="text-gray-600">
          Add funds to your SACCO wallet safely and securely. Your collective growth starts with a single step.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select Payment Method */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f6f29] text-white text-sm font-bold">
                  1
                </div>
                <h2 className="text-lg font-semibold text-[#1a1a1a]">Select Payment Method</h2>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === method.id
                        ? 'border-[#0f6f29] bg-[#f0fef5]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                      className="w-5 h-5 accent-[#0f6f29]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#1a1a1a]">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                    <div className="text-2xl">{method.icon}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Enter Deposit Amount */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f6f29] text-white text-sm font-bold">
                  2
                </div>
                <h2 className="text-lg font-semibold text-[#1a1a1a]">Enter Deposit Amount</h2>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">AMOUNT IN RWF</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="flex-1 px-4 py-3 text-2xl font-semibold text-gray-300 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f6f29]"
                    placeholder="10 000"
                  />
                  <span className="flex items-center px-4 py-3 text-gray-400 font-semibold">RWF</span>
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="flex gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDepositAmount(amt.toString())}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      parseInt(depositAmount) === amt
                        ? 'bg-[#0f6f29] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {(amt / 1000).toFixed(0)} 000
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Minimum deposit: 1 000 RWF</p>
            </div>


          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Community Contribution Card */}
            <div className="bg-gradient-to-b from-[#e8f5e1] to-[#f0fef5] rounded-2xl p-6 mb-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="text-2xl">💚</div>
                <h3 className="font-semibold text-[#1a1a1a]">Community Contribution</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Deposit Amount</p>
                  <div className="text-2xl font-bold text-[#0f6f29]">
                    {amount.toLocaleString()} <span className="text-lg">RWF</span>
                  </div>
                </div>

                <div className="border-t border-[#0f6f29]/20 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">Community Fee</p>
                    <p className="text-sm font-semibold text-[#0f6f29]">+ {communityFee} RWF</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    This supports a fund for lending, providing assistance to members in times of hardship.
                  </p>
                </div>

                <div className="border-t border-[#0f6f29]/20 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-[#1a1a1a]">Total Payable</p>
                    <p className="text-2xl font-bold text-[#0f6f29]">
                      {total.toLocaleString()} <span className="text-lg">RWF</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-white rounded-lg p-3 mb-6 flex gap-2 text-xs text-gray-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#0f6f29] mt-0.5" />
                <p>
                  Secured by laws of financial regulations. Your funds are protected by the Umutuelle SACCO
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => setShowSuccess(true)}
                  className="w-full bg-[#0f6f29] hover:bg-[#0d5620] text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Continue to Confirm
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full border-2 border-[#0f6f29] text-[#0f6f29] hover:bg-[#f0fef5] font-semibold py-3 rounded-lg transition">
                  Cancel Transaction
                </button>
              </div>

              {/* Community image — same width as buttons, moderate height */}
              <div className="relative w-full mt-4 rounded-xl overflow-hidden" style={{ height: 160 }}>
                <Image
                  src="/images/pix.png"
                  alt="SACCO Community"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25 flex items-end p-3">
                  <p className="text-white text-xs font-medium leading-snug">
                    &ldquo;Urugwiro n&apos;iterambere.&rdquo; — Growing together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {showSuccess && <SuccessModal amount={total} onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

function SuccessModal({ amount, onClose }: { amount: number; onClose: () => void }) {
  const transactionId = 'SAC-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[320px] bg-white rounded-2xl p-6 shadow-lg">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-[#0f6f29] rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold text-[#1a1a1a] mb-2">
          Deposit Successful
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Your funds have been securely added to your SACCOPlus wallet.
        </p>

        {/* Amount Details */}
        <div className="bg-[#f0fef5] rounded-lg p-4 mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-1 uppercase">Amount Deposited</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-[#0f6f29]">
              {amount.toLocaleString()} <span className="text-sm">RWF</span>
            </p>
            <span className="text-xs font-semibold text-white bg-[#0f6f29] px-3 py-1 rounded-full">
              Completed
            </span>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-600 font-medium">Wallet Destination</p>
            <p className="font-semibold text-[#1a1a1a]">Primary Wallet</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600 font-medium">Transaction ID</p>
            <p className="font-semibold text-[#1a1a1a] text-xs">{transactionId}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button 
            onClick={onClose}
            className="w-full bg-[#0f6f29] hover:bg-[#0d5620] text-white font-semibold py-3 rounded-lg transition"
          >
            Back to Dashboard
          </button>
          <button className="w-full border-2 border-[#177ec4] text-[#177ec4] hover:bg-[#e3f2fd] font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            View Receipt
          </button>
        </div>

        {/* Help Link */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 text-[#0f6f29] font-medium text-sm hover:underline">
          <HelpCircle className="w-4 h-4" />
          Need help with this transaction?
        </button>
      </div>
    </div>
  );
}
