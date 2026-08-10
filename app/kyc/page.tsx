'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InvestorNav } from '../../src/components/InvestorNav';
import { BackButton, ErrorBanner, Field, GhostButton, GoldButton, ProgressBar } from '../../src/components/ui';
import { KycDocumentUpload } from '../../src/components/KycDocumentUpload';
import { useAuth } from '../../src/context/AuthContext';
import { useAuthGate } from '../../src/lib/useAuthGate';
import { supabase } from '../../src/lib/supabase';
import { COUNTRIES } from '../../src/lib/kyc/countries';
import { getCountryRequirements, getImmigrationRequirements } from '../../src/lib/kyc/country-requirements';
import { isKycEditable, KycDocKind, KycProfileRow, useKycDocuments, useKycProfile } from '../../src/lib/kyc/useKyc';
import { submitKyc } from '../../src/lib/kyc/submitKyc';

function CountrySelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-ln bg-card px-4 py-3 font-sans text-sm text-tx outline-none focus:border-pu"
      >
        <option value="">Select a country…</option>
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-ln bg-card px-4 py-3 font-sans text-sm text-tx outline-none focus:border-pu"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

const STATUS_META: Record<string, { label: string; color: string; body: string }> = {
  submitted: { label: 'Submitted', color: 'text-mu', body: 'Your submission is on its way into review.' },
  under_review: { label: 'Under review', color: 'text-warn', body: "A WAAW reviewer is checking your submission. This isn't instant — check back soon." },
  approved: { label: 'Approved', color: 'text-su', body: "You're verified. You can now commit capital to a deal." },
  rejected: { label: 'Rejected', color: 'text-da', body: 'Your submission was rejected.' },
};

function StatusScreen({ profile, onResubmit, returnTo }: { profile: KycProfileRow; onResubmit: () => void; returnTo: string | null }) {
  const router = useRouter();
  const meta = STATUS_META[profile.status];
  return (
    <div>
      <InvestorNav />
      <BackButton fallbackHref="/" />
      <main className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="mb-3 font-serif text-2xl text-tx">Identity verification</h1>
        <p className={`mb-2 font-mono text-xs uppercase tracking-wider ${meta?.color ?? 'text-mu'}`}>{meta?.label ?? profile.status}</p>
        <p className="mb-6 font-sans text-sm font-light leading-relaxed text-mu">{meta?.body}</p>
        {profile.status === 'rejected' && profile.rejection_reason && (
          <p className="mb-6 rounded-md border border-daBorder bg-daLight px-4 py-3 font-sans text-xs text-da">{profile.rejection_reason}</p>
        )}
        {profile.status === 'approved' && <GoldButton onClick={() => router.push(returnTo || '/startups')}>Continue</GoldButton>}
        {profile.status === 'rejected' && <GoldButton onClick={onResubmit}>Update and resubmit</GoldButton>}
      </main>
    </div>
  );
}

interface FormState {
  full_legal_name: string;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
  id_document_type: string;
  immigration_status: string;
  immigration_document_type: string;
  visa_or_permit_expiry: string;
  id_document_reference: string;
  address_line1: string;
  address_line2: string;
  city: string;
  region: string;
  postcode: string;
  location_code: string;
  phone_e164: string;
  source_of_funds: string;
}

const emptyForm = (): FormState => ({
  full_legal_name: '',
  date_of_birth: '',
  nationality: '',
  country_of_residence: '',
  id_document_type: '',
  immigration_status: '',
  immigration_document_type: '',
  visa_or_permit_expiry: '',
  id_document_reference: '',
  address_line1: '',
  address_line2: '',
  city: '',
  region: '',
  postcode: '',
  location_code: '',
  phone_e164: '',
  source_of_funds: '',
});

