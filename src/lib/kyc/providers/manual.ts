import { KycProvider } from './types';

// Always defers to a human reviewer. This is what keeps the KYC pipeline
// working end to end before any third-party verification provider is
// integrated — every submission simply lands in the admin review queue.
export const manualProvider: KycProvider = {
  name: 'manual',
  async verify() {
    return {
      result: 'needs_review',
      providerName: 'manual',
      providerReference: null,
      reason: null,
    };
  },
};
