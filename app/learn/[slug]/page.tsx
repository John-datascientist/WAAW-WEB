import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InvestorNav } from '../../../src/components/InvestorNav';
import { BackButton } from '../../../src/components/ui';
import { LEARN_ARTICLES, type LearnAudience } from '../../../src/data/learnArticles';

const AUDIENCE_LABEL: Record<LearnAudience, string> = {
  investor: 'For investors',
  founder: 'For founders',
  both: 'For everyone',
};

export function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default function LearnArticlePage({ params }: { params: { slug: string } }) {
  const article = LEARN_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = LEARN_ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.audience === article.audience || a.audience === 'both' || article.audience === 'both')
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-bg">
      <InvestorNav />

      <div className="mx-auto max-w-2xl px-6 py-16">
        <BackButton fallbackHref="/learn" label="How WAAW Works" />

        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-sm bg-puXlight px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-pu">
            {AUDIENCE_LABEL[article.audience]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-mu">{article.readMins} min read</span>
        </div>
        <h1 className="mb-10 font-serif text-3xl text-tx">{article.title}</h1>

        <div className="space-y-8">
          {article.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="mb-2 font-sans text-sm font-semibold text-tx">{s.heading}</h2>
              <p className="font-sans text-sm font-light leading-relaxed text-mu">{s.body}</p>
            </div>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mt-14 border-t border-ln pt-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-pu">Related guides</p>
            <div className="space-y-3">
              {related.map((a) => (
                <Link key={a.slug} href={`/learn/${a.slug}`} className="block font-sans text-sm text-tx hover:text-pu">
                  {a.title} <span className="text-mu">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
