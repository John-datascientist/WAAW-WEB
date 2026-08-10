import { manualProvider } from './manual';
import type { KycProvider } from './types';

// Swap this to select a different configured provider once one is wired
// up (credentials as env vars, documented alongside the provider's own
// module). The submission pipeline only depends on the KycProvider
// interface, never on which implementation is active.
export const activeKycProvider: KycProvider = manualProvider;

export * from './types';
