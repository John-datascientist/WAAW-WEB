'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFounderStartupContext } from '../../../src/context/FounderStartupContext';
import { SOCIAL_PLATFORMS, ONBOARDING_STEPS } from '../../../src/data';
import { ErrorBanner, Field, GoldButton, StepFooter } from '../../../src/components/ui';

export default function SocialLinksPage() {
  const router = useRouter();
  const { startup, updateStartup } = useFounderStartupContext();
  const [platform, setPlatform] = useState(SOCIAL_PLATFORMS[0]);
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const links = startup?.business_social_links ?? [];

  const handleAdd = async () => {
    if (!url.trim()) return;
    setError(null);
    const next = [...links, { id: String(Date.now()), platform, url: url.trim() }];
    const result = await updateStartup({ business_social_links: next });
    if (result.error) { setError(result.error); return; }
    setUrl('');
  };

  const handleRemove = async (id: string) => {
    setError(null);
    const result = await updateStartup({ business_social_links: links.filter((l) => l.id !== id) });
    if (result.error) setError(result.error);
  };

  return (
    <div>
      <h2 className="mb-2 font-serif text-xl text-tx">Business social links</h2>
      <p className="mb-6 font-sans text-sm font-light text-mu">
        Add your startup&apos;s social platforms. These will show on your public investor profile.
      </p>

      <ErrorBanner message={error} />

      {links.map((l) => (
        <div key={l.id} className="mb-2 flex items-center justify-between rounded-md border border-ln bg-card p-4">
          <div className="min-w-0">
            <p className="font-sans text-sm font-medium text-tx">{l.platform}</p>
            <p className="truncate font-mono text-[10px] text-mu">{l.url}</p>
          </div>
          <button type="button" onClick={() => handleRemove(l.id)} className="shrink-0 font-sans text-xs text-da">
            Remove
          </button>
        </div>
      ))}

      <div className="mt-4 rounded-md border border-ln bg-card p-4">
        <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="mb-4 w-full rounded-md border border-ln bg-bg px-4 py-3 font-sans text-sm text-tx outline-none focus:border-pu"
        >
          {SOCIAL_PLATFORMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <Field label="URL" value={url} onChange={setUrl} placeholder="https://instagram.com/yourstartup" />
        <GoldButton onClick={handleAdd}>Add link</GoldButton>
      </div>

      <StepFooter
        backHref={ONBOARDING_STEPS[1].path}
        onContinue={() => router.push(ONBOARDING_STEPS[3].path)}
        disabled={links.length === 0}
      />
    </div>
  );
}
