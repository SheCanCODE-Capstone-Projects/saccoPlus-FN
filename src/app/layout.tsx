import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/shared/Providers';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'SACCOPlus Rwanda',
  description: 'Digital SACCO Member Savings & Loan Management Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
