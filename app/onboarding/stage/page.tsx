'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { BUSINESS_STAGES, ONBOARDING_STEPS } from '../../../src/data';
import { Chip, ErrorBanner, StepFooter } from '../../../src/components/ui';

export default function StagePage() {
  const router = useRouter();
  const { startup, updateStartup } = useFounderStartupContext();
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (stage: string) => {
    setError(null);
    const result = await updateStartup({ stage });
    if (result.error) setError(result.error);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">What stage is your business at?</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">This helps investors understand where you are today.</p>

      <ErrorBanner message={error} />

      <div className="flex flex-wrap gap-2">
        {BUSINESS_STAGES.map((stage) => (
          <Chip key={stage} label={stage} active={startup?.stage === stage} onClick={() => handleSelect(stage)} />
        ))}
      </div>

      <StepFooter
        onContinue={() => router.push(ONBOARDING_STEPS[1].path)}
        disabled={!startup?.stage}
      />
    </div>
  );
}
