-- ─── Company verification expansion migration ────────────────────────────────
-- Paste into: supabase.com → your project → SQL Editor → New query → Run.

alter table public.waaw_startups
  add column if not exists registration_country text,
  add column if not exists cofounders_on_docs_confirmed boolean default false,
  add column if not exists bank_name text,
  add column if not exists bank_account_name text,
  add column if not exists bank_account_number text,
  add column if not exists bank_currency text,
  add column if not exists bank_proof_url text,
  add column if not exists active_users numeric,
  add column if not exists monthly_revenue numeric,
  add column if not exists prior_funding_raised numeric,
  add column if not exists proof_of_address_type text,
  add column if not exists proof_of_address_url text;

NOTIFY pgrst, 'reload schema';
