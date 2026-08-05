'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { MIN_COFOUNDERS, ONBOARDING_STEPS } from '../../../src/data';
import { CofounderRow } from '../../../src/lib/useFounderStartup';
import { ErrorBanner, Field, GhostButton, GoldButton, StepFooter } from '../../../src/components/ui';

function VerifyForm({ cofounder, onDone }: { cofounder: CofounderRow; onDone: () => void }) {
  const { updateCofounder } = useFounderStartupContext();
  const [selfieDone, setSelfieDone] = useState(cofounder.selfie_done);
  const [idDone, setIdDone] = useState(cofounder.id_verified);
  const [socialLink, setSocialLink] = useState(cofounder.social_link ?? '');
  const [error, setError] = useState<string | null>(null);
  const canSave = selfieDone && idDone && socialLink.trim().length > 0;

  const handleSave = async () => {
    setError(null);
    const result = await updateCofounder(cofounder.id, { selfie_done: selfieDone, id_verified: idDone, social_link: socialLink.trim() });
    if (result.error) { setError(result.error); return; }
    onDone();
  };

  return (
    <div className="mt-3 rounded-md border border-ln bg-bg p-4">
      <ErrorBanner message={error} />
      <button
        type="button"
        onClick={() => setSelfieDone(true)}
        className={`mb-2 w-full rounded-md border px-4 py-3 text-left font-sans text-xs ${selfieDone ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'}`}
      >
        {selfieDone ? '✓ Selfie captured' : '📷 Take a selfie'}
      </button>
      <button
        type="button"
        onClick={() => setIdDone(true)}
        className={`mb-3 w-full rounded-md border px-4 py-3 text-left font-sans text-xs ${idDone ? 'border-suBorder bg-suLight text-su' : 'border-ln text-mu'}`}
      >
        {idDone ? '✓ ID uploaded' : '🪪 Upload passport or national ID'}
      </button>
      <Field label="Personal social link (LinkedIn, Twitter/X, Instagram)" value={socialLink} onChange={setSocialLink} placeholder="https://linkedin.com/in/yourname" />
      <GoldButton onClick={handleSave} disabled={!canSave}>Save verification</GoldButton>
    </div>
  );
}

export default function CofoundersPage() {
  const router = useRouter();
  const { cofounders, addCofounder, removeCofounder } = useFounderStartupContext();
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);

  const meetsMinimum = cofounders.length >= MIN_COFOUNDERS;
  const allVerified = cofounders.every((c) => c.selfie_done && c.id_verified && !!c.social_link);

  const handleAdd = async () => {
    if (!name.trim() || !role.trim()) return;
    setError(null);
    const result = await addCofounder(name.trim(), role.trim());
    if (result.error) { setError(result.error); return; }
    setName('');
    setRole('');
    setAdding(false);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Verify co-founders</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        WAAW requires at least {MIN_COFOUNDERS} co-founders per startup. Every co-founder must
        complete a selfie, ID check, and personal social link.
      </p>

      <ErrorBanner message={error} />

      {!meetsMinimum && (
        <div className="mb-4 rounded-md border border-warnBorder bg-warnLight p-3 font-sans text-xs text-warn">
          {cofounders.length} of {MIN_COFOUNDERS} minimum co-founders added.
        </div>
      )}

      {cofounders.map((c, i) => {
        const done = c.selfie_done && c.id_verified && !!c.social_link;
        const removable = i > 0 && !done;
        return (
          <div key={c.id} className="mb-2 rounded-md border border-ln bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm font-medium text-tx">{c.name}</p>
                <p className="font-mono text-[10px] text-mu">{c.role}</p>
              </div>
              <div className="flex items-center gap-3">
                {done ? (
                  <span className="rounded-sm bg-su px-2 py-1 font-mono text-[8px] text-white">VERIFIED</span>
                ) : (
                  <button type="button" onClick={() => setVerifyingId(c.id)} className="font-sans text-xs font-semibold text-ch">
                    Verify
                  </button>
                )}
                {removable && (
                  <button type="button" onClick={() => removeCofounder(c.id)} className="font-sans text-xs text-da">
                    Remove
                  </button>
                )}
              </div>
            </div>
            {verifyingId === c.id && <VerifyForm cofounder={c} onDone={() => setVerifyingId(null)} />}
          </div>
        );
      })}

      {adding ? (
        <div className="mt-3 rounded-md border border-ln bg-card p-4">
          <Field label="Full name" value={name} onChange={setName} placeholder="Chidi Obi" />
          <Field label="Role" value={role} onChange={setRole} placeholder="Co-founder / CTO" />
          <GhostButton onClick={handleAdd}>Add co-founder</GhostButton>
        </div>
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="mt-3 font-sans text-sm font-medium text-ch">
          + Add another co-founder
        </button>
      )}

      <StepFooter
        backHref={ONBOARDING_STEPS[0].path}
        onContinue={() => router.push(ONBOARDING_STEPS[2].path)}
        disabled={!meetsMinimum || !allVerified}
      />
    </div>
  );
}
