import Link from 'next/link';
import { HeroBanner } from '../src/components/HeroBanner';
import { FeaturedFounders } from '../src/components/FeaturedFounders';

export default function LandingPage() {
  return (
    <main>
      <HeroBanner />
      <FeaturedFounders />

      <section id="how-it-works" className="border-b border-ln bg-card px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">For investors</p>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">
              Browse verified deals, commit capital through protected escrow, and track your
              portfolio: right here on the website, or in the WAAW mobile app.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">For founders</p>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">
              Register and complete onboarding here on the website: business details, co-founder
              verification, documents, and your founder interview.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">After verification</p>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">
              Once a founder&apos;s onboarding is reviewed and verified, they can switch to the
              mobile app to monitor their listing, activity, and raise progress.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-mu">
          <span>© {new Date().getFullYear()} Workerholics Solutions Limited</span>
          <div className="flex gap-5">
            <Link href="/legal/terms" className="hover:text-pu">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-pu">Privacy</Link>
            <Link href="/legal/escrow-terms" className="hover:text-pu">Escrow</Link>
            <Link href="/legal/commission-terms" className="hover:text-pu">Commission</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
