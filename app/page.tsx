import Link from 'next/link';
import { GoldButton, GhostButton } from '../src/components/ui';

export default function LandingPage() {
  return (
    <main>
      <header className="border-b border-ln bg-card px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-serif text-xl text-pu">WAAW</span>
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-mu">
            <Link href="/legal/terms" className="hover:text-pu">Legal</Link>
            <Link href="/signin" className="hover:text-pu">Founder sign in</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ch">We Are All We&apos;ve Got</p>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-tx sm:text-5xl">
          Raise capital from Black diaspora investors.
        </h1>
        <p className="mx-auto mb-10 max-w-xl font-sans text-base font-light leading-relaxed text-mu">
          WAAW connects Black diaspora investors with verified, early-stage Black-founded startups.
          Every deal is reviewed before it appears on the platform, and every commitment moves
          through protected escrow.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GoldButton href="/signup">Register your startup</GoldButton>
          <GhostButton href="/signin">Founder sign in</GhostButton>
        </div>
      </section>

      <section className="border-y border-ln bg-card px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">For founders</p>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">
              Register and complete onboarding here on the website — business details, co-founder
              verification, documents, and your founder interview.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">For investors</p>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">
              Browse deals, commit capital, and track your portfolio in the WAAW mobile app for iOS
              and Android.
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pu">After verification</p>
            <p className="font-sans text-sm font-light leading-relaxed text-mu">
              Once your onboarding is reviewed and verified, switch to the mobile app to monitor
              your listing, activity, and raise progress.
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
