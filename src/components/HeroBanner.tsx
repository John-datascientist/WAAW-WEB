'use client';

import Link from 'next/link';
import { GhostButton, GoldButton } from './ui';
import { useStartups } from '../lib/useInvestor';

// Dark, oversized-type cover hero (per a reference design the user shared),
// full-bleed instead of the previous floating light card. The right-hand
// visual is a CSS-only rotating "glass" cube (transform-style: preserve-3d,
// translucent faces, ambient blur glow) rather than a photo or logo — no
// asset, and nothing that could be mistaken for a real product/person.
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
        <text className="fill-white/60 font-mono text-[8.2px] uppercase tracking-[0.25em]">
          <textPath href="#orbit-path" startOffset="0%">
            How it works • How it works •
          </textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ch text-heroBg transition-transform group-hover:scale-105">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2.5L11 7L4 11.5V2.5Z" fill="currentColor" />
        </svg>
      </span>
    </Link>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <p className="mb-1 font-mono text-[9px] uppercase tracking-wider text-white/50">{label}</p>
      <p className="font-serif text-xl text-white">{value}</p>
    </div>
  );
}

const HEADLINE_WORDS = ['Imagine', 'owning', '0.01%', 'of', 'Moniepoint,', 'Flutterwave,', 'Moove,', 'or', 'Paystack,'];

// A scrolling strip of the sectors WAAW backs — visual movement without
// borrowing anyone else's brand. Deliberately abstract (icon + label, no
// logos or photos): the companies named in the headline above aren't
// affiliated with WAAW, and implying otherwise with their real marks or
// founders' photos isn't something to build.
const SECTORS = [
  { icon: '◆', label: 'FinTech' },
  { icon: '▲', label: 'Logistics' },
  { icon: '●', label: 'Mobility' },
  { icon: '■', label: 'E-commerce' },
  { icon: '◇', label: 'HealthTech' },
  { icon: '△', label: 'AgriTech' },
  { icon: '○', label: 'EdTech' },
];

function SectorMarquee() {
  const track = [...SECTORS, ...SECTORS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] py-3" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {[...track, ...track].map((s, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="text-ch2">{s.icon}</span>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Six translucent faces arranged with 3D transforms into a cube, tilted and
// slowly spun on Y — a CSS approximation of the glass/prism object in the
// reference, with a couple of blurred color blobs behind it for the
// holographic glow instead of a real refraction shader.
function GlassCube() {
  const face =
    'absolute inset-0 h-40 w-40 rounded-2xl border border-white/25 bg-gradient-to-br from-white/15 via-fuchsia-300/10 to-cyan-300/10 shadow-[0_0_40px_rgba(124,79,212,0.25)] backdrop-blur-md';
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-sm items-center justify-center sm:flex" aria-hidden="true">
      <div className="absolute h-56 w-56 animate-glow-pulse rounded-full bg-pu3/30 blur-3xl" />
      <div className="absolute h-40 w-40 animate-glow-pulse rounded-full bg-ch2/20 blur-2xl" style={{ animationDelay: '2s' }} />

      <div className="relative h-40 w-40 [perspective:900px]">
        <div className="relative h-full w-full animate-cube-spin [transform-style:preserve-3d]">
          <div className={face} style={{ transform: 'translateZ(80px)' }} />
          <div className={face} style={{ transform: 'rotateY(180deg) translateZ(80px)' }} />
          <div className={face} style={{ transform: 'rotateY(90deg) translateZ(80px)' }} />
          <div className={face} style={{ transform: 'rotateY(-90deg) translateZ(80px)' }} />
          <div className={face} style={{ transform: 'rotateX(90deg) translateZ(80px)' }} />
          <div className={face} style={{ transform: 'rotateX(-90deg) translateZ(80px)' }} />
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-2 right-0 select-none font-display text-[7rem] font-extrabold leading-none text-white/[0.04]">
        01
      </span>
      <div className="absolute right-1 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-ch" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>
    </div>
  );
}

export function HeroBanner() {
  const { startups } = useStartups();
  const verifiedCount = startups.length;
  const totalRaised = startups.reduce((sum, s) => sum + (s.raised_amount ?? 0), 0);

  return (
    <div className="relative overflow-hidden bg-heroBg">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at top right, #1c0f3d 0%, transparent 55%)' }}
        aria-hidden="true"
      />

      <header className="relative px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-serif text-2xl font-semibold italic text-white">WAAW</span>
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-white/60">
            <Link href="/startups" className="hover:text-white">Browse startups</Link>
            <Link href="/learn" className="hover:text-white">Learn</Link>
            <Link href="/legal/terms" className="hover:text-white">Legal</Link>
            <Link href="/signin" className="hover:text-white">Sign in</Link>
          </nav>
        </div>
      </header>

      <div className="relative">
        <SectorMarquee />
      </div>

      <section className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid animate-fade-up gap-10 sm:grid-cols-2 sm:gap-6">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ch2">We Are All We&apos;ve Got</p>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {HEADLINE_WORDS.map((word, i) => (
                <span key={i}>
                  <span
                    className="inline-block animate-fade-up"
                    style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'backwards' }}
                  >
                    {word}
                  </span>{' '}
                </span>
              ))}
              <span
                className="relative text-ch animate-fade-up"
                style={{ animationDelay: `${HEADLINE_WORDS.length * 70}ms`, animationFillMode: 'backwards' }}
              >
                back when they started
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
            <p className="mb-8 max-w-md font-sans text-base font-light leading-relaxed text-white/60">
              WAAW connects Black diaspora investors with verified, early-stage Black-founded
              startups. Every deal is reviewed before it appears on the platform, and every
              commitment moves through protected escrow.
            </p>
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <GoldButton href="/signup?role=investor">Sign up to invest</GoldButton>
              <GhostButton inverted href="/startups">Browse startups</GhostButton>
              <GhostButton inverted href="/signup?role=founder">Register your startup</GhostButton>
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

          <GlassCube />
        </div>
      </section>
    </div>
  );
}
