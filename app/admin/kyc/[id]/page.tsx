'use client';

import { useEffect, useState } from 'react';
import { InvestorNav } from '../../../../src/components/InvestorNav';
import { BackButton, ErrorBanner, GoldButton, TextArea } from '../../../../src/components/ui';
import { useAuth } from '../../../../src/context/AuthContext';
import { supabase } from '../../../../src/lib/supabase';
import { COUNTRIES } from '../../../../src/lib/kyc/countries';
import { getCountryRequirements, getImmigrationRequirements } from '../../../../src/lib/kyc/country-requirements';
import type { KycDocumentRow, KycProfileRow } from '../../../../src/lib/kyc/useKyc';

function countryName(code: string | null) {
  return COUNTRIES.find((c) => c.code === code)?.name ?? code ?? '—';
}

const DOC_LABELS: Record<string, string> = {
  id_front: 'ID document (front)',
  id_back: 'ID document (back)',
  proof_of_address: 'Proof of address',
  immigration_document_front: 'Immigration/residence document (front)',
  immigration_document_back: 'Immigration/residence document (back)',
  selfie: 'Selfie',
};

// Signed URLs expire in 2 minutes — long enough for a reviewer to open a
// document from this page, short enough that a leaked link is useless
// shortly after.
const SIGNED_URL_TTL_SECONDS = 120;

