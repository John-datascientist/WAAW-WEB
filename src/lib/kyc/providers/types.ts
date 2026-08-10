// Provider-agnostic verification adapter. A concrete provider (an
// African-focused document/ID service such as Smile Identity, or a global
// document-and-liveness provider such as Sumsub, Onfido, or Veriff) plugs
// in by implementing this interface — the submission pipeline only ever
// calls `verify()` and reacts to the normalised result, never anything
// provider-specific.

export type KycProviderResult = 'verified' | 'needs_review' | 'failed';

export interface KycProviderInput {
  profile: {
    id: string;
    full_legal_name: string | null;
    date_of_birth: string | null;
    nationality: string | null;
    country_of_residence: string | null;
    id_document_type: string | null;
  };
  documents: { doc_kind: string; storage_path: string }[];
}

export interface KycProviderOutput {
  result: KycProviderResult;
  providerName: string;
  providerReference: string | null;
  reason: string | null;
}

export interface KycProvider {
  name: string;
  verify(input: KycProviderInput): Promise<KycProviderOutput>;
}
