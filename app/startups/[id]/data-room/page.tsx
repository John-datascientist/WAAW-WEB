'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InvestorNav } from '../../../../src/components/InvestorNav';
import { BackButton, ErrorBanner, GoldButton } from '../../../../src/components/ui';
import { useAuth } from '../../../../src/context/AuthContext';
import { useAuthGate } from '../../../../src/lib/useAuthGate';
import { useNdaAcceptance, useStartup } from '../../../../src/lib/useInvestor';

const fmt = (n: number) => (n >= 1000000 ? '$' + (n / 1000000).toFixed(1) + 'M' : '$' + n.toLocaleString());

function SourceTag({ verified }: { verified?: boolean }) {
  return (
    <span
      className={`ml-2 rounded-sm px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider ${
        verified ? 'bg-pu text-white' : 'bg-deeper text-mu'
      }`}
    >
      {verified ? 'Verified by WAAW' : 'Founder-reported'}
    </span>
  );
}

function DocRow({ label, url }: { label: string; url: string | null }) {
  return (
    <div className="flex items-center justify-between border-b border-ln py-3 last:border-0">
      <div>
        <p className="font-sans text-sm text-tx">{label}</p>
        <SourceTag />
      </div>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-pu hover:underline">
          View ↗
        </a>
      ) : (
        <span className="font-mono text-[10px] uppercase tracking-wider text-mu">Not provided</span>
      )}
    </div>
  );
}

export default function DataRoomPage({ params }: { params: { id: string } }) {
  const { profile } = useAuth();
  const { startup, loading } = useStartup(params.id);
  const { accepted, loading: ndaLoading, accepting, accept } = useNdaAcceptance(params.id);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  const gate = useAuthGate({ fallbackHref: `/startups/${params.id}`, signedOutMessage: 'Sign in to view this deal’s data room.' });
  if (gate) return gate;
  if (!profile) return null;

  if (loading || ndaLoading) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref={`/startups/${params.id}`} />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center"><p className="font-sans text-sm text-mu">Loading…</p></main>
      </div>
    );
  }

  if (!startup) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref="/startups" />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center"><p className="font-sans text-sm text-mu">This deal couldn&apos;t be found.</p></main>
      </div>
    );
  }

  const handleAccept = async () => {
    setAcceptError(null);
    const { error } = await accept();
    if (error) setAcceptError(error);
  };

  return (
    <div>
      <InvestorNav />
      <BackButton fallbackHref={`/startups/${startup.id}`} />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-1 font-serif text-3xl text-tx">Data room · {startup.name}</h1>
        <p className="mb-8 font-sans text-sm font-light text-mu">
          Documents and figures the founder submitted during onboarding. Each item below is labelled by its
          source. WAAW independently reviews the founder and the deal before listing, but individual financials
          and documents are founder-reported unless noted otherwise.
        </p>

        {!accepted ? (
          <div className="rounded-md border border-ln bg-card p-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">Before you continue</p>
            <p className="mb-4 font-sans text-sm font-light leading-relaxed text-tx">
              The documents in this data room are shared with you in confidence. By continuing, you agree not to
              copy, forward, or otherwise share them outside your own investment decision-making, and to treat
              {' '}{startup.name}&apos;s business information as confidential.
            </p>
            <ErrorBanner message={acceptError} />
            <GoldButton onClick={handleAccept} disabled={accepting}>
              {accepting ? 'Confirming…' : 'I agree · View data room'}
            </GoldButton>
          </div>
        ) : (
          <>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">Documents</p>
            <div className="mb-8 rounded-md border border-ln bg-card px-4">
              <DocRow label="Pitch deck" url={startup.pitch_deck_url} />
              <DocRow label="Business plan" url={startup.business_plan_url} />
              <DocRow label="Pitch video" url={startup.pitch_video_url} />
              <DocRow label="Incorporation certificate" url={startup.incorporation_cert_url} />
            </div>

            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">Company & traction</p>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-ln bg-card p-3">
                <p className="font-serif text-lg text-tx">{startup.registration_number || '—'}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-mu">Registration no.</p>
                <SourceTag />
              </div>
              <div className="rounded-md border border-ln bg-card p-3">
                <p className="font-serif text-lg text-tx">{startup.active_users != null ? startup.active_users.toLocaleString() : '—'}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-mu">Active users</p>
                <SourceTag />
              </div>
              <div className="rounded-md border border-ln bg-card p-3">
                <p className="font-serif text-lg text-tx">{startup.monthly_revenue != null ? fmt(startup.monthly_revenue) : '—'}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-mu">Monthly revenue</p>
                <SourceTag />
              </div>
              <div className="rounded-md border border-ln bg-card p-3">
                <p className="font-serif text-lg text-tx">{startup.prior_funding_raised != null ? fmt(startup.prior_funding_raised) : '—'}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-mu">Prior funding raised</p>
                <SourceTag />
              </div>
              <div className="rounded-md border border-ln bg-card p-3">
                <p className="font-serif text-lg text-tx">{startup.verified ? 'Yes' : 'Pending'}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-mu">WAAW listing review</p>
                <SourceTag verified={startup.verified} />
              </div>
            </div>

            <Link href={`/startups/${startup.id}`} className="font-mono text-xs uppercase tracking-wider text-pu">
              ← Back to deal
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
