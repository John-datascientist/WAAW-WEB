# WAAW Web — Founder registration & onboarding

Next.js (App Router) website for the WAAW platform. This is the **founder-only**
half of WAAW: investors sign up, browse deals, and invest exclusively in the
WAAW mobile app (Expo). This website exists so founders can register their
startup and complete onboarding from a browser, then switch to the mobile app
once WAAW has verified them.

Shares the same Supabase project/tables (`waaw_` prefixed) as the mobile app
in `waaw-app/` — see `waaw-app/supabase/schema.sql` and
`waaw-app/supabase/migrations/002_founder_onboarding.sql` for the schema this
site depends on. Run that migration before using this site if your Supabase
project already has the original schema applied.

## What's here

- `/` — marketing landing page
- `/signup`, `/verify`, `/signin` — founder auth (real Supabase auth, role
  hardcoded to `founder`)
- `/onboarding/*` — the onboarding wizard: business stage, co-founders,
  business social links, address, company verification, documents (pitch
  deck / business plan / pitch video, uploaded to Supabase Storage), and
  founder interview request
- `/legal/[slug]` — Terms, Privacy, Cookie policy, NDPC, Escrow terms,
  Commission disclosure

Each onboarding step writes directly to a real (initially `verified = false`)
row in `waaw_startups`/`waaw_cofounders` as the founder progresses — there's
no local/mock state here, unlike some of the mobile app's founder-side
screens which still use local-only data.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Supabase project URL
   and anon key (same project as `waaw-app`).
3. In Supabase's SQL editor, run `waaw-app/supabase/migrations/002_founder_onboarding.sql`
   if you haven't already (adds onboarding columns + the `waaw-founder-docs`
   storage bucket).
4. `npm run dev`

## Deploying to Vercel

- Framework preset: Next.js (auto-detected)
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  (Production + Preview)
