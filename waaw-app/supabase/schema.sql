-- ─── WAAW Supabase Schema ────────────────────────────────────────────────────
-- Paste this entire file into: supabase.com → your project → SQL Editor → New query → Run
--
-- All tables are prefixed with waaw_ so this schema is safe to run in a
-- Supabase project that already has unrelated tables from another app —
-- there is no name collision with anything not created by this file.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table public.waaw_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text check (role in ('investor', 'founder')) not null default 'investor',
  country text,
  kyc_status text check (kyc_status in ('not_started', 'pending', 'verified', 'rejected')) default 'not_started',
  tier text check (tier in ('bronze', 'silver', 'gold', 'platinum')) default 'bronze',
  total_committed numeric default 0,
  referral_code text unique,
  referred_by text,
  boost_active boolean default false,
  boost_expires_at timestamptz,
  created_at timestamptz default now()
);
alter table public.waaw_profiles enable row level security;
create policy "Users can view own profile" on public.waaw_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.waaw_profiles for update using (auth.uid() = id);

-- ─── STARTUPS ────────────────────────────────────────────────────────────────
create table public.waaw_startups (
  id uuid default uuid_generate_v4() primary key,
  founder_id uuid references public.waaw_profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,
  sector text not null,
  stage text not null,
  country text not null,
  city text not null,
  pitch text not null,
  raising_amount numeric not null,
  raised_amount numeric default 0,
  -- Negotiated with the founder after the interview, not known at self-serve
  -- registration time — nullable so the onboarding website can insert a
  -- draft row before those terms exist.
  equity_pct numeric,
  post_money_valuation numeric,
  verified boolean default false,
  fraud_score integer default 0,
  founder_name text,
  founder_bio text,
  tags text[] default '{}',
  boost_active boolean default false,
  registration_number text,
  address_line text,
  address_verified boolean default false,
  business_social_links jsonb default '[]'::jsonb,
  pitch_deck_url text,
  business_plan_url text,
  pitch_video_url text,
  interview_requested boolean default false,
  interview_scheduled_for timestamptz,
  onboarding_complete boolean default false,
  incorporation_cert_url text,
  registration_country text,
  cofounders_on_docs_confirmed boolean default false,
  bank_name text,
  bank_account_name text,
  bank_account_number text,
  bank_currency text,
  bank_proof_url text,
  active_users numeric,
  monthly_revenue numeric,
  prior_funding_raised numeric,
  proof_of_address_type text,
  proof_of_address_url text,
  created_at timestamptz default now()
);
alter table public.waaw_startups enable row level security;
-- Draft (unverified) rows are only visible to the founder who owns them;
-- everyone else only sees startups WAAW has verified.
create policy "Anyone can view verified startups" on public.waaw_startups for select using (verified = true or founder_id = auth.uid());
create policy "Founders can insert own startups" on public.waaw_startups for insert with check (auth.uid() = founder_id);
create policy "Founders can update own startups" on public.waaw_startups for update using (auth.uid() = founder_id);

-- ─── CO-FOUNDERS ─────────────────────────────────────────────────────────────
create table public.waaw_cofounders (
  id uuid default uuid_generate_v4() primary key,
  startup_id uuid references public.waaw_startups(id) on delete cascade,
  name text not null,
  role text not null,
  id_verified boolean default false,
  on_registration_docs boolean default false,
  selfie_done boolean default false,
  social_link text,
  date_of_birth date,
  phone text,
  nationality text,
  address_line text,
  previous_address text,
  education_level text,
  education_institution text,
  id_type text,
  id_number text,
  selfie_url text,
  id_document_url text,
  id_document_back_url text,
  work_history jsonb default '[]'::jsonb,
  reference_list jsonb default '[]'::jsonb,
  current_city text,
  state_of_origin text,
  state_of_residence text,
  postcode text,
  created_at timestamptz default now()
);
alter table public.waaw_cofounders enable row level security;
create policy "Anyone can view cofounders" on public.waaw_cofounders for select using (true);
create policy "Founders can manage cofounders" on public.waaw_cofounders for all using (
  exists (select 1 from public.waaw_startups s where s.id = startup_id and s.founder_id = auth.uid())
);

