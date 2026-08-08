'use client';

import Link from 'next/link';
import { useStartups } from '../lib/useInvestor';

const AVATAR_STYLES = [
  { bg: 'bg-pu', text: 'text-white' },
  { bg: 'bg-pu3', text: 'text-white' },
  { bg: 'bg-ch', text: 'text-tx' },
  { bg: 'bg-ch2', text: 'text-tx' },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function avatarStyle(seed: string) {
  const hash = seed.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_STYLES[hash % AVATAR_STYLES.length];
}

// Founders with an active profile boost get a spotlight row on the
// homepage. Same "no real photos" rule as the rest of the landing page
// applies here — each card gets a generated initials avatar rather than an
// uploaded headshot, so this doesn't depend on a photo-upload feature and
// stays consistent with the abstract visual language used elsewhere.
export function FeaturedFounders() {
  const { startups, loading } = useStartups();
  const boosted = startups.filter((s) => s.boost_active && s.founder_name);

  if (loading || boosted.length === 0) return null;

  return (
    <section className="border-b border-ln bg-deeper px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-pu">Featured founders</p>
          <p className="font-sans text-sm font-light text-mu">Boosted profiles get extra visibility this week.</p>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-2">
          {boosted.map((s) => {
            const name = s.founder_name as string;
            const style = avatarStyle(name + s.id);
            return (
              <Link
                key={s.id}
                href={`/startups/${s.id}`}
                className="group w-64 shrink-0 snap-start rounded-lg border border-ln bg-card p-5 transition-colors hover:border-pu3"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${style.bg} ${style.text}`}
                  >
                    {initials(name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-medium text-tx">{name}</p>
                    <p className="truncate font-mono text-[10px] uppercase tracking-wider text-mu">{s.name}</p>
                  </div>
                </div>
                {s.founder_bio && (
                  <p className="mb-3 line-clamp-3 font-sans text-xs font-light leading-relaxed text-mu">{s.founder_bio}</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="rounded-sm bg-chLight px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-warn">Boosted</span>
                  <span className="rounded-sm bg-puXlight px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-pu">{s.sector}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
