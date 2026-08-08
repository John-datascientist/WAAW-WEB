import { StartupRow, CofounderRow } from './useFounderStartup';
import { MIN_COFOUNDERS, ONBOARDING_STEPS } from '../data';

export function isStepDone(id: string, startup: StartupRow | null, cofounders: CofounderRow[]): boolean {
  if (!startup) return false;
  switch (id) {
    case 'stage':
      return !!startup.stage;
    case 'cofounders':
      return cofounders.length >= MIN_COFOUNDERS && cofounders.every((c) => c.selfie_done && c.id_verified && !!c.social_link);
    case 'social-links':
      return (startup.business_social_links ?? []).length > 0;
    case 'address':
      return startup.address_verified;
    case 'company':
      return !!startup.name && !!startup.sector && !!startup.pitch && startup.raising_amount > 0;
    case 'documents':
      return !!startup.pitch_deck_url && !!startup.business_plan_url && !!startup.pitch_video_url;
    case 'interview':
      return startup.interview_requested;
    default:
      return false;
  }
}

export function onboardingProgress(startup: StartupRow | null, cofounders: CofounderRow[]) {
  const doneCount = ONBOARDING_STEPS.filter((s) => isStepDone(s.id, startup, cofounders)).length;
  const pct = Math.round((doneCount / ONBOARDING_STEPS.length) * 100);
  return { doneCount, total: ONBOARDING_STEPS.length, pct };
}
