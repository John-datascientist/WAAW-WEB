'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../lib/useInvestor';

const INVESTOR_LINKS = [
  { href: '/startups', label: 'Startups' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/learn', label: 'How WAAW Works' },
  { href: '/academy', label: 'Academy' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/account', label: 'Account' },
];

const FOUNDER_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/onboarding', label: 'Onboarding' },
  { href: '/learn', label: 'How WAAW Works' },
  { href: '/academy', label: 'Academy' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/account', label: 'Account' },
];

export function InvestorNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();
  const { unread } = useNotifications();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = profile?.role === 'founder' ? FOUNDER_LINKS : INVESTOR_LINKS;
  const homeHref = profile?.role === 'founder' ? '/dashboard' : '/startups';

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    router.push('/');
  };

  // The link row (Startups/Portfolio/Notifications/Account/Sign out, or the
  // signed-out pair) is too wide to fit a phone screen without wrapping —
  // it used to force horizontal overflow on every authenticated page. Below
  // `sm` it now collapses into a hamburger-triggered stacked menu instead.
  const linkClass = (active: boolean) =>
    `hover:text-pu ${active ? 'text-pu' : 'text-mu'}`;

  const navItems = () => (
    <>
      {/* This standalone link is only for the fully-signed-out case — a
          signed-in user already gets "Startups" from `links` below (it's
          the first entry in INVESTOR_LINKS). Gating this on `!profile`
          instead of `!user` meant it also rendered whenever someone was
          signed in but their profile hadn't loaded (or failed to), which
          is exactly the missing-profile-row state — showing "Startups"
          twice in the nav. */}
      {!user && (
        <>
          <Link
            href="/startups"
            onClick={() => setMenuOpen(false)}
            className={linkClass(!!pathname?.startsWith('/startups'))}
          >
            Startups
          </Link>
          <Link
            href="/learn"
            onClick={() => setMenuOpen(false)}
            className={linkClass(!!pathname?.startsWith('/learn'))}
          >
            How WAAW Works
          </Link>
          <Link
            href="/academy"
            onClick={() => setMenuOpen(false)}
            className={linkClass(!!pathname?.startsWith('/academy'))}
          >
            Academy
          </Link>
        </>
      )}
      {user ? (
        <>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`relative ${linkClass(!!pathname?.startsWith(l.href))}`}
            >
              {l.label}
              {l.href === '/notifications' && unread > 0 && (
                <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-ch px-1 text-[9px] text-tx">
                  {unread}
                </span>
              )}
            </Link>
          ))}
          <button type="button" onClick={handleSignOut} className="text-left text-mu hover:text-da">
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link href="/signin" onClick={() => setMenuOpen(false)} className="text-mu hover:text-pu">Sign in</Link>
          <Link href="/signup?role=investor" onClick={() => setMenuOpen(false)} className="text-pu">Get started</Link>
        </>
      )}
    </>
  );

  return (
    <header className="border-b border-ln bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={homeHref} className="font-serif text-xl font-semibold italic text-pu">WAAW</Link>

        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wider sm:flex">
          {navItems()}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center text-tx sm:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.6" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 3H17M1 9H17M1 15H17" stroke="currentColor" strokeWidth="1.6" /></svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-ln px-6 py-4 font-mono text-xs uppercase tracking-wider sm:hidden">
          {navItems()}
        </nav>
      )}
    </header>
  );
}
