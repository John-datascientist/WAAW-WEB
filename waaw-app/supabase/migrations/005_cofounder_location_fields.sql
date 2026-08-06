-- ─── Co-founder location fields migration ────────────────────────────────────
-- Paste into: supabase.com → your project → SQL Editor → New query → Run.

alter table public.waaw_cofounders
  add column if not exists current_city text,
  add column if not exists state_of_origin text,
  add column if not exists state_of_residence text,
  add column if not exists postcode text;

NOTIFY pgrst, 'reload schema';
