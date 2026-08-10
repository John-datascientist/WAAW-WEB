import { supabase } from '../supabase';

// Not wired into the commit flow yet — see supabase/014b_enforce_kyc_gate.sql
// (delivered alongside this, not yet applied) for the real server-side
// enforcement this is meant to back. Today the commit flow still checks
// waaw_profiles.kyc_status, which an approval in this system keeps in
// sync with, so this helper is ready to use once that stricter gate is
// turned on.
export async function isKycApproved(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('waaw_kyc_profiles')
    .select('status, visa_or_permit_expiry')
    .eq('user_id', userId)
    .maybeSingle();
  if (!data || data.status !== 'approved') return false;
  if (data.visa_or_permit_expiry && new Date(data.visa_or_permit_expiry) < new Date()) return false;
  return true;
}