function KycWizard({ profile, refetchProfile }: { profile: KycProfileRow; refetchProfile: () => Promise<void> }) {
  const { user } = useAuth();
  const { updateProfile } = useKycProfile();
  const { documents, uploadDocument, docFor } = useKycDocuments(profile.id);

  const [form, setForm] = useState<FormState>(emptyForm());
  const [seeded, setSeeded] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [useLocationCode, setUseLocationCode] = useState(false);
  const [useShareCode, setUseShareCode] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmAccurate, setConfirmAccurate] = useState(false);

  // Seed local form state from the DB row exactly once, on first load —
  // re-seeding on every autosave round-trip would clobber whatever the
  // user is mid-typing.
  useEffect(() => {
    if (seeded) return;
    setForm({
      full_legal_name: profile.full_legal_name ?? '',
      date_of_birth: profile.date_of_birth ?? '',
      nationality: profile.nationality ?? '',
      country_of_residence: profile.country_of_residence ?? '',
      id_document_type: profile.id_document_type ?? '',
      immigration_status: profile.immigration_status ?? '',
      immigration_document_type: profile.immigration_document_type ?? '',
      visa_or_permit_expiry: profile.visa_or_permit_expiry ?? '',
      id_document_reference: profile.id_document_reference ?? '',
      address_line1: profile.address_line1 ?? '',
      address_line2: profile.address_line2 ?? '',
      city: profile.city ?? '',
      region: profile.region ?? '',
      postcode: profile.postcode ?? '',
      location_code: profile.location_code ?? '',
      phone_e164: profile.phone_e164 ?? '',
      source_of_funds: profile.source_of_funds ?? '',
    });
    setSeeded(true);
  }, [profile, seeded]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const isDiaspora = !!form.nationality && !!form.country_of_residence && form.nationality !== form.country_of_residence;
  const countryReq = getCountryRequirements(form.country_of_residence);
  const immigrationReq = getImmigrationRequirements(form.country_of_residence);

  const STEPS = [
    'personal',
    'nationality',
    'identity',
    ...(isDiaspora ? ['immigration'] : []),
    'address',
    'phone',
    ...(countryReq.proofOfAddressRequired ? ['proof'] : []),
    'review',
  ] as const;
  const step = STEPS[Math.min(stepIndex, STEPS.length - 1)];
  const pct = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  const goNext = async (patch: Partial<KycProfileRow>) => {
    setSaving(true);
    setError(null);
    const { error } = await updateProfile({ status: 'in_progress', ...patch });
    setSaving(false);
    if (error) { setError(error); return; }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const handleUpload = (docKind: KycDocKind, file: File) => {
    if (!user) return Promise.resolve({ error: 'Not signed in.' });
    return uploadDocument(user.id, docKind, file);
  };

  const handleSendOtp = async () => {
    setError(null);
    const { error } = await supabase.auth.updateUser({ phone: form.phone_e164 });
    if (error) { setError(error.message); return; }
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    setError(null);
    const { error } = await supabase.auth.verifyOtp({ phone: form.phone_e164, token: otp, type: 'phone_change' });
    if (error) { setError(error.message); return; }
    await goNext({ phone_e164: form.phone_e164, phone_verified: true });
  };

  const handleSubmit = async () => {
    if (!confirmAccurate) return;
    setSaving(true);
    setError(null);
    const { error } = await updateProfile({
      is_non_national: isDiaspora,
      address_country: form.country_of_residence,
      source_of_funds: form.source_of_funds || null,
    });
    if (error) { setSaving(false); setError(error); return; }
    const result = await submitKyc({ ...profile, ...form, is_non_national: isDiaspora, address_country: form.country_of_residence });
    setSaving(false);
    if (result.error) { setError(result.error); return; }
    await refetchProfile();
  };

  return (
    <div>
      <InvestorNav />
      <main className="mx-auto max-w-md px-6 py-16">
        <BackButton fallbackHref="/" />
        <h1 className="mb-2 font-serif text-3xl text-tx">Identity verification</h1>
        <p className="mb-6 font-sans text-sm font-light leading-relaxed text-mu">
          WAAW requires identity verification (KYC) before you can commit capital to a startup. What we ask
          for depends on your nationality and where you live.
        </p>
        <ProgressBar pct={pct} />
        <p className="mb-8 font-mono text-[10px] uppercase tracking-wider text-mu">Step {stepIndex + 1} of {STEPS.length}</p>

        <ErrorBanner message={error} />

        {step === 'personal' && (
          <>
            <Field label="Full legal name" value={form.full_legal_name} onChange={(v) => setField('full_legal_name', v)} placeholder="As it appears on your ID" />
            <Field label="Date of birth" value={form.date_of_birth} onChange={(v) => setField('date_of_birth', v)} type="date" />
            <GoldButton
              onClick={() => goNext({ full_legal_name: form.full_legal_name, date_of_birth: form.date_of_birth || null })}
              disabled={saving || !form.full_legal_name.trim() || !form.date_of_birth}
            >
              {saving ? 'Saving…' : 'Continue'}
            </GoldButton>
          </>
        )}

        {step === 'nationality' && (
          <>
            <p className="mb-4 font-sans text-xs font-light text-mu">
              These two answers decide which documents and fields we ask for next — if they&apos;re
              different, we&apos;ll also ask about your immigration or visa status where you live.
            </p>
            <CountrySelect label="Country of nationality" value={form.nationality} onChange={(v) => setField('nationality', v)} />
            <CountrySelect label="Country of residence" value={form.country_of_residence} onChange={(v) => setField('country_of_residence', v)} />
            <div className="flex items-center justify-between">
              <GhostButton onClick={goBack}>Back</GhostButton>
              <GoldButton
                onClick={() => goNext({ nationality: form.nationality, country_of_residence: form.country_of_residence, is_non_national: isDiaspora })}
                disabled={saving || !form.nationality || !form.country_of_residence}
              >
                {saving ? 'Saving…' : 'Continue'}
              </GoldButton>
            </div>
          </>
        )}

        {step === 'identity' && (
          <>
            {isDiaspora ? (
              <>
                <p className="mb-4 font-sans text-xs font-light text-mu">
                  As a diaspora investor, use either your passport or the residence document you&apos;ll
                  upload on the next step.
                </p>
                <Select
                  label="Identity document"
                  value={form.id_document_type}
                  onChange={(v) => setField('id_document_type', v)}
                  options={[
                    { value: 'passport', label: `Passport (${COUNTRIES.find((c) => c.code === form.nationality)?.name ?? 'nationality'})` },
                    { value: 'immigration_document', label: 'My residence permit or visa document' },
                  ]}
                />
                {form.id_document_type === 'passport' && (
                  <KycDocumentUpload label="Passport (bio page)" docKind="id_front" existing={docFor('id_front')} onUpload={handleUpload} />
                )}
                {form.id_document_type === 'immigration_document' && (
                  <p className="mb-5 font-sans text-xs text-mu">You&apos;ll upload this document on the next step.</p>
                )}
              </>
            ) : (
              <>
                <Select
                  label="Identity document"
                  value={form.id_document_type}
                  onChange={(v) => setField('id_document_type', v)}
                  options={countryReq.idDocuments.map((d) => ({ value: d.type, label: d.label }))}
                />
                {form.id_document_type && (
                  <>
                    <KycDocumentUpload label={`${countryReq.idDocuments.find((d) => d.type === form.id_document_type)?.label ?? 'Document'} (front)`} docKind="id_front" existing={docFor('id_front')} onUpload={handleUpload} />
                    {countryReq.idDocuments.find((d) => d.type === form.id_document_type)?.requiresBack && (
                      <KycDocumentUpload label="Back" docKind="id_back" existing={docFor('id_back')} onUpload={handleUpload} />
                    )}
                  </>
                )}
                {countryReq.nationalIdNumber && (
                  <Field
                    label={`${countryReq.nationalIdNumber.label}${countryReq.nationalIdNumber.required ? '' : ' (optional)'}`}
                    value={form.id_document_reference}
                    onChange={(v) => setField('id_document_reference', v)}
                    placeholder={countryReq.nationalIdNumber.label}
                  />
                )}
              </>
            )}
            <div className="flex items-center justify-between">
              <GhostButton onClick={goBack}>Back</GhostButton>
              <GoldButton
                onClick={() => goNext({ id_document_type: form.id_document_type, id_document_reference: form.id_document_reference || null })}
                disabled={
                  saving ||
                  !form.id_document_type ||
                  (form.id_document_type === 'passport' && !docFor('id_front')) ||
                  (!isDiaspora && !!form.id_document_type && !docFor('id_front'))
                }
              >
                {saving ? 'Saving…' : 'Continue'}
              </GoldButton>
            </div>
          </>
        )}

        {step === 'immigration' && (
          <>
            <p className="mb-4 font-sans text-xs font-light text-mu">
              Based on living in {COUNTRIES.find((c) => c.code === form.country_of_residence)?.name}, we need
              your immigration or visa status.
            </p>
            <Select
              label="Immigration / visa status"
              value={form.immigration_status}
              onChange={(v) => setField('immigration_status', v)}
              options={immigrationReq.statuses.map((s) => ({ value: s, label: s }))}
            />
            <Field label="Visa or permit expiry" value={form.visa_or_permit_expiry} onChange={(v) => setField('visa_or_permit_expiry', v)} type="date" />

            {immigrationReq.requiresDocument && (
              <>
                {immigrationReq.allowShareCodeAlternative && (
                  <label className="mb-4 flex cursor-pointer items-center gap-2 font-sans text-xs text-mu">
                    <input type="checkbox" checked={useShareCode} onChange={(e) => setUseShareCode(e.target.checked)} className="h-4 w-4 accent-pu" />
                    I&apos;ll provide a share code instead of a document
                  </label>
                )}
                {useShareCode ? (
                  <Field label="Share code" value={form.id_document_reference} onChange={(v) => setField('id_document_reference', v)} placeholder="e.g. a Home Office share code" />
                ) : (
                  <>
                    <KycDocumentUpload label="Residence permit or visa document (front)" docKind="immigration_document_front" existing={docFor('immigration_document_front')} onUpload={handleUpload} />
                    {immigrationReq.documentHasBack && (
                      <KycDocumentUpload label="Back" docKind="immigration_document_back" existing={docFor('immigration_document_back')} onUpload={handleUpload} />
                    )}
                  </>
                )}
              </>
            )}

            <div className="flex items-center justify-between">
              <GhostButton onClick={goBack}>Back</GhostButton>
              <GoldButton
                onClick={() =>
                  goNext({
                    immigration_status: form.immigration_status,
                    immigration_document_type: useShareCode ? 'share_code' : 'document',
                    visa_or_permit_expiry: form.visa_or_permit_expiry || null,
                    id_document_reference: useShareCode ? form.id_document_reference : form.id_document_reference || null,
                  })
                }
                disabled={
                  saving ||
                  !form.immigration_status ||
                  !form.visa_or_permit_expiry ||
                  (immigrationReq.requiresDocument && !useShareCode && !docFor('immigration_document_front')) ||
                  (useShareCode && !form.id_document_reference.trim())
                }
              >
                {saving ? 'Saving…' : 'Continue'}
              </GoldButton>
            </div>
          </>
        )}

        {step === 'address' && (
          <>
            <Field label="Address line 1" value={form.address_line1} onChange={(v) => setField('address_line1', v)} placeholder="Street address" />
            <Field label="Address line 2 (optional)" value={form.address_line2} onChange={(v) => setField('address_line2', v)} placeholder="Apartment, suite, etc." />
            <Field label="City" value={form.city} onChange={(v) => setField('city', v)} />
            <Field label={countryReq.regionLabel} value={form.region} onChange={(v) => setField('region', v)} />
            {countryReq.postcode.allowLocationCodeAlternative && (
              <label className="mb-4 flex cursor-pointer items-center gap-2 font-sans text-xs text-mu">
                <input type="checkbox" checked={useLocationCode} onChange={(e) => setUseLocationCode(e.target.checked)} className="h-4 w-4 accent-pu" />
                I don&apos;t have a {countryReq.postcode.label.toLowerCase()} — use a location code instead
              </label>
            )}
            {useLocationCode ? (
              <Field label="Location code" value={form.location_code} onChange={(v) => setField('location_code', v)} placeholder="e.g. a Loca8tor code" />
            ) : (
              <Field
                label={`${countryReq.postcode.label}${countryReq.postcode.required ? '' : ' (optional)'}`}
                value={form.postcode}
                onChange={(v) => setField('postcode', v)}
              />
            )}
            <div className="flex items-center justify-between">
              <GhostButton onClick={goBack}>Back</GhostButton>
              <GoldButton
                onClick={() =>
                  goNext({
                    address_line1: form.address_line1,
                    address_line2: form.address_line2 || null,
                    city: form.city,
                    region: form.region,
                    postcode: useLocationCode ? null : form.postcode || null,
                    location_code: useLocationCode ? form.location_code : null,
                    address_country: form.country_of_residence,
                  })
                }
                disabled={
                  saving ||
                  !form.address_line1.trim() ||
                  !form.city.trim() ||
                  !form.region.trim() ||
                  (countryReq.postcode.required && !useLocationCode && !form.postcode.trim()) ||
                  (useLocationCode && !form.location_code.trim())
                }
              >
                {saving ? 'Saving…' : 'Continue'}
              </GoldButton>
            </div>
          </>
        )}

        {step === 'phone' && (
          <>
            <Field
              label="Phone number"
              value={form.phone_e164}
              onChange={(v) => setField('phone_e164', v)}
              placeholder={`${countryReq.phoneDialingCode}...`}
            />
            {!otpSent ? (
              <GoldButton onClick={handleSendOtp} disabled={!form.phone_e164.trim()}>Send verification code</GoldButton>
            ) : (
              <>
                <Field label="Verification code" value={otp} onChange={setOtp} placeholder="6-digit code" />
                <GoldButton onClick={handleVerifyOtp} disabled={otp.length < 4}>Verify and continue</GoldButton>
              </>
            )}
            <div className="mt-4">
              <GhostButton onClick={goBack}>Back</GhostButton>
            </div>
          </>
        )}

        {step === 'proof' && (
          <>
            <p className="mb-4 font-sans text-xs font-light text-mu">
              Upload a recent document showing your address (a bank statement or utility bill, no older than
              three months).
            </p>
            <KycDocumentUpload label="Proof of address" docKind="proof_of_address" existing={docFor('proof_of_address')} onUpload={handleUpload} />
            <div className="flex items-center justify-between">
              <GhostButton onClick={goBack}>Back</GhostButton>
              <GoldButton onClick={() => goNext({})} disabled={saving || !docFor('proof_of_address')}>
                {saving ? 'Saving…' : 'Continue'}
              </GoldButton>
            </div>
          </>
        )}

        {step === 'review' && (
          <>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-pu">Review</p>
            <div className="mb-6 space-y-2 rounded-md border border-ln bg-card p-4 font-sans text-sm text-tx">
              <p>{form.full_legal_name} · {form.date_of_birth}</p>
              <p className="text-mu">
                {COUNTRIES.find((c) => c.code === form.nationality)?.name} nationality, resident in{' '}
                {COUNTRIES.find((c) => c.code === form.country_of_residence)?.name}
                {isDiaspora ? ' (diaspora)' : ''}
              </p>
              <p className="text-mu">{documents.length} document{documents.length === 1 ? '' : 's'} uploaded</p>
              <p className="text-mu">{form.address_line1}, {form.city}, {form.region}</p>
              <p className="text-mu">{form.phone_e164}{profile.phone_verified ? ' (verified)' : ''}</p>
            </div>

            <Field label="Source of funds (optional)" value={form.source_of_funds} onChange={(v) => setField('source_of_funds', v)} placeholder="e.g. salary, savings, business income" />

            <label className="mb-6 flex cursor-pointer items-start gap-2 font-sans text-xs text-mu">
              <input type="checkbox" checked={confirmAccurate} onChange={(e) => setConfirmAccurate(e.target.checked)} className="mt-0.5 h-4 w-4 accent-pu" />
              I confirm this information is accurate and consent to WAAW verifying my identity.
            </label>

            <div className="flex items-center justify-between">
              <GhostButton onClick={goBack}>Back</GhostButton>
              <GoldButton onClick={handleSubmit} disabled={saving || !confirmAccurate}>
                {saving ? 'Submitting…' : 'Submit for review'}
              </GoldButton>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function KycPageInner() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const gate = useAuthGate({ fallbackHref: '/', signedOutMessage: 'Sign in to verify your identity.' });
  const { profile, loading, refetch } = useKycProfile();

  if (gate) return gate;

  if (loading || !profile) {
    return (
      <div>
        <InvestorNav />
        <main className="mx-auto max-w-md px-6 py-16 text-center"><p className="font-sans text-sm text-mu">Loading…</p></main>
      </div>
    );
  }

  if (!isKycEditable(profile.status)) {
    return <StatusScreen profile={profile} onResubmit={refetch} returnTo={returnTo} />;
  }

  return <KycWizard profile={profile} refetchProfile={refetch} />;
}

export default function KycPage() {
  return (
    <Suspense fallback={null}>
      <KycPageInner />
    </Suspense>
  );
}
