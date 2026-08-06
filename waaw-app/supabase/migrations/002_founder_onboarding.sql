-- ─── Founder onboarding (website) migration ─────────────────────────────────
-- Paste into: supabase.com → your project → SQL Editor → New query → Run.
-- Safe to run once against the schema.sql already applied to this project.
--
-- Why: the founder onboarding wizard (now a real Next.js website, not a
-- local-only mock) needs somewhere to persist each step's progress, and
-- equity_pct/post_money_valuation are terms WAAW negotiates with the founder
-- *after* the interview — a founder self-registering has no way to know
-- them yet, so those two columns can no longer be not-null at insert time.

alter table public.waaw_startups
  alter column equity_pct drop not null,
  alter column post_money_valuation drop not null,
  add column if not exists registration_number text,
  add column if not exists address_line text,
  add column if not exists address_verified boolean default false,
  add column if not exists business_social_links jsonb default '[]'::jsonb,
  add column if not exists pitch_deck_url text,
  add column if not exists business_plan_url text,
  add column if not exists pitch_video_url text,
  add column if not exists interview_requested boolean default false,
  add column if not exists interview_scheduled_for timestamptz,
  add column if not exists onboarding_complete boolean default false;

alter table public.waaw_cofounders
  add column if not exists selfie_done boolean default false,
  add column if not exists social_link text;

-- The original "select using (true)" policy let anyone read every startup
-- row regardless of verified status — harmless while onboarding was
-- local-only, but not once real (unverified) draft rows exist. Founders
-- still need to read their own in-progress draft; nobody else should.
drop policy if exists "Anyone can view verified startups" on public.waaw_startups;
create policy "Anyone can view verified startups" on public.waaw_startups
  for select using (verified = true or founder_id = auth.uid());

-- ─── Storage: founder-submitted documents (pitch deck, business plan, video) ─
insert into storage.buckets (id, name, public)
values ('waaw-founder-docs', 'waaw-founder-docs', false)
on conflict (id) do nothing;

create policy "Founders can upload own documents"
  on storage.objects for insert
  with check (bucket_id = 'waaw-founder-docs' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Founders can view own documents"
  on storage.objects for select
  using (bucket_id = 'waaw-founder-docs' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Founders can replace own documents"
  on storage.objects for update
  using (bucket_id = 'waaw-founder-docs' and (storage.foldername(name))[1] = auth.uid()::text);
