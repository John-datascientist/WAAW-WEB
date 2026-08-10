'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorBanner, Field, GoldButton } from '../../src/components/ui';
import { supabase } from '../../src/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // The reset-link email lands here with a recovery token in the URL;
    // supabase-js parses it and fires PASSWORD_RECOVERY once the recovery
    // session is actually usable — only then is updateUser allowed to
    // change the password. getSession covers the case where that already
    // happened before this listener was attached.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) { setError(error.message); return; }
    setDone(true);
    setTimeout(() => router.push('/signin'), 2000);
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/signin" className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
        ← Sign in
      </Link>
      <h1 className="mb-2 font-serif text-3xl text-tx">Set a new password</h1>

      {done ? (
        <p className="font-sans text-sm text-su">✓ Password updated. Redirecting to sign in…</p>
      ) : !ready ? (
        <p className="mb-8 font-sans text-sm font-light leading-relaxed text-mu">
          Open this page from the reset link in your email. If you just clicked it, this should
          update automatically in a moment.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <ErrorBanner message={error} />
          <Field label="New password" value={password} onChange={setPassword} placeholder="At least 8 characters" type="password" />
          <Field label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat password" type="password" />
          <GoldButton type="submit" disabled={submitting}>
            {submitting ? 'Updating…' : 'Update password'}
          </GoldButton>
        </form>
      )}
    </main>
  );
}
