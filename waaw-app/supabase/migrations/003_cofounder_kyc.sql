-- ─── Co-founder KYC fields (website onboarding) migration ───────────────────
-- Paste into: supabase.com → your project → SQL Editor → New query → Run.
--
-- The co-founder verification step previously only collected a selfie/ID
-- "done" toggle with no actual personal details behind it. This adds the
-- fields WAAW staff need to review a co-founder during the founder
-- interview: personal details, address (current + previous), education,
-- ID type/number, and the real uploaded selfie/ID document paths.

alter table public.waaw_cofounders
  add column if not exists date_of_birth date,
  add column if not exists phone text,
  add column if not exists nationality text,
  add column if not exists address_line text,
  add column if not exists previous_address text,
  add column if not exists education_level text,
  add column if not exists education_institution text,
  add column if not exists id_type text,
  add column if not exists id_number text,
  add column if not exists selfie_url text,
  add column if not exists id_document_url text;

alter table public.waaw_startups
  add column if not exists incorporation_cert_url text;

NOTIFY pgrst, 'reload schema';
