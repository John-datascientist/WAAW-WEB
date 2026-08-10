'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';
import { supabase } from '../../src/lib/supabase';
import { Field, GoldButton } from '../../src/components/ui';

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (typeof window !== 'undefined') window.localStorage.setItem('waaw-remember-me', String(rememberMe));
    const { error } = await signIn(email.trim(), password);
    if (error) { setSubmitting(false); setError(error); return; }

    const { data: authData } = await supabase.auth.getUser();
    let role: string | undefined;
    let profileLoadFailed = false;
    if (authData.user) {
      const { data: profileRow, error: profileError } = await supabase
        .from('waaw_profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();
      if (profileError) { console.error('WAAW sign-in profile fetch error:', profileError); profileLoadFailed = true; }
      role = profileRow?.role;
    }
    setSubmitting(false);

    // A failed/missing profile fetch used to fall straight into the founder
    // branch below (role stays undefined, which !== 'investor'), silently
    // treating "we don't know who you are" the same as "you're a founder" —
    // sending people to /onboarding with no explanation. Routing to /account
    // instead surfaces the real "couldn't load your account" state there.
    if (profileLoadFailed) {
      router.push('/account');
      return;
    }
    if (role === 'investor') {
      router.push('/startups');
      return;
    }
    // A founder who already started registering has a real waaw_startups
    // row — send them straight to their dashboard instead of back through
    // onboarding from scratch.
    if (authData.user) {
      const { data: startupRow } = await supabase.from('waaw_startups').select('id').eq('founder_id', authData.user.id).maybeSingle();
      router.push(startupRow ? '/dashboard' : '/onboarding');
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/" className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
        ← WAAW
      </Link>
      <h1 className="mb-2 font-serif text-3xl text-tx">Sign in</h1>
      <p className="mb-8 font-sans text-sm font-light leading-relaxed text-mu">
        Investors and founders both sign in here.
      </p>

      <form onSubmit={handleSubmit}>
        <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <Field label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" error={error ?? undefined} />

        <div className="mb-6 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 font-sans text-xs text-mu">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-pu"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-sans text-xs text-pu hover:underline">Forgot password?</Link>
        </div>

        <GoldButton type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </GoldButton>
      </form>

      <p className="mt-6 text-center font-sans text-sm text-mu">
        Not registered yet?{' '}
        <Link href="/signup" className="text-pu hover:underline">Create an account</Link>
      </p>
    </main>
  );
}
