'use client';

import { WagmiProvider } from 'wagmi';
import { config } from './wagmi.config';

export function WagmiProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  );
}
