'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InvestorNav } from '../../../src/components/InvestorNav';
import { BackButton, ErrorBanner, GoldButton } from '../../../src/components/ui';
import { useAuthGate } from '../../../src/lib/useAuthGate';
import { InvestorCategory, useInvestorCategorisation } from '../../../src/lib/useInvestor';

const JURISDICTIONS = ['UK', 'Nigeria', 'Ghana', 'Kenya', 'Other'];

// PLACEHOLDER — the category names are real (they mirror how UK COBS 4.7
// self-certification categories for high-risk investments are commonly
// labelled), but the declaration text under each one is a draft stand-in,
// not solicitor-reviewed legal wording. This must be replaced with the
// exact statutory statement (and equivalent wording for Nigeria/Ghana/Kenya
// jurisdictions, which follow different rules) before this gate is relied
// on for real commitments — see the note in migration 012.
const CATEGORIES: { id: InvestorCategory; label: string; declaration: string }[] = [
  {
    id: 'restricted_investor',
    label: 'Restricted investor',
    declaration:
      '[DRAFT PLACEHOLDER] I confirm I have not invested more than 10% of my net investible assets in high-risk investments over the last 12 months, and do not intend to going forward.',
  },
  {
    id: 'high_net_worth',
    label: 'High net worth investor',
    declaration:
      '[DRAFT PLACEHOLDER] I confirm I meet the income or net asset thresholds for a high net worth investor in my jurisdiction.',
  },
  {
    id: 'self_certified_sophisticated',
    label: 'Self-certified sophisticated investor',
    declaration:
      '[DRAFT PLACEHOLDER] I confirm I meet at least one of the standard criteria for a self-certified sophisticated investor (e.g. business angel network membership, recent unlisted company investment, relevant professional experience, or director of a company with turnover above the applicable threshold).',
  },
  {
    id: 'certified_sophisticated',
    label: 'Certified sophisticated investor',
    declaration:
      '[DRAFT PLACEHOLDER] I have received confirmation from an authorised firm within the last 36 months that I am sufficiently knowledgeable to understand the risks of these investments.',
  },
  {
    id: 'professional',
    label: 'Professional investor / institution',
    declaration:
      '[DRAFT PLACEHOLDER] I am investing as, or on behalf of, a professional client or institution as defined by the applicable regulator in my jurisdiction.',
  },
];

function CategorisationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { categorisation, isValid, loading: catLoading, saving, certify } = useInvestorCategorisation();
  const [jurisdiction, setJurisdiction] = useState(categorisation?.jurisdiction ?? 'UK');
  const [category, setCategory] = useState<InvestorCategory | null>(categorisation?.category ?? null);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gate = useAuthGate({ fallbackHref: '/startups', signedOutMessage: 'Sign in to complete investor categorisation.' });
  if (gate) return gate;

  const selected = CATEGORIES.find((c) => c.id === category);

  const handleSubmit = async () => {
    if (!category || !confirmed) return;
    setError(null);
    const { error } = await certify(jurisdiction, category);
    if (error) { setError(error); return; }
    router.push(returnTo || '/startups');
  };

  if (catLoading) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref="/startups" />
        <main className="mx-auto max-w-md px-6 py-16 text-center"><p className="font-sans text-sm text-mu">Loading…</p></main>
      </div>
    );
  }

  return (
    <div>
      <InvestorNav />
      <BackButton fallbackHref="/startups" />
      <main className="mx-auto max-w-md px-6 py-10">
        <h1 className="mb-2 font-serif text-3xl text-tx">Investor categorisation</h1>
        <p className="mb-2 font-sans text-sm font-light leading-relaxed text-mu">
          WAAW is required to establish your investor category before you can commit capital to a high-risk,
          non-mainstream investment. This is a legal self-certification, not a background check.
        </p>
        {isValid && categorisation && (
          <p className="mb-6 rounded-md border border-suBorder bg-suLight p-3 font-sans text-xs text-su">
            ✓ Currently certified as {CATEGORIES.find((c) => c.id === categorisation.category)?.label} ({categorisation.jurisdiction}),
            valid until {new Date(categorisation.expires_at).toLocaleDateString()}.
          </p>
        )}

        <ErrorBanner message={error} />

        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-mu">Jurisdiction</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {JURISDICTIONS.map((j) => (
            <button
              key={j}
              type="button"
              onClick={() => setJurisdiction(j)}
              className={`rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${
                jurisdiction === j ? 'border-pu bg-puXlight text-pu' : 'border-ln text-mu hover:border-pu3'
              }`}
            >
              {j}
            </button>
          ))}
        </div>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-mu">Which applies to you?</p>
        <div className="mb-4 space-y-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => { setCategory(c.id); setConfirmed(false); }}
              className={`block w-full rounded-md border p-3 text-left ${
                category === c.id ? 'border-pu bg-puXlight' : 'border-ln bg-card hover:border-pu3'
              }`}
            >
              <span className="font-sans text-sm text-tx">{c.label}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="mb-6 rounded-md border border-warnBorder bg-warnLight p-4">
            <p className="mb-3 font-sans text-xs font-light leading-relaxed text-warn">{selected.declaration}</p>
            <label className="flex cursor-pointer items-start gap-2">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 accent-pu" />
              <span className="font-sans text-xs text-tx">I confirm the statement above is true, understanding it is a legal declaration.</span>
            </label>
          </div>
        )}

        <GoldButton onClick={handleSubmit} disabled={!category || !confirmed || saving}>
          {saving ? 'Saving…' : 'Confirm my category'}
        </GoldButton>

        <p className="mt-6 font-mono text-[9px] text-mu">
          Valid for 12 months from certification. You can re-certify at any time if your circumstances change.
        </p>
      </main>
    </div>
  );
}

export default function CategorisationPage() {
  return (
    <Suspense fallback={null}>
      <CategorisationForm />
    </Suspense>
  );
}
