'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import ContributionForm from '@/components/savings/ContributionForm';

export default function SavingsPage() {
  return (
    <DashboardLayout title="Savings - Contribution">  
      <ContributionForm />
    </DashboardLayout>
  );
}
