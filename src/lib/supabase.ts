import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// createClient throws synchronously if the URL is missing, which would
// otherwise crash the whole site into a blank page with nothing but a
// console error — falling back to a placeholder lets pages render a clear
// in-app configuration message instead (see ConfigError component).
export const isSupabaseConfigured = !!SUPABASE_URL && !!SUPABASE_ANON_KEY;

// "Remember me" on the sign-in form: when checked (the default — unset
// reads as remembered), the session is written to localStorage and
// survives closing the browser, same as before this existed. Unchecked,
// it's written to sessionStorage instead, so it's gone once the tab/
// browser closes. The flag itself must live in localStorage (not
// sessionStorage) so this adapter can still find it on a later visit.
const REMEMBER_ME_KEY = 'waaw-remember-me';

const authStorage =
  typeof window === 'undefined'
    ? undefined
    : {
        getItem: (key: string) => window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key),
        setItem: (key: string, value: string) => {
          const remember = window.localStorage.getItem(REMEMBER_ME_KEY) !== 'false';
          if (remember) {
            window.localStorage.setItem(key, value);
            window.sessionStorage.removeItem(key);
          } else {
            window.sessionStorage.setItem(key, value);
            window.localStorage.removeItem(key);
          }
        },
        removeItem: (key: string) => {
          window.localStorage.removeItem(key);
          window.sessionStorage.removeItem(key);
        },
      };

export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-anon-key',
  authStorage ? { auth: { storage: authStorage } } : undefined
);
