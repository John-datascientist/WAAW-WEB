'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { STARTUP_SECTORS, ONBOARDING_STEPS } from '../../../src/data';
import { uploadFounderDocument } from '../../../src/lib/uploadDocument';
import { Chip, ErrorBanner, Field, GoldButton, StepFooter, TextArea } from '../../../src/components/ui';

const PITCH_MAX_LENGTH = 140;

export default function CompanyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { startup, updateStartup } = useFounderStartupContext();
  const certInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(startup?.name ?? '');
  const [regNumber, setRegNumber] = useState(startup?.registration_number ?? '');
  const [sector, setSector] = useState(startup?.sector ?? '');
  const [pitch, setPitch] = useState(startup?.pitch ?? '');
  const [raisingAmount, setRaisingAmount] = useState(startup?.raising_amount ? String(startup.raising_amount) : '');
  const [certUrl, setCertUrl] = useState(startup?.incorporation_cert_url ?? null);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSave = name.trim().length > 0 && regNumber.trim().length > 0 && !!sector && pitch.trim().length > 0 && Number(raisingAmount) > 0 && !!certUrl;

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

  const handleSave = async () => {
    if (!canSave) return;
    setError(null);
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).slice(2, 7);
    const result = await updateStartup({
      name: name.trim(),
      registration_number: regNumber.trim(),
      sector,
      pitch: pitch.trim(),
      raising_amount: Number(raisingAmount),
      incorporation_cert_url: certUrl,
      slug,
    });
    if (result.error) { setError(result.error); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Verify your company</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        Confirm your registered business details and how investors will see you.
      </p>

      <ErrorBanner message={error} />

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

      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">Certificate of incorporation</label>
      <button
        type="button"
        onClick={() => certInputRef.current?.click()}
        disabled={uploadingCert}
        className={`mb-5 w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
          certUrl ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
        }`}
      >
        {uploadingCert ? 'Uploading…' : certUrl ? '✓ Certificate uploaded' : '🏢 Upload certificate of incorporation'}
      </button>
      <input ref={certInputRef} type="file" accept="image/*,.pdf" onChange={handleCertFile} className="hidden" />

      <GoldButton onClick={handleSave} disabled={!canSave}>{saved ? 'Saved!' : 'Save company details'}</GoldButton>

      <StepFooter
        backHref={ONBOARDING_STEPS[3].path}
        onContinue={() => router.push(ONBOARDING_STEPS[5].path)}
        disabled={!startup?.name}
      />
    </div>
  );
}
