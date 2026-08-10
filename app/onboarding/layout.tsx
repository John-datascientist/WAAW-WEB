'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';
import { FounderStartupProvider, useFounderStartupContext } from '../../src/context/FounderStartupContext';
import { ONBOARDING_STEPS } from '../../src/data';
import { isStepDone, onboardingProgress } from '../../src/lib/onboardingProgress';
import { ProgressBar } from '../../src/components/ui';

function OnboardingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { startup, cofounders, loading } = useFounderStartupContext();
  const { pct } = onboardingProgress(startup, cofounders);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/" className="mb-6 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
        ← WAAW
      </Link>
      <h1 className="mb-4 font-serif text-2xl text-tx">Founder onboarding</h1>
      <ProgressBar pct={loading ? 0 : pct} />
      <p className="mb-8 font-mono text-[10px] uppercase tracking-wider text-mu">{loading ? 'Loading…' : `${pct}% complete`}</p>

      <nav className="mb-10 flex flex-wrap gap-2">
        {ONBOARDING_STEPS.map((s) => {
          const active = pathname === s.path;
          const done = isStepDone(s.id, startup, cofounders);
          return (
            <Link
              key={s.id}
              href={s.path}
              className={`rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${
                active ? 'border-pu bg-puXlight text-pu' : done ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
              }`}
            >
              {done ? '✓ ' : ''}{s.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace('/signin');
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="px-6 py-16 text-center font-sans text-sm text-mu">Loading…</div>;
  }

  // `profile` can be null here for two different reasons — the fetch is
  // done and genuinely found nothing, or it errored — and both used to
  // fall through this check silently (since `profile && ...` is false for
  // null) straight into the founder wizard. That let an account whose
  // profile row failed to load (regardless of its real role) register a
  // startup it has no waaw_profiles row to be the founder_id of, which
  // fails at the database with a foreign-key violation instead of a
  // legible error. Blocking on missing profile too closes that gap.
  if (!profile) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="mb-4 font-sans text-sm text-mu">
          Your account details couldn&apos;t be loaded, so startup registration is unavailable right now.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="font-mono text-xs uppercase tracking-wider text-pu"
        >
          Try again →
        </button>
      </div>
    );
  }

  if (profile.role !== 'founder') {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="mb-4 font-sans text-sm text-mu">
          This is an investor account. Startup registration is for founders only.
        </p>
        <Link href="/startups" className="font-mono text-xs uppercase tracking-wider text-pu">Browse startups →</Link>
      </div>
    );
  }

  return (
    <FounderStartupProvider>
      <OnboardingChrome>{children}</OnboardingChrome>
    </FounderStartupProvider>
  );
}
