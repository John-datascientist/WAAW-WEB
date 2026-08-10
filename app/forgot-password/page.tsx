'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ErrorBanner, Field, GoldButton } from '../../src/components/ui';
import { supabase } from '../../src/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined,
    });
    setSubmitting(false);
    // Not revealing whether the address is registered is deliberate — the
    // same confirmation shows either way, so this can't be used to probe
    // which emails have WAAW accounts.
    if (error) { setError(error.message); return; }
    setSent(true);
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/signin" className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-mu hover:text-pu">
        ← Sign in
      </Link>
      <h1 className="mb-2 font-serif text-3xl text-tx">Reset your password</h1>
      <p className="mb-8 font-sans text-sm font-light leading-relaxed text-mu">
        Enter the email on your account and we&apos;ll send you a link to reset your password.
      </p>

      {sent ? (
        <p className="font-sans text-sm text-su">
          ✓ If an account exists for {email.trim()}, a reset link is on its way. Check your inbox (and spam folder).
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <ErrorBanner message={error} />
          <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
          <GoldButton type="submit" disabled={submitting || !email.trim()}>
            {submitting ? 'Sending…' : 'Send reset link'}
          </GoldButton>
        </form>
      )}
    </main>
  );
}