export default function AdminKycDetailPage({ params }: { params: { id: string } }) {
  const { user, profile: myProfile } = useAuth();
  const [profile, setProfile] = useState<KycProfileRow | null>(null);
  const [documents, setDocuments] = useState<KycDocumentRow[]>([]);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState('');
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const [{ data: p }, { data: docs }] = await Promise.all([
      supabase.from('waaw_kyc_profiles').select('*').eq('id', params.id).maybeSingle(),
      supabase.from('waaw_kyc_documents').select('*').eq('kyc_profile_id', params.id),
    ]);
    setProfile(p as KycProfileRow | null);
    setDocuments((docs as KycDocumentRow[]) ?? []);
    setLoading(false);

    const urls: Record<string, string> = {};
    for (const doc of (docs as KycDocumentRow[]) ?? []) {
      const { data } = await supabase.storage.from('kyc-documents').createSignedUrl(doc.storage_path, SIGNED_URL_TTL_SECONDS);
      if (data?.signedUrl) urls[doc.id] = data.signedUrl;
    }
    setSignedUrls(urls);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const act = async (action: 'approved' | 'rejected' | 'resubmit_requested') => {
    if (!profile || !user) return;
    if (action !== 'approved' && !reason.trim()) { setError('Add a reason before rejecting or requesting resubmission.'); return; }
    setActing(true);
    setError(null);

    const nextStatus = action === 'approved' ? 'approved' : action === 'rejected' ? 'rejected' : 'resubmit_required';

    const { error: updateError } = await supabase
      .from('waaw_kyc_profiles')
      .update({
        status: nextStatus,
        reviewed_at: new Date().toISOString(),
        reviewer_id: user.id,
        rejection_reason: action === 'approved' ? null : reason.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);
    if (updateError) { setActing(false); setError(updateError.message); return; }

    await supabase.from('waaw_kyc_reviews').insert({
      kyc_profile_id: profile.id,
      action,
      actor_id: user.id,
      notes: action === 'approved' ? null : reason.trim(),
    });

    // Keeps the existing commit-flow gate (which reads waaw_profiles.kyc_status)
    // in sync with this system's decision, without changing how that gate
    // is enforced.
    if (action === 'approved') {
      await supabase.from('waaw_profiles').update({ kyc_status: 'verified' }).eq('id', profile.user_id);
    } else if (action === 'rejected') {
      await supabase.from('waaw_profiles').update({ kyc_status: 'rejected' }).eq('id', profile.user_id);
    }

    const notifTitle = action === 'approved' ? 'Identity verified' : action === 'rejected' ? 'Identity verification rejected' : 'Resubmission needed';
    const notifBody =
      action === 'approved'
        ? 'Your identity verification is complete. You can now commit capital.'
        : action === 'rejected'
          ? `Your identity verification was rejected. ${reason.trim()}`
          : `Please update and resubmit your identity verification. ${reason.trim()}`;
    await supabase.from('waaw_notifications').insert({
      user_id: profile.user_id,
      title: notifTitle,
      body: notifBody,
      type: 'kyc',
    });

    setActing(false);
    await load();
  };

  if (loading) {
    return (
      <div>
        <InvestorNav />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center"><p className="font-sans text-sm text-mu">Loading…</p></main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <InvestorNav />
        <BackButton fallbackHref="/admin/kyc" />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center"><p className="font-sans text-sm text-mu">Not found, or you don&apos;t have reviewer access.</p></main>
      </div>
    );
  }

  const countryReq = getCountryRequirements(profile.country_of_residence);
  const immigrationReq = getImmigrationRequirements(profile.country_of_residence);
  const expectedDocs = [
    { kind: 'id_front', required: true },
    { kind: 'id_back', required: countryReq.idDocuments.find((d) => d.type === profile.id_document_type)?.requiresBack ?? false },
    { kind: 'proof_of_address', required: countryReq.proofOfAddressRequired },
    ...(profile.is_non_national
      ? [
          { kind: 'immigration_document_front', required: immigrationReq.requiresDocument },
          { kind: 'immigration_document_back', required: immigrationReq.requiresDocument && immigrationReq.documentHasBack },
        ]
      : []),
  ].filter((d) => d.required);

  const canAct = !!myProfile?.is_kyc_reviewer && (profile.status === 'submitted' || profile.status === 'under_review');

  return (
    <div>
      <InvestorNav />
      <BackButton fallbackHref="/admin/kyc" />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-tx">{profile.full_legal_name || 'Unnamed submission'}</h1>
          <span className="font-mono text-[10px] uppercase tracking-wider text-mu">{profile.status.replace(/_/g, ' ')}</span>
        </div>

        <ErrorBanner message={error} />

        <div className="mb-6 grid grid-cols-2 gap-3 font-sans text-sm">
          <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Date of birth</p><p className="text-tx">{profile.date_of_birth || '—'}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Nationality</p><p className="text-tx">{countryName(profile.nationality)}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Residence</p><p className="text-tx">{countryName(profile.country_of_residence)}{profile.is_non_national ? ' (diaspora)' : ''}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Phone</p><p className="text-tx">{profile.phone_e164 || '—'}{profile.phone_verified ? ' (verified)' : ''}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">ID document</p><p className="text-tx">{profile.id_document_type || '—'}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">{countryReq.nationalIdNumber?.label ?? 'Reference'}</p><p className="text-tx">{profile.id_document_reference || '—'}</p></div>
          {profile.is_non_national && (
            <>
              <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Immigration status</p><p className="text-tx">{profile.immigration_status || '—'}</p></div>
              <div><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Visa/permit expiry</p><p className="text-tx">{profile.visa_or_permit_expiry || '—'}</p></div>
            </>
          )}
          <div className="col-span-2"><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Address</p><p className="text-tx">{[profile.address_line1, profile.address_line2, profile.city, profile.region, profile.postcode || profile.location_code, countryName(profile.address_country)].filter(Boolean).join(', ') || '—'}</p></div>
          {profile.source_of_funds && (
            <div className="col-span-2"><p className="font-mono text-[9px] uppercase tracking-wider text-mu">Source of funds</p><p className="text-tx">{profile.source_of_funds}</p></div>
          )}
        </div>

        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-pu">Documents</p>
        <div className="mb-6 rounded-md border border-ln bg-card p-4">
          {expectedDocs.map(({ kind }) => {
            const doc = documents.find((d) => d.doc_kind === kind);
            return (
              <div key={kind} className="flex items-center justify-between border-b border-ln py-3 last:border-0">
                <span className="font-sans text-sm text-tx">{DOC_LABELS[kind] ?? kind}</span>
                {doc && signedUrls[doc.id] ? (
                  <a href={signedUrls[doc.id]} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-pu hover:underline">
                    View ↗
                  </a>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-da">Missing</span>
                )}
              </div>
            );
          })}
          {profile.immigration_document_type === 'share_code' && (
            <p className="pt-3 font-sans text-xs text-mu">Provided a share code instead of a document: {profile.id_document_reference}</p>
          )}
        </div>

        {canAct ? (
          <>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-pu">Decision</p>
            <TextArea label="Reason (required for reject or resubmit)" value={reason} onChange={setReason} placeholder="What's missing or wrong, in plain language for the user" />
            <div className="flex flex-wrap gap-3">
              <GoldButton onClick={() => act('approved')} disabled={acting}>Approve</GoldButton>
              <button type="button" onClick={() => act('resubmit_requested')} disabled={acting} className="rounded-md border border-warnBorder px-6 py-3 font-mono text-xs uppercase tracking-wider text-warn hover:bg-warnLight disabled:opacity-40">
                Request resubmission
              </button>
              <button type="button" onClick={() => act('rejected')} disabled={acting} className="rounded-md border border-daBorder px-6 py-3 font-mono text-xs uppercase tracking-wider text-da hover:bg-daLight disabled:opacity-40">
                Reject
              </button>
            </div>
          </>
        ) : (
          <p className="font-sans text-xs text-mu">
            {profile.status === 'approved' || profile.status === 'rejected'
              ? `Already decided${profile.reviewed_at ? ` on ${new Date(profile.reviewed_at).toLocaleDateString()}` : ''}.`
              : 'Not yet submitted for review.'}
          </p>
        )}
      </main>
    </div>
  );
}
