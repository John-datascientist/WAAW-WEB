'use client';

import { useRef, useState } from 'react';
import type { KycDocKind, KycDocumentRow } from '../lib/kyc/useKyc';

interface Props {
  label: string;
  docKind: KycDocKind;
  existing: KycDocumentRow | null;
  onUpload: (docKind: KycDocKind, file: File) => Promise<{ error: string | null }>;
}

// Matches the dashed-border upload button already used for founder/
// cofounder documents elsewhere in onboarding, generalised to any KYC doc
// kind and wired to the kyc-documents bucket instead of waaw-founder-docs.
export function KycDocumentUpload({ label, docKind, existing, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const { error: uploadError } = await onUpload(docKind, file);
    setUploading(false);
    if (uploadError) setError(uploadError);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="mb-5">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={`w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
          existing ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
        }`}
      >
        {uploading ? 'Uploading…' : existing ? `✓ Uploaded` : `Upload ${label.toLowerCase()}`}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
      {error && <p className="mt-1 font-sans text-xs text-da">{error}</p>}
    </div>
  );
}
