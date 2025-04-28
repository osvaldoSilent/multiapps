'use client';

import { WagmiProviderWrapper } from '@/components/web3/WagmiProviderWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProviderWrapper>
      <div className="p-4">
        {/* Aquí podrías meter navbar, sidebar, etc */}
        {children}
      </div>
    </WagmiProviderWrapper>
  );
}
