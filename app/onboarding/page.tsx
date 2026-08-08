'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFounderStartupContext } from '../../src/context/FounderStartupContext';
import { ONBOARDING_STEPS } from '../../src/data';
import { isStepDone } from '../../src/lib/onboardingProgress';

export default function OnboardingIndexPage() {
  const router = useRouter();
  const { startup, cofounders, loading } = useFounderStartupContext();

  useEffect(() => {
    if (loading) return;
    const next = ONBOARDING_STEPS.find((s) => !isStepDone(s.id, startup, cofounders));
    router.replace(next ? next.path : '/onboarding/interview');
  }, [loading, startup, cofounders, router]);

  return <div className="font-sans text-sm text-mu">Loading your onboarding…</div>;
}
