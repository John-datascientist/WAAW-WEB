'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { ONBOARDING_STEPS, PROOF_OF_ADDRESS_TYPES } from '../../../src/data';
import { uploadFounderDocument } from '../../../src/lib/uploadDocument';
import { clearDraft, loadDraft, saveDraft } from '../../../src/lib/formDraft';
import { ErrorBanner, Field, GoldButton, StepFooter } from '../../../src/components/ui';

const DRAFT_KEY = 'address';
interface AddressDraft { address: string; docType: string; docUrl: string | null }

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

export default function AddressPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { startup, updateStartup } = useFounderStartupContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draft = useRef(loadDraft<AddressDraft>(DRAFT_KEY)).current;
  const [address, setAddress] = useState(startup?.address_line ?? draft.address ?? '');
  const [docType, setDocType] = useState(startup?.proof_of_address_type ?? draft.docType ?? '');
  const [docUrl, setDocUrl] = useState(startup?.proof_of_address_url ?? draft.docUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveDraft(DRAFT_KEY, { address, docType, docUrl });
  }, [address, docType, docUrl]);

  const canSubmit = !!address.trim() && !!docType && !!docUrl;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setError(null);
    const { path, error: uploadError } = await uploadFounderDocument(user.id, file, 'proof-of-address');
    setUploading(false);
    if (uploadError) { setError(uploadError); return; }
    setDocUrl(path);
  };

  const handleVerify = async () => {
    if (!canSubmit) return;
    setError(null);
    const result = await updateStartup({
      address_line: address.trim(),
      address_verified: true,
      city: address.trim(),
      proof_of_address_type: docType,
      proof_of_address_url: docUrl,
    });
    if (result.error) { setError(result.error); return; }
    clearDraft(DRAFT_KEY);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Address verification</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        Enter your registered business address and upload a supporting document. WAAW confirms
        this during your founder interview.
      </p>

      <ErrorBanner message={error} />

      <Field label="Business address" value={address} onChange={setAddress} placeholder="12 Adeola Odeku St, Victoria Island, Lagos" />

      <Select label="Proof of address document type" value={docType} onChange={setDocType} options={PROOF_OF_ADDRESS_TYPES} />

      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">Upload document</label>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || !docType}
        className={`mb-5 w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
          docUrl ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
        }`}
      >
        {uploading ? 'Uploading…' : docUrl ? '✓ Document uploaded' : docType ? `📄 Upload your ${docType.toLowerCase()}` : 'Select a document type above first'}
      </button>
      <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" />

      <GoldButton onClick={handleVerify} disabled={!canSubmit}>Submit address</GoldButton>
      {startup?.address_verified && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-su">✓ Address submitted</p>
      )}

      <StepFooter
        backHref={ONBOARDING_STEPS[2].path}
        onContinue={() => router.push(ONBOARDING_STEPS[4].path)}
        disabled={!startup?.address_verified}
      />
    </div>
  );
}
