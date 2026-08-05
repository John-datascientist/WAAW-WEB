'use client';

import { useState } from 'react';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { ONBOARDING_STEPS, nextInterviewSlot } from '../../../src/data';
import { isStepDone } from '../../../src/lib/onboardingProgress';
import { ErrorBanner, GhostButton, GoldButton } from '../../../src/components/ui';

export default function InterviewPage() {
  const { startup, cofounders, updateStartup } = useFounderStartupContext();
  const [error, setError] = useState<string | null>(null);
  const requested = !!startup?.interview_requested;
  const ready = ONBOARDING_STEPS.filter((s) => s.id !== 'interview').every((s) => isStepDone(s.id, startup, cofounders));

  const handleRequest = async () => {
    if (!ready) return;
    setError(null);
    const result = await updateStartup({
      interview_requested: true,
      interview_scheduled_for: nextInterviewSlot(3),
      onboarding_complete: true,
    });
    if (result.error) setError(result.error);
  };

  return (
    <div className="text-center">
      <ErrorBanner message={error} />
      <p className="mb-4 text-4xl">{requested ? '✓' : '🗓️'}</p>
      <h2 className="mb-3 font-serif text-2xl text-tx">{requested ? 'Interview requested' : 'Founder interview'}</h2>
      <p className="mx-auto mb-6 max-w-md font-sans text-sm font-light leading-relaxed text-mu">
        {requested
          ? 'A member of the WAAW team will meet with you to review your application. Once verified, download the WAAW mobile app to monitor your listing and activity.'
          : ready
            ? "You've completed every verification step. The final step is a short interview with a member of the WAAW team before your startup goes live."
            : 'Complete every step above — co-founders, address, company, and documents — to unlock your founder interview.'}
      </p>

      {requested && startup?.interview_scheduled_for && (
        <div className="mx-auto mb-6 max-w-xs rounded-md border border-ln bg-card p-4">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-wider text-mu">Scheduled for</p>
          <p className="font-serif text-lg text-tx">{startup.interview_scheduled_for}</p>
        </div>
      )}

      {!requested && (
        <GoldButton onClick={handleRequest} disabled={!ready}>Request interview</GoldButton>
      )}

      {requested && (
        <div className="mx-auto mt-4 max-w-xs rounded-md border border-suBorder bg-suLight p-4 font-sans text-xs text-su">
          Once WAAW verifies your startup, switch to the mobile app to monitor your account.
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <GhostButton href={ONBOARDING_STEPS[5].path}>Back</GhostButton>
        {requested && <GoldButton href="/">Back to WAAW</GoldButton>}
      </div>
    </div>
  );
}
