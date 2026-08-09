export type AcademyTrack = 'foundations' | 'founder' | 'investor';

export interface AcademySection {
  heading: string;
  body: string[];
  list?: boolean;
}

export interface AcademyLesson {
  slug: string;
  title: string;
  teaser: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  readMins: number;
  order: number;
  sections: AcademySection[];
}

export interface AcademyCourse {
  slug: string;
  title: string;
  track: AcademyTrack;
  description: string;
  lessons: AcademyLesson[];
  /** Course exists in the roadmap (shown in the 3D hero) but has no
   * published lessons yet — shown as a disabled card rather than invented
   * content. */
  comingSoon?: boolean;
}

// Content supplied directly by the user for the Foundations course — all 6
// planned lessons. Reproduced verbatim from the source articles, just
// restructured into heading/body sections for rendering — nothing here is
// invented.
const FOUNDATIONS_LESSONS: AcademyLesson[] = [
  {
    slug: 'what-a-startup-is',
    title: 'What a Startup Is, and Why It Raises',
    teaser:
      'Before you can raise money or invest it, you need to know what a startup really is and why it needs outside capital in the first place.',
    level: 'Beginner',
    readMins: 6,
    order: 1,
    sections: [
      {
        heading: 'Startup or small business?',
        body: [
          'A neighbourhood restaurant and a food-delivery app can both be young and both be run by ambitious people, but they are different kinds of company. The restaurant aims to serve its area well and turn a steady profit. The delivery app aims to reach hundreds of thousands of customers, often losing money early in order to grow, in the hope of becoming far larger later.',
          'Neither is better. They simply need different fuel. A small business usually grows from its own revenue and perhaps a bank loan. A startup often needs money before it is profitable, because it is trying to grow faster than its early revenue allows.',
        ],
      },
      {
        heading: 'The growth curve, and why early losses are normal',
        body: [
          'Most startups spend more than they earn for a long time. They are buying growth, building a product, hiring, and reaching customers before the money comes back. This is deliberate. Investors expect it. The bet is that the company will grow large enough that early losses look small against later value.',
          'This is also why so many startups fail. Growing fast is hard, and buying growth with someone else’s money raises the stakes. Keep both truths in mind: the upside can be large, and the failure rate is high.',
        ],
      },
      {
        heading: 'Why founders raise capital',
        body: [
          'A founder raises money for a simple reason. The company needs more cash to grow than it currently produces. That cash pays for the team, the product, and reaching customers during the years before the business can stand on its own.',
          'Raising is not the only option, and it is not free. In exchange for capital, a founder usually gives away a share of ownership and takes on investors who expect growth. Later articles cover when raising makes sense and when it does not.',
        ],
      },
      {
        heading: 'Where WAAW fits',
        body: [
          'WAAW connects investors in the diaspora with early-stage, Black-founded startups, mostly building for African markets. Founders list a company and raise capital; investors review verified deals and commit through protected escrow. The rest of this Academy exists to help both sides do that well.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A startup is a young company built to grow quickly, which is why it often needs outside money before it is profitable.',
          'Early losses are normal and deliberate, not a sign of failure by themselves.',
          'Most startups still fail, so ambition and risk travel together.',
          'Founders raise capital to fund growth, and they pay for it with ownership.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Pick a startup you know or admire. In one short paragraph, describe what problem it solves, who for, and why it might need outside money to grow. Use the language from this article.',
        ],
      },
    ],
  },
  {
    slug: 'what-equity-actually-is',
    title: 'What Equity Actually Is',
    teaser: 'Equity is the heart of startup fundraising. Understand it well and everything else in the Academy becomes easier.',
    level: 'Beginner',
    readMins: 6,
    order: 2,
    sections: [
      {
        heading: 'Shares and ownership',
        body: [
          'A company’s ownership is divided into shares. If a company has issued 1,000,000 shares and you hold 100,000 of them, you own 10 percent of the company. Founders start out owning most or all of the shares. When they raise money, they create and sell new shares to investors, which is how investors come to own a slice.',
          'Ownership matters for two reasons. It decides who benefits if the company succeeds, and it can carry rights, such as a vote on big decisions. Not all shares are equal, and later articles look at the rights that come attached.',
        ],
      },
      {
        heading: 'The founder’s trade',
        body: [
          'Raising money by selling equity is a trade. The founder receives cash now and gives up a share of future ownership. If the company grows, that share can cost the founder a great deal in hindsight. If the company would have failed without the money, the trade was worth it.',
          'There is no single right answer. A founder who sells too much too early can lose control and most of the reward. A founder who refuses to sell any equity may never raise the money needed to grow. Judgement, not a formula, decides the balance.',
        ],
      },
      {
        heading: 'The cap table',
        body: [
          'A capitalisation table, or cap table, is simply the list of who owns what. It shows each shareholder and the number and percentage of shares they hold. Early on it might be two founders splitting the company. After a raise it adds the new investors and shows how everyone’s percentage has changed.',
          'Reading a cap table is a core skill for both founders and investors, because it answers the most important ownership questions at a glance. You will build one in your task below and return to cap tables throughout the Academy.',
        ],
      },
      {
        heading: 'Worth everything, or nothing',
        body: [
          'Startup equity is unusual. Shares in a large public company can be sold any day at a known price. Shares in an early-stage startup usually cannot be sold at all for years, and their value is uncertain until something happens, such as the company being bought or raising at a higher price.',
          'So equity can be worth everything and nothing at the same time: potentially very valuable one day, and impossible to turn into cash today. Hold that idea. It explains much of how startup investing works.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Equity is ownership, divided into shares.',
          'Founders raise money by creating and selling new shares, giving up a slice of ownership for cash.',
          'A cap table shows who owns what, and reading one is a core skill.',
          'Startup equity can be very valuable in the future yet impossible to sell today.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Using the provided template, build a simple cap table for an imaginary company with two founders who split ownership 60/40 across 1,000,000 shares. Then show what happens to their percentages if a new investor buys 250,000 newly created shares.',
        ],
      },
    ],
  },
  {
    slug: 'the-funding-lifecycle',
    title: 'The Funding Lifecycle',
    teaser: 'Startups raise money in stages, each with its own investors, amounts, and risk. Knowing the map helps you place any deal in context.',
    level: 'Beginner',
    readMins: 7,
    order: 3,
    sections: [
      {
        heading: 'The stages, in order',
        body: [
          'Bootstrapping is funding the company yourself, from savings or early revenue. No equity is sold, but growth is limited to what the business can pay for.',
          'Pre-seed is the first outside money, often small, used to turn an idea into something real. It usually comes from founders, friends and family, and early angels.',
          'Seed funds a company that has a product and early signs that people want it. Angels, syndicates, and crowdfunding investors are common here. This is where much diaspora and platform investing happens.',
          'Series A and beyond are larger rounds for companies with real traction, usually led by venture capital funds. Each later round is bigger and, in theory, less risky, because the company has proven more.',
        ],
      },
      {
        heading: 'Who funds each stage',
        body: [
          'Different investors suit different stages. Friends and family and angels take the earliest, riskiest bets with smaller cheques. Syndicates let several smaller investors pool into one. Crowdfunding platforms open early rounds to many investors at once. Venture capital funds write larger cheques into more proven companies.',
          'WAAW mostly serves the pre-seed and seed end of this map, where diaspora investors can back companies early, often with smaller amounts, alongside others.',
        ],
      },
      {
        heading: 'What an exit is',
        body: [
          'Investors make most of their money at an exit, the moment their shares finally turn into cash. The main routes are an acquisition, where a larger company buys the startup, and, far more rarely, an initial public offering, where the company lists on a stock market. Occasionally an investor sells their shares to another investor before then, called a secondary sale.',
          'Two things to remember about exits. They are uncertain, since many companies never reach one, and they are slow, often taking many years. Startup investing is patient money.',
        ],
      },
      {
        heading: 'Why the map matters',
        body: [
          'For a founder, knowing the lifecycle helps you raise the right amount from the right people at the right time. For an investor, it tells you how risky a deal is and what has to happen for you to see a return. A pre-seed company and a Series B company are completely different propositions, even in the same industry.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Startups raise in stages: bootstrapping, pre-seed, seed, then Series A and beyond.',
          'Each stage has typical investors and typical risk, falling as the company proves more.',
          'Investors mostly earn returns at an exit, which is uncertain and usually years away.',
          'WAAW mostly serves the early, higher-risk pre-seed and seed stages.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Take three companies you know, at different sizes, and place each on the funding lifecycle. For one of them, note what its next round might be and who might fund it.',
        ],
      },
    ],
  },
  {
    slug: 'the-language-of-fundraising',
    title: 'The Language of Fundraising',
    teaser: 'Fundraising has its own vocabulary. Learn the core terms now and the rest of the Academy will read easily.',
    level: 'Beginner',
    readMins: 7,
    order: 4,
    sections: [
      {
        heading: 'Valuation: pre-money and post-money',
        body: [
          'A valuation is what a company is agreed to be worth for the purposes of a round. Pre-money valuation is the value before new money comes in. Post-money valuation is the pre-money value plus the new money raised.',
          'A quick example. If a company is valued at 900,000 pre-money and raises 100,000, its post-money valuation is 1,000,000, and the new investor owns 100,000 divided by 1,000,000, or 10 percent. Those two numbers, pre and post, decide how much of the company an investor gets.',
        ],
      },
      {
        heading: 'Dilution',
        body: [
          'Dilution is the fall in your ownership percentage when the company issues new shares. If you own 10 percent and the company later sells more shares to new investors, your slice of the larger pie gets smaller, even though your number of shares has not changed. Dilution is normal across rounds; the aim is for the pie to grow faster than your slice shrinks.',
        ],
      },
      {
        heading: 'Runway and burn',
        body: [
          'Burn rate is how much cash a company spends each month beyond what it earns. Runway is how many months of cash the company has left at that burn rate. A company with 120,000 in the bank burning 10,000 a month has twelve months of runway. Founders raise to extend runway to the next milestone.',
        ],
      },
      {
        heading: 'The instruments',
        body: [
          'A **priced round** sets a valuation now and issues shares at that price.',
          'A **SAFE** (Simple Agreement for Future Equity) is a common early-stage instrument. An investor gives money now in exchange for shares later, when the next priced round sets a value. It delays the valuation question.',
          'A **convertible note** is similar to a SAFE but is structured as a loan that converts into shares, often with interest and a repayment date.',
        ],
      },
      {
        heading: 'Terms you will hear',
        body: [
          '**Lead investor:** the investor who sets the terms of a round and that others follow. **Option pool:** shares set aside to give future employees. **Liquidation preference:** the right of some investors to get their money back first if the company is sold. **Vesting:** earning shares over time, so founders and staff stay committed. **Pro-rata:** the right to invest again in future rounds to keep your percentage.',
          'Do not worry about mastering these yet. Each returns, with examples, in the founder and investor tracks.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Pre-money and post-money valuation decide how much of a company an investor gets.',
          'Dilution is the normal fall in your percentage as new shares are issued.',
          'Runway is how long the cash lasts; founders raise to reach the next milestone.',
          'SAFEs, convertible notes, and priced rounds are the common ways early money comes in.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Start a personal glossary sheet from the provided template. Add each term above in your own words, and add any new term you meet as you move through the Academy.',
        ],
      },
    ],
  },
  {
    slug: 'risk-reward-and-the-power-law',
    title: 'Risk, Reward, and the Power Law',
    teaser: 'Startup investing offers real rewards and real losses. This article is the honest one. Read it before you ever commit money.',
    level: 'Beginner',
    readMins: 7,
    order: 5,
    sections: [
      {
        heading: 'Most startups fail',
        body: [
          'The plain truth is that most early-stage companies do not succeed. Many return nothing to their investors. This is not a flaw in the system; it is the nature of backing young companies attempting hard things. Any investor who ignores this will eventually be hurt by it.',
        ],
      },
      {
        heading: 'The power law',
        body: [
          'Here is the pattern that makes startup investing work despite the failure rate. Returns are not spread evenly. In a group of startups, a small number of big winners can produce more value than all the others combined, while many return little or nothing. This is called the power law.',
          'The practical consequence is important. You cannot reliably pick the one winner in advance. Experienced investors therefore spread their money across several companies, expecting most to disappoint and a few to carry the whole portfolio. Betting everything on a single company is how people lose everything.',
        ],
      },
      {
        heading: 'Illiquidity',
        body: [
          'Illiquidity means you cannot easily turn your investment back into cash. There is usually no market to sell early-stage shares, and no guarantee anyone will buy them. You may hold an investment for many years, or forever. Only invest money you will not need in the meantime.',
        ],
      },
      {
        heading: 'Dilution over time',
        body: [
          'As a company raises more rounds, your ownership percentage falls unless you invest again. That can be fine if the company’s value grows faster than your slice shrinks, but it means your early percentage is not your final one. Expect it and factor it in.',
        ],
      },
      {
        heading: 'No safety net for losses',
        body: [
          'If a startup you back fails, no compensation scheme reimburses your investment loss. Protections that cover some other financial products do not cover poor startup performance. The money you put in is genuinely at risk.',
        ],
      },
      {
        heading: 'Investing sensibly anyway',
        body: [
          'None of this means avoid startup investing. It means approach it with clear eyes. Invest only what you can afford to lose. Spread across several companies rather than one. Treat it as a small, high-risk part of your wider finances. Be patient. These simple habits are what separate careful investors from hopeful ones.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Most startups fail, and that is normal.',
          'The power law means a few winners drive returns, so diversification matters more than picking one.',
          'Early-stage investments are illiquid; you may not get your money out for years.',
          'There is no compensation scheme for investment losses, so only invest what you can afford to lose.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Write a short personal risk statement: how much of your money, if any, you would be willing to put into startups, across how many companies, and over what time horizon. Compare it against the WAAW Risk Disclosure Statement.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'This article discusses financial loss and risk. WAAW Academy is educational and general. It is not investment, legal, or tax advice. If a deal ever pressures you to invest quickly or promises guaranteed returns, treat that as a warning sign.',
        ],
      },
    ],
  },
  {
    slug: 'the-african-and-diaspora-context',
    title: 'The African and Diaspora Context',
    teaser: 'WAAW exists for a specific reason. This article explains the market it serves and why it is different from the startup world you may read about elsewhere.',
    level: 'Beginner',
    readMins: 7,
    order: 6,
    sections: [
      {
        heading: 'The ecosystems',
        body: [
          'Nigeria, Ghana, and Kenya each have fast-growing startup scenes, strongest in areas like payments, logistics, commerce, and services that solve everyday problems for large populations. These markets have real challenges, including infrastructure and access to capital, and those challenges are also where the opportunities sit. A company solving a hard local problem well can reach an enormous number of people.',
        ],
      },
      {
        heading: 'Why diaspora capital matters',
        body: [
          'Africans abroad send large sums home every year, and many want to do more than send money. They want to invest in businesses building the future of the places they come from. That desire is powerful, but until recently it was hard to act on, because there was no trusted, structured way for someone in London or Toronto to back a verified startup in Lagos or Nairobi.',
          'That gap is what WAAW is built to close. Diaspora investors bring not only capital but also networks, skills, and market knowledge that founders value.',
        ],
      },
      {
        heading: 'Currency and cross-border realities',
        body: [
          'Investing across borders adds moving parts. Deals and payments on WAAW may involve several currencies, including US dollars, British pounds, Nigerian naira, Ghanaian cedi, and Kenyan shilling. Exchange rates move, and that movement can raise or lower the value of an investment or a return. Sending and receiving money across countries also involves local payment methods and rules. These are manageable, but they are real, and later articles cover them in detail.',
        ],
      },
      {
        heading: 'The regulators, briefly',
        body: [
          'Two sets of rules matter most here. In the United Kingdom, the Financial Conduct Authority regulates how investments can be promoted and who can invest in what. In Nigeria, the Securities and Exchange Commission regulates investment crowdfunding. These rules exist to protect investors. On WAAW you will meet them as steps such as confirming your investor category and acknowledging risk warnings. They are there for your benefit, not to slow you down.',
        ],
      },
      {
        heading: 'What verified and protected escrow mean',
        body: [
          'Two WAAW terms will recur. A verified deal is one that has passed the checks WAAW describes, which reduces some risks but never removes investment risk. Protected escrow means an investor’s money is held by a licensed third party and released only under agreed conditions, rather than handed straight to a founder. Both are trust features, and both have limits you should understand, which the investor track explains.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'WAAW serves African-market founders and diaspora investors, a context with its own opportunities and challenges.',
          'Diaspora capital brings money plus networks and knowledge, and WAAW gives it a trusted route.',
          'Cross-border investing adds currency and payment considerations that are real but manageable.',
          'UK and Nigerian rules, and WAAW’s verification and escrow, exist to protect investors, within limits.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'In your own words, write one opportunity and one risk of diaspora investing into African startups. Keep both to a sentence or two. You will revisit this as you go deeper into the tracks.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Regulation changes; always follow the current steps shown on the platform.',
        ],
      },
    ],
  },
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    slug: 'foundations',
    title: 'Foundations',
    track: 'foundations',
    description: 'Start here — what a startup is, what equity means, how funding rounds work, and the vocabulary that ties it together.',
    lessons: FOUNDATIONS_LESSONS,
  },
  {
    slug: 'how-to-raise',
    title: 'How to Raise',
    track: 'founder',
    description: 'Planning a round: how much to raise, at what valuation, and from whom.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'the-pitch-deck',
    title: 'The Pitch Deck',
    track: 'founder',
    description: 'Building the deck investors actually want to see.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'the-documents',
    title: 'The Documents',
    track: 'founder',
    description: 'Term sheets, cap tables, and the paperwork behind a raise.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'valuation',
    title: 'Valuation',
    track: 'founder',
    description: 'How early-stage companies get priced, and how to argue for yours.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'term-sheets',
    title: 'Term Sheets',
    track: 'founder',
    description: 'Reading the terms behind the headline number.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'how-to-invest',
    title: 'How to Invest',
    track: 'investor',
    description: 'From browsing a deal to committing capital through escrow.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'due-diligence',
    title: 'Due Diligence',
    track: 'investor',
    description: 'What to check on a deal before you commit, and where to find it.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'building-a-portfolio',
    title: 'Building a Portfolio',
    track: 'investor',
    description: 'Spreading risk across a portfolio of early-stage bets.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'seis-eis',
    title: 'SEIS / EIS',
    track: 'investor',
    description: 'UK tax relief schemes for early-stage investing, at a glance.',
    lessons: [],
    comingSoon: true,
  },
  {
    slug: 'syndicates',
    title: 'Syndicates',
    track: 'investor',
    description: 'Pooling capital with other investors to back a deal together.',
    lessons: [],
    comingSoon: true,
  },
];

export function findLesson(courseSlug: string, lessonSlug: string) {
  const course = ACADEMY_COURSES.find((c) => c.slug === courseSlug);
  if (!course) return null;
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { course, lesson };
}
