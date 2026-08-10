'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import {
  BANK_CURRENCIES,
  INCORPORATION_DOC_LABELS,
  ONBOARDING_STEPS,
  REGISTRATION_COUNTRIES,
  STARTUP_SECTORS,
} from '../../../src/data';
import { uploadFounderDocument } from '../../../src/lib/uploadDocument';
import { clearDraft, loadDraft, saveDraft } from '../../../src/lib/formDraft';
import { Chip, ErrorBanner, Field, GoldButton, StepFooter, TextArea } from '../../../src/components/ui';

const DRAFT_KEY = 'company';
interface CompanyDraft {
  registrationCountry: string; name: string; regNumber: string; sector: string; pitch: string;
  raisingAmount: string; certUrl: string | null; cofoundersOnDocs: boolean;
  activeUsers: string; monthlyRevenue: string; priorFunding: string;
  bankName: string; bankAccountName: string; bankAccountNumber: string; bankCurrency: string; bankProofUrl: string | null;
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
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
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const PITCH_MAX_LENGTH = 140;

export default function CompanyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { startup, updateStartup } = useFounderStartupContext();
  const certInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);
  const draft = useRef(loadDraft<CompanyDraft>(DRAFT_KEY)).current;

  const [registrationCountry, setRegistrationCountry] = useState(startup?.registration_country ?? draft.registrationCountry ?? '');
  const [name, setName] = useState(startup?.name ?? draft.name ?? '');
  const [regNumber, setRegNumber] = useState(startup?.registration_number ?? draft.regNumber ?? '');
  const [sector, setSector] = useState(startup?.sector ?? draft.sector ?? '');
  const [pitch, setPitch] = useState(startup?.pitch ?? draft.pitch ?? '');
  const [raisingAmount, setRaisingAmount] = useState(startup?.raising_amount ? String(startup.raising_amount) : draft.raisingAmount ?? '');
  const [certUrl, setCertUrl] = useState(startup?.incorporation_cert_url ?? draft.certUrl ?? null);
  const [cofoundersOnDocs, setCofoundersOnDocs] = useState(startup?.cofounders_on_docs_confirmed ?? draft.cofoundersOnDocs ?? false);

  const [activeUsers, setActiveUsers] = useState(startup?.active_users != null ? String(startup.active_users) : draft.activeUsers ?? '');
  const [monthlyRevenue, setMonthlyRevenue] = useState(startup?.monthly_revenue != null ? String(startup.monthly_revenue) : draft.monthlyRevenue ?? '');
  const [priorFunding, setPriorFunding] = useState(startup?.prior_funding_raised != null ? String(startup.prior_funding_raised) : draft.priorFunding ?? '0');

  const [bankName, setBankName] = useState(startup?.bank_name ?? draft.bankName ?? '');
  const [bankAccountName, setBankAccountName] = useState(startup?.bank_account_name ?? draft.bankAccountName ?? '');
  const [bankAccountNumber, setBankAccountNumber] = useState(startup?.bank_account_number ?? draft.bankAccountNumber ?? '');
  const [bankCurrency, setBankCurrency] = useState(startup?.bank_currency ?? draft.bankCurrency ?? '');
  const [bankProofUrl, setBankProofUrl] = useState(startup?.bank_proof_url ?? draft.bankProofUrl ?? null);

  const [uploadingCert, setUploadingCert] = useState(false);
  const [uploadingProof, setUploadingProof] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveDraft(DRAFT_KEY, {
      registrationCountry, name, regNumber, sector, pitch, raisingAmount, certUrl, cofoundersOnDocs,
      activeUsers, monthlyRevenue, priorFunding, bankName, bankAccountName, bankAccountNumber, bankCurrency, bankProofUrl,
    });
  }, [
    registrationCountry, name, regNumber, sector, pitch, raisingAmount, certUrl, cofoundersOnDocs,
    activeUsers, monthlyRevenue, priorFunding, bankName, bankAccountName, bankAccountNumber, bankCurrency, bankProofUrl,
  ]);

  const certLabel = INCORPORATION_DOC_LABELS[registrationCountry] ?? 'Certificate of incorporation';

  const canSave =
    !!registrationCountry && name.trim().length > 0 && regNumber.trim().length > 0 && !!sector &&
    pitch.trim().length > 0 && Number(raisingAmount) > 0 && !!certUrl && cofoundersOnDocs &&
    activeUsers.trim() && monthlyRevenue.trim() &&
    bankName.trim() && bankAccountName.trim() && bankAccountNumber.trim() && !!bankCurrency;

  const handleCertFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingCert(true);
    setError(null);
    const { path, error: uploadError } = await uploadFounderDocument(user.id, file, 'incorporation-cert');
    setUploadingCert(false);
    if (uploadError) { setError(uploadError); return; }
    setCertUrl(path);
  };

  const handleProofFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingProof(true);
    setError(null);
    const { path, error: uploadError } = await uploadFounderDocument(user.id, file, 'bank-account-proof');
    setUploadingProof(false);
    if (uploadError) { setError(uploadError); return; }
    setBankProofUrl(path);
  };

  const handleSave = async () => {
    if (!canSave) return;
    setError(null);
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 7);
    const result = await updateStartup({
      registration_country: registrationCountry,
      name: name.trim(),
      registration_number: regNumber.trim(),
      sector,
      pitch: pitch.trim(),
      raising_amount: Number(raisingAmount),
      incorporation_cert_url: certUrl,
      cofounders_on_docs_confirmed: cofoundersOnDocs,
      active_users: Number(activeUsers),
      monthly_revenue: Number(monthlyRevenue),
      prior_funding_raised: Number(priorFunding || 0),
      bank_name: bankName.trim(),
      bank_account_name: bankAccountName.trim(),
      bank_account_number: bankAccountNumber.trim(),
      bank_currency: bankCurrency,
      bank_proof_url: bankProofUrl,
      slug,
    });
    if (result.error) { setError(result.error); return; }
    clearDraft(DRAFT_KEY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Verify your company</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        Confirm your registered business details and how investors will see you. WAAW staff verify
        the actual documents against your country&apos;s requirements during review.
      </p>

      <ErrorBanner message={error} />

      <Select label="Country of incorporation" value={registrationCountry} onChange={setRegistrationCountry} options={REGISTRATION_COUNTRIES} />
      <Field label="Registered company name" value={name} onChange={setName} placeholder="FarmLink Ltd" />
      <Field label="Registration number" value={regNumber} onChange={setRegNumber} placeholder="RC1234567" />

      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">Sector</label>
      <div className="mb-5 flex flex-wrap gap-2">
        {STARTUP_SECTORS.map((s) => (
          <Chip key={s} label={s} active={sector === s} onClick={() => setSector(s)} />
        ))}
      </div>

      <TextArea label={`One-line pitch (${pitch.length}/${PITCH_MAX_LENGTH})`} value={pitch.slice(0, PITCH_MAX_LENGTH)} onChange={(v) => setPitch(v.slice(0, PITCH_MAX_LENGTH))} placeholder="Cold-chain logistics for smallholder farmers" rows={2} />
      <Field label="Amount raising (USD)" value={raisingAmount} onChange={(v) => setRaisingAmount(v.replace(/\D/g, ''))} placeholder="350000" />

      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{certLabel}</label>
      <button
        type="button"
        onClick={() => certInputRef.current?.click()}
        disabled={uploadingCert}
        className={`mb-3 w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
          certUrl ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
        }`}
      >
        {uploadingCert ? 'Uploading…' : certUrl ? `✓ ${certLabel} uploaded` : `🏢 Upload ${certLabel.toLowerCase()}`}
      </button>
      <input ref={certInputRef} type="file" accept="image/*,.pdf" onChange={handleCertFile} className="hidden" />

      <label className="mb-5 flex items-start gap-2 font-sans text-xs font-light text-mu">
        <input
          type="checkbox"
          checked={cofoundersOnDocs}
          onChange={(e) => setCofoundersOnDocs(e.target.checked)}
          className="mt-0.5"
        />
        I confirm this registration document lists every co-founder added in the previous step.
        WAAW will reject applications where the document and the co-founder list don&apos;t match.
      </label>

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">Company books</p>
      <Field label="Active users / customers" value={activeUsers} onChange={(v) => setActiveUsers(v.replace(/\D/g, ''))} placeholder="1200" />
      <Field label="Monthly revenue (USD)" value={monthlyRevenue} onChange={(v) => setMonthlyRevenue(v.replace(/\D/g, ''))} placeholder="0 if pre-revenue" />
      <Field label="Total prior funding raised (USD)" value={priorFunding} onChange={(v) => setPriorFunding(v.replace(/\D/g, ''))} placeholder="0 if none" />

      <p className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-wider text-pu">Company bank account (for escrow release)</p>
      <Field label="Bank name" value={bankName} onChange={setBankName} placeholder="GTBank" />
      <Field label="Account name" value={bankAccountName} onChange={setBankAccountName} placeholder="FarmLink Ltd" />
      <Field label="Account number" value={bankAccountNumber} onChange={setBankAccountNumber} placeholder="0123456789" />
      <Select label="Currency" value={bankCurrency} onChange={setBankCurrency} options={BANK_CURRENCIES} />

      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">Proof of account (optional)</label>
      <button
        type="button"
        onClick={() => proofInputRef.current?.click()}
        disabled={uploadingProof}
        className={`mb-5 w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
          bankProofUrl ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
        }`}
      >
        {uploadingProof ? 'Uploading…' : bankProofUrl ? '✓ Proof uploaded' : '🏦 Upload a bank letter or cancelled cheque'}
      </button>
      <input ref={proofInputRef} type="file" accept="image/*,.pdf" onChange={handleProofFile} className="hidden" />

      <GoldButton onClick={handleSave} disabled={!canSave}>{saved ? 'Saved!' : 'Save company details'}</GoldButton>

      <StepFooter
        backHref={ONBOARDING_STEPS[3].path}
        onContinue={() => router.push(ONBOARDING_STEPS[5].path)}
        disabled={!startup?.name}
      />
    </div>
  );
}
