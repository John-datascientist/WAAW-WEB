import { supabase } from '../supabase';
import { activeKycProvider } from './providers';
import type { KycProfileRow, KycStatus } from './useKyc';

// The submission pipeline: record submission in the audit trail, run the
// active provider, record its result too, then land on the resulting
// status in a single write. With only the manual provider wired up, every
// submission lands in under_review for a human to look at — that's
// expected, not a bug.
//
// This deliberately does NOT write status: 'submitted' as an intermediate
// DB state before running the provider. The RLS update policy only lets a
// user change their own kyc profile while its *current* status is
// not_started/in_progress/resubmit_required — writing 'submitted' first
// would lock this same client out of the follow-up write that lands on
// under_review/resubmit_required, since 'submitted' isn't in that editable
// set. The 'submitted' audit event below still records when this ran.
export async function submitKyc(profile: KycProfileRow): Promise<{ error: string | null; status?: KycStatus }> {
  await supabase.from('waaw_kyc_reviews').insert({
    kyc_profile_id: profile.id,
    action: 'submitted',
    actor_id: profile.user_id,
  });

  const { data: docs } = await supabase
    .from('waaw_kyc_documents')
    .select('doc_kind, storage_path')
    .eq('kyc_profile_id', profile.id);

  const result = await activeKycProvider.verify({
    profile: {
      id: profile.user_id,
      full_legal_name: profile.full_legal_name,
      date_of_birth: profile.date_of_birth,
      nationality: profile.nationality,
      country_of_residence: profile.country_of_residence,
      id_document_type: profile.id_document_type,
    },
    documents: docs ?? [],
  });

  await supabase.from('waaw_kyc_reviews').insert({
    kyc_profile_id: profile.id,
    action: 'provider_result',
    actor_id: profile.user_id,
    notes: result.reason,
  });

  // A provider "verified" result still lands in under_review rather than
  // auto-approving — this platform gates real money, and every current
  // provider is the manual one anyway, so there's no live automated
  // verdict this trusts outright yet. Swap this once a real provider is
  // integrated and confirmed reliable enough to skip the human step.
  const nextStatus: KycStatus = result.result === 'failed' ? 'resubmit_required' : 'under_review';

  const { error } = await supabase
    .from('waaw_kyc_profiles')
    .update({
      status: nextStatus,
      submitted_at: new Date().toISOString(),
      provider: result.providerName,
      provider_reference: result.providerReference,
      rejection_reason: result.result === 'failed' ? result.reason : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profile.id);
  if (error) return { error: error.message };

  return { error: null, status: nextStatus };
}
