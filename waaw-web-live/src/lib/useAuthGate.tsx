'use client';

import Link from 'next/link';
import { InvestorNav } from '../components/InvestorNav';
import { BackButton } from '../components/ui';
import { useAuth } from '../context/AuthContext';

interface AuthGateOptions {
  fallbackHref: string;
  signedOutMessage: string;
}

// Distinguishes "not signed in" from "signed in but the profile row hasn't
// loaded yet" from "signed in but the profile fetch actually failed" —
// pages used to collapse all three into a single `if (!profile)` check,
// which meant a genuinely signed-in user briefly saw (or, if the fetch
// failed, saw indefinitely) a "sign in to view this page" prompt with no
// way to tell the difference from actually being logged out.
export function useAuthGate({ fallbackHref, signedOutMessage }: AuthGateOptions) {
  const { user, profile, loading } = useAuth();

  if (!user) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref={fallbackHref} />
        <main className="mx-auto max-w-md px-6 py-16 text-center">
          <p className="mb-4 font-sans text-sm text-mu">{signedOutMessage}</p>
          <Link href="/signin" className="font-mono text-xs uppercase tracking-wider text-pu">Sign in →</Link>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref={fallbackHref} />
        <main className="mx-auto max-w-md px-6 py-16 text-center">
          <p className="font-sans text-sm text-mu">Loading…</p>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref={fallbackHref} />
        <main className="mx-auto max-w-md px-6 py-16 text-center">
          <p className="mb-4 font-sans text-sm text-mu">
            You&apos;re signed in, but your account details couldn&apos;t be loaded.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-mono text-xs uppercase tracking-wider text-pu"
          >
            Try again →
          </button>
        </main>
      </div>
    );
  }

  return null;
}
