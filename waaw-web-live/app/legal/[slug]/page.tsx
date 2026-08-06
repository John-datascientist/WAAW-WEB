import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LEGAL_DOCS } from '../../../src/data';

export function generateStaticParams() {
  return Object.keys(LEGAL_DOCS).map((slug) => ({ slug }));
}

export default function LegalDocPage({ params }: { params: { slug: string } }) {
  const doc = LEGAL_DOCS[params.slug];
  if (!doc) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
        ← WAAW
      </Link>
      <h1 className="mb-1 font-serif text-3xl text-tx">{doc.title}</h1>
      <p className="mb-10 font-mono text-[10px] uppercase tracking-wider text-mu">Last updated {doc.updated}</p>
      <div className="space-y-8">
        {doc.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="mb-2 font-sans text-sm font-semibold text-tx">{s.heading}</h2>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">{s.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
