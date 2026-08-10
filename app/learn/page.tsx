'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InvestorNav } from '../../src/components/InvestorNav';
import { Chip } from '../../src/components/ui';
import { LEARN_ARTICLES, learnArticlesFor, type LearnAudience } from '../../src/data/learnArticles';

const FILTERS: { key: LearnAudience | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'investor', label: 'For investors' },
  { key: 'founder', label: 'For founders' },
];

const AUDIENCE_LABEL: Record<LearnAudience, string> = {
  investor: 'Investors',
  founder: 'Founders',
  both: 'Everyone',
};

export default function LearnHubPage() {
  const [filter, setFilter] = useState<LearnAudience | 'all'>('all');
  const articles = learnArticlesFor(filter);

  return (
    <main className="min-h-screen bg-bg">
      <InvestorNav />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">How WAAW Works</p>
        <h1 className="mb-3 font-serif text-3xl text-tx">How WAAW Works</h1>
        <p className="mb-8 max-w-xl font-sans text-sm font-light leading-relaxed text-mu">
          Short guides for investors and founders: how escrow and verification work, how to read
          a data room, how to prepare a raise, and more. General information, not financial, legal,
          or tax advice.
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Chip key={f.key} label={f.label} active={filter === f.key} onClick={() => setFilter(f.key)} />
          ))}
        </div>

        <div className="space-y-4">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}`}
              className="block rounded-lg border border-ln bg-card p-5 transition-colors hover:border-pu3"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-sm bg-puXlight px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-pu">
                  {AUDIENCE_LABEL[a.audience]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-mu">{a.readMins} min read</span>
              </div>
              <h2 className="mb-1 font-sans text-base font-medium text-tx">{a.title}</h2>
              <p className="font-sans text-sm font-light leading-relaxed text-mu">{a.summary}</p>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="font-sans text-sm text-mu">No guides in this category yet.</p>
        )}

        <p className="mt-10 font-mono text-[10px] uppercase tracking-wider text-mu">
          {LEARN_ARTICLES.length} guides
        </p>
      </div>
    </main>
  );
}
