-- ─── Co-founder ID back-side migration ───────────────────────────────────────
-- Paste into: supabase.com → your project → SQL Editor → New query → Run.
--
-- Some ID types (driver's license, national ID) have information on both
-- sides; passport and voter's card don't. id_document_url now always means
-- "front" for two-sided IDs, with this new column for the back.

alter table public.waaw_cofounders
  add column if not exists id_document_back_url text;

NOTIFY pgrst, 'reload schema';
