export type LearnAudience = 'investor' | 'founder' | 'both';

export interface LearnArticle {
  slug: string;
  title: string;
  audience: LearnAudience;
  summary: string;
  readMins: number;
  sections: { heading: string; body: string }[];
}

// Educational content explaining how WAAW's own mechanisms work (escrow,
// verification, categorisation, boosts, etc.) plus general fundraising/
// investing literacy. Not financial, legal, or tax advice — several
// articles say so explicitly where it matters, mirroring the same caution
// already applied to the legal docs and the investor categorisation flow.
export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'how-escrow-works',
    title: 'How escrow protects your commitment',
    audience: 'investor',
    summary: 'What actually happens to your money between committing and the deal closing.',
    readMins: 3,
    sections: [
      {
        heading: 'Your money doesn’t go straight to the founder',
        body: 'When you commit capital to a deal on WAAW, it moves into a protected escrow account, not directly to the startup. It stays there until the founder countersigns the term sheet for that raise.',
      },
      {
        heading: 'What releases the funds',
        body: 'Funds are released to the founder only after countersignature, minus WAAW’s 5% platform commission. You can see this breakdown on the commitment screen before you confirm.',
      },
      {
        heading: 'What happens if a raise falls through',
        body: 'If a raise doesn’t close (the founder withdraws, or the round doesn’t reach its terms), committed funds still sitting in escrow are returned. Your Portfolio page tracks refunded amounts separately from active and released commitments.',
      },
      {
        heading: 'Not investment advice',
        body: 'This explains the mechanics of the escrow flow, not whether any particular deal is a good investment. Early-stage investing carries real risk of loss, including total loss of capital.',
      },
    ],
  },
  {
    slug: 'verified-by-waaw',
    title: 'What "Verified by WAAW" actually means',
    audience: 'both',
    summary: 'The badge explained: what WAAW checks before a deal goes live, and what it doesn’t.',
    readMins: 2,
    sections: [
      {
        heading: 'Before a deal is listed',
        body: 'WAAW reviews a founder’s identity, company registration, and pitch before a startup appears publicly on the platform. A deal isn’t visible to investors until this review is complete.',
      },
      {
        heading: 'What it doesn’t mean',
        body: 'Verification is not an audit. Figures like monthly revenue, active users, or prior funding raised are founder-reported unless a deal’s data room specifically marks them as independently confirmed. Look for the "Founder-reported" vs "Verified by WAAW" tags on each deal’s data room.',
      },
      {
        heading: 'Why this distinction matters',
        body: 'Knowing which numbers WAAW has checked and which are self-reported lets you weigh a deal more accurately. Treat founder-reported figures as a starting point for your own diligence, not a guarantee.',
      },
    ],
  },
  {
    slug: 'equity-dilution',
    title: 'Understanding equity dilution',
    audience: 'investor',
    summary: 'Why the stake you buy today is unlikely to be the stake you hold at exit.',
    readMins: 4,
    sections: [
      {
        heading: 'The basic idea',
        body: 'When a startup raises a future round, it issues new shares to new investors. Your existing shares stay the same in number, but now represent a smaller percentage of a larger total. That’s dilution.',
      },
      {
        heading: 'Why it’s normal, not a red flag',
        body: 'Most successful startups raise multiple rounds. Dilution is the expected cost of a company growing and raising the capital it needs to get there. The goal is for your smaller slice to be worth more in absolute terms as the company’s valuation grows.',
      },
      {
        heading: 'Estimating it yourself',
        body: 'On any deal page, the stake calculator has a "show illustrative diluted stake" option. It applies a simple flat assumption for one future round so you can see roughly how a stake might shrink, not a prediction of what will actually happen.',
      },
    ],
  },
  {
    slug: 'investor-categories-explained',
    title: 'Investor categories, explained',
    audience: 'investor',
    summary: 'Why WAAW asks you to self-certify a category before you can invest, and what each one means.',
    readMins: 3,
    sections: [
      {
        heading: 'Why this step exists',
        body: 'Investing in unlisted, early-stage companies carries a higher risk of loss than most public investments. Before you can commit to a deal, WAAW asks you to confirm which investor category best describes you. This is a self-certification, not something WAAW verifies on your behalf.',
      },
      {
        heading: 'The categories',
        body: 'Restricted investor, high net worth, self-certified sophisticated, certified sophisticated, and professional. Each has a different description of financial circumstances or experience. You pick the one that honestly applies to you when you certify.',
      },
      {
        heading: 'It expires',
        body: 'Your certification is valid for 12 months from when you confirm it, then WAAW asks you to re-certify. Your circumstances (or the rules) may have changed.',
      },
      {
        heading: 'Not financial or legal advice',
        body: 'This page explains what the categorisation step does mechanically. It isn’t guidance on which category applies to you. Read each description carefully and, if you’re unsure, speak to an independent financial adviser before certifying.',
      },
    ],
  },
  {
    slug: 'reading-a-data-room',
    title: 'Reading a startup’s data room',
    audience: 'investor',
    summary: 'What’s in there, why you have to accept an NDA first, and how to weigh what you find.',
    readMins: 3,
    sections: [
      {
        heading: 'Why the NDA gate',
        body: 'A deal’s data room holds documents the founder doesn’t want public: incorporation certificates, pitch decks, business plans. Accepting the NDA before viewing keeps that information between you and the founder.',
      },
      {
        heading: 'What’s usually inside',
        body: 'Registration documents, a pitch deck and/or video, a business plan, and key numbers like active users, monthly revenue, and prior funding raised.',
      },
      {
        heading: 'The "What WAAW checked" scorecard',
        body: 'Each deal page also shows a due-diligence scorecard: registration on file, business address verified, team identity checks, financials shared, founder interview completed. It’s a quick way to see how far a deal’s review has gone, not a pass/fail score.',
      },
    ],
  },
  {
    slug: 'preparing-your-pitch',
    title: 'Preparing your pitch deck and business plan',
    audience: 'founder',
    summary: 'What investors are actually looking for in the documents you upload during onboarding.',
    readMins: 4,
    sections: [
      {
        heading: 'Keep the deck short',
        body: 'Most investors skim a pitch deck in a few minutes. Aim for 10–15 slides: problem, solution, market, traction, team, and the ask (how much you’re raising and what it’s for).',
      },
      {
        heading: 'Lead with traction if you have it',
        body: 'Active users, monthly revenue, and prior funding raised are exactly the fields WAAW asks for during onboarding. They’re some of the first numbers investors look at, so keep them current.',
      },
      {
        heading: 'The business plan can go deeper',
        body: 'Where the deck is the highlight reel, your business plan document is where you explain the model, competitive landscape, and financial projections in more detail. This is what investors read after a deck gets their attention.',
      },
      {
        heading: 'A pitch video helps',
        body: 'If you upload a short pitch video, it appears directly on your deal page. A founder speaking for 60–90 seconds often builds more trust than another slide of text.',
      },
    ],
  },
  {
    slug: 'founder-interview',
    title: 'What happens during your founder interview',
    audience: 'founder',
    summary: 'Why WAAW schedules a call before your listing goes live, and how to prepare.',
    readMins: 2,
    sections: [
      {
        heading: 'Part of getting verified',
        body: 'Before your startup is listed publicly, WAAW schedules a short interview with you as part of reviewing your identity, company registration, and pitch. The same review the "Verified by WAAW" badge reflects.',
      },
      {
        heading: 'What to have ready',
        body: 'Be ready to walk through your business in your own words: what problem you’re solving, why now, and how the round you’re raising moves you forward. Have your registration documents and cap table on hand in case questions come up.',
      },
      {
        heading: 'After the interview',
        body: 'Your onboarding status page shows the scheduled date and updates once the review is complete. That’s when your listing goes live to investors.',
      },
    ],
  },
  {
    slug: 'boosting-your-profile',
    title: 'Boosting your profile: what it does',
    audience: 'founder',
    summary: 'What a profile boost actually changes, and how long it lasts.',
    readMins: 2,
    sections: [
      {
        heading: 'What changes',
        body: 'A boost gives your listing extra visibility: boosted startups are eligible for the "Featured Founders" spotlight on the WAAW homepage, in addition to wherever they’d normally rank in the startup browse list.',
      },
      {
        heading: 'How long it lasts',
        body: 'A boost runs for a fixed period from when you purchase it. Your dashboard shows the countdown, and you can stack another boost period on top before the current one expires.',
      },
      {
        heading: 'What it doesn’t change',
        body: 'A boost affects visibility only. It has no effect on your verification status, and it doesn’t change any of the figures or documents in your data room.',
      },
    ],
  },
  {
    slug: 'kyc-identity-verification',
    title: 'KYC and identity verification, explained',
    audience: 'both',
    summary: 'Why WAAW asks for ID from investors, founders, and co-founders, and what it involves.',
    readMins: 3,
    sections: [
      {
        heading: 'Why it’s required',
        body: 'KYC (Know Your Customer) checks are standard for platforms that move investment capital. They help confirm that the people on both sides of a deal are who they say they are.',
      },
      {
        heading: 'For investors',
        body: 'You’ll complete identity verification before you can commit capital to a deal. Your account’s KYC status is visible from your profile, and progresses as each step is completed.',
      },
      {
        heading: 'For founders and co-founders',
        body: 'Founders verify their identity as part of onboarding. Co-founders complete their own identity check separately. Each verified co-founder shows an "ID verified" badge next to their name on the deal page.',
      },
    ],
  },
  {
    slug: 'setting-your-raise',
    title: 'Setting your raise: equity, valuation, and amount',
    audience: 'founder',
    summary: 'How the numbers you enter during onboarding relate to each other.',
    readMins: 4,
    sections: [
      {
        heading: 'The three numbers you set',
        body: 'When you list your raise, you set how much you’re raising, what percentage of equity you’re offering for it, and your company’s valuation. The three are linked: raise amount ÷ equity percentage gives your implied post-money valuation.',
      },
      {
        heading: 'Why investors check this math',
        body: 'On your deal page, investors see a calculator that shows roughly what stake their commitment would buy, based on these numbers. Keeping your raise amount, equity percentage, and valuation consistent avoids confusing (or worse, deterring) investors doing this same check themselves.',
      },
      {
        heading: 'There’s no universal "right" valuation',
        body: 'Early-stage valuations are set by negotiation and comparable deals in your sector and stage, not a formula. If you’re unsure where to land, it’s worth researching recent raises by similar startups before you set your numbers.',
      },
    ],
  },
];

export function learnArticlesFor(audience: LearnAudience | 'all'): LearnArticle[] {
  if (audience === 'all') return LEARN_ARTICLES;
  return LEARN_ARTICLES.filter((a) => a.audience === audience || a.audience === 'both');
}
