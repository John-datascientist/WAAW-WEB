'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InvestorNav } from '../../../src/components/InvestorNav';
import { Divider, GoldButton, VerifiedBadge } from '../../../src/components/ui';
import { CURRENCY_RATES } from '../../../src/data';
import { useAuth } from '../../../src/context/AuthContext';
import { usePool, useStartup, useWatchlist } from '../../../src/lib/useInvestor';

const fmt = (n: number) => (n >= 1000000 ? '$' + (n / 1000000).toFixed(1) + 'M' : '$' + (n / 1000).toFixed(0) + 'K');
const fmtUsd = (n: number) => '$' + n.toLocaleString();
const MIN_PLEDGE = 100;

const listedAgo = (iso?: string) => {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'Listed today';
  if (days === 1) return 'Listed 1 day ago';
  if (days < 30) return `Listed ${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'Listed 1 month ago' : `Listed ${months} months ago`;
};

export default function StartupDetailPage({ params }: { params: { id: string } }) {
  const { profile } = useAuth();
  const { startup, loading } = useStartup(params.id);
  const { watchlist, toggle } = useWatchlist();
  const { members: poolMembers, totalPledged, myPledge, joinPool, leavePool } = usePool(params.id);
  const [shareCopied, setShareCopied] = useState(false);
  const [calcAmount, setCalcAmount] = useState('');
  const [currency, setCurrency] = useState<string | null>(null);
  const [showDiluted, setShowDiluted] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [pledgeError, setPledgeError] = useState<string | null>(null);
  const [pledging, setPledging] = useState(false);

  if (loading) {
    return (
      <div>
        <InvestorNav />
        <main className="mx-auto max-w-3xl px-6 py-16">
          <p className="font-sans text-sm text-mu">Loading deal…</p>
        </main>
      </div>
    );
  }

  if (!startup) {
    return (
      <div>
        <InvestorNav />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="font-sans text-sm text-mu">This deal couldn&apos;t be found.</p>
          <Link href="/startups" className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-pu">← Back to startups</Link>
        </main>
      </div>
    );
  }

  const pct = startup.raising_amount > 0 ? Math.round((startup.raised_amount / startup.raising_amount) * 100) : 0;
  const team = startup.waaw_cofounders ?? [];
  const socialLinks = startup.business_social_links ?? [];
  const selectedRate = CURRENCY_RATES.find((c) => c.code === currency);
  const calcNum = parseInt(calcAmount.replace(/\D/g, ''), 10) || 0;
  const estStake =
    startup.post_money_valuation && calcNum > 0 ? (calcNum / startup.post_money_valuation) * 100 : null;
  // Illustrative only — a typical future priced round dilutes existing
  // holders by roughly this much; real dilution depends on that round's
  // actual size and terms, which don't exist yet for an unraised round.
  const FUTURE_ROUND_DILUTION = 0.20;
  const dilutedStake = estStake !== null ? estStake * (1 - FUTURE_ROUND_DILUTION) : null;
  const saved = watchlist.includes(startup.id);
  const dealUrl = typeof window !== 'undefined' ? `${window.location.origin}/startups/${startup.id}` : '';

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${startup.name} is raising ${fmt(startup.raising_amount)} on WAAW. Check out the deal: ${dealUrl}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // clipboard API can be denied — silently no-op, this is a nice-to-have
    }
  };

  const commitHref = !profile
    ? `/signup?role=investor`
    : profile.role === 'founder'
      ? null
      : `/commit/${startup.id}`;

  const pledgeNum = parseInt(pledgeAmount.replace(/\D/g, ''), 10) || 0;

  const handleJoinPool = async () => {
    if (pledgeNum < MIN_PLEDGE) return;
    setPledging(true);
    setPledgeError(null);
    const { error } = await joinPool(pledgeNum);
    setPledging(false);
    if (error) { setPledgeError(error); return; }
    setPledgeAmount('');
  };

  const handleLeavePool = async () => {
    setPledging(true);
    await leavePool();
    setPledging(false);
  };

  return (
    <div>
      <InvestorNav />
      <main className="mx-auto max-w-3xl px-6 py-10 pb-32">
        <Link href="/startups" className="mb-6 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">← Startups</Link>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VerifiedBadge verified={startup.verified} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-mu">{startup.sector} · {startup.stage}</span>
          </div>
          {profile && (
            <button type="button" onClick={() => toggle(startup.id)} className="text-xl text-ch" aria-label={saved ? 'Remove from saved' : 'Save'}>
              {saved ? '★' : '☆'}
            </button>
          )}
        </div>

        <h1 className="mb-1 font-serif text-4xl italic text-tx">{startup.name}</h1>
        <p className="mb-6 font-mono text-xs text-mu">
          {[startup.city, startup.country].filter(Boolean).join(', ')}
          {listedAgo(startup.created_at) ? ` · ${listedAgo(startup.created_at)}` : ''}
        </p>

        <p className="mb-6 font-sans text-base font-light leading-relaxed text-tx">{startup.pitch}</p>

        {startup.pitch_video_url && (
          <div className="mb-6 overflow-hidden rounded-md border border-ln">
            <video controls className="w-full" src={startup.pitch_video_url} preload="metadata">
              Your browser doesn&apos;t support embedded video.{' '}
              <a href={startup.pitch_video_url} target="_blank" rel="noopener noreferrer">Watch the pitch video ↗</a>
            </video>
          </div>
        )}

        <Divider />

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Equity', value: startup.equity_pct != null ? `${startup.equity_pct}%` : 'TBD' },
            { label: 'Post-money', value: startup.post_money_valuation != null ? fmt(startup.post_money_valuation) : 'TBD' },
            { label: 'Stage', value: startup.stage },
            { label: 'Sector', value: startup.sector },
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-ln bg-card p-3">
              <p className="font-serif text-lg italic text-pu">{item.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-mu">{item.label}</p>
            </div>
          ))}
        </div>

        <Divider />

        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-mu">Raise progress</p>
        <div className="mb-2 flex items-baseline gap-2">
          <span className="font-serif text-2xl text-pu">{fmt(startup.raised_amount)}</span>
          <span className="font-mono text-xs text-mu">of {fmt(startup.raising_amount)}</span>
        </div>
        <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-deeper">
          <div className="h-1.5 rounded-full bg-ch transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
        <p className="mb-4 font-mono text-[10px] text-mu">{pct}% of target raised</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {CURRENCY_RATES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setCurrency(currency === c.code ? null : c.code)}
              className={`rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${
                currency === c.code ? 'border-pu bg-puXlight text-pu' : 'border-ln text-mu hover:border-pu3'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
        {selectedRate && (
          <p className="mb-6 font-mono text-[10px] text-mu">
            ≈ {selectedRate.symbol}{Math.round(startup.raising_amount * selectedRate.rate).toLocaleString()} target ·{' '}
            {selectedRate.symbol}{Math.round(startup.raised_amount * selectedRate.rate).toLocaleString()} raised
            (illustrative, not a live rate)
          </p>
        )}

        {startup.post_money_valuation != null && (
          <div className="mb-6 rounded-md border border-ln bg-card p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-mu">Estimate your stake</p>
            <div className="flex items-center gap-1 rounded-md border border-ln bg-bg px-3 py-2">
              <span className="font-serif text-lg text-mu">$</span>
              <input
                value={calcAmount}
                onChange={(e) => setCalcAmount(e.target.value.replace(/\D/g, ''))}
                placeholder="Amount you'd invest"
                className="w-full bg-transparent font-serif text-lg text-tx outline-none"
              />
            </div>
            {estStake !== null && (
              <p className="mt-2 font-sans text-sm font-medium text-pu">
                ≈ {estStake < 0.01 ? '<0.01' : estStake.toFixed(2)}% equity stake at {fmt(startup.post_money_valuation)} post-money
              </p>
            )}
            {estStake !== null && (
              <label className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-mu">
                <input type="checkbox" checked={showDiluted} onChange={(e) => setShowDiluted(e.target.checked)} className="accent-pu" />
                Show estimate after a future funding round
              </label>
            )}
            {showDiluted && dilutedStake !== null && (
              <p className="mt-2 font-sans text-xs font-light text-mu">
                ≈ {dilutedStake < 0.01 ? '<0.01' : dilutedStake.toFixed(2)}% after a typical future round
                (illustrative {(FUTURE_ROUND_DILUTION * 100).toFixed(0)}% dilution: the real number depends on
                that round&apos;s actual size and terms).
              </p>
            )}
            <p className="mt-1 font-mono text-[9px] text-mu">Estimate only. Final terms are set in your term sheet.</p>
          </div>
        )}

        <Divider />

        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-mu">Investment pool</p>
        <div className="mb-6 rounded-md border border-ln bg-card p-4">
          {poolMembers.length > 0 ? (
            <div className="mb-3 flex items-baseline justify-between">
              <span className="font-serif text-xl text-pu">{fmtUsd(totalPledged)}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-mu">
                {poolMembers.length} {poolMembers.length === 1 ? 'investor' : 'investors'} pooling
              </span>
            </div>
          ) : (
            <p className="mb-3 font-sans text-xs font-light text-mu">
              No one has pooled a commitment to this deal yet. Pledge an amount to start a pool with other investors.
            </p>
          )}

          {!profile ? (
            <Link href="/signup?role=investor" className="font-mono text-[10px] uppercase tracking-wider text-pu">
              Sign in to join the pool →
            </Link>
          ) : profile.role === 'founder' ? null : myPledge ? (
            <div>
              <p className="mb-3 font-sans text-xs text-tx">
                Your pledge: <strong>{fmtUsd(myPledge.pledge_amount)}</strong>{' '}
                {myPledge.confirmed ? (
                  <span className="text-su">· Committed</span>
                ) : (
                  <span className="text-mu">· Not yet committed</span>
                )}
              </p>
              {!myPledge.confirmed && (
                <div className="flex gap-2">
                  <GoldButton href={`/commit/${startup.id}?amount=${myPledge.pledge_amount}&pledge=1`}>
                    Confirm · Commit {fmtUsd(myPledge.pledge_amount)}
                  </GoldButton>
                  <button
                    type="button"
                    onClick={handleLeavePool}
                    disabled={pledging}
                    className="rounded-md border border-ln px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-mu hover:border-pu3"
                  >
                    Leave pool
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-2 flex items-center gap-1 rounded-md border border-ln bg-bg px-3 py-2">
                <span className="font-serif text-lg text-mu">$</span>
                <input
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value.replace(/\D/g, ''))}
                  placeholder="Amount to pledge"
                  className="w-full bg-transparent font-serif text-lg text-tx outline-none"
                />
              </div>
              {pledgeAmount && pledgeNum < MIN_PLEDGE && (
                <p className="mb-2 font-sans text-xs text-da">Minimum pledge is {fmtUsd(MIN_PLEDGE)}.</p>
              )}
              {pledgeError && <p className="mb-2 font-sans text-xs text-da">{pledgeError}</p>}
              <button
                type="button"
                onClick={handleJoinPool}
                disabled={pledgeNum < MIN_PLEDGE || pledging}
                className="w-full rounded-md border border-pu py-2 font-mono text-[10px] uppercase tracking-wider text-pu hover:bg-puXlight disabled:opacity-40"
              >
                {pledging ? 'Joining…' : 'Join the pool'}
              </button>
            </div>
          )}
        </div>
        <p className="mb-6 font-mono text-[9px] text-mu">
          A pool pledge signals intent, it isn&apos;t escrowed money. You still commit and pass KYC individually
          to turn your pledge into a real investment.
        </p>

        <Divider />

        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">What WAAW checked</p>
        <div className="mb-6 rounded-md border border-ln bg-card px-4">
          {[
            {
              label: 'Company registration on file',
              done: !!startup.registration_number,
              tag: 'Founder-reported' as const,
            },
            {
              label: 'Business address verified',
              done: startup.address_verified,
              tag: 'Verified by WAAW' as const,
            },
            {
              label: 'Team identity checks',
              done: team.length > 0 && team.every((m) => m.id_verified),
              tag: 'Verified by WAAW' as const,
            },
            {
              label: 'Financials shared',
              done: startup.active_users != null || startup.monthly_revenue != null || startup.prior_funding_raised != null,
              tag: 'Founder-reported' as const,
            },
            {
              label: 'Founder interview',
              done: !!startup.interview_scheduled_for,
              tag: startup.interview_requested ? (startup.interview_scheduled_for ? 'Scheduled' : 'Requested') : 'Not yet',
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-ln py-3 last:border-0">
              <span className="font-sans text-sm text-tx">{row.label}</span>
              <span className="flex items-center gap-2">
                <span className={`font-mono text-xs ${row.done ? 'text-su' : 'text-mu'}`}>{row.done ? '✓' : '○'}</span>
                <span
                  className={`rounded-sm px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider ${
                    row.tag === 'Verified by WAAW' ? 'bg-pu text-white' : 'bg-deeper text-mu'
                  }`}
                >
                  {row.tag}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mb-6 font-mono text-[9px] text-mu">
          This reflects what WAAW has checked so far, not a guarantee. See the{' '}
          <Link href={`/startups/${startup.id}/data-room`} className="text-pu hover:underline">data room</Link> for supporting documents.
        </p>

        <Divider />

        {team.length > 0 ? (
          <>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">Meet the team</p>
            {team.map((m, i) => (
              <div key={`${m.name}-${i}`} className="flex items-center justify-between border-b border-ln py-3 last:border-0">
                <div>
                  <p className="font-serif text-base italic text-tx">{m.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-mu">{m.role}</p>
                </div>
                {m.id_verified && (
                  <span className="rounded-sm bg-suLight px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-su">
                    ID verified
                  </span>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">About the founder</p>
            <p className="mb-1 font-serif text-lg italic text-tx">{startup.founder_name}</p>
            <p className="font-sans text-sm font-light text-mu">{startup.founder_bio}</p>
          </>
        )}

        {socialLinks.length > 0 && (
          <>
            <Divider />
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">Connect</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-pu px-3 py-1.5 font-mono text-[10px] text-pu hover:bg-puXlight"
                >
                  {l.platform} ↗
                </a>
              ))}
            </div>
          </>
        )}

        {startup.tags.length > 0 && (
          <>
            <Divider />
            <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-mu">Tags</p>
            <div className="flex flex-wrap gap-2">
              {startup.tags.map((t) => (
                <span key={t} className="rounded-sm border border-ln px-2 py-1 font-mono text-[9px] text-mu">{t}</span>
              ))}
            </div>
          </>
        )}

        <Divider />

        <Link
          href={`/startups/${startup.id}/data-room`}
          className="mb-3 block w-full rounded-md border border-ln py-3 text-center font-mono text-xs uppercase tracking-wider text-mu hover:border-pu hover:text-pu"
        >
          View data room · pitch deck, business plan & more →
        </Link>

        <button type="button" onClick={handleShare} className="w-full rounded-md border border-pu py-3 text-center font-mono text-xs uppercase tracking-wider text-pu hover:bg-puXlight">
          {shareCopied ? 'Link copied to clipboard!' : 'Share this deal ↗'}
        </button>

        <p className="mt-6 border-l-2 border-ln pl-4 font-mono text-[9px] uppercase tracking-wider text-mu">
          WAAW never asks you to transfer funds outside the escrow flow. All commitments are protected.
        </p>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-ln bg-tx/95 px-6 py-4">
        <div className="mx-auto max-w-3xl">
          {commitHref ? (
            <GoldButton href={commitHref}>{`Commit to invest in ${startup.name}`}</GoldButton>
          ) : (
            <p className="text-center font-mono text-xs uppercase tracking-wider text-white/70">
              Sign in with an investor account to commit capital.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
