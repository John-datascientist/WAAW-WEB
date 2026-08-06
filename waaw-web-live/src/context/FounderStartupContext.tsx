'use client';

import React, { createContext, useContext } from 'react';
import { useFounderStartup } from '../lib/useFounderStartup';

type FounderStartupValue = ReturnType<typeof useFounderStartup>;

const FounderStartupContext = createContext<FounderStartupValue | null>(null);

// Single fetch per onboarding session, shared across every step page —
// each step would otherwise re-fetch the same startup/cofounder rows.
export function FounderStartupProvider({ children }: { children: React.ReactNode }) {
  const value = useFounderStartup();
  return <FounderStartupContext.Provider value={value}>{children}</FounderStartupContext.Provider>;
}

export function useFounderStartupContext() {
  const ctx = useContext(FounderStartupContext);
  if (!ctx) throw new Error('useFounderStartupContext must be used within FounderStartupProvider');
  return ctx;
}
