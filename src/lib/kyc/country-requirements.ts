// Country-aware KYC requirements, keyed by ISO 3166-1 alpha-2 code. The
// wizard reads everything (which documents to ask for, whether a postcode
// is required, immigration questions for diaspora users) from this table
// rather than branching on country in the UI, so adding or changing a
// country's rules is a config change here, not a code change elsewhere.
//
// The exact accepted documents and required fields below are a reasonable
// starting point, not a compliance sign-off — they must be confirmed with
// an AML/compliance specialist per country before this gates real money,
// and they change over time as document formats and providers change.

export interface IdDocument {
  type: string;
  label: string;
  requiresBack: boolean;
}

export interface ImmigrationRequirements {
  statuses: string[];
  requiresDocument: boolean;
  documentHasBack: boolean;
  allowShareCodeAlternative?: boolean;
}

export interface CountryRequirements {
  idDocuments: IdDocument[];
  proofOfAddressRequired: boolean;
  postcode: {
    required: boolean;
    label: string;
    allowLocationCodeAlternative: boolean;
  };
  regionLabel: string;
  phoneDialingCode: string;
  nationalIdNumber?: {
    label: string;
    required: boolean;
  };
  // Requirements applied when a NON-national resides in this country (the
  // diaspora case) — asked in addition to, not instead of, the identity
  // document and address rules above.
  immigration: ImmigrationRequirements;
}

// A country with no configured immigration rules (i.e. WAAW doesn't yet
// operate there as a residence country for diaspora users) falls back to
// this — still asks for a document, since accepting a diaspora investor
// with literally no residency evidence isn't a safe default.
const DEFAULT_IMMIGRATION: ImmigrationRequirements = {
  statuses: ['Residence permit holder', 'Work permit holder', 'Other'],
  requiresDocument: true,
  documentHasBack: true,
};

export const DEFAULT_REQUIREMENTS: CountryRequirements = {
  idDocuments: [
    { type: 'passport', label: 'Passport', requiresBack: false },
    { type: 'national_id', label: 'National ID card', requiresBack: true },
  ],
  proofOfAddressRequired: false,
  postcode: { required: false, label: 'Postcode', allowLocationCodeAlternative: true },
  regionLabel: 'Region',
  phoneDialingCode: '+1',
  immigration: DEFAULT_IMMIGRATION,
};

export const COUNTRY_REQUIREMENTS: Record<string, CountryRequirements> = {
  NG: {
    idDocuments: [
      { type: 'nin_slip', label: 'NIN slip', requiresBack: false },
      { type: 'nin_card', label: 'National ID (NIN) card', requiresBack: true },
      { type: 'passport', label: 'Nigerian passport', requiresBack: false },
      { type: 'drivers_licence', label: "Driver's licence", requiresBack: true },
    ],
    proofOfAddressRequired: false,
    postcode: { required: false, label: 'Postcode', allowLocationCodeAlternative: true },
    regionLabel: 'State',
    phoneDialingCode: '+234',
    nationalIdNumber: { label: 'NIN or BVN', required: false },
    immigration: {
      statuses: ['CERPAC holder', 'Work permit holder', 'Other'],
      requiresDocument: true,
      documentHasBack: true,
    },
  },
  GH: {
    idDocuments: [
      { type: 'ghana_card', label: 'Ghana Card', requiresBack: true },
      { type: 'passport', label: 'Passport', requiresBack: false },
    ],
    proofOfAddressRequired: false,
    postcode: { required: false, label: 'Digital address (GhanaPostGPS)', allowLocationCodeAlternative: true },
    regionLabel: 'Region',
    phoneDialingCode: '+233',
    nationalIdNumber: { label: 'Ghana Card PIN', required: false },
    immigration: {
      statuses: ['Residence permit holder', 'Work permit holder', 'Other'],
      requiresDocument: true,
      documentHasBack: true,
    },
  },
  KE: {
    idDocuments: [
      { type: 'national_id', label: 'National ID', requiresBack: true },
      { type: 'passport', label: 'Passport', requiresBack: false },
    ],
    proofOfAddressRequired: false,
    postcode: { required: false, label: 'Postal code', allowLocationCodeAlternative: true },
    regionLabel: 'County',
    phoneDialingCode: '+254',
    immigration: {
      statuses: ['Residence permit holder', 'Work permit holder', 'Other'],
      requiresDocument: true,
      documentHasBack: true,
    },
  },
  GB: {
    idDocuments: [
      { type: 'passport', label: 'Passport', requiresBack: false },
      { type: 'drivers_licence', label: 'UK or EU driving licence', requiresBack: true },
      { type: 'brp', label: 'Biometric residence permit', requiresBack: true },
    ],
    proofOfAddressRequired: true,
    postcode: { required: true, label: 'Postcode', allowLocationCodeAlternative: false },
    regionLabel: 'County',
    phoneDialingCode: '+44',
    immigration: {
      statuses: [
        'Student',
        'Skilled Worker',
        'Health and Care Worker',
        'Family or Spouse',
        'Global Talent',
        'Graduate',
        'Indefinite Leave to Remain or Settled',
        'EU Settled Status',
        'Refugee or Asylum',
        'Other',
      ],
      requiresDocument: true,
      documentHasBack: true,
      allowShareCodeAlternative: true,
    },
  },
  US: {
    idDocuments: [
      { type: 'passport', label: 'Passport', requiresBack: false },
      { type: 'drivers_licence', label: "Driver's licence or state ID", requiresBack: true },
    ],
    proofOfAddressRequired: true,
    postcode: { required: true, label: 'ZIP code', allowLocationCodeAlternative: false },
    regionLabel: 'State',
    phoneDialingCode: '+1',
    immigration: {
      statuses: ['F-1 Student', 'J-1', 'H-1B', 'L-1', 'O-1', 'Permanent Resident (Green Card)', 'Other'],
      requiresDocument: true,
      documentHasBack: true,
    },
  },
};

export function getCountryRequirements(countryCode: string | null | undefined): CountryRequirements {
  if (!countryCode) return DEFAULT_REQUIREMENTS;
  return COUNTRY_REQUIREMENTS[countryCode.toUpperCase()] ?? DEFAULT_REQUIREMENTS;
}

// Immigration questions always follow the *residence* country's rules,
// regardless of which country the identity document itself is from — a
// Nigerian national living in the UK answers UK immigration questions.
export function getImmigrationRequirements(residenceCountryCode: string | null | undefined): ImmigrationRequirements {
  return getCountryRequirements(residenceCountryCode).immigration;
}

export const SUPPORTED_COUNTRIES: { code: string; name: string }[] = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'KE', name: 'Kenya' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
];
