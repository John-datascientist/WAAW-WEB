'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'investor' | 'founder';
  country: string | null;
  created_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, country: string) => Promise<{ error: string | null }>;
  verifySignup: (email: string, token: string) => Promise<{ error: string | null }>;
  resendSignupCode: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// The website only ever registers founders — investors use the mobile app —
// so role is hardcoded here rather than taken as a param like the app does.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('waaw_profiles').select('*').eq('id', userId).single();
    setProfile(data);
    setLoading(false);
  }

  async function signUp(email: string, password: string, fullName: string, country: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    if (data.user) {
      const referralCode = 'WAAW-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      await supabase.from('waaw_profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: 'founder',
        country,
        kyc_status: 'not_started',
        tier: 'bronze',
        total_committed: 0,
        referral_code: referralCode,
      });
    }
    return { error: null };
  }

  async function verifySignup(email: string, token: string) {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' });
    return { error: error?.message ?? null };
  }

  async function resendSignupCode(email: string) {
    await supabase.auth.resend({ type: 'signup', email });
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signUp, verifySignup, resendSignupCode, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
