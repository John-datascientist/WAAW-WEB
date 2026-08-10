'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { InvestorNav } from '../../../src/components/InvestorNav';
import { BackButton } from '../../../src/components/ui';
import { useAuth } from '../../../src/context/AuthContext';
import { supabase } from '../../../src/lib/supabase';
import { COUNTRIES } from '../../../src/lib/kyc/countries';
import type { KycProfileRow, KycStatus } from '../../../src/lib/kyc/useKyc';

// under_review and submitted first — that's the actual work queue. The
// rest (approved/rejected/resubmit_required/in_progress/not_started) are
// there for context, not action.
const STATUS_ORDER: KycStatus[] = ['under_review', 'submitted', 'resubmit_required', 'approved', 'rejected', 'in_progress', 'not_started'];

const STATUS_COLORS: Record<KycStatus, string> = {
  not_started: 'text-mu',
  in_progress: 'text-mu',
  submitted: 'text-ch',
  under_review: 'text-warn',
  approved: 'text-su',
  rejected: 'text-da',
  resubmit_required: 'text-da',
};

function countryName(code: string | null) {
  return COUNTRIES.find((c) => c.code === code)?.name ?? code ?? '—';
}

export default function AdminKycListPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<KycProfileRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from('waaw_kyc_profiles')
      .select('*')
      .order('submitted_at', { ascending: true, nullsFirst: false })
      .then(({ data }) => {
        setRows((data as KycProfileRow[]) ?? []);
        setLoading(false);
      });
  }, [user]);

  if (!authLoading && !user) {
    return (
      <div>
        <InvestorNav />
        <main className="mx-auto max-w-md px-6 py-16 text-center">
          <p className="font-sans text-sm text-mu">Sign in to view this page.</p>
        </main>
      </div>
    );
  }

  // The real boundary is RLS (only reviewer rows come back from the query
  // above); this is just so a non-reviewer sees an explanation instead of
  // an empty list.
  if (!authLoading && profile && !profile.is_kyc_reviewer) {
    return (
      <div>
        <InvestorNav />
        <main className="mx-auto max-w-md px-6 py-16 text-center">
          <p className="font-sans text-sm text-mu">This page is restricted to WAAW KYC reviewers.</p>
        </main>
      </div>
    );
  }

  const sorted = [...rows].sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));

  return (
    <div>
      <InvestorNav />
      <BackButton fallbackHref="/" />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-2 font-serif text-3xl text-tx">KYC review queue</h1>
        <p className="mb-8 font-sans text-sm font-light text-mu">{sorted.filter((r) => r.status === 'under_review' || r.status === 'submitted').length} awaiting review</p>

        {loading ? (
          <p className="font-sans text-sm text-mu">Loading…</p>
        ) : sorted.length === 0 ? (
          <p className="font-sans text-sm text-mu">No KYC submissions yet.</p>
        ) : (
          sorted.map((r) => (
            <Link
              key={r.id}
              href={`/admin/kyc/${r.id}`}
              className="mb-2 flex items-center justify-between rounded-md border border-ln bg-card p-4 hover:border-pu3"
            >
              <div>
                <p className="font-serif text-base italic text-tx">{r.full_legal_name || 'Unnamed submission'}</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-mu">
                  {countryName(r.nationality)} → {countryName(r.country_of_residence)}
                  {r.is_non_national ? ' · diaspora' : ''}
                </p>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${STATUS_COLORS[r.status]}`}>
                {r.status.replace(/_/g, ' ')}
              </span>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
