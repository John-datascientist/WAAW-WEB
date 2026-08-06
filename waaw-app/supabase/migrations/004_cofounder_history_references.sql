-- ─── Co-founder work history + references migration ─────────────────────────
-- Paste into: supabase.com → your project → SQL Editor → New query → Run.
--
-- Stored as jsonb arrays (same pattern as waaw_startups.business_social_links)
-- since both are variable-length lists of small structured entries, not
-- something that needs its own relational table.

alter table public.waaw_cofounders
  add column if not exists work_history jsonb default '[]'::jsonb,
  add column if not exists reference_list jsonb default '[]'::jsonb;

NOTIFY pgrst, 'reload schema';
