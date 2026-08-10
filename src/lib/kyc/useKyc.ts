'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../supabase';

export type KycStatus =
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'resubmit_required';

export interface KycProfileRow {
  id: string;
  user_id: string;
  status: KycStatus;
  full_legal_name: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  country_of_residence: string | null;
  is_non_national: boolean;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  region: string | null;
  postcode: string | null;
  address_country: string | null;
  location_code: string | null;
  phone_e164: string | null;
  phone_verified: boolean;
  id_document_type: string | null;
  id_document_reference: string | null;
  immigration_status: string | null;
  immigration_document_type: string | null;
  visa_or_permit_expiry: string | null;
  source_of_funds: string | null;
  provider: string | null;
  provider_reference: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
  reviewer_id: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export type KycDocKind =
  | 'id_front'
  | 'id_back'
  | 'proof_of_address'
  | 'immigration_document_front'
  | 'immigration_document_back'
  | 'selfie';

export interface KycDocumentRow {
  id: string;
  kyc_profile_id: string;
  doc_kind: KycDocKind;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_at: string;
}

const EDITABLE_STATUSES: KycStatus[] = ['not_started', 'in_progress', 'resubmit_required'];
export const isKycEditable = (status: KycStatus) => EDITABLE_STATUSES.includes(status);

export function useKycProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<KycProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreate = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    const { data } = await supabase.from('waaw_kyc_profiles').select('*').eq('user_id', user.id).maybeSingle();
    if (data) {
      setProfile(data as KycProfileRow);
      setLoading(false);
      return;
    }
    const { data: created, error } = await supabase
      .from('waaw_kyc_profiles')
      .insert({ user_id: user.id, status: 'in_progress' })
      .select()
      .single();
    if (!error) setProfile(created as KycProfileRow);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchOrCreate();
  }, [fetchOrCreate]);

  const updateProfile = useCallback(
    async (patch: Partial<KycProfileRow>) => {
      if (!profile) return { error: 'No KYC profile loaded yet.' };
      const { data, error } = await supabase
        .from('waaw_kyc_profiles')
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq('id', profile.id)
        .select()
        .single();
      if (!error) setProfile(data as KycProfileRow);
      return { error: error?.message ?? null };
    },
    [profile]
  );

  return { profile, loading, updateProfile, refetch: fetchOrCreate };
}

export const KYC_MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export function useKycDocuments(kycProfileId: string | undefined) {
  const [documents, setDocuments] = useState<KycDocumentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = useCallback(async () => {
    if (!kycProfileId) { setLoading(false); return; }
    const { data } = await supabase.from('waaw_kyc_documents').select('*').eq('kyc_profile_id', kycProfileId);
    setDocuments((data as KycDocumentRow[]) ?? []);
    setLoading(false);
  }, [kycProfileId]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const uploadDocument = useCallback(
    async (userId: string, docKind: KycDocKind, file: File) => {
      if (!kycProfileId) return { error: 'No KYC profile yet.' };
      if (!ACCEPTED_MIME_TYPES.includes(file.type)) return { error: 'Only JPG, PNG, or PDF files are accepted.' };
      if (file.size > KYC_MAX_FILE_BYTES) return { error: 'File is larger than 10 MB.' };

      const ext = file.name.split('.').pop() || 'bin';
      const path = `${userId}/${docKind}-${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('kyc-documents').upload(path, file, {
        contentType: file.type,
      });
      if (uploadError) return { error: uploadError.message };

      // Replace any earlier upload of the same kind so a resubmission
      // doesn't leave a stale duplicate sitting in storage and the table.
      const existing = documents.find((d) => d.doc_kind === docKind);
      if (existing) {
        await supabase.storage.from('kyc-documents').remove([existing.storage_path]);
        await supabase.from('waaw_kyc_documents').delete().eq('id', existing.id);
      }

      const { error: insertError } = await supabase.from('waaw_kyc_documents').insert({
        kyc_profile_id: kycProfileId,
        doc_kind: docKind,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
      });
      if (insertError) return { error: insertError.message };
      await fetchDocs();
      return { error: null };
    },
    [kycProfileId, documents, fetchDocs]
  );

  const docFor = useCallback((docKind: KycDocKind) => documents.find((d) => d.doc_kind === docKind) ?? null, [documents]);

  return { documents, loading, uploadDocument, docFor, refetch: fetchDocs };
}
