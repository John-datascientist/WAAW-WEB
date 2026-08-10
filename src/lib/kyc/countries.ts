// A working set of countries for the nationality/residence selects — not
// the full ISO 3166-1 list, but enough to cover WAAW's current markets and
// the diaspora communities most likely to use the platform. Extend as
// needed; any code not in COUNTRY_REQUIREMENTS just falls back to
// DEFAULT_REQUIREMENTS, so adding a country here doesn't require adding
// its own requirements entry right away.
export const COUNTRIES: { code: string; name: string }[] = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'UG', name: 'Uganda' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'SN', name: 'Senegal' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'CM', name: 'Cameroon' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'AU', name: 'Australia' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'BB', name: 'Barbados' },
  { code: 'TT', name: 'Trinidad and Tobago' },
];
