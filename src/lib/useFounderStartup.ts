'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useAuth } from '../context/AuthContext';

export interface StartupRow {
  id: string;
  founder_id: string;
  name: string;
  slug: string;
  sector: string;
  stage: string;
  country: string;
  city: string;
  pitch: string;
  raising_amount: number;
  registration_number: string | null;
  address_line: string | null;
  address_verified: boolean;
  business_social_links: { id: string; platform: string; url: string }[];
  pitch_deck_url: string | null;
  business_plan_url: string | null;
  pitch_video_url: string | null;
  interview_requested: boolean;
  interview_scheduled_for: string | null;
  onboarding_complete: boolean;
  verified: boolean;
}

export interface CofounderRow {
  id: string;
  startup_id: string;
  name: string;
  role: string;
  selfie_done: boolean;
  id_verified: boolean;
  social_link: string | null;
}

// The onboarding wizard fills in a real waaw_startups row a little at a time
// across steps, rather than needing every not-null column up front — this
// hook creates a minimal draft on first use and each step patches its own
// fields. The row stays verified=false (and so hidden from the investor
// listing, see useStartups in the Expo app) until WAAW reviews it.
export function useFounderStartup() {
  const { user, profile } = useAuth();
  const [startup, setStartup] = useState<StartupRow | null>(null);
  const [cofounders, setCofounders] = useState<CofounderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase.from('waaw_startups').select('*').eq('founder_id', user.id).maybeSingle();
    setStartup(data as StartupRow | null);
    if (data) {
      const { data: cf } = await supabase.from('waaw_cofounders').select('*').eq('startup_id', data.id).order('created_at');
      setCofounders((cf as CofounderRow[]) ?? []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { refetch(); }, [refetch]);

  async function ensureStartup(): Promise<StartupRow | null> {
    if (startup) return startup;
    if (!user) return null;
    const placeholderSlug = 'draft-' + Math.random().toString(36).slice(2, 10);
    const { data, error } = await supabase
      .from('waaw_startups')
      .insert({
        founder_id: user.id,
        name: '',
        slug: placeholderSlug,
        sector: '',
        stage: '',
        country: profile?.country ?? '',
        city: '',
        pitch: '',
        raising_amount: 0,
        verified: false,
      })
      .select()
      .single();
    if (error || !data) return null;
    const row = data as StartupRow;
    setStartup(row);
    // Seed the founder themselves as co-founder #1, matching how the
    // mobile app's onboarding pre-fills the first co-founder slot.
    await supabase.from('waaw_cofounders').insert({
      startup_id: row.id,
      name: profile?.full_name ?? '',
      role: 'Founder',
    });
    await refetch();
    return row;
  }

  async function updateStartup(patch: Partial<StartupRow>) {
    const row = await ensureStartup();
    if (!row) return { error: 'Not authenticated' };
    const { error } = await supabase.from('waaw_startups').update(patch).eq('id', row.id);
    if (!error) setStartup((prev) => (prev ? { ...prev, ...patch } : prev));
    return { error: error?.message ?? null };
  }

  async function addCofounder(name: string, role: string) {
    const row = await ensureStartup();
    if (!row) return { error: 'Not authenticated' };
    const { error } = await supabase.from('waaw_cofounders').insert({ startup_id: row.id, name, role });
    if (!error) await refetch();
    return { error: error?.message ?? null };
  }

  async function updateCofounder(id: string, patch: Partial<CofounderRow>) {
    const { error } = await supabase.from('waaw_cofounders').update(patch).eq('id', id);
    if (!error) await refetch();
    return { error: error?.message ?? null };
  }

  async function removeCofounder(id: string) {
    const { error } = await supabase.from('waaw_cofounders').delete().eq('id', id);
    if (!error) setCofounders((prev) => prev.filter((c) => c.id !== id));
    return { error: error?.message ?? null };
  }

  return { startup, cofounders, loading, refetch, ensureStartup, updateStartup, addCofounder, updateCofounder, removeCofounder };
}