-- ─── COMMITMENTS ─────────────────────────────────────────────────────────────
create table public.waaw_commitments (
  id uuid default uuid_generate_v4() primary key,
  investor_id uuid references public.waaw_profiles(id) on delete cascade,
  startup_id uuid references public.waaw_startups(id) on delete cascade,
  amount numeric not null,
  currency text default 'USD',
  status text check (status in ('in_escrow', 'countersigned', 'released', 'refunded')) default 'in_escrow',
  reference text unique not null,
  waaw_fee numeric not null,
  net_to_founder numeric not null,
  created_at timestamptz default now()
);
alter table public.waaw_commitments enable row level security;
create policy "Investors see own commitments" on public.waaw_commitments for select using (auth.uid() = investor_id);
create policy "Founders see commitments to their startup" on public.waaw_commitments for select using (
  exists (select 1 from public.waaw_startups s where s.id = startup_id and s.founder_id = auth.uid())
);
create policy "Investors can insert commitments" on public.waaw_commitments for insert with check (auth.uid() = investor_id);

-- ─── WATCHLIST ───────────────────────────────────────────────────────────────
create table public.waaw_watchlist (
  id uuid default uuid_generate_v4() primary key,
  investor_id uuid references public.waaw_profiles(id) on delete cascade,
  startup_id uuid references public.waaw_startups(id) on delete cascade,
  created_at timestamptz default now(),
  unique(investor_id, startup_id)
);
alter table public.waaw_watchlist enable row level security;
create policy "Users manage own watchlist" on public.waaw_watchlist for all using (auth.uid() = investor_id);

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
create table public.waaw_notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.waaw_profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read boolean default false,
  type text check (type in ('commitment', 'escrow', 'kyc', 'general', 'syndicate')) default 'general',
  created_at timestamptz default now()
);
alter table public.waaw_notifications enable row level security;
create policy "Users see own notifications" on public.waaw_notifications for select using (auth.uid() = user_id);
create policy "Users update own notifications" on public.waaw_notifications for update using (auth.uid() = user_id);

-- ─── SYNDICATE MEMBERS ───────────────────────────────────────────────────────
create table public.waaw_syndicate_members (
  id uuid default uuid_generate_v4() primary key,
  startup_id uuid references public.waaw_startups(id) on delete cascade,
  investor_id uuid references public.waaw_profiles(id) on delete cascade,
  pledge_amount numeric not null,
  confirmed boolean default false,
  created_at timestamptz default now(),
  unique(startup_id, investor_id)
);
alter table public.waaw_syndicate_members enable row level security;
create policy "Anyone can view syndicate members" on public.waaw_syndicate_members for select using (true);
create policy "Investors manage own syndicate pledges" on public.waaw_syndicate_members for all using (auth.uid() = investor_id);

-- ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

-- Increment startup raised amount when commitment made
create or replace function waaw_increment_raised(startup_id uuid, amount numeric)
returns void language sql security definer as $$
  update public.waaw_startups
  set raised_amount = raised_amount + amount
  where id = startup_id;
$$;

-- Update investor tier based on total committed
create or replace function waaw_update_investor_tier(investor_id uuid, amount numeric)
returns void language plpgsql security definer as $$
declare
  new_total numeric;
  new_tier text;
begin
  update public.waaw_profiles
  set total_committed = total_committed + amount
  where id = investor_id
  returning total_committed into new_total;

  if new_total >= 50000 then new_tier := 'platinum';
  elsif new_total >= 10000 then new_tier := 'gold';
  elsif new_total >= 1000 then new_tier := 'silver';
  else new_tier := 'bronze';
  end if;

  update public.waaw_profiles set tier = new_tier where id = investor_id;
end;
$$;

-- Enable realtime for notifications
alter publication supabase_realtime add table public.waaw_notifications;
alter publication supabase_realtime add table public.waaw_commitments;

-- ─── STORAGE: founder-submitted documents (pitch deck, business plan, video) ─
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
