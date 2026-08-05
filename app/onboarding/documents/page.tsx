'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { ONBOARDING_STEPS } from '../../../src/data';
import { DocumentKind, uploadFounderDocument } from '../../../src/lib/uploadDocument';
import { StepFooter } from '../../../src/components/ui';

const DOC_ROWS: { kind: DocumentKind; label: string; hint: string; column: 'pitch_deck_url' | 'business_plan_url' | 'pitch_video_url'; accept: string }[] = [
  { kind: 'pitch-deck', label: 'Pitch deck', hint: 'PDF or PPTX', column: 'pitch_deck_url', accept: '.pdf,.ppt,.pptx' },
  { kind: 'business-plan', label: 'Business plan', hint: 'PDF or DOCX', column: 'business_plan_url', accept: '.pdf,.doc,.docx' },
  { kind: 'pitch-video', label: '2-minute pitch video', hint: 'MP4 or MOV, up to 200MB', column: 'pitch_video_url', accept: 'video/*' },
];

function DocRow({ row }: { row: (typeof DOC_ROWS)[number] }) {
  const { user } = useAuth();
  const { startup, updateStartup } = useFounderStartupContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const done = !!startup?.[row.column];

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setError(null);
    const { path, error: uploadError } = await uploadFounderDocument(user.id, file, row.kind);
    if (uploadError) { setUploading(false); setError(uploadError); return; }
    const result = await updateStartup({ [row.column]: path } as any);
    setUploading(false);
    if (result.error) setError(result.error);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{row.label}</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={`w-full rounded-md border border-dashed px-4 py-8 text-center font-sans text-sm ${
          done ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'
        }`}
      >
        {uploading ? 'Uploading…' : done ? `✓ ${row.label} uploaded` : `Upload ${row.label.toLowerCase()}`}
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider opacity-70">{row.hint}</span>
      </button>
      <input ref={inputRef} type="file" accept={row.accept} onChange={handleFile} className="hidden" />
      {error && <p className="mt-1 font-sans text-xs text-da">{error}</p>}
    </div>
  );
}

export default function DocumentsPage() {
  const router = useRouter();
  const { startup } = useFounderStartupContext();
  const allDone = !!startup?.pitch_deck_url && !!startup?.business_plan_url && !!startup?.pitch_video_url;

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Documents</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        Upload your pitch deck, business plan, and a short pitch video for WAAW&apos;s review.
      </p>

      {DOC_ROWS.map((row) => (
        <DocRow key={row.kind} row={row} />
      ))}

      <StepFooter
        backHref={ONBOARDING_STEPS[4].path}
        onContinue={() => router.push(ONBOARDING_STEPS[6].path)}
        disabled={!allDone}
      />
    </div>
  );
}
