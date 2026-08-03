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
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    if (error) { setSubmitting(false); setError(error); return; }

    // Investors sign up through the mobile app, not here — catch anyone who
    // ends up on the website with an investor account and send them back
    // to the app instead of into a founder-only onboarding flow.
    const { data: authData } = await supabase.auth.getUser();
    if (authData.user) {
      const { data: profileRow } = await supabase.from('waaw_profiles').select('role').eq('id', authData.user.id).single();
      if (profileRow?.role === 'investor') {
        setSubmitting(false);
        setError('This account is an investor account — investing happens in the WAAW mobile app, not on the website.');
        await supabase.auth.signOut();
        return;
      }
    }
    setSubmitting(false);
    router.push('/onboarding');
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/" className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
        ← WAAW
      </Link>
      <h1 className="mb-2 font-serif text-3xl text-tx">Founder sign in</h1>
      <p className="mb-8 font-sans text-sm font-light leading-relaxed text-mu">
        Sign in to continue or check your onboarding status.
      </p>

      <form onSubmit={handleSubmit}>
        <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <Field label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" error={error ?? undefined} />
        <GoldButton type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </GoldButton>
      </form>

      <p className="mt-6 text-center font-sans text-sm text-mu">
        Not registered yet?{' '}
        <Link href="/signup" className="text-pu hover:underline">Register your startup</Link>
      </p>
    </main>
  );
}
