import { supabase } from './supabase';

export type DocumentKind =
  | 'pitch-deck'
  | 'business-plan'
  | 'pitch-video'
  | 'incorporation-cert'
  | 'cofounder-selfie'
  | 'cofounder-id';

// The waaw-founder-docs bucket is private (RLS-gated to the uploading
// founder), so what's stored in e.g. pitch_deck_url is a storage *path*,
// not a public URL — WAAW staff generate a signed URL to review it.
export async function uploadFounderDocument(userId: string, file: File, kind: DocumentKind) {
  const path = `${userId}/${kind}-${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('waaw-founder-docs').upload(path, file, { upsert: true });
  if (error) return { path: null, error: error.message };
  return { path, error: null };
}
