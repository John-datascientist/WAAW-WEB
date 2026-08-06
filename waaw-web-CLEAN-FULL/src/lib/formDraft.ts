// Keeps in-progress form input alive across an accidental page refresh —
// forms here are long enough (co-founder KYC especially) that losing
// everything to a refresh before hitting "Save" is a real cost. Drafts are
// local-only and cleared the moment the real save succeeds, so this never
// becomes a second source of truth once data actually reaches the DB.
const PREFIX = 'waaw-draft-';

export function loadDraft<T>(key: string): Partial<T> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as Partial<T>) : {};
  } catch {
    return {};
  }
}

export function saveDraft(key: string, data: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(data));
  } catch {
    // localStorage can throw in private-browsing modes with strict quotas —
    // losing draft persistence silently is fine, it's a convenience feature.
  }
}

export function clearDraft(key: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {}
}
