'use client';

import Link from 'next/link';
import { GhostButton, GoldButton } from './ui';
import { useStartups } from '../lib/useInvestor';

// Layout borrows the split-hero structure of a Dribbble crowdfunding concept
// (floating white card straddling a two-tone color block, circular orbit
// badge, paired stat tiles) but keeps WAAW's own palette/type — no photo
// asset exists for the right-hand panel, so it's an abstract geometric
// collage in brand colors rather than a stock photo standing in as "a
// founder".
function formatCompactUSD(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

function OrbitBadge() {
  return (
    <Link
      href="#how-it-works"
      className="group relative flex h-24 w-24 shrink-0 items-center justify-center"
      aria-label="See how WAAW works"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-orbit-spin motion-reduce:animate-none">
        <defs>
          <path id="orbit-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-pu font-mono text-[8.2px] uppercase tracking-[0.25em]">
          <textPath href="#orbit-path" startOffset="0%">
            How it works • How it works •
          </textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pu text-white transition-transform group-hover:scale-105">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2.5L11 7L4 11.5V2.5Z" fill="currentColor" />
        </svg>
      </span>
    </Link>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ln bg-card px-4 py-3">
      <p className="mb-1 font-mono text-[9px] uppercase tracking-wider text-mu">{label}</p>
      <p className="font-serif text-xl text-tx">{value}</p>
    </div>
  );
}

function GeometricCollage() {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-sm sm:block" aria-hidden="true">
      <div className="absolute left-[8%] top-[10%] h-[68%] w-[68%] rotate-45 rounded-2xl bg-puXlight" />
      <div className="absolute bottom-[6%] right-[4%] h-[56%] w-[56%] rounded-tl-[64px] rounded-br-[12px] rounded-tr-[12px] rounded-bl-[12px] bg-ch2" />
      <div className="absolute right-[16%] top-[6%] h-3 w-3 rounded-full bg-pu" />
      <svg
        viewBox="0 0 240 240"
        className="absolute inset-0 h-full w-full animate-fade-up"
        style={{ animationDelay: '150ms' }}
      >
        <path
          d="M40 170 L95 110 L135 145 L200 60"
          stroke="#3d1f7a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="200" cy="60" r="7" fill="#c9a84c" />
      </svg>
    </div>
  );
}

export function HeroBanner() {
  const { startups } = useStartups();
  const verifiedCount = startups.length;
  const totalRaised = startups.reduce((sum, s) => sum + (s.raised_amount ?? 0), 0);

  return (
    <div className="relative overflow-hidden bg-pu">
      <div className="absolute inset-x-0 bottom-0 h-28 bg-ch2 sm:h-36" />

      <header className="relative px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-serif text-2xl font-semibold italic text-white">WAAW</span>
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-puLight">
            <Link href="/startups" className="hover:text-white">Browse startups</Link>
            <Link href="/legal/terms" className="hover:text-white">Legal</Link>
            <Link href="/signin" className="hover:text-white">Sign in</Link>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 pt-6">
        <div className="grid animate-fade-up gap-10 rounded-lg bg-card p-8 shadow-xl sm:grid-cols-2 sm:gap-6 sm:p-12 sm:pb-16 sm:[margin-bottom:-4.5rem]">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-pu">We Are All We&apos;ve Got</p>
            <h1 className="mb-6 font-serif text-4xl italic leading-tight text-tx sm:text-[2.75rem]">
              Imagine owning 0.01% of the next Flutterwave, Paystack, or Chipper Cash{' '}
              <span className="relative text-ch not-italic sm:whitespace-nowrap">
                before the world caught on
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 hidden h-3 w-full text-ch2 sm:block"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C 40 2, 70 10, 100 5 S 160 2, 198 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mb-8 max-w-md font-sans text-base font-light leading-relaxed text-mu">
              WAAW connects Black diaspora investors with verified, early-stage Black-founded
              startups. Every deal is reviewed before it appears on the platform, and every
              commitment moves through protected escrow.
            </p>
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <GoldButton href="/startups">Browse startups</GoldButton>
              <GhostButton href="/signup?role=founder">Register your startup</GhostButton>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <OrbitBadge />
              {verifiedCount > 0 && (
                <div className="flex gap-3">
                  <StatTile label="Verified startups" value={String(verifiedCount)} />
                  <StatTile label="Total raised" value={formatCompactUSD(totalRaised)} />
                </div>
              )}
            </div>
          </div>

          <GeometricCollage />
        </div>
      </section>

      <div className="h-16 sm:h-0" />
    </div>
  );
}
