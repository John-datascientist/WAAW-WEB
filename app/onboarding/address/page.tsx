'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { ONBOARDING_STEPS } from '../../../src/data';
import { ErrorBanner, Field, GoldButton, StepFooter } from '../../../src/components/ui';

export default function AddressPage() {
  const router = useRouter();
  const { startup, updateStartup } = useFounderStartupContext();
  const [address, setAddress] = useState(startup?.address_line ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!address.trim()) return;
    setError(null);
    const result = await updateStartup({ address_line: address.trim(), address_verified: true, city: address.trim() });
    if (result.error) setError(result.error);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Address verification</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        Enter your registered business address. WAAW confirms this during your founder interview.
      </p>

      <ErrorBanner message={error} />

      <Field label="Business address" value={address} onChange={setAddress} placeholder="12 Adeola Odeku St, Victoria Island, Lagos" />

      <GoldButton onClick={handleVerify} disabled={!address.trim()}>Submit address</GoldButton>
      {startup?.address_verified && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-su">✓ Address submitted</p>
      )}

      <StepFooter
        backHref={ONBOARDING_STEPS[2].path}
        onContinue={() => router.push(ONBOARDING_STEPS[4].path)}
        disabled={!startup?.address_verified}
      />
    </div>
  );
}
