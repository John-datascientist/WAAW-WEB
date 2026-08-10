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
  /** Diagram shown under the teaser, e.g. a supplied SVG under public/academy/. */
  image?: { src: string; alt: string };
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
  /** Open to everyone, never gated behind another course's completion. */
  free?: boolean;
  /** Self-contained hero page (served from public/) shown above lesson 1 only. */
  heroUrl?: string;
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

const HOW_TO_RAISE_LESSONS: AcademyLesson[] = [
  {
    slug: 'deciding-whether-to-raise',
    title: 'Deciding Whether to Raise',
    teaser: 'Raising money is a choice, not a requirement. This lesson helps you decide whether equity is the right fuel for your company before you spend months pursuing it.',
    level: 'Beginner',
    readMins: 6,
    order: 1,
    sections: [
      {
        heading: 'The four ways to fund a company',
        body: [
          'There are four common sources of money, and most companies use a mix of them.',
          'Revenue is money from customers. It is the healthiest source because it comes with no strings attached, though it can be slow to build.',
          'Debt is borrowed money you repay with interest. You keep all of your ownership, but you have to repay whether the business does well or badly, which is risky for a young company with little cash.',
          'Grants are money you neither repay nor give ownership for. They are excellent when you can get them, but they tend to be competitive and slow.',
          'Equity is selling a share of your company for cash you never repay. It suits businesses that need money before they are profitable and that can grow large enough to reward the people who invest.',
        ],
      },
      {
        heading: 'Is your business a fit for equity?',
        body: [
          'Equity investors look for companies that can become much bigger than they are today. That usually means a large market, a product that can grow without its costs rising just as fast, and a believable route to a future sale or listing. A steady, profitable business that will never be huge can be a fine company and still a poor fit for equity, because investors need the chance of a large return to justify the high risk of loss.',
          'Be honest with yourself here. Chasing equity for a business that does not suit it costs months and usually ends in rejection.',
        ],
      },
      {
        heading: 'The true cost of equity',
        body: [
          'Equity looks free because you never pay it back. It is not. You give away a slice of everything your company becomes, you take on investors who expect growth and regular updates, and you accept some loss of control over decisions. Those costs are worth paying when the money lets you build something you could not build otherwise. They are a poor trade when you did not really need the money in the first place.',
        ],
      },
      {
        heading: 'When waiting is the smarter move',
        body: [
          'If you can reach your next milestone on revenue, if a small grant would bridge the gap, or if you are not yet sure your business is built to scale, waiting is often wiser. Raising later, with more evidence behind you, usually means giving away less for the same amount of money. Sometimes the strongest fundraising decision is to hold off.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Equity is one of four funding sources, alongside revenue, debt, and grants, and most founders use a combination.',
          'Equity suits companies that need money before profit and can grow large enough to reward investors.',
          'Equity is never truly free; you pay in ownership, expectations, and control.',
          'If you can reach your next milestone without raising, waiting often means giving away less later.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Complete the funding-fit worksheet for your own venture. Score how well equity suits your business today, and note one alternative you could use to reach your next milestone.',
        ],
      },
    ],
  },
  {
    slug: 'what-investors-look-for',
    title: 'What Investors Look For',
    teaser: 'If you understand what an investor weighs, you can prepare the right things and tell the right story. This lesson shows you the deal through their eyes.',
    level: 'Beginner',
    readMins: 6,
    order: 2,
    sections: [
      {
        heading: 'The four things early investors weigh',
        body: [
          'Team comes first at the earliest stage, before much has been built. Investors are betting on people. They want to know whether you can build the product, sell it, and keep going when the work gets hard. A capable, committed team is the strongest early signal there is.',
          'Market is next. How many people or businesses have the problem you solve, and how much would they pay to solve it? A good company in a small market stays small. Investors want a market large enough that success would matter.',
          'Product follows. Does what you have built actually solve the problem, and do people use it? A working product that customers come back to beats a beautiful idea that no one has tried.',
          'Traction ties it together. This is evidence that the world wants what you are building: customers, revenue, usage, growth. Even modest traction is powerful, because it turns your claims into facts an investor can check.',
          'You will not be strong on all four in the early days, and that is normal. Know which are your strengths, and be straight about the rest.',
        ],
      },
      {
        heading: 'Founder-market fit',
        body: [
          'Beyond those four signals, investors look for a reason that you in particular are the right person to solve this problem. Perhaps you have lived it, worked in the industry, or have access that others lack. For diaspora founders and those building for African markets, a deep understanding of the customer and the local context is a real advantage. Name it plainly rather than leaving it for the investor to guess.',
        ],
      },
      {
        heading: 'What builds trust',
        body: [
          'Investors trust founders who know their numbers, who describe problems as clearly as they describe strengths, and who do what they said they would do between meetings. Trust builds on itself. A founder who is honest about a weakness becomes more believable about a strength.',
        ],
      },
      {
        heading: 'What raises concern',
        body: [
          'A few things make investors wary. Claiming you have no competition reads as naivety, because every real problem has existing solutions, even if they are poor. Refusing to discuss risks suggests you have not thought them through. Vague or inflated numbers fall apart under a single question. Pressure to decide quickly is treated as a warning sign, not an incentive. If you feel tempted to hide a weakness, remember that diligence usually finds it, and finding it late costs you more trust than naming it early.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Early investors weigh team, market, product, and traction, and expect you to be strong on some, not all.',
          'Founder-market fit, your particular reason to solve this problem, is a real advantage worth stating.',
          'Trust grows when you know your numbers and are honest about weaknesses.',
          'No-competition claims, hidden risks, and pressure tactics all raise concern.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Complete the raise-readiness self-assessment, scoring your company on team, market, product, and traction. Write one sentence describing your founder-market fit.',
        ],
      },
    ],
  },
  {
    slug: 'getting-raise-ready',
    title: 'Getting Your Company Raise-Ready',
    teaser: 'Before you speak to a single investor, a few things about your company need to be in order. This lesson covers the housekeeping that a raise depends on.',
    level: 'Beginner',
    readMins: 6,
    order: 3,
    sections: [
      {
        heading: 'A clean corporate base',
        body: [
          'Investors buy shares in a company, so the company itself must be sound. Confirm that your business is properly incorporated, that you know exactly who owns it, and that your registration details are current with the company registry. If you have co-founders, make sure your ownership split is documented and agreed, not left as a loose understanding. Unresolved ownership between founders is one of the most common problems investors find, and it is far easier to fix before a raise than during one.',
        ],
      },
      {
        heading: 'Your ownership records',
        body: [
          'You need an accurate record of who owns what, known as a cap table. Early on this may be simple, perhaps just you and a co-founder, but it must be correct. Every future conversation about valuation and dilution starts from this record, and any error here will surface later at the worst possible moment. Build a clean cap table now and keep it updated as things change.',
        ],
      },
      {
        heading: 'Intellectual property in the right place',
        body: [
          'Investors want the company to own the things it depends on. If code, designs, or a brand were created by you personally, by a co-founder, or by a contractor, make sure that work has been formally assigned to the company. Intellectual property that sits with an individual rather than the business is a frequent and fixable issue, but it alarms investors if it is still unresolved when they look.',
        ],
      },
      {
        heading: 'Your numbers in order',
        body: [
          'You do not need audited accounts to raise early, but you do need to know your numbers. Understand your spending, your runway, and the basic economics of your business well enough to answer questions without hesitation. Confidence with your own figures signals that you are in control of the company, and it is one of the first things an investor tests.',
        ],
      },
      {
        heading: 'The right mindset and time',
        body: [
          'Raising takes real time and attention, often several months, and it pulls focus from running the business. Decide who on your team will lead it and protect time for it. Going into a raise while also trying to do everything else, with no plan for the load, is how founders burn out mid-process and let good conversations go cold.',
        ],
      },
      {
        heading: 'A first look at what you will need',
        body: [
          'By the end of your preparation you should have, or be close to having, a clear narrative, a pitch deck, a simple financial model, and an organised place to keep your documents. The lessons that follow build each of these in turn. For now, the goal is to make sure the foundation underneath them, your corporate records, ownership, and numbers, is solid.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Confirm your company is properly incorporated and that founder ownership is documented and agreed.',
          'Keep an accurate cap table from the start, because every valuation conversation begins there.',
          'Make sure intellectual property is assigned to the company, not held by individuals.',
          'Know your numbers well enough to answer questions confidently, and protect time to run the raise.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Work through the raise-readiness housekeeping checklist. Note which items are done, which are missing, and any founder or ownership issue you should resolve before you start.',
        ],
      },
    ],
  },
  {
    slug: 'milestone-and-target-amount',
    title: 'Setting Your Milestone and Target Amount',
    teaser: 'The right amount to raise is not the largest sum you can get. This lesson shows you how to size a round around the milestone it is meant to reach.',
    level: 'Beginner',
    readMins: 6,
    order: 4,
    sections: [
      {
        heading: 'Raise to reach the next milestone',
        body: [
          'Investors fund progress. Each round should carry you from where you are now to a clear next proof point that makes the company worth more, such as launching a product, reaching a level of revenue, or hitting a user number. When you can name that milestone, you can work out what it costs to reach, and you can tell an investor exactly what their money buys. Raising to reach a milestone is far more convincing than raising to survive for a vague stretch of time.',
        ],
      },
      {
        heading: 'Working out the number',
        body: [
          'Start from your plan. Estimate what you will spend each month to reach the milestone, across your team, your product, and the cost of reaching customers. Multiply that by the number of months it will take, then add a buffer, because things almost always take longer and cost more than expected. A common approach is to fund around eighteen months of runway, enough to reach the milestone and begin your next raise from strength rather than desperation.',
          'Runway is simply the number of months your cash lasts. If reaching your milestone takes about twelve months of spending at eight thousand a month, that is roughly ninety-six thousand, and a buffer might round the raise to around one hundred and twenty thousand. These are illustrations, not targets. Your real numbers come from your real plan.',
        ],
      },
      {
        heading: 'The cost of getting it wrong',
        body: [
          'Raising too little is the obvious danger. You run out of money before reaching the milestone, and raising again from a weak position is hard and expensive in ownership. Raising too much carries quieter costs. You give away more equity than you needed, you set a high valuation that you then have to grow into, and you can lose the discipline that scarce money enforces. Aim for enough, with a margin, rather than as much as possible.',
        ],
      },
      {
        heading: 'How amount and valuation work together',
        body: [
          'How much of your company you give away depends on both the amount you raise and the valuation. At a valuation of one million after the money, raising one hundred thousand sells ten percent. At a valuation of two million after the money, the same one hundred thousand sells five percent. The amount and the valuation together decide your dilution, which is why the next lesson looks at valuation on its own.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Raise the amount that reaches your next milestone plus a buffer, not the maximum available.',
          'Size the round by estimating monthly spending to the milestone, then add runway and a margin for overruns.',
          'Raising too little risks stalling; raising too much costs extra ownership and discipline.',
          'The amount and the valuation together decide how much of the company you give away.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Build a runway-and-milestone plan. Name your next milestone, estimate the monthly spending and the months needed to reach it, and set a target raise amount that includes a buffer.',
        ],
      },
    ],
  },
  {
    slug: 'valuation-basics',
    title: 'Valuation Basics for Founders',
    teaser: 'Valuation decides how much of your company you give away for the money you raise. This lesson explains how it works and how to set one you can defend.',
    level: 'Beginner',
    readMins: 6,
    order: 5,
    sections: [
      {
        heading: 'Pre-money and post-money',
        body: [
          'Two terms matter. Pre-money valuation is what your company is agreed to be worth before the new money comes in. Post-money valuation is the pre-money value plus the money you raise. The investor’s share is their money divided by the post-money valuation.',
          'Here is an example. If you agree a pre-money valuation of nine hundred thousand and raise one hundred thousand, the post-money valuation is one million, and the investor owns ten percent. If you agree a pre-money valuation of one million nine hundred thousand and raise the same one hundred thousand, the post-money valuation is two million, and the investor owns five percent. The higher the valuation, the less of the company you give away for the same money.',
        ],
      },
      {
        heading: 'How early-stage valuation is set',
        body: [
          'Early-stage valuation is part evidence and part negotiation. There is no formula. It is shaped by your traction, your team, the size of your market, comparable deals at your stage and in your region, and how much investor interest you have managed to build. Strong interest from several investors is one of the few things that genuinely moves a valuation, which is why building momentum, covered later in this course, matters.',
        ],
      },
      {
        heading: 'Why a valuation that is too high can hurt',
        body: [
          'It is tempting to push for the highest number you can get, but there is a real risk in overreaching. If you set a valuation you cannot grow into, your next round becomes painful. Raising later at a lower valuation, known as a down round, damages confidence and dilutes everyone, including you. A valuation that is ambitious but grounded in what your next milestone can justify is a stronger position than a high number you will struggle to support.',
        ],
      },
      {
        heading: 'Valuation is not the only lever',
        body: [
          'Remember from the last lesson that the amount you raise and the valuation work together to set your dilution. A slightly lower valuation with a smaller raise can cost you less ownership than a higher valuation with a larger raise. Look at the whole picture, not just the headline number, and think in terms of how much of the company you are selling rather than how big the valuation sounds.',
        ],
      },
      {
        heading: 'A note on delaying valuation',
        body: [
          'You do not always have to set a valuation now. Some early raises use instruments that delay the valuation question until a later round, which the next lesson covers. This can be useful when it is genuinely hard to agree a number at a very early stage.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Pre-money and post-money valuation together decide how much of the company an investor gets.',
          'A higher valuation sells less of the company for the same money, but only if you can defend it.',
          'Early valuation is negotiation as much as evidence, and strong investor interest is what moves it.',
          'Overreaching risks a damaging down round later, so ground your valuation in your next milestone.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Using the provided calculator, work out the ownership an investor would receive at three different valuations for your target raise amount, and note which you could realistically defend.',
        ],
      },
    ],
  },
  {
    slug: 'choosing-your-instrument',
    title: 'Choosing Your Instrument',
    teaser: 'How the money comes in is a real decision. This lesson explains the three common instruments and when each one fits.',
    level: 'Beginner',
    readMins: 7,
    order: 6,
    sections: [
      {
        heading: 'The priced round',
        body: [
          'A priced round sets a valuation today and issues shares at that price. The investor becomes a shareholder immediately, with a known percentage of the company. It is the cleanest and clearest structure, because everyone knows exactly what has been bought and for how much. The trade-off is that it takes more negotiation and more legal work, because you have to agree the valuation and all the terms that come with issuing shares now. Priced rounds become the norm as companies mature and rounds get larger.',
        ],
      },
      {
        heading: 'The SAFE',
        body: [
          'A **SAFE**, which stands for Simple Agreement for Future Equity, is a short agreement where an investor pays now and receives shares later, when your next priced round sets the value. It delays the valuation question, which is useful at the earliest stage when a number is genuinely hard to agree. SAFEs are faster and cheaper to put in place than a priced round.',
          'A SAFE often carries a valuation cap, which is the maximum valuation at which the money will convert into shares. The cap protects the early investor by making sure that if the company becomes much more valuable by the next round, they still convert at a favourable price for taking the early risk. Some SAFEs also include a discount, which gives the early investor a reduction on the next round’s price. Understand any cap and discount you agree, because together they decide how much of the company those early investors eventually receive.',
        ],
      },
      {
        heading: 'The convertible loan note',
        body: [
          'A convertible loan note is similar to a SAFE in that the money converts into shares later, but it is structured as a loan. That means it usually carries interest and a repayment date, sometimes called a longstop date, by which it either converts or must be dealt with. Notes can carry a cap and a discount like a SAFE. Because a note is legally a loan, it sits differently on your company’s books and carries the idea of repayment, which is worth understanding before you choose it.',
        ],
      },
      {
        heading: 'How to choose',
        body: [
          'At the very early stage, SAFEs and notes are common because they let you move quickly and delay the valuation debate. As your company matures and your rounds get larger and involve more investors, priced rounds become normal, because the certainty of knowing exactly who owns what is worth the extra effort. Neither approach is better in the abstract. Ask which gives you and your investors the right balance of speed and certainty for this particular round.',
        ],
      },
      {
        heading: 'Keep it standard',
        body: [
          'Whatever you choose, favour standard, widely understood documents over unusual bespoke ones. Investors are comfortable with familiar structures, and familiar structures are cheaper and faster to complete. A solicitor should always prepare or review the instrument, because small details in these documents have large effects on ownership.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A priced round sets a valuation and issues shares now; it is clear but takes more work.',
          'A SAFE lets an investor pay now and receive shares later, delaying the valuation, often with a cap and sometimes a discount.',
          'A convertible loan note is similar to a SAFE but is legally a loan, usually with interest and a repayment date.',
          'Early rounds often use SAFEs or notes for speed; priced rounds become normal as companies mature.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Decide which instrument fits your round, and note your reasons. If you choose a SAFE or note, set out the cap and any discount you would propose, and show the effect on your cap table.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor prepare or review your investment instrument.',
        ],
      },
    ],
  },
  {
    slug: 'building-your-fundraising-narrative',
    title: 'Building Your Fundraising Narrative',
    teaser: 'Investors back stories they understand and believe. This lesson helps you shape the narrative that carries your whole raise.',
    level: 'Beginner',
    readMins: 6,
    order: 7,
    sections: [
      {
        heading: 'The four beats of a strong narrative',
        body: [
          'Start with the problem. Open with a real problem that real people or businesses have, made specific enough that the listener can feel it. A vague problem produces a vague company.',
          'Then the solution. Show how your product solves that problem, simply. An investor should grasp what you do in a sentence or two, not after a long explanation.',
          'Then why now. Explain what has changed that makes this the right moment: a shift in technology, behaviour, regulation, or the market itself. Many of the best companies are answers to a clear why now.',
          'Then why you. Connect back to your founder-market fit. Why is your team the right one to win this? This is where your lived understanding of the customer and the market becomes part of the story rather than a footnote.',
        ],
      },
      {
        heading: 'Turning traction into an arc',
        body: [
          'If you have traction, weave it in as proof, not decoration. A narrative that moves from a clear problem, to a simple solution, to early evidence that it works, to a believable plan for what the money unlocks, is far stronger than a list of features. Investors are following a line from where you are to where you could be. Draw that line clearly and let your traction sit on it as evidence.',
        ],
      },
      {
        heading: 'Keep it honest',
        body: [
          'A narrative is not a sales pitch that hides the hard parts. The strongest stories name the real risks and explain how you will face them. This builds the trust covered earlier in the course, and it prepares you for the questions investors will ask. Confidence and honesty are not opposites. Together they persuade far better than either alone.',
        ],
      },
      {
        heading: 'Common mistakes to avoid',
        body: [
          'Watch for a few recurring errors. Leading with the product before the problem, so the listener does not yet know why to care. Reaching for jargon to sound impressive instead of being clear. Claiming a huge market without showing that you understand your specific customer. And stretching the truth, which diligence tends to expose and which costs you the deal. Plain, honest, and specific beats polished and vague every time.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A raise is carried by a clear story: problem, solution, why now, and why you.',
          'Weave traction in as proof that supports the arc, not as a list of features.',
          'Honest narratives that name the risks build more trust than flawless-sounding pitches.',
          'Lead with the problem, avoid jargon, and never stretch the truth.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Write a one-page narrative outline for your raise, with a short paragraph for each of the four beats. Keep it plain enough that someone outside your field understands it on the first read.',
        ],
      },
    ],
  },
  {
    slug: 'building-your-pitch-deck',
    title: 'Building Your Pitch Deck',
    teaser: 'Your deck is the document that earns the next meeting. This lesson covers the slides that matter and the mistakes that quietly sink good companies.',
    level: 'Beginner',
    readMins: 7,
    order: 8,
    sections: [
      {
        heading: 'The core slides',
        body: [
          'A pitch deck is a short set of slides that tells your story and makes an investor want to learn more. Its job is not to close the deal on its own. Its job is to earn the next conversation. Keep that in mind and you will resist the urge to cram everything in.',
          'Most strong early-stage decks cover the same ground in around ten to twelve slides: an opening slide with your company name and a single clear line on what you do; a problem slide that makes the pain real; a solution slide that shows how your product solves it; a why-now slide explaining what has changed; a market slide showing the scale of the opportunity, grounded in your actual customer; a product slide showing briefly what you have built; a traction slide with your evidence; a business-model slide showing how you make money; a team slide covering who you are and why you can win; and an ask slide setting out how much you are raising and what it unlocks.',
          'You can add a competition slide or a simple roadmap, but resist bloating the deck. Fewer, clearer slides beat more.',
        ],
      },
      {
        heading: 'What each slide must do',
        body: [
          'Every slide should make one point that an investor takes away. If a slide has no single message, it is doing nothing. The traction slide should show momentum. The market slide should show scale without empty claims about billion-dollar opportunities. The ask slide should connect the money to a milestone, so an investor knows exactly what their capital buys. Design for clarity: a few words, a clear number, and room to breathe on the page.',
        ],
      },
      {
        heading: 'Tailoring to your audience',
        body: [
          'The same core deck can be tuned for different audiences. Angels and syndicates often care most about the team and the story. A crowdfunding audience on a platform like WAAW may include less experienced investors, so plain language and a clear, risk-aware tone matter even more. Adjust your emphasis, never your honesty.',
        ],
      },
      {
        heading: 'The mistakes that kill decks',
        body: [
          'A few recurring errors do real damage. Too much text, so no one reads it. Leading with the product before the problem, so the investor does not know why to care. Inflated or vague numbers that fall apart under a single question. Claiming no competition, which reads as naivety. And burying the ask, so the investor is left unsure what you actually want. Fix these and your deck will already stand ahead of most.',
        ],
      },
      {
        heading: 'Keep iterating',
        body: [
          'Your first deck will not be your best one. Show it to a few trusted people, watch where they get confused, and tighten those slides. A deck improves through feedback and revision, so treat the first version as a draft to sharpen, not a finished product.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A deck exists to win the next meeting, not to close the deal alone.',
          'Ten to twelve slides covering problem through to the ask is the common, effective shape.',
          'Every slide should land one clear point, with the ask tied to a milestone.',
          'Avoid text-heavy slides, inflated numbers, no-competition claims, and a buried ask.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Build a complete first-draft pitch deck from the WAAW deck template, one point per slide, and tie your ask to the milestone you defined earlier in the course.',
        ],
      },
    ],
  },
  {
    slug: 'building-your-financial-model',
    title: 'Building Your Financial Model',
    teaser: 'A financial model shows the numbers behind your story. It does not need to be complex. It needs to be honest, clear, and built on assumptions you can defend.',
    level: 'Beginner',
    readMins: 7,
    order: 9,
    sections: [
      {
        heading: 'Why a model matters',
        body: [
          'Early-stage investors know your projections will be wrong. They still want to see them, because a model reveals how you think. It shows whether you understand what drives your business, what it costs to grow, and what the money you are raising will actually do. A clear, modest model earns more trust than an elaborate one built on hope.',
        ],
      },
      {
        heading: 'Unit economics come first',
        body: [
          'Unit economics is the money made and spent on a single unit of your business, such as one customer or one transaction. If you earn more from a customer over time than it costs to win and serve them, the business can work as it grows. If you lose money on each one, growth makes things worse rather than better. Investors look here first, so you should too. Know what it costs to acquire a customer and what that customer is worth to you.',
        ],
      },
      {
        heading: 'The assumptions that matter',
        body: [
          'A model is only as good as its assumptions, and only a few of them really matter. Usually they are how fast you grow, what it costs to acquire customers, how many customers stay, and your main costs. Make these assumptions visible and reasonable. If an investor changes one of them and your whole model collapses, that is something you want to discover before they do, not after.',
          'Resist the temptation to work backwards from an impressive final number. A steep upward chart with no real basis is a warning sign to investors, not a selling point.',
        ],
      },
      {
        heading: 'Building a simple projection',
        body: [
          'For an early raise, a monthly projection covering the next twelve to eighteen months, plus a rougher yearly view beyond that, is usually enough. Show your revenue, your main costs, and your cash position over time, so the model demonstrates your runway and when you would need to raise again. Keep the structure clean enough that someone can follow your logic from the assumptions through to the results without getting lost.',
        ],
      },
      {
        heading: 'Framing the ask and use of funds',
        body: [
          'Your model should connect directly to your raise. It shows why you need the amount you are asking for and what it buys: the hires, the product work, and the customer growth that carry you to your next milestone. A clear use-of-funds breakdown, tied to the model, answers the question every investor asks, which is what their money will actually achieve.',
        ],
      },
      {
        heading: 'Keep it yours',
        body: [
          'Whatever help you get building the model, make sure you understand every part of it. In a meeting you will be asked to explain your assumptions and defend your numbers, and a model you cannot speak to convincingly does more harm than good. The point is not a perfect spreadsheet. The point is showing an investor that you understand your own business.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Investors read a model to see how you think, not to trust the exact numbers.',
          'Unit economics, the money made and spent per customer, is the first thing to get right.',
          'Make your few key assumptions visible and reasonable rather than engineering a big final number.',
          'Tie the model to your raise with a clear use-of-funds that reaches your milestone, and understand every part yourself.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Build a lightweight financial model on the provided spreadsheet. State your key assumptions, project the next twelve to eighteen months, and add a use-of-funds breakdown for your target raise.',
        ],
      },
    ],
  },
  {
    slug: 'preparing-your-data-room',
    title: 'Preparing Your Data Room',
    teaser: 'When an investor grows serious, they will want to look under the hood. This lesson shows you how to prepare the documents so that scrutiny speeds your raise instead of slowing it.',
    level: 'Beginner',
    readMins: 6,
    order: 10,
    sections: [
      {
        heading: 'What a data room is for',
        body: [
          'A data room is an organised, secure place where investors review your documents before they commit. The mistake founders make is building it only after an investor asks. By then they are scrambling, momentum stalls, and gaps show. Preparing your data room during this stage, before you reach out, is one of the highest-value things you can do.',
          'Before putting money in, a serious investor runs due diligence, which is simply checking that your company is what you say it is. A good data room lets them do that quickly and independently. When an interested investor can dive straight in and find what they need, diligence moves fast, and speed protects the momentum that carries a raise. On WAAW your data room is part of your listing, gated so that verified investors can access it.',
        ],
      },
      {
        heading: 'What to include',
        body: [
          'A well-organised data room mirrors the areas an investor examines. Include your corporate documents, such as your incorporation records and cap table. Include your financials and your model. Include evidence of traction, such as key customer contracts or usage figures. Include your intellectual property assignments, showing the company owns what it relies on. Include team details, and any legal or regulatory material relevant to your business. The aim is that an investor can answer most of their own questions without having to ask you.',
        ],
      },
      {
        heading: 'Keep it clean and current',
        body: [
          'A data room helps you only if it is complete, current, and logically arranged. Out-of-date figures, missing documents, or a confusing structure all undermine the confidence you are trying to build. Label folders clearly, keep versions current, and remove anything outdated. A tidy data room signals a founder in control of the detail, which is exactly the impression you want to leave.',
        ],
      },
      {
        heading: 'The hidden benefit',
        body: [
          'Building your own data room forces you to see your company the way an investor will. As you assemble it, you will find the gaps yourself: the IP that was never formally assigned, the cap table that does not quite add up, the contract that was never signed. Finding and fixing these before an investor does is far better than being caught out during diligence. In this sense, preparing the data room is not just admin. It is a rehearsal for scrutiny.',
        ],
      },
      {
        heading: 'Disclose weaknesses on your terms',
        body: [
          'Every company has weak spots. The data room, and the diligence that follows, is where they come to light. Almost any weakness is survivable if you raise it yourself and explain how you are handling it. The same weakness discovered by an investor, unmentioned, is far more damaging, because it makes them wonder what else you have not told them. Prepare to be open about the hard parts rather than hoping they go unnoticed.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A data room lets investors run diligence quickly and independently, which protects your momentum.',
          'Include corporate documents, financials, traction evidence, IP assignments, team details, and legal material.',
          'Keep it complete, current, and clearly organised, because a tidy room signals control.',
          'Building it reveals your own gaps early, and it lets you disclose weaknesses on your own terms.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Set up your data-room folder structure using the provided template, populate what you have, and list the gaps you need to close before you start reaching out to investors.',
        ],
      },
    ],
  },
  {
    slug: 'building-your-investor-target-list',
    title: 'Building Your Investor Target List',
    teaser: 'Reaching the right investors matters more than reaching many. This lesson shows you how to build a target list of people who actually fit your raise.',
    level: 'Beginner',
    readMins: 6,
    order: 11,
    sections: [
      {
        heading: 'Know the types of investor',
        body: [
          'The best deck fails if it reaches the wrong people. Before you send a single message, you should know who you are approaching and why they fit. A focused target list of investors suited to your stage, sector, and geography will do more for your raise than a large, scattered one.',
          'Different investors suit different stages and needs. Angels are individuals investing their own money, often writing the earliest cheques, and many bring experience and contacts alongside capital. Syndicates let a group of smaller investors pool behind a lead, so you can raise a meaningful amount from many modest cheques. Crowdfunding platforms such as WAAW open your raise to many investors at once, with verification and escrow built in, which suits diaspora-focused raises. Venture capital funds write larger cheques into more proven companies, usually at later stages.',
          'Match your targets to your stage. Approaching large funds at the earliest stage, or expecting a single angel to fund a whole large round, wastes everyone’s time.',
        ],
      },
      {
        heading: 'Build the list deliberately',
        body: [
          'A good target list is specific. For each investor, note why they fit: the stage they back, the sectors they like, the regions they focus on, and any connection to your world. An investor who backs early African-market fintech is a far better target for that kind of company than a generalist with no interest in the space. Quality of fit beats quantity of names.',
          'Aim for enough targets that the numbers work. Raising is partly a numbers game, because most conversations lead nowhere. You need enough well-matched investors on your list that a healthy share saying no still leaves you with the commitments you need.',
        ],
      },
      {
        heading: 'Find the warmest route to each',
        body: [
          'For every investor on your list, work out the warmest way to reach them. A warm introduction from someone they trust who knows you is worth far more than a cold message, because investors receive more approaches than they can handle. Map your own network and the networks around you: a founder who has raised, an advisor, or a mutual contact can open a door that stays shut to a stranger. Where no warm route exists, note that you will need a strong cold approach, which the next lesson covers.',
        ],
      },
      {
        heading: 'Use your platform presence',
        body: [
          'On WAAW, your listing works for you around the clock. A strong, verified profile with a clear story and a ready data room means investors can find and assess you without waiting for an introduction. Treat your listing as part of your outreach, not separate from it, and make sure it is ready before you start driving investors to it.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Match your target investors to your stage: angels and syndicates early, crowdfunding to reach many, funds later.',
          'Build a specific list, noting why each investor fits your stage, sector, and region.',
          'Include enough well-matched targets that a normal rate of rejection still leaves you funded.',
          'Find the warmest route to each investor, and treat a strong platform listing as part of your outreach.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Build a target investor list matched to your stage and sector. For each name, note why they fit and the warmest route you have to reach them.',
        ],
      },
    ],
  },
  {
    slug: 'making-the-approach',
    title: 'Making the Approach',
    teaser: 'A good target list only helps if your outreach earns a reply. This lesson covers how to reach investors so they respond and want to meet.',
    level: 'Beginner',
    readMins: 6,
    order: 12,
    sections: [
      {
        heading: 'The warm introduction',
        body: [
          'With your list built and the warmest route to each investor noted, it is time to reach out. The goal of an approach is modest: not to win the investment in one message, but to earn a first conversation. Keep that in mind and your outreach will be shorter and better.',
          'A warm introduction is the strongest way in. When someone an investor trusts vouches for you, your message starts with credibility that a stranger cannot buy. To make introductions easy to give, do the work for the person introducing you. Send them a short, forwardable note about your company and what you are raising, so they can pass it on with a single line. People are far more willing to introduce you when you have made it effortless.',
        ],
      },
      {
        heading: 'The cold approach',
        body: [
          'Where no warm route exists, a specific, well-researched cold message can still work. The key is relevance. Show, in the first line or two, that you know why you are contacting this particular investor: the stage they back, a company like yours they have supported, or the market they care about. A message that could have been sent to anyone gets ignored. A message that clearly belongs to this investor gets read.',
        ],
      },
      {
        heading: 'What a good approach contains',
        body: [
          'Whether warm or cold, a good approach is short and clear. State who you are and what you are building in a sentence. Say what you are raising and roughly what it will achieve. Give one or two strong signals, such as a piece of traction or a notable backer, that make the investor want to know more. Then make the next step easy, usually a short meeting or a link to your deck or listing. Long, dense messages get put aside. Short, specific ones get answered.',
        ],
      },
      {
        heading: 'Follow up without pestering',
        body: [
          'Most positive replies come after a second or third message, not the first. Investors are busy, and a message can be missed rather than rejected. Following up politely, after a sensible gap, and adding something new each time, such as a fresh piece of progress, is persistence, not pestering. What separates the two is respect and value: keep your follow-ups short, courteous, and useful, and stop gracefully if the answer is clearly no.',
        ],
      },
      {
        heading: 'Track everything',
        body: [
          'As your outreach begins, record every investor, where they are in the process, and the next step. You will soon have many conversations at different stages, and trying to hold it all in your head leads to dropped threads and missed follow-ups. A simple tracker, which the next lesson builds on, keeps your raise organised and moving.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The goal of an approach is a first conversation, not an instant investment.',
          'Make warm introductions effortless by sending a short, forwardable note about your raise.',
          'Make cold approaches relevant, showing you know why you are contacting this particular investor.',
          'Keep messages short and specific, follow up politely more than once, and track every conversation.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Draft your outreach message set: one version for a warm introduction and one for a cold approach, each short and specific. Set up a simple tracker to record where each investor stands.',
        ],
      },
    ],
  },
  {
    slug: 'running-investor-meetings',
    title: 'Running Investor Meetings',
    teaser: 'The meeting is where interest is won or lost. This lesson shows you how to run one well and handle the questions that come.',
    level: 'Beginner',
    readMins: 7,
    order: 13,
    sections: [
      {
        heading: 'Prepare for each meeting',
        body: [
          'Once an investor agrees to talk, the meeting becomes your chance to turn interest into belief. A good meeting is not a performance of your deck. It is a clear, honest conversation that leaves the investor understanding your company and trusting you. Preparation and composure matter more than polish.',
          'Before a meeting, know who you are speaking to. Learn what they invest in, what they have backed, and what they are likely to care about, so you can lead with what matters to them. Have your deck, your numbers, and your data room ready to hand. Being organised signals respect for their time and confidence in your own company.',
        ],
      },
      {
        heading: 'Lead with the story, then let it breathe',
        body: [
          'Open with your narrative: the problem, your solution, why now, and why you. Then leave room for a conversation rather than talking through every slide. The strongest meetings feel like a discussion, with the investor asking questions and you answering clearly. Watch the time, make your key points early, and do not save the most important thing for a final slide you may never reach.',
        ],
      },
      {
        heading: 'Handle questions honestly',
        body: [
          'Investors test you through questions, and how you answer matters as much as what you say. Answer directly. If you know the number, give it. If you do not know something, say so and offer to follow up, rather than guessing or bluffing, because a confident wrong answer does more damage than an honest gap. When an investor raises a risk or a weakness, engage with it openly. A founder who can discuss the hard parts calmly is far more convincing than one who deflects.',
        ],
      },
      {
        heading: 'Read the interest and set the next step',
        body: [
          'Pay attention to how engaged the investor is. Genuine interest shows up as detailed questions about the business, the market, and the terms. Politeness without depth often means the answer is a soft no. Either way, always close a meeting by agreeing a clear next step, whether that is sending more information, a second meeting, or an introduction to their partners. A meeting that ends without a next step tends to fade, so name one before you finish.',
        ],
      },
      {
        heading: 'Follow up promptly',
        body: [
          'After the meeting, send a short, prompt follow-up. Thank them for their time, answer any question you could not fully answer live, and confirm the next step you agreed. Doing this quickly and reliably reinforces the impression of a founder who is organised and easy to work with, which is part of what an investor is judging throughout.',
        ],
      },
      {
        heading: 'Learn from each one',
        body: [
          'Early meetings will not go perfectly, and that is useful. Notice which questions caught you out, where the investor lost interest, and which parts of your story landed. Adjust your deck and your answers before the next meeting. A founder who improves visibly across a run of meetings is running the process well.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Prepare for each investor by learning what they back and what they care about.',
          'Lead with your narrative, then let the meeting become a conversation rather than a slide reading.',
          'Answer questions directly and honestly, and engage openly with risks and weaknesses.',
          'Read the level of genuine interest, always agree a clear next step, and follow up promptly.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Prepare a short meeting plan: your opening narrative, the three questions you expect to be hardest, and an honest answer to each. Note the next step you will aim to agree.',
        ],
      },
    ],
  },
  {
    slug: 'momentum-and-the-term-sheet',
    title: 'Managing Momentum and the Term Sheet',
    teaser: 'A raise is a process to be managed, not a set of separate conversations. This lesson covers keeping momentum and understanding the term sheet when it arrives.',
    level: 'Beginner',
    readMins: 7,
    order: 14,
    sections: [
      {
        heading: 'Why momentum decides raises',
        body: [
          'By this stage you have investors in conversation. Now the job is to manage the whole process so that interest builds together and turns into commitments. This is also where the term sheet appears, the document that sets the terms of the deal, so this lesson covers both.',
          'Raises are won and lost on pace. When several investors are interested at once, each becomes more willing, because interest from others signals value. When a raise drags on, the opposite happens, and investors quietly cool. This is why founders often run their outreach in a concentrated window rather than trickling it out, so that interest peaks together. Your aim is to have multiple conversations moving at similar speed, so that commitments start to arrive close together and reinforce one another.',
        ],
      },
      {
        heading: 'Keep several conversations alive',
        body: [
          'Never let your raise depend on a single investor. Keep enough conversations active that one dropping out does not end the process. Use your tracker to see where each investor stands and what the next step is, and keep them all moving rather than pausing everything to wait on one. A healthy pipeline protects you from the disappointment of a promising investor going quiet, which happens often and is not a reflection on you.',
        ],
      },
      {
        heading: 'The role of a lead investor',
        body: [
          'In many rounds, one investor agrees to lead: they set the terms and the valuation, and others follow on the same basis. Securing a lead is often the moment a raise turns, because it gives the other interested investors the confidence and the terms they were waiting for. If you can identify which of your conversations might lead, focus energy there, because a committed lead can pull a round together quickly.',
        ],
      },
      {
        heading: 'Understanding the term sheet',
        body: [
          'When an investor is ready to proceed, they usually offer a term sheet. This is a short, mostly non-binding summary of the key terms: the amount, the valuation or the instrument, and the main rights that come with the investment. It is not the final contract, but it sets the direction for the binding documents that follow, so the terms you agree here matter a great deal.',
          'You do not need to master every term now, and the advanced material covers term-sheet negotiation in depth. For this course, understand a few essentials. The valuation and amount set how much of the company you give away. A liquidation preference decides who gets paid first if the company is sold, and a plain one-times preference is the founder-reasonable norm. Board and consent rights decide how much control you keep. And you should always have a solicitor review a term sheet before you sign, because small wording carries large effects.',
        ],
      },
      {
        heading: 'Do not rush the paperwork',
        body: [
          'Momentum is valuable, but it should not push you into signing terms you do not understand. Move quickly on the process and the relationship, and carefully on the documents. A good investor will respect a founder who takes proper advice before signing, and any investor who pressures you to sign without review is showing you something worth noticing.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Momentum wins raises, so concentrate your outreach and keep conversations moving together.',
          'Never depend on one investor; keep several alive so one going quiet does not end your raise.',
          'A lead investor sets the terms and often turns a round, so focus on conversations that might lead.',
          'A term sheet summarises the key terms and sets the direction; understand the essentials and always have a solicitor review it.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Update your pipeline tracker to show which conversations are most advanced and which might lead. Using the sample term sheet, note the three terms you would look at first and the position you would want on each.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor review a term sheet before signing.',
        ],
      },
    ],
  },
  {
    slug: 'negotiating-and-closing-the-round',
    title: 'Negotiating and Closing the Round',
    teaser: 'The final stretch turns an agreed term sheet into money in the bank. This lesson brings the raise home and points you to what comes after.',
    level: 'Beginner',
    readMins: 7,
    order: 15,
    sections: [
      {
        heading: 'Negotiate the terms that matter',
        body: [
          'You have a term sheet on the table and investors ready to commit. The last stage is negotiating the terms sensibly and completing the deal cleanly. Handled well, closing is orderly and quick. Handled poorly, it drags and puts strain on the goodwill you have built.',
          'You cannot fight every point, so decide in advance what matters most to you, usually keeping control and avoiding punitive economics, and where you can give ground. Concede the standard terms gracefully, because doing so builds goodwill for the few points you truly care about. Focus your energy on the economics, such as the valuation and any liquidation preference, and on control, such as board seats and the list of decisions that need investor consent. Take advice from a solicitor who has seen many deals, because they will spot an unusual term you might miss. Negotiate firmly, but remember you are starting a relationship that will last years, so aim for terms you can both live with.',
        ],
      },
      {
        heading: 'Move to final documents',
        body: [
          'Once terms are agreed, lawyers draft the binding documents to match the term sheet: the instrument or subscription agreement, the shareholders’ agreement, the new articles, and the supporting resolutions. Read the final documents against the term sheet to check that nothing has drifted, and raise anything that has moved before you sign. This is where the summarised terms become detailed contract language, so it deserves careful attention.',
        ],
      },
      {
        heading: 'Complete through escrow',
        body: [
          'On WAAW, committed funds move through protected escrow rather than straight to your account. Investors fund their commitment, the money is held by a licensed third party, and it is released to the company only when the agreed conditions for completion are met. This protects both sides. Understand your escrow provider’s specific steps, because they define exactly when and how you receive the money. Completion is the moment the documents take effect, the conditions are satisfied, and the funds are released.',
        ],
      },
      {
        heading: 'Issue shares and update your records',
        body: [
          'When the deal completes, the company formally issues the new shares, records them in its register of members, and issues share certificates. Issuing shares and adopting new articles usually require filings with the company registry, such as Companies House in the United Kingdom or the Corporate Affairs Commission in Nigeria. Update your cap table to match, and store the final signed documents safely. Clean records at this stage make your next raise far smoother.',
        ],
      },
      {
        heading: 'What comes after',
        body: [
          'Closing a round is a beginning, not an end. From here you have investors to keep informed with regular, honest updates, a cap table to manage across future rounds, and ongoing obligations to meet. The advanced Founder track covers life after the raise in detail, including investor relations, managing dilution, tax-efficient structures such as SEIS and EIS, and staying compliant. For now, know that the standards you set after closing are what make your next raise possible.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Decide what matters most, concede standard terms gracefully, and focus on economics and control.',
          'Check the final documents against the term sheet, and take proper legal advice before signing.',
          'Complete through escrow, understanding exactly when and how funds are released.',
          'Issue shares formally, update your register and cap table, make the required filings, and keep clean records for next time.',
        ],
      },
      {
        heading: 'Your task',
        body: [
          'Build a closing checklist that runs from an agreed term sheet through final documents, escrow, completion, share issuance, and filings. Note the first three things you will do after the money lands.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor handle your closing documents and filings. This completes the WAAW Academy How to Raise course: 15 lessons from deciding whether to raise through to closing your round.',
        ],
      },
    ],
  },
];


const DOCUMENTS_LESSONS: AcademyLesson[] = [
  {
    slug: 'how-they-fit-together',
    title: 'How the Documents Fit Together',
    teaser: 'A raise runs on paperwork. Before we look at each document, this lesson gives you the map, so you can see how the pieces connect.',
    level: 'Beginner',
    readMins: 6,
    order: 1,
    sections: [
      {
        heading: 'The three groups of documents',
        body: [
          'When a raise moves from interest to closing, a stack of documents appears, and founders who do not understand them sign whatever is put in front of them. You do not need to become a lawyer, but you should understand what each document is for and how they fit together.',
          'The documents in a raise fall into three broad groups. The first sets the terms of the deal: the term sheet, which summarises what both sides have agreed, and then the main investment document that puts those terms into a binding contract, whether that is a SAFE, a convertible note, or a subscription agreement.',
          'The second group governs the company and the relationship between its owners after the money is in: the shareholders’ agreement and the articles of association, which together decide how the company is run, who controls what, and what happens when shares change hands.',
          'The third group is the supporting paperwork that makes the deal valid and safe: the cap table and register of members, the warranties and disclosure letter, the board and shareholder resolutions, intellectual property assignments, identity and anti-money-laundering documents, and the filings that update the public record.',
        ],
      },
      {
        heading: 'Why they must line up',
        body: [
          'These documents are not independent. They refer to one another and must agree. The binding investment document must reflect the term sheet. The articles must match the shareholders’ agreement. The cap table must match the shares actually issued. When documents conflict, one of them will usually state which prevails, and an investor’s lawyers will check that everything is consistent. Contradictions between documents are a common cause of delay and mistrust, so consistency is not a detail. It is the whole point.',
        ],
      },
      {
        heading: 'Binding and non-binding',
        body: [
          'Some documents are binding contracts you must honour, such as the subscription agreement and the shareholders’ agreement. Others, most notably the term sheet, are mostly non-binding, though they often contain a few binding clauses, such as confidentiality or exclusivity. Knowing which is which tells you where the real commitment sits, and where you still have room to negotiate.',
        ],
      },
      {
        heading: 'Who prepares them',
        body: [
          'Your solicitor prepares and reviews these documents, and the investor’s solicitor reviews them too. Your job is not to draft them, but to understand them well enough to know what you are agreeing to, to spot terms that matter to you, and to ask the right questions. A founder who understands the documents negotiates from strength and closes faster.',
        ],
      },
      {
        heading: 'How this course works',
        body: [
          'Each of the next fourteen lessons takes one document or one group and explains what it is, what it decides, and where the important choices sit. By the end you will be able to open any document in your raise and know what you are looking at. Keep this map in mind as you go, so each document sits in its place in the whole.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Raise documents fall into three groups: those that set the deal terms, those that govern the company, and the supporting paperwork.',
          'The documents refer to one another and must be consistent, or the deal stalls.',
          'Some documents are binding contracts; the term sheet is mostly non-binding but sets the direction.',
          'Solicitors prepare and review the documents; your job is to understand them well enough to negotiate and ask good questions.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a qualified solicitor prepare and review your raise documents.',
        ],
      },
    ],
  },
  {
    slug: 'the-term-sheet',
    title: 'The Term Sheet',
    teaser: 'The term sheet is where the raise takes shape. It is short, mostly non-binding, and yet it decides more than almost any document that follows.',
    level: 'Beginner',
    readMins: 6,
    order: 2,
    sections: [
      {
        heading: 'What a term sheet contains',
        body: [
          'The term sheet is the starting document of a deal. It is a short summary of the key terms that both sides have agreed, written before the long binding contracts are drafted. Because those later contracts are built to match it, the term sheet is where the negotiation that matters most usually happens.',
          'A term sheet sets out the essentials of the deal in a few pages. It states the amount being raised and the instrument, whether that is a priced round, a SAFE, or a convertible note. It states the valuation, or the cap and discount if the valuation is being delayed. And it sets out the main rights that come with the investment, such as any liquidation preference, board arrangements, the decisions that will need investor consent, and rights like pre-emption and information rights.',
        ],
      },
      {
        heading: 'Mostly non-binding, with exceptions',
        body: [
          'A term sheet is mostly non-binding, which means agreeing it does not force either side to complete the deal. Its purpose is to record agreement in principle so the lawyers can draft the binding documents with confidence. There are usually a few binding clauses, though, and you should know which they are. Common ones include confidentiality, which keeps the terms private, exclusivity, which stops you talking to other investors for a period, and a clause on who pays legal costs. Read these carefully, because they bind you even though the rest does not.',
        ],
      },
      {
        heading: 'Why it carries so much weight',
        body: [
          'Since the binding documents are drafted to match the term sheet, the terms you accept here tend to stick. Trying to reopen a term after the term sheet is agreed is difficult and damages goodwill, because the other side reasonably feels it was already settled. This is why founders should negotiate the term sheet properly rather than treating it as a formality.',
        ],
      },
      {
        heading: 'The exclusivity clause deserves attention',
        body: [
          'The exclusivity clause, sometimes called a no-shop, is worth singling out. It prevents you from negotiating with other investors for a set period while the deal is finalised. That is reasonable for an investor who is about to spend money on diligence and legal work, but a long exclusivity period can leave you stuck if the deal then falls through, having lost your momentum with everyone else. Keep the period as short as is fair, so you are not trapped.',
        ],
      },
      {
        heading: 'Get advice before you sign',
        body: [
          'Even though it is mostly non-binding, have a solicitor review the term sheet before you sign. They will spot an unusual term, explain what each right means in practice, and flag anything that will be hard to live with later.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The term sheet summarises the key terms and sets the direction for every binding document that follows.',
          'It is mostly non-binding, but usually includes binding clauses such as confidentiality, exclusivity, and costs.',
          'Terms accepted in the term sheet tend to stick, so negotiate them properly rather than treating it as a formality.',
          'Have a solicitor review it before signing, and keep any exclusivity period as short as is fair.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor review a term sheet before you sign.',
        ],
      },
    ],
  },
  {
    slug: 'the-safe-and-asa',
    title: 'The SAFE and the Advanced Subscription Agreement',
    teaser: 'When you want to raise quickly and delay the valuation, a SAFE or an advanced subscription agreement is often the tool. This lesson explains how they work.',
    level: 'Beginner',
    readMins: 7,
    order: 3,
    sections: [
      {
        heading: 'What a SAFE is',
        body: [
          'At the earliest stage, agreeing a valuation can be hard, and setting up a full priced round can be slow and costly. A **SAFE**, and its close UK relative the advanced subscription agreement, let an investor put money in now and receive shares later, when a future priced round sets the value.',
          'SAFE stands for Simple Agreement for Future Equity. An investor pays now, and in exchange the company promises to issue them shares in the future, usually when the next priced round happens. A SAFE is not a loan. It carries no interest and no repayment date. It simply sits in place until the event that converts it into shares.',
          'Because there is no valuation set today, a SAFE usually carries a valuation cap, which is the maximum valuation at which the investor’s money will convert into shares. The cap rewards the early investor for taking early risk. A SAFE may also include a discount, which gives the early investor a reduction on the price of the next round.',
        ],
      },
      {
        heading: 'The UK version: the advanced subscription agreement',
        body: [
          'SAFEs came from the United States and are very common there. In the United Kingdom, a similar document called an advanced subscription agreement, or ASA, is often used instead. An ASA works on the same idea: money now, shares later, at the next round, usually with a cap or discount.',
          'There is an important difference to understand. To keep the tax reliefs SEIS and EIS available, which many UK investors value, an ASA generally must convert into shares within a set period, often no more than six months, and the money must not be repayable. This is one reason UK early-stage raises often use a carefully drafted ASA rather than a standard US SAFE.',
        ],
      },
      {
        heading: 'What converts a SAFE or ASA',
        body: [
          'The usual trigger is the next qualifying priced round. When that round happens and sets a valuation, the SAFE or ASA converts into shares, applying the cap or discount to work out how many shares the early investor receives. Read the conversion terms, because they decide exactly what the early investor ends up owning.',
        ],
      },
      {
        heading: 'What to watch',
        body: [
          'Understand how the cap and any discount interact, because together they set how much of the company the early investor eventually gets, and stacking several SAFEs with low caps can dilute founders more than expected at conversion. Keep track of every SAFE or ASA you issue, because they all convert later and their combined effect can surprise you if you have not modelled it. And if SEIS or EIS matters to your investors, make sure the document is drafted to preserve eligibility.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A SAFE lets an investor pay now for shares later at the next priced round, with no interest and no repayment date.',
          'The UK equivalent, an advanced subscription agreement, works similarly but usually must convert within a set period to preserve SEIS and EIS eligibility.',
          'A cap sets the maximum conversion valuation, and a discount reduces the next round’s price; together they decide the early investor’s eventual stake.',
          'Track every SAFE or ASA and model their combined conversion, and use careful drafting where tax relief matters.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. SAFEs and advanced subscription agreements should be drafted by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'the-convertible-loan-note',
    title: 'The Convertible Loan Note',
    teaser: 'A convertible note raises money now as a loan that turns into shares later. This lesson explains how it differs from a SAFE and when founders use it.',
    level: 'Beginner',
    readMins: 6,
    order: 4,
    sections: [
      {
        heading: 'What a convertible note is',
        body: [
          'A convertible loan note, often just called a convertible note, is another way to raise early money while delaying the valuation. Like a SAFE, it converts into shares at a later round. The key difference is that a convertible note is legally a loan, and that difference brings features a SAFE does not have.',
          'When an investor buys a convertible note, they are lending money to the company. That loan is intended to convert into shares at a future event, usually the next priced round, rather than being repaid in cash. Because it is a loan, a convertible note normally carries interest and a maturity date, sometimes called a longstop date, by which it either converts or must be dealt with. Like a SAFE, it usually carries a valuation cap, a discount, or both.',
        ],
      },
      {
        heading: 'Interest and the maturity date',
        body: [
          'The interest on a convertible note usually does not get paid in cash along the way. Instead it adds to the amount that converts into shares, so the investor ends up with slightly more shares to reflect the time their money was at work. The maturity date is the deadline. If no qualifying round has happened by then, the note terms decide what occurs, which might be conversion at a set valuation, an extension, or repayment. A note that falls due before you have raised your next round can create pressure at an awkward time.',
        ],
      },
      {
        heading: 'How it differs from a SAFE',
        body: [
          'The practical differences flow from the note being a loan. A note carries interest and a repayment deadline, while a SAFE carries neither. A note sits on the company’s books as debt until it converts, which affects how the company looks financially. And because it is a loan, a convertible note generally does not qualify for the SEIS and EIS tax reliefs that UK investors often want, whereas a carefully drafted advanced subscription agreement can.',
        ],
      },
      {
        heading: 'When founders use a note',
        body: [
          'Convertible notes are common where an investor wants the protections that come with being a lender, such as interest and a repayment right if things stall, or where the parties are comfortable with debt on the books for a while. They are also used for bridge financing, a short raise meant to carry a company between larger rounds.',
        ],
      },
      {
        heading: 'What to watch',
        body: [
          'Read the conversion terms, the cap and discount, the interest rate, and above all the maturity date, because that deadline is where notes cause founders the most trouble. Keep a clear record of every note issued and model how they all convert together, and take advice on the tax position, since the loan structure changes what reliefs are available.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A convertible note raises money as a loan that converts into shares at a later round.',
          'Being a loan, it usually carries interest and a maturity date, unlike a SAFE.',
          'Convertible notes generally do not qualify for SEIS and EIS relief, which often makes an ASA preferable in the UK.',
          'Watch the maturity date and the conversion terms, and model all notes together so their effect is never a surprise.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Convertible notes should be drafted and reviewed by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'the-subscription-agreement',
    title: 'The Subscription Agreement',
    teaser: 'In a priced round, the subscription agreement is the contract under which investors buy their shares. This lesson explains what it does and what it contains.',
    level: 'Beginner',
    readMins: 6,
    order: 5,
    sections: [
      {
        heading: 'What the subscription agreement does',
        body: [
          'When you raise a priced round, meaning you agree a valuation and issue shares now, the subscription agreement is the document that makes the purchase happen. It is the binding contract in which an investor agrees to subscribe for, meaning to buy, newly issued shares in your company at the agreed price. Where a SAFE or note delays the share purchase, a subscription agreement carries it out today.',
          'At its heart the agreement records a simple exchange: the investor pays the agreed amount, and the company issues them the agreed number of new shares at the agreed price. In a round with several investors, it usually lists all of them and the amount each is subscribing.',
        ],
      },
      {
        heading: 'Conditions to completion',
        body: [
          'The agreement often includes conditions that must be satisfied before the money changes hands and the shares are issued, such as adopting new articles, passing the necessary resolutions, or completing due diligence to the investor’s satisfaction. Founders should track these conditions closely, because the round does not complete until they are met.',
        ],
      },
      {
        heading: 'Warranties often live here',
        body: [
          'In many priced rounds, the founders and the company give warranties, formal statements that certain things are true, for example that the company is properly incorporated, owns its key assets, and has no undisclosed legal problems. These warranties frequently sit in the subscription agreement. If a warranty turns out to be untrue, the investor may have a claim, and the disclosure letter, covered later in this course, is how founders protect themselves by disclosing exceptions in advance.',
        ],
      },
      {
        heading: 'How it relates to the other documents',
        body: [
          'The subscription agreement works alongside the shareholders’ agreement and the articles. The subscription agreement handles the act of buying the shares, while the shareholders’ agreement and articles govern the ongoing relationship and the rights those shares carry. Investors usually sign all of these at completion, so they take effect together.',
        ],
      },
      {
        heading: 'What to watch',
        body: [
          'Pay attention to the warranties, since these are where your personal exposure often sits, and make sure anything that qualifies them is properly captured in the disclosure letter. Check the conditions to completion, and confirm that the share numbers, prices, and amounts match your cap table and the term sheet exactly.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The subscription agreement is the binding contract under which investors buy newly issued shares in a priced round.',
          'It records the amount, the number of shares, the price, and the timing of completion for each investor.',
          'It often contains conditions to completion and the warranties founders give, so read both closely.',
          'It works alongside the shareholders’ agreement and articles, and every figure must match your cap table and term sheet.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. A subscription agreement should be prepared and reviewed by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'shareholders-agreement-control',
    title: 'The Shareholders’ Agreement, Part One: Control',
    teaser: 'The shareholders’ agreement governs how your company is run after the money is in. This lesson covers the control side: the board, consent rights, and information.',
    level: 'Beginner',
    readMins: 7,
    order: 6,
    sections: [
      {
        heading: 'What the shareholders’ agreement is for',
        body: [
          'The shareholders’ agreement, often called the SHA, is one of the most important documents you will ever sign, because it sets the rules for how the company is governed once investors are on board. It answers a set of practical questions: who sits on the board, which decisions can the founders make alone, and what information must the company give its investors.',
        ],
      },
      {
        heading: 'The board',
        body: [
          'The board of directors makes the company’s most important decisions, so its make-up matters as much as who owns the shares. Early on, founders usually control the board. As investors come in, they may want a seat, and one investor seat at an early round is common. What you should guard against is giving away board control too early, because whoever controls the board controls the big decisions.',
        ],
      },
      {
        heading: 'Reserved matters and consent rights',
        body: [
          'Alongside the board, the SHA usually lists reserved matters, sometimes called consent matters: decisions the company cannot take without the approval of certain investors, such as raising more money, selling the company, taking on large debt, or spending above a set amount. Some reserved matters are normal and reasonable. The danger is a list so long and so tightly drawn that you cannot run the company without asking permission at every turn.',
        ],
      },
      {
        heading: 'Information rights',
        body: [
          'Investors will want regular information about the company: accounts, reports, and access to key numbers, usually on an agreed schedule. Be clear about the frequency and level of detail you are committing to, so that reporting is a manageable routine rather than a constant burden.',
        ],
      },
      {
        heading: 'Founder commitments',
        body: [
          'The SHA often includes commitments from the founders, such as agreeing to work full time on the company and not to compete with it. Investors ask for these because at the early stage they are backing the founders above all, and they want to know the team is committed.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The shareholders’ agreement is a private contract that governs how the company is run after investment.',
          'Guard board control, and understand exactly how many seats each side holds.',
          'Reserved matters give investors a say on major decisions; keep the list reasonable so you can still run the company.',
          'Agree information rights and founder commitments you can genuinely meet, then honour them.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. A shareholders’ agreement should be prepared and reviewed by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'shareholders-agreement-shares-and-exits',
    title: 'The Shareholders’ Agreement, Part Two: Shares and Exits',
    teaser: 'The second half of the shareholders’ agreement governs what happens to shares over time: how they move, and what happens when the company is sold or a founder leaves.',
    level: 'Beginner',
    readMins: 7,
    order: 7,
    sections: [
      {
        heading: 'Restrictions on transferring shares',
        body: [
          'A private company does not want shares moving to just anyone, so the SHA restricts how shares can be transferred. The most common tool is pre-emption on transfers, which means that a shareholder wanting to sell must first offer their shares to the existing shareholders before selling to an outsider. This keeps ownership within the known group.',
        ],
      },
      {
        heading: 'Tag-along and drag-along',
        body: [
          'Two linked provisions deal with a sale of the company. A tag-along right lets minority shareholders join a sale on the same terms if larger holders sell, so a small investor cannot be left behind. A drag-along right lets a majority force the minority to join a sale, so a small holder cannot block a good exit that most owners want. Know the thresholds that trigger each one.',
        ],
      },
      {
        heading: 'Leaver provisions and vesting',
        body: [
          'Investors frequently require that founders earn their shares over time, known as vesting, typically over several years. If a founder leaves early, leaver provisions decide what happens to their unvested shares, and sometimes their vested ones. A distinction is often drawn between a good leaver, who leaves for reasons like ill health, and a bad leaver, who leaves in circumstances that justify harsher treatment. Negotiate the details, such as credit for time already served.',
        ],
      },
      {
        heading: 'Anti-dilution and pre-emption on new shares',
        body: [
          'The SHA usually gives investors pre-emption rights on new shares, meaning that when the company issues more shares in a future round, existing investors get the chance to buy enough to maintain their percentage. Some agreements also include anti-dilution protection, which shields investors if the company later raises at a lower valuation. The detailed negotiation of anti-dilution is covered in the advanced Founder track, but you should know the term exists and where it lives.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The SHA restricts share transfers, usually through pre-emption, to keep ownership within the known group.',
          'Tag-along and drag-along rights keep a sale of the company fair and possible.',
          'Leaver provisions and vesting decide what happens to a founder’s shares if they leave, so negotiate the details.',
          'Pre-emption on new shares and anti-dilution protect investors’ stakes in future rounds; know where these terms sit.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. A shareholders’ agreement should be prepared and reviewed by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'articles-of-association',
    title: 'The Articles of Association',
    teaser: 'The articles are your company’s public constitution. This lesson explains what they contain and how they relate to the shareholders’ agreement.',
    level: 'Beginner',
    readMins: 6,
    order: 8,
    sections: [
      {
        heading: 'What the articles cover',
        body: [
          'The articles of association are the constitution of your company. They set the rules for how the company operates, and unlike the shareholders’ agreement, they are filed publicly at the company registry, so anyone can read them. They define the classes of shares and the rights attached to each, how directors are appointed, and how meetings and votes work.',
        ],
      },
      {
        heading: 'Share classes',
        body: [
          'Before a raise, many companies have a single class of ordinary shares. When investors come in, new share classes are often created, such as preference shares that carry special rights, for example a liquidation preference deciding who is paid first if the company is sold. The articles are where these classes and their rights are formally defined.',
        ],
      },
      {
        heading: 'How the articles relate to the shareholders’ agreement',
        body: [
          'The articles and the shareholders’ agreement must line up, because they cover overlapping ground. The difference is in their nature: the articles are public and bind the company itself, while the shareholders’ agreement is private and binds the shareholders who sign it. Your solicitor makes sure they are consistent, and an investor’s lawyers will check.',
        ],
      },
      {
        heading: 'Public versus private',
        body: [
          'A useful way to think about it is that the articles are the version of your rules the world can see, while the shareholders’ agreement holds the terms the parties prefer to keep private. Sensitive commercial terms are often kept in the agreement rather than the articles for this reason.',
        ],
      },
      {
        heading: 'Adopting new articles',
        body: [
          'Adopting new articles is a formal act that requires shareholder approval, usually by a special resolution, and the new articles must then be filed at the company registry. This is one of the steps that happens at completion of a raise, and it is covered again in the lesson on resolutions and the lesson on filings.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The articles of association are the company’s public constitution, filed at the company registry.',
          'They define share classes and their rights, and the rules for directors, meetings, and votes.',
          'The articles bind the company and are public, while the shareholders’ agreement is private and binds the shareholders; the two must be consistent.',
          'Adopting new articles requires shareholder approval and a filing, and usually happens at completion of a raise.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Articles of association should be prepared and reviewed by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'cap-table-and-register-of-members',
    title: 'The Cap Table and the Register of Members',
    teaser: 'Two records track who owns your company: the cap table you manage, and the register of members that is the legal truth. This lesson explains both and why they must agree.',
    level: 'Beginner',
    readMins: 6,
    order: 9,
    sections: [
      {
        heading: 'The cap table',
        body: [
          'The capitalisation table, or cap table, lists every shareholder and the number and percentage of shares they hold. Early on it might be just two founders. After a raise it adds the new investors and shows how everyone’s percentage has changed. The cap table is your management tool for understanding ownership, modelling how a new round would dilute existing holders, and planning future raises.',
          'A good cap table also tracks the instruments that will become shares later, such as SAFEs, advanced subscription agreements, and convertible notes, and any share options, giving you a fully diluted picture of ownership, which is what investors look at.',
        ],
      },
      {
        heading: 'The register of members',
        body: [
          'The register of members is the company’s official, legal record of who its shareholders are. This, not the cap table spreadsheet, is what legally determines ownership. When shares are issued at completion of a raise, they must be entered in the register of members, and share certificates are usually issued to the holders.',
        ],
      },
      {
        heading: 'Why they must agree',
        body: [
          'The cap table and the register of members should always tell the same story. The register is the legal truth, and the cap table should mirror it while adding the management detail and the forward-looking modelling. When the two drift apart, ownership becomes uncertain, which alarms investors and derails future rounds.',
        ],
      },
      {
        heading: 'Why investors check this closely',
        body: [
          'An investor running diligence will look hard at your ownership records, because they are about to become part of them. A messy or inconsistent cap table suggests you do not have control of your own company. A clean, clear, fully diluted cap table that matches your register signals a founder who is organised and trustworthy.',
        ],
      },
      {
        heading: 'Keeping it right',
        body: [
          'Update both records every time ownership changes, whether through a raise, a share issue, an option grant, or a transfer. Store them in your data room so investors can see them, and make updating the register and the cap table part of your completion checklist.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The cap table is your working record of ownership and your tool for modelling dilution; the register of members is the legal record.',
          'A good cap table shows fully diluted ownership, including SAFEs, ASAs, notes, and options.',
          'The two records must always agree, because drift between them creates ownership uncertainty.',
          'Investors scrutinise ownership records closely, so keep both clean, current, and matching.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Maintaining statutory registers should be done with a solicitor or company secretary.',
        ],
      },
    ],
  },
  {
    slug: 'warranties-and-disclosure-letter',
    title: 'Warranties and the Disclosure Letter',
    teaser: 'Warranties are your formal promises that certain things are true. The disclosure letter is how you protect yourself. This lesson explains both and why they matter to founders personally.',
    level: 'Beginner',
    readMins: 7,
    order: 10,
    sections: [
      {
        heading: 'What warranties are',
        body: [
          'In many priced rounds, founders and the company give warranties to investors, and alongside them sits a disclosure letter. A warranty is a formal statement that something is true, given as part of the contract — for example, that the company is properly incorporated, that it owns its key assets and intellectual property, that its accounts are accurate, and that it has complied with the laws that apply to it.',
          'The reason warranties matter is that if one turns out to be untrue, the investor may have a claim against whoever gave it. Founders should read every warranty carefully and make sure they can genuinely stand behind each one, rather than signing a long list without checking.',
        ],
      },
      {
        heading: 'What the disclosure letter does',
        body: [
          'No company is perfect, and some warranties will not be completely true as written. This is where the disclosure letter comes in. It is the document in which the founders tell the investor, in advance, about any exceptions to the warranties. Anything properly disclosed cannot later be treated as a breach of warranty, because the investor knew about it and invested anyway.',
        ],
      },
      {
        heading: 'Why founders must take this seriously',
        body: [
          'Because warranties can create personal liability, and because the disclosure letter is your shield, this pair deserves real care. It is better to over-disclose a minor issue than to stay silent and risk a claim later. Work through each warranty and ask whether there is anything the investor should know, then disclose it clearly.',
        ],
      },
      {
        heading: 'Negotiating warranties',
        body: [
          'Founders can and do negotiate the scope of warranties. It is reasonable to limit them to matters within your knowledge, to cap the total liability they can create, and to set a time limit after which claims can no longer be brought. A solicitor experienced in these deals will help you negotiate sensible limits.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Warranties are formal statements that certain things about the company are true, and an untrue one can create a claim.',
          'The disclosure letter records exceptions to the warranties in advance, and anything properly disclosed cannot later be treated as a breach.',
          'Be thorough and honest in disclosure, because every gap is a gap in your protection.',
          'Negotiate sensible limits on warranties, such as knowledge qualifiers, a liability cap, and a time limit for claims.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Warranties and disclosure letters carry personal risk and should be handled with a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'board-and-shareholder-resolutions',
    title: 'Board and Shareholder Resolutions',
    teaser: 'Issuing shares and changing your company are formal acts that need approval. This lesson explains the resolutions that give a raise its legal authority.',
    level: 'Beginner',
    readMins: 6,
    order: 11,
    sections: [
      {
        heading: 'The two kinds of resolution',
        body: [
          'A raise makes real changes to your company: new shares are created, new articles are adopted, and new agreements take effect. Each of these changes has to be formally approved to be valid, and that approval is recorded in resolutions.',
          'There are two main kinds. Board resolutions are decisions made by the directors, who run the company day to day. Shareholder resolutions are decisions made by the owners of the company, who must approve the biggest changes. A raise typically needs both. Resolutions can be passed at a meeting or, very commonly for small companies, in writing.',
        ],
      },
      {
        heading: 'What resolutions a raise needs',
        body: [
          'The directors normally resolve to approve the deal documents and to allot the new shares once they have the authority to do so. The shareholders usually need to approve certain things, such as granting the directors authority to issue the new shares, setting aside existing shareholders’ first refusal on new shares, and adopting the new articles of association.',
        ],
      },
      {
        heading: 'Why they matter',
        body: [
          'Resolutions are the legal authority for the changes a raise makes. If shares are issued without the proper authority, or articles are changed without the proper approval, the company’s records can be defective, and that causes problems later, especially when a future investor runs diligence and finds that a past step was not done correctly.',
        ],
      },
      {
        heading: 'Ordinary and special resolutions',
        body: [
          'Shareholder resolutions come in different types depending on how significant the decision is. Some decisions can be passed by a simple majority, while more significant ones, such as adopting new articles, require a higher threshold. The more fundamental the change, the greater the level of shareholder approval it requires.',
        ],
      },
      {
        heading: 'Keeping the records',
        body: [
          'Once passed, resolutions become part of your company’s records, and some must be filed with the company registry. Keep signed copies safely, store them in your data room, and treat them as part of the permanent record of your company.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Board resolutions are decisions of the directors; shareholder resolutions are decisions of the owners, and a raise usually needs both.',
          'Resolutions can be passed at a meeting or, commonly for small companies, in writing.',
          'A raise typically needs approval to grant share-issue authority, to set aside existing shareholders’ first refusal, and to adopt new articles.',
          'Resolutions are the legal authority for the raise; getting them right keeps your records clean for future rounds.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Company resolutions should be prepared with a qualified solicitor or company secretary.',
        ],
      },
    ],
  },
  {
    slug: 'intellectual-property-assignments',
    title: 'Intellectual Property Assignments',
    teaser: 'Investors want the company to own what it relies on. This lesson explains IP assignments and why missing ones are one of the most common problems in a raise.',
    level: 'Beginner',
    readMins: 6,
    order: 12,
    sections: [
      {
        heading: 'What intellectual property assignment means',
        body: [
          'For most startups, the intellectual property is the company. The code, the brand, the designs, and the content are what give the business its value. Under the law in many countries, the person who creates something often owns it by default, unless it has been transferred. An intellectual property assignment is a document in which the creator formally transfers their ownership to the company, so that the company clearly owns what it uses.',
        ],
      },
      {
        heading: 'Where the gaps usually appear',
        body: [
          'A few situations commonly leave IP in the wrong place. Work a founder created before incorporating the company may never have been formally transferred in. Contractors and freelancers who built part of the product may own what they made unless their contract assigned it to the company. Even employees, in some cases, need clear assignment terms in their contracts.',
        ],
      },
      {
        heading: 'Why investors care so much',
        body: [
          'If the company does not clearly own its core intellectual property, then what an investor is buying is not fully in the company’s hands. Investors know this risk well, so they check IP ownership carefully. Unresolved IP is not just a legal technicality to them. It is a question about whether the company truly owns its most valuable asset.',
        ],
      },
      {
        heading: 'Getting it right',
        body: [
          'Make sure every founder has assigned to the company any relevant IP they created. Make sure contractor and freelancer agreements include proper assignment of what they produce. Where past work was never assigned, put an assignment in place now, before diligence, rather than being caught out during it.',
        ],
      },
      {
        heading: 'Keep the evidence',
        body: [
          'Once your IP is properly assigned, keep the documents that prove it: the founder assignments, the contractor agreements, and the relevant employment terms. Store them in your data room so an investor can confirm ownership quickly.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The creator of work often owns it by default, so code, designs, and content may not belong to the company unless assigned.',
          'Gaps commonly appear with founder work created before incorporation, and with contractors and freelancers.',
          'Investors treat unresolved IP as a serious risk, because it questions whether the company owns its core asset.',
          'Assign all relevant IP to the company, fix past gaps before diligence, and keep the evidence in your data room.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Intellectual property assignments should be prepared by a qualified solicitor.',
        ],
      },
    ],
  },
  {
    slug: 'kyc-aml-and-verification-documents',
    title: 'KYC, AML, and Verification Documents',
    teaser: 'Money will not move until identities are verified. This lesson explains the identity and anti-money-laundering documents that a raise now requires.',
    level: 'Beginner',
    readMins: 6,
    order: 13,
    sections: [
      {
        heading: 'Why these checks exist',
        body: [
          'Modern fundraising involves checks on who everyone is and where the money comes from, known as know your customer, or KYC, and anti-money-laundering, or AML, requirements. Because a raise moves money between people and across borders, it is exactly the kind of activity these rules are designed to cover. Payment providers, escrow providers, and platforms are legally required to run these checks, so they are not optional and not a sign of distrust.',
        ],
      },
      {
        heading: 'What documents are involved',
        body: [
          'The typical documents fall into a few types. Proof of identity, such as a passport or national identity card, confirms who a person is. Proof of address, such as a recent utility bill or bank statement, confirms where they live. For companies, documents confirming the company’s existence and its ownership are needed, including who ultimately owns and controls it. In some cases, evidence of the source of the funds being invested is required.',
        ],
      },
      {
        heading: 'Who gets checked',
        body: [
          'Founders and the company are usually checked as part of onboarding to a platform or an escrow arrangement. Investors are typically checked before their money is accepted, which is why an investor may need to complete verification before they can commit. On WAAW, this verification is built into the process, and it is part of what protected escrow depends on.',
        ],
      },
      {
        heading: 'How to make it smooth',
        body: [
          'The checks are quicker when you are prepared. Have clear, current identity and address documents ready, make sure your company’s registration and ownership details are accurate and up to date, and be ready to explain your ownership structure if it is anything other than simple. Delays usually come from missing or out-of-date documents, or from unclear ownership arrangements.',
        ],
      },
      {
        heading: 'A note on privacy',
        body: [
          'These documents contain sensitive personal information, so they must be handled carefully and stored securely, in line with data protection rules. As a founder collecting or handling any such information, be mindful of your own data protection obligations, and rely on your provider’s secure processes rather than keeping sensitive documents loosely.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'KYC and AML checks are legal requirements that stop financial crime, and they apply to both founders and investors.',
          'Typical documents include proof of identity, proof of address, company ownership details, and sometimes source of funds.',
          'On a platform with escrow, verification is built in and is part of what makes it trustworthy.',
          'Prepare clear, current documents and accurate ownership details to keep checks fast, and handle sensitive information securely.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Follow the verification steps required by your platform and providers.',
        ],
      },
    ],
  },
  {
    slug: 'registry-filings-and-statutory-records',
    title: 'Registry Filings and Statutory Records',
    teaser: 'A raise changes the public record of your company. This lesson explains the filings and statutory records that keep everything official and correct.',
    level: 'Beginner',
    readMins: 6,
    order: 14,
    sections: [
      {
        heading: 'The company registry',
        body: [
          'Issuing shares and changing your company are not only private acts between you and your investors. They also update the public record held by the company registry. Every company is recorded at a public registry — in the United Kingdom this is Companies House, and in Nigeria it is the Corporate Affairs Commission. When a raise changes any of these, the registry must be updated so the public record stays accurate.',
        ],
      },
      {
        heading: 'The filings a raise triggers',
        body: [
          'Several filings commonly arise from a raise. When new shares are issued, a return recording that share issue is filed, so the registry reflects the new share capital. When you adopt new articles of association, the updated articles are filed. Changes in who significantly owns or controls the company may need to be recorded as well.',
        ],
      },
      {
        heading: 'Statutory registers',
        body: [
          'Alongside the public filings, your company must keep its own internal statutory registers. The most important for a raise is the register of members, the legal record of who owns shares. Companies also keep registers of directors and, in some jurisdictions, a register of the people who significantly control the company. These registers must be kept current and accurate, and they must agree with what is filed at the registry.',
        ],
      },
      {
        heading: 'Why this matters',
        body: [
          'Filings and registers might feel like pure administration, but they are load-bearing. If a share issue was never properly filed, or the register of members does not match what was actually issued, your company’s records are inconsistent. When a future investor runs diligence, these inconsistencies surface, raise doubts, and slow or even derail the round.',
        ],
      },
      {
        heading: 'Deadlines and good habits',
        body: [
          'Many filings have deadlines, and missing them can carry penalties, so they should be done promptly at completion rather than left for later. Treat filings and register updates as part of your closing checklist, done at the same time as issuing shares and updating your cap table.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Issuing shares and changing your company update the public record at the registry, such as Companies House or the Corporate Affairs Commission.',
          'A raise commonly triggers filings for the new share issue, the adopted articles, and changes in significant ownership.',
          'Companies must also keep accurate internal statutory registers, including the register of members, which must match what is filed.',
          'Filings have deadlines, so make them part of your closing checklist and keep records current for smoother future raises.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Registry filings and statutory records should be handled with a qualified solicitor or company secretary.',
        ],
      },
    ],
  },
  {
    slug: 'side-letters-options-and-the-complete-pack',
    title: 'Side Letters, Option Schemes, and the Complete Pack',
    teaser: 'A few remaining documents round out a raise, and then everything comes together into one organised pack. This final lesson covers both.',
    level: 'Beginner',
    readMins: 7,
    order: 15,
    sections: [
      {
        heading: 'Side letters',
        body: [
          'Most of a raise runs on the core documents covered so far, but a few others appear often enough to understand. A side letter is a short agreement that gives a particular investor rights that are additional to, or different from, the main documents — extra information rights, a right to invest again in future rounds, or a promise that they will get terms at least as good as any other investor. Keep a clear record of every side letter and make sure they are consistent with the shareholders’ agreement.',
        ],
      },
      {
        heading: 'Share option schemes',
        body: [
          'Recall from earlier that companies often set aside a pool of shares to give to future employees, called the option pool. A share option scheme is the set of documents that governs how those options work: who receives them, over what period they vest, and on what terms they can be exercised. In the United Kingdom, a widely used and tax-advantaged scheme for employees is called **EMI**, which offers favourable tax treatment when the conditions are met. Set the scheme up properly, because getting the tax treatment wrong is costly to fix.',
        ],
      },
      {
        heading: 'Other documents you may meet',
        body: [
          'Depending on your deal, a few more documents can appear: a directors’ service agreement or employment contract updated for founders, consents from existing shareholders or third parties, and any earlier instruments such as SAFEs, advanced subscription agreements, or convertible notes, which come back into play at a priced round when they convert.',
        ],
      },
      {
        heading: 'Assembling the complete pack',
        body: [
          'Once you understand every document, the final task is to bring them together into one organised place, your data room. Group the documents the way this course did: the deal terms, the governance documents, and the supporting paperwork. Make sure every figure agrees across documents, that the cap table matches the register, and that nothing is missing or out of date.',
        ],
      },
      {
        heading: 'Bringing the course together',
        body: [
          'You now know the full set of documents a raise involves, what each one does, and where the important choices sit. You do not need to draft them, and you should always have a qualified solicitor prepare and review them, but you can now open any document in your raise and understand what you are looking at.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Side letters give particular investors extra rights; keep a clear record of them and make sure they are consistent with the main documents.',
          'Share option schemes govern the option pool that rewards employees, and in the UK the EMI scheme offers tax advantages when conditions are met.',
          'Other documents, such as founder service agreements, consents, and converting instruments, may round out a deal.',
          'Assemble everything into one organised, consistent pack in your data room, since completeness and consistency signal a well-run company.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a qualified solicitor prepare and review your raise documents. This completes the WAAW Academy course The Documents Required: 15 lessons covering every document a founder meets in a raise, from the term sheet to the complete pack.',
        ],
      },
    ],
  },
];

const PITCH_DECK_LESSONS: AcademyLesson[] = [
  {
    slug: 'what-a-pitch-deck-is-for',
    title: 'What a Pitch Deck Is For',
    teaser: 'Before you build a single slide, you need to know what a deck is actually meant to do. Most founders misunderstand its job, and that is why most decks fail.',
    level: 'Beginner',
    readMins: 6,
    order: 1,
    image: { src: '/academy/deck-structure.svg', alt: 'Diagram of how a pitch deck is structured, from opening slide through to the ask' },
    sections: [
      {
        heading: 'The deck exists to earn the next meeting',
        body: [
          'A pitch deck is a short set of slides that presents your company to investors. What founders get wrong is the purpose. A deck is not there to explain everything about your business, and it is not there to close the investment by itself. Its job is narrower and more useful than that.',
          'The single most important idea in this course is this: your deck’s job is to earn the next conversation, not to win the money on its own. An investor who reads your deck and wants to learn more is a deck that has done its job perfectly. Almost no one commits capital from a deck alone. They commit after meetings, questions, and diligence. The deck opens that door.',
          'Once you accept this, you stop trying to cram everything in. You include only what an investor needs to become interested enough to take the next step. A lean deck that creates interest beats a heavy one that answers every question and bores the reader before they finish.',
        ],
      },
      {
        heading: 'Two versions of the same deck',
        body: [
          'In practice you will use your deck in two ways. The send version is the deck an investor reads on their own, with no one to explain it, so it must make sense by itself. The present version is the deck you talk through in a meeting, where your words carry much of the message and the slides support you. The send version usually needs a little more text so it stands alone, while the present version can be sparer.',
        ],
      },
      {
        heading: 'What makes a deck work, and what makes it fail',
        body: [
          'A deck works when an investor comes away understanding, quickly, what you do, why it matters, and why you could win. It works when it raises the right questions rather than answering all of them, and when it leaves the reader wanting the meeting. Clarity and momentum matter far more than polish or completeness.',
          'Decks fail for predictable reasons, most of which come back to misunderstanding the job: trying to explain everything and overwhelming the reader, leading with detail before the reader knows why to care, hiding the important points among the minor ones, and being so dense that no one reads to the end.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A pitch deck’s job is to earn the next conversation, not to close the investment by itself.',
          'Accepting this lets you build a lean deck that creates interest rather than a heavy one that answers everything.',
          'You will use two versions: a send version that stands alone and a present version you talk through.',
          'Decks work when they bring clarity and momentum, and fail when they overwhelm, bury the point, or run too dense.',
        ],
      },
    ],
  },
  {
    slug: 'the-narrative-arc',
    title: 'The Narrative Arc Behind the Deck',
    teaser: 'A deck is not a pile of slides. It is a story with a shape. This lesson gives you the arc that every strong deck follows, so your slides pull in one direction.',
    level: 'Beginner',
    readMins: 6,
    order: 2,
    image: { src: '/academy/narrative-arc.svg', alt: 'Diagram of the narrative arc from problem through proof to the ask' },
    sections: [
      {
        heading: 'The shape of the story',
        body: [
          'The best decks feel like they are going somewhere. Each slide leads naturally to the next, and by the end the investor has been carried from a problem to an opportunity they want to be part of. That feeling comes from a narrative arc, a deliberate order that turns separate slides into one argument.',
          'A pitch deck tells a simple story in a reliable order: a problem that matters, a solution to that problem, why now is the moment for that solution to win, proof with evidence that it is working, and an ask — the capital you need and what it will achieve. Woven through are the market, the team, and the model.',
        ],
      },
      {
        heading: 'Tension and release',
        body: [
          'Good storytelling runs on tension and release, and a deck is no different. The problem slide should create a real sense that something is wrong or missing, so the investor feels the gap. The solution then releases that tension by showing how you close it. If you show the solution before the investor feels the problem, there is no tension to release, and the solution lands flat.',
        ],
      },
      {
        heading: 'Every slide serves the arc',
        body: [
          'Once you hold the arc in mind, each slide has a clear job: to move the story one step forward. A slide that does not advance the argument is a slide to cut. For every slide, ask what step of the story it carries. If you cannot answer, the slide is decoration.',
        ],
      },
      {
        heading: 'The arc adapts, the shape stays',
        body: [
          'The exact slides can vary — some companies need a strong product slide, others lean on traction. But the underlying shape, from problem through proof to ask, stays remarkably constant across strong decks. Learn the shape first, then adapt the emphasis to your company.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A deck is a story with a shape, not a collection of separate slides.',
          'The reliable arc runs from problem, to solution, to why now, to proof, to the ask, with market, team, and model woven through.',
          'Storytelling runs on tension and release, so make the investor feel the problem before you show the solution.',
          'Every slide should move the story one step forward; if a slide does not, cut it.',
        ],
      },
    ],
  },
  {
    slug: 'the-opening-slide',
    title: 'The Opening Slide',
    teaser: 'The first slide sets the tone and answers one question in the reader’s mind: what is this? This lesson shows you how to open with clarity rather than mystery.',
    level: 'Beginner',
    readMins: 6,
    order: 3,
    sections: [
      {
        heading: 'Say what you do in one line',
        body: [
          'The opening slide is the first thing an investor sees, and first impressions form fast. Many founders waste it on a logo and a vague tagline that could belong to any company. A strong opening slide does something simple and powerful: it tells the reader, in one clear line, exactly what your company does.',
          'The heart of the opening slide is a single sentence that a stranger could understand. Not a clever slogan, but a plain description of what your company does and for whom. A useful test is whether someone outside your industry could read your one line and explain your company back to you.',
        ],
      },
      {
        heading: 'What belongs on the opening slide',
        body: [
          'Keep it clean. Your company name, your one-line description of what you do, and enough visual identity to look credible are usually enough. Some founders add a single strong image or a short phrase that captures the opportunity, which is fine as long as it does not crowd out the core message.',
        ],
      },
      {
        heading: 'What to avoid',
        body: [
          'Avoid the vague, aspirational tagline that says nothing concrete. Avoid burying what you do beneath imagery or design. And avoid trying to say too much — the opening slide is not the place to explain the whole business.',
        ],
      },
      {
        heading: 'Setting the tone',
        body: [
          'Beyond the words, the opening slide sets the emotional tone of your deck. A clean, confident, well-made first slide signals a founder who takes their company seriously. For a company presenting to diaspora investors who may not know you, that first impression of care and clarity matters.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The opening slide should tell the reader in one plain line exactly what your company does and for whom.',
          'Favour a clear description over a clever slogan, and test it on someone outside your industry.',
          'Keep the slide clean: name, one-line description, and enough identity to look credible.',
          'The first slide sets the tone, so a confident, uncluttered opening earns the reader’s attention.',
        ],
      },
    ],
  },
  {
    slug: 'the-problem-slide',
    title: 'The Problem Slide',
    teaser: 'The problem slide is where your story begins and where interest is won or lost. This lesson shows you how to make an investor feel the problem before you offer the cure.',
    level: 'Beginner',
    readMins: 6,
    order: 4,
    sections: [
      {
        heading: 'Make the problem specific and real',
        body: [
          'Every strong deck opens its argument with a problem. This is the slide that creates the tension the rest of the deck releases. Vague problems produce vague companies. A slide that shows a specific person or business, in a specific situation, losing time or money in a way the reader can picture, does the work.',
          'For a company building in African markets, this is an advantage you should use. You often understand a problem from the inside, in a way a distant investor does not. Bring that lived detail to the slide.',
        ],
      },
      {
        heading: 'Make the reader feel the gap',
        body: [
          'The goal of this slide is not just to state a problem but to make the reader feel that something is missing or broken. Good problem slides create a small sense of discomfort. That feeling is the tension your solution will release.',
        ],
      },
      {
        heading: 'Show the size and the stakes',
        body: [
          'A problem the investor feels is powerful, and a problem they can see affects many people is powerful and investable. Where you can, give a sense of how widespread the problem is and what it costs. Keep it honest, because inflated problem claims invite doubt rather than belief.',
        ],
      },
      {
        heading: 'Resist jumping to the solution',
        body: [
          'The most common mistake on the problem slide is rushing past it to talk about what you built. Slow down. The problem slide is where you earn the right to present your solution.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The problem slide creates the tension that your solution will release, so it is the foundation of the pitch.',
          'Make the problem specific and human, using the lived understanding you have of your market.',
          'Aim to make the reader feel that something is broken, not just read that a problem exists.',
          'Show the scale and stakes honestly, and resist rushing to the solution before the problem is felt.',
        ],
      },
    ],
  },
  {
    slug: 'the-solution-slide',
    title: 'The Solution Slide',
    teaser: 'The solution slide releases the tension the problem created. This lesson shows you how to present what you do simply, so the investor grasps it at once.',
    level: 'Beginner',
    readMins: 6,
    order: 5,
    sections: [
      {
        heading: 'Lead with clarity, not cleverness',
        body: [
          'After the problem comes the moment the reader has been waiting for: your solution. State, in plain terms, what your product does and how it solves the problem you just described. Resist the urge to show every feature or explain the technology in depth. Clarity beats completeness on this slide every time.',
        ],
      },
      {
        heading: 'Connect the solution directly to the problem',
        body: [
          'The solution slide should feel like the natural answer to the previous slide. If the problem was a specific person losing time or money in a specific way, the solution should show that same person’s life made better. When it drifts off to features unrelated to the stated problem, the argument weakens.',
        ],
      },
      {
        heading: 'Show, do not just tell',
        body: [
          'Where you can, show the solution rather than only describing it. A simple image of the product in use, or a short, clear example of the before and after, communicates faster than a paragraph of text.',
        ],
      },
      {
        heading: 'Keep the focus narrow, and do not oversell',
        body: [
          'A common mistake is trying to make the solution sound impressive by listing everything it can do. A solution that solves one clear problem well is more convincing than one that claims to solve many. Avoid grand claims that the solution is perfect or unbeatable — an honest, clearly explained solution is more persuasive.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The solution slide should be understood immediately, so lead with clarity rather than cleverness or detail.',
          'Connect the solution directly to the problem you raised, so the story clicks into place.',
          'Show the solution where you can, so the reader can picture it working, without a full product tour.',
          'Keep the focus narrow on solving one problem well, and present it honestly rather than overselling.',
        ],
      },
    ],
  },
  {
    slug: 'the-why-now-slide',
    title: 'The Why Now Slide',
    teaser: 'Investors do not just ask whether an idea is good. They ask why it will win now. This lesson shows you how to answer the most underrated question in your deck.',
    level: 'Beginner',
    readMins: 6,
    order: 6,
    sections: [
      {
        heading: 'Why timing matters so much',
        body: [
          'Many good ideas fail simply because they arrived too early or too late. The why now slide answers the question of timing: what has changed that makes this the right moment for your solution to succeed. Without one, even a strong idea can feel like it could have been built any time, which quietly weakens the case.',
        ],
      },
      {
        heading: 'What creates a why now',
        body: [
          'A why now usually comes from a shift in the world: a change in technology, a change in behaviour, a change in regulation that opens a door, or a change in the market. Your job is to identify the shift that makes your solution possible or necessary now, and to show that it is real and recent.',
        ],
      },
      {
        heading: 'The African market angle',
        body: [
          'For companies building in African markets, the why now is often genuinely strong, and you should lean into it. Rapid growth in mobile and internet use, the spread of mobile money, young and growing populations, and rising digital adoption have opened windows that did not exist a few years ago.',
        ],
      },
      {
        heading: 'Make it specific and evidenced, and do not force it',
        body: [
          'A weak why now is a vague gesture at things getting better. A strong one points to a specific, verifiable change and connects it directly to your company. If your why now is genuinely weak, it is better to keep the slide short and honest than to invent a dramatic shift that does not hold up.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The why now slide explains what has changed to make this the right moment for your solution.',
          'Strong timing turns a good idea into an urgent one, while a missing why now quietly weakens the case.',
          'A why now usually comes from a shift in technology, behaviour, regulation, or the market.',
          'African market shifts often make for a strong why now, so make the change specific, evidenced, and honest.',
        ],
      },
    ],
  },
  {
    slug: 'the-market-slide',
    title: 'The Market Slide',
    teaser: 'Investors need to believe the opportunity is big enough to matter. This lesson shows you how to size your market honestly and convincingly, without the empty billion-dollar claim.',
    level: 'Beginner',
    readMins: 7,
    order: 7,
    sections: [
      {
        heading: 'Why market size matters',
        body: [
          'The market slide answers a question every investor asks: if this works, how big can it get? Because most of their investments will fail, the ones that succeed must be able to grow large enough to make the whole effort worthwhile. A brilliant company in a tiny market cannot do that.',
        ],
      },
      {
        heading: 'The problem with top-down numbers',
        body: [
          'The classic weak market slide takes an enormous industry figure and claims a small slice of it, as if capturing one percent of a giant market were a plan. Investors have seen this a thousand times and it persuades no one, because it shows no real understanding of how you would actually win customers.',
        ],
      },
      {
        heading: 'Build the market from the bottom up',
        body: [
          'A far stronger approach is to build your market from the bottom up, starting from your actual customer. Work out who your specific customer is, how many of them there are, and what each would pay, then build up to a total from there. This produces a number you can defend under questioning.',
        ],
      },
      {
        heading: 'Layers of the market, and the African picture',
        body: [
          'It helps to think in layers: the whole market that could in theory use something like your product, the portion you can realistically reach, and the share you could plausibly win in the near term. For companies serving African markets, the market story can be genuinely large — use this, but ground it in your specific customer rather than gesturing at a continent.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Investors need to see that the opportunity is big enough that success would be significant.',
          'Avoid the weak top-down claim of a small slice of a giant industry figure.',
          'Build your market from the bottom up, starting from your real customer, for a number you can defend.',
          'Show the layers from the whole market to what you can win first, and keep African market sizing grounded and honest.',
        ],
      },
    ],
  },
  {
    slug: 'the-product-slide',
    title: 'The Product Slide',
    teaser: 'The product slide shows what you have actually built. This lesson helps you make it real and tangible without turning your deck into a manual.',
    level: 'Beginner',
    readMins: 6,
    order: 8,
    sections: [
      {
        heading: 'Show the product, do not describe it',
        body: [
          'By this point in the deck, the investor understands the problem, your solution, and why now is the moment. The product slide makes the solution concrete by showing what you have actually built. A clear image or two of your product in use communicates faster and more convincingly than paragraphs of description.',
        ],
      },
      {
        heading: 'Focus on what matters to the customer',
        body: [
          'Founders love their product and often want to show every feature. Resist this. The product slide should highlight the few things that matter most to the customer and that best show how the solution solves the problem. Depth of features belongs in the demo or the data room, not on this slide.',
        ],
      },
      {
        heading: 'Make it easy to grasp, and tie it back to the problem',
        body: [
          'Whoever is reading your deck may not know your field, so make the product easy to understand at a glance. Like the solution slide, the product slide is strongest when it clearly connects to the problem you raised.',
        ],
      },
      {
        heading: 'What if the product is early',
        body: [
          'Not every company has a polished product to show, and that is fine at an early stage. If your product is still basic or in progress, show what exists honestly, and be clear about what is built versus what is planned. An early but real product, shown honestly, is more convincing than a slick mockup of something that does not yet exist.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The product slide makes your solution tangible by showing what you have actually built.',
          'Show the product visually rather than describing it, so the reader can see it working.',
          'Focus on the few things that matter most to the customer, not every feature.',
          'Keep it easy to grasp, tie it back to the problem, and show early products honestly rather than faking polish.',
        ],
      },
    ],
  },
  {
    slug: 'the-traction-slide',
    title: 'The Traction Slide',
    teaser: 'Traction is the evidence that your solution works. This lesson shows you how to present it so it proves your story rather than just decorating it.',
    level: 'Beginner',
    readMins: 7,
    order: 9,
    sections: [
      {
        heading: 'What counts as traction',
        body: [
          'Traction is the evidence that the world wants what you are building. It is often the most powerful slide in a deck, because it turns claims into facts. It might be customers, revenue, users, growth in usage, retention, partnerships, or a waiting list. What matters is that it is real evidence that people value what you offer.',
        ],
      },
      {
        heading: 'Show momentum, not just a number',
        body: [
          'A single number is fine, but momentum is more convincing. If your customers, revenue, or usage have grown over time, show that growth, because a rising line tells a story of progress that a static figure does not.',
        ],
      },
      {
        heading: 'Be honest and specific',
        body: [
          'Traction is where honesty matters most, because these numbers can be checked in diligence. Present real figures, defined clearly. An investor who later finds that your traction was dressed up will lose trust in everything else.',
        ],
      },
      {
        heading: 'What if you have little traction',
        body: [
          'Early companies may have little to show, and that is expected. If your traction is thin, show what you have honestly and lean on other evidence of demand, such as strong interest from potential customers or results from early tests. Do not invent traction to fill the slide.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Traction is the evidence that your solution works, and it turns your claims into facts.',
          'Choose the measures that honestly show progress, such as customers, revenue, usage, retention, or growth.',
          'Show momentum where you have it, because a rising trend helps investors picture your future.',
          'Be specific and honest, since traction is checked in diligence, and connect it back to your story as proof.',
        ],
      },
    ],
  },
  {
    slug: 'the-business-model-slide',
    title: 'The Business Model Slide',
    teaser: 'The business model slide answers how you make money. This lesson shows you how to explain it clearly and show that the economics can work.',
    level: 'Beginner',
    readMins: 6,
    order: 10,
    sections: [
      {
        heading: 'Explain how you make money simply',
        body: [
          'At some point an investor needs to understand how your company makes money. State plainly how your company earns revenue — whether you charge customers directly, take a fee on transactions, sell a subscription, or make money some other way. If your model has several parts, lead with the main one.',
        ],
      },
      {
        heading: 'Show that the economics can work',
        body: [
          'Beyond how you charge, investors want a sense that the economics make sense — that over time you can earn more from a customer than it costs to win and serve them. Even early, a clear grasp of your economics builds confidence.',
        ],
      },
      {
        heading: 'Match the model to the market',
        body: [
          'Your business model has to fit the market you serve, and this deserves real thought for African markets. What customers can and will pay, and what payment methods are common, all shape which models work.',
        ],
      },
      {
        heading: 'Keep it honest and grounded, and connect it to the ask',
        body: [
          'An investor will probe the economics, so a model you can defend is worth more than one that merely looks attractive. If the investor understands how you make money and believes the economics can work, they can see how their capital helps you grow a real business — which makes the ask that follows far more convincing.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The business model slide explains, simply and concretely, how your company makes money.',
          'Show that you understand your economics, such as what a customer is worth and what it costs to win one.',
          'Match the model to your market, especially how African customers can and prefer to pay.',
          'Keep the model honest and grounded, and remember it sets up a more convincing ask later.',
        ],
      },
    ],
  },
  {
    slug: 'the-competition-slide',
    title: 'The Competition Slide',
    teaser: 'How you handle competition tells an investor how well you understand your market. This lesson shows you how to present competitors with confidence rather than denial.',
    level: 'Beginner',
    readMins: 6,
    order: 11,
    sections: [
      {
        heading: 'Never claim you have no competition',
        body: [
          'Sooner or later an investor wonders who else is solving this problem. The single worst thing you can do on this slide is claim you have no competition. Almost no company truly has none — even if no one offers exactly your product, customers are solving the problem some other way today.',
        ],
      },
      {
        heading: 'Show that you understand the landscape',
        body: [
          'A strong competition slide shows that you know who and what you are up against, including direct competitors, indirect ones, and the simple alternative of customers doing nothing or using a workaround.',
        ],
      },
      {
        heading: 'Explain why you win',
        body: [
          'The purpose of the competition slide is not just to list rivals but to show your advantage. What do you do that others do not, and why does it matter to the customer? Be specific and honest.',
        ],
      },
      {
        heading: 'The local advantage, and honesty about strong competitors',
        body: [
          'For companies building in African markets, a real and defensible advantage is often deep local understanding and presence. If there are strong, well-funded competitors, do not pretend they are weak — acknowledge them and explain how you coexist or win a specific part of the market.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Never claim you have no competition, because customers always solve the problem somehow today.',
          'Show you understand the full landscape, including direct, indirect, and do-nothing alternatives.',
          'Explain specifically and honestly why you win for your customer, rather than claiming to be better in every way.',
          'Lean on genuine local advantage in African markets, and be honest about strong competitors.',
        ],
      },
    ],
  },
  {
    slug: 'the-team-slide',
    title: 'The Team Slide',
    teaser: 'At the early stage, investors bet on people. This lesson shows you how to present your team so an investor believes you are the ones to win.',
    level: 'Beginner',
    readMins: 6,
    order: 12,
    sections: [
      {
        heading: 'Show why you, specifically',
        body: [
          'The earlier the stage, the more an investor is backing the team rather than the finished business. The heart of the team slide is founder-market fit: the reason you in particular are the right person or people to build this.',
        ],
      },
      {
        heading: 'Keep it relevant',
        body: [
          'A team slide is not a full biography of everyone. Show the key people and, for each, the one or two things that matter most for this company. Relevant experience is worth more than a long list of past roles.',
        ],
      },
      {
        heading: 'Show completeness, or be honest about gaps',
        body: [
          'Investors look for a team that covers the main things the company needs. If there are gaps, it is better to be honest and show that you understand what is missing and how you plan to fill it, than to pretend the team is complete.',
        ],
      },
      {
        heading: 'The diaspora and local advantage',
        body: [
          'For companies connecting the diaspora and African markets, your team can hold a distinctive strength: people who understand both worlds. If your team combines local market knowledge with skills or networks from elsewhere, that blend is valuable and worth highlighting.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'At the early stage, investors back the team, so the team slide is often more important than founders realise.',
          'Lead with founder-market fit: the specific reason you are the right people to solve this problem.',
          'Keep each person’s details relevant to the company, and be honest about gaps and how you will fill them.',
          'Highlight the diaspora and local advantage your team may hold, and present strengths confidently but honestly.',
        ],
      },
    ],
  },
  {
    slug: 'the-ask-and-use-of-funds-slide',
    title: 'The Ask and Use of Funds Slide',
    teaser: 'The ask is the point of the whole deck, yet founders often bury it. This lesson shows you how to state clearly what you want and what it will achieve.',
    level: 'Beginner',
    readMins: 6,
    order: 13,
    sections: [
      {
        heading: 'State the ask clearly',
        body: [
          'Every slide so far has been leading here. Say plainly how much you are raising — do not make the investor guess. A clear figure signals that you know what you need and have thought it through.',
        ],
      },
      {
        heading: 'Connect the money to milestones',
        body: [
          'The most important part of this slide is showing what the money will achieve. Investors do not fund survival, they fund progress. Connect the amount you are raising to the milestone it will reach.',
        ],
      },
      {
        heading: 'Show the use of funds, and size the ask to the plan',
        body: [
          'Alongside the milestone, show roughly how the money will be used, across the main areas such as building the product, growing the team, and reaching customers. The right amount is the one that reaches your next milestone with a sensible buffer, not the largest sum you could ask for.',
        ],
      },
      {
        heading: 'Do not bury it',
        body: [
          'Put the ask where it belongs, as a clear and confident slide, usually near the end where it completes the story. You are raising money, and there is no shame in asking for it plainly.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'State clearly how much you are raising, without making the investor guess.',
          'Connect the money to the milestone it will reach, because investors fund progress, not survival.',
          'Show a simple use of funds so the investor sees the capital has a deliberate plan.',
          'Size the ask to the plan, and present it as a clear, confident slide rather than burying it.',
        ],
      },
    ],
  },
  {
    slug: 'design-clarity-and-craft',
    title: 'Design, Clarity, and Craft',
    teaser: 'A deck’s content matters most, but its craft carries that content. This lesson covers the design and clarity that make a deck easy and pleasant to read.',
    level: 'Beginner',
    readMins: 7,
    order: 14,
    sections: [
      {
        heading: 'One point per slide',
        body: [
          'You now know what each slide should say. Good design does not mean fancy graphics — it means clarity. The most useful design rule is simple: each slide should make one clear point. If a slide tries to say three things, the reader absorbs none of them well.',
        ],
      },
      {
        heading: 'Less text, more clarity',
        body: [
          'Slides are not documents. A slide crammed with paragraphs will not be read, especially in a meeting where the investor is also listening to you. A short, clear headline supported by a simple visual beats a wall of text every time.',
        ],
      },
      {
        heading: 'Show numbers and ideas visually',
        body: [
          'Where you can, turn information into something visual. A simple chart shows growth better than a sentence about it. Visuals are not decoration, they are a faster way to communicate.',
        ],
      },
      {
        heading: 'Consistency, calm, and readability in seconds',
        body: [
          'A deck should feel like one considered piece, not a patchwork. A good test for any slide is whether its main point is clear within a few seconds — if not, simplify it until it is.',
        ],
      },
      {
        heading: 'Craft serves content, not the other way around',
        body: [
          'A beautiful deck with a weak argument still fails, and a plain deck with a strong, clear argument can succeed. Get the story and the slides right first, then craft them so that story comes through cleanly.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Give each slide one clear point, and split or cut slides that try to say too much.',
          'Use few words and let slides breathe, since slides crammed with text do not get read.',
          'Turn numbers and ideas into simple visuals, which communicate faster than paragraphs.',
          'Keep the deck consistent and readable in seconds, and let design serve the content rather than replace it.',
        ],
      },
    ],
  },
  {
    slug: 'tailoring-delivering-and-iterating',
    title: 'Tailoring, Delivering, and Iterating',
    teaser: 'A deck is not finished when it is built. This final lesson covers tailoring it to your audience, delivering it well, and improving it through feedback.',
    level: 'Beginner',
    readMins: 7,
    order: 15,
    sections: [
      {
        heading: 'Tailor to your audience',
        body: [
          'The same core deck can be tuned for different investors. Angels and syndicates often care most about the team and the story. A crowdfunding audience on a platform like WAAW may include less experienced investors alongside seasoned ones, so plain language and clear risk awareness matter even more. Adjust your emphasis, but never your honesty.',
        ],
      },
      {
        heading: 'The send version and the present version',
        body: [
          'Recall the two versions from the first lesson. The send version is read alone, so it needs enough words to make sense without you there. The present version supports you while you talk, so it can be sparer.',
        ],
      },
      {
        heading: 'Delivering the deck live',
        body: [
          'In a meeting, the deck supports you, it does not replace you. Open with your narrative, then let the conversation breathe rather than reading every slide aloud. Answer questions directly and honestly.',
        ],
      },
      {
        heading: 'Gather feedback and iterate',
        body: [
          'Your first deck will not be your best. Show it to a few trusted people and early investors, and watch closely. Notice where they get confused, and which questions come up again and again — those signals tell you exactly what to fix.',
        ],
      },
      {
        heading: 'Bringing the course together',
        body: [
          'A pitch deck is not a hurdle to clear once. It is a living tool that presents your company, opens doors, and gets better as you learn. Build it with care, use it with honesty, and keep sharpening it, and it will do its job: earning you the conversations that lead to a raise.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Tailor your emphasis to each audience, from angels to a diaspora crowdfunding audience, without changing your honesty.',
          'Keep both a send version that stands alone and a present version that supports you live.',
          'Deliver the deck as support, not a script: lead with the story, make key points early, and handle questions openly.',
          'Gather feedback and iterate, so your deck grows stronger across the raise.',
        ],
      },
    ],
  },
];

const VALUATION_LESSONS: AcademyLesson[] = [
  {
    slug: 'what-valuation-is-and-why-it-matters',
    title: 'What Valuation Is and Why It Matters',
    teaser: 'Valuation sits at the centre of every raise, yet it is one of the least understood parts of fundraising. This lesson explains what it is and why it shapes everything.',
    level: 'Beginner',
    readMins: 6,
    order: 1,
    sections: [
      {
        heading: 'Valuation is an agreement, not a fact',
        body: [
          'Valuation is the agreed value of your company for the purpose of a fundraising round. It is the number that decides how much of your company an investor receives for their money. Because of that, valuation shapes your ownership, your control, and how your future rounds unfold.',
          'An early-stage valuation is not a precise measurement of worth. It is a number that a founder and an investor agree on. Unlike a public company, whose value is set every second by a stock market, an early startup has no market price. Its valuation comes from negotiation, informed by evidence but ultimately settled by agreement.',
        ],
      },
      {
        heading: 'Why valuation matters to founders',
        body: [
          'For a founder, valuation decides how much of the company you give away for the money you raise. A higher valuation means you sell less ownership for the same amount, and a lower valuation means you sell more. Over several rounds, these choices add up to how much of your own company you still own by the time it matters.',
        ],
      },
      {
        heading: 'Why valuation matters to investors',
        body: [
          'For an investor, valuation decides how much of the company their money buys, and therefore how much they stand to gain if the company succeeds. Pay too high a valuation and even a good outcome may return little. Pay a fair one and the same outcome rewards them well.',
        ],
      },
      {
        heading: 'The tension at the heart of a raise',
        body: [
          'Because a higher valuation helps the founder and a lower one helps the investor, valuation is where the interests of the two sides meet and must be reconciled. A valuation that is fair to both sides sets up a healthy relationship, while one that either side feels was forced on them creates resentment that surfaces later.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Valuation is the agreed value of your company for a round, and it decides how much ownership an investor gets for their money.',
          'An early-stage valuation is a negotiated agreement, not a precise measurement of worth.',
          'For founders it shapes long-term ownership and control; for investors it shapes potential returns.',
          'Valuation is where founder and investor interests meet, so the goal is a fair number both can defend.',
        ],
      },
    ],
  },
  {
    slug: 'pre-money-and-post-money',
    title: 'Pre-Money and Post-Money',
    teaser: 'Two terms sit at the core of every valuation conversation. Confusing them is one of the most common and costly mistakes founders make. This lesson makes them clear.',
    level: 'Beginner',
    readMins: 6,
    order: 2,
    sections: [
      {
        heading: 'Pre-money and post-money valuation',
        body: [
          'Pre-money valuation is what your company is agreed to be worth before the new investment comes in. It is the starting value that the negotiation settles on.',
          'Post-money valuation is the pre-money valuation plus the money being raised. So if a company has a pre-money valuation of 900,000 and raises 100,000, its post-money valuation is 1,000,000. The post-money figure is what you use to work out ownership.',
        ],
      },
      {
        heading: 'How they decide ownership',
        body: [
          'The investor’s ownership is their investment divided by the post-money valuation. In the example above, the investor put in 100,000 and the post-money valuation is 1,000,000, so they own 10 percent. The pre-money valuation and the amount raised set the post-money, and the post-money sets the ownership.',
        ],
      },
      {
        heading: 'Why the confusion is costly',
        body: [
          'Imagine an investor offers to invest 100,000 at a valuation of 1,000,000. If that is a pre-money valuation, the post-money is 1,100,000, and the investor owns about 9 percent. If it is a post-money valuation, the investor owns 10 percent, and your pre-money was only 900,000. Always clarify whether a quoted valuation is pre-money or post-money before you agree, because assuming the wrong one can cost you real ownership.',
        ],
      },
      {
        heading: 'Get the number in writing',
        body: [
          'Make sure any valuation you discuss is clearly stated as pre-money or post-money, and that it is written down that way in your term sheet and documents. A clear record prevents an honest misunderstanding from becoming a dispute.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Pre-money valuation is your company’s agreed value before the new investment.',
          'Post-money valuation is the pre-money value plus the money raised.',
          'Ownership equals the investment divided by the post-money valuation.',
          'Always confirm whether a quoted valuation is pre-money or post-money, and record it clearly, because the difference changes how much you give away.',
        ],
      },
    ],
  },
  {
    slug: 'valuation-ownership-and-dilution',
    title: 'Valuation, Ownership, and Dilution',
    teaser: 'Valuation only matters because of what it does to ownership. This lesson connects the number to the share of the company you keep, now and over time.',
    level: 'Beginner',
    readMins: 6,
    order: 3,
    sections: [
      {
        heading: 'Valuation sets what you give away',
        body: [
          'An investor’s ownership is their money divided by the post-money valuation. This means the valuation directly sets the slice you sell. Raise a fixed amount at a higher valuation, and you give away a smaller slice. Raise the same amount at a lower valuation, and you give away more.',
        ],
      },
      {
        heading: 'The amount and the valuation work together',
        body: [
          'It is a mistake to think about valuation on its own. What you give away depends on both the amount you raise and the valuation. When you plan a raise, think in terms of the percentage of the company you are willing to sell, then work out which combinations of amount and valuation fit within that.',
        ],
      },
      {
        heading: 'What dilution means, and why the pie can grow',
        body: [
          'Dilution is the reduction in your ownership percentage when the company issues new shares. This is normal and expected. Every founder is diluted as they raise. The reason dilution is acceptable is that a good raise grows the company: if selling 10 percent brings in money that helps it become several times more valuable, your remaining 90 percent can be worth far more than your original 100 percent was.',
        ],
      },
      {
        heading: 'Ownership is a long game',
        body: [
          'Because you will likely raise more than once, your ownership is shaped by a series of valuations over time, not a single one. Each round dilutes you further, and each valuation decides by how much. Your valuation and your raise amount together decide your ownership, and ownership is something you steward over years.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Valuation directly sets the slice of the company you give away for the money you raise.',
          'The amount raised and the valuation work together, so think in terms of the percentage you are willing to sell.',
          'Dilution, the fall in your percentage as new shares are issued, is normal and unavoidable when you raise.',
          'A good raise grows the whole company, so a smaller slice of a much larger pie can be worth far more.',
        ],
      },
    ],
  },
  {
    slug: 'what-determines-an-early-stage-valuation',
    title: 'What Determines an Early-Stage Valuation',
    teaser: 'If early valuation is a negotiation, what actually shapes the number? This lesson covers the real drivers behind an early-stage valuation.',
    level: 'Beginner',
    readMins: 7,
    order: 4,
    sections: [
      {
        heading: 'The team, traction, and the size of the opportunity',
        body: [
          'At the earliest stage, before much is built, the team is one of the strongest drivers of valuation. A team with relevant experience or a clear reason they are the right people to win can command a higher valuation, because investors are backing people above all.',
          'Traction, the evidence that customers want what you are building, moves valuation more than almost anything once you have it. A company with real traction can justify a higher valuation than an otherwise identical company with only an idea.',
          'How large your market could be shapes valuation, because investors are looking for companies that can become big. A credible path to a large opportunity supports a higher valuation, while a small or uncertain market pulls it down.',
        ],
      },
      {
        heading: 'The strength of investor interest',
        body: [
          'One of the most powerful and least discussed drivers is how much demand you have created. When several investors want to invest, you can command a higher valuation, because interest signals value and gives you alternatives. When you have only one interested investor, your negotiating position is weak and your valuation suffers.',
        ],
      },
      {
        heading: 'The stage and the comparables',
        body: [
          'Valuations tend to cluster by stage and by region. Investors have a sense of what companies at your stage, in your market, typically raise at, and this frames the conversation. Knowing the typical range for your stage and region helps you set a realistic expectation.',
        ],
      },
      {
        heading: 'Risk is the thread that connects them',
        body: [
          'Underneath all these drivers is a single idea: risk. Everything that reduces the perceived risk of your company supports a higher valuation, because the investor is taking a safer bet. If you want to understand or improve your valuation, ask what would make an investor see your company as less risky, and work on that.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Early valuation is shaped by the team, traction, the size of the opportunity, investor demand, and the typical range for your stage and region.',
          'Strong investor interest is one of the most powerful and underrated drivers, since it gives you alternatives.',
          'Underlying all the drivers is perceived risk: lower risk supports a higher valuation.',
          'To improve your valuation, work on the things that make an investor see your company as a safer bet.',
        ],
      },
    ],
  },
  {
    slug: 'why-valuing-early-startups-is-hard',
    title: 'Why Valuing Early Startups Is Hard',
    teaser: 'Valuing an early company is genuinely difficult, and pretending otherwise leads founders astray. This lesson explains why, and what to do about it.',
    level: 'Beginner',
    readMins: 6,
    order: 5,
    sections: [
      {
        heading: 'There is little to measure, and the future is deeply uncertain',
        body: [
          'A mature company can be valued from its profits, its assets, and its steady cash flows. An early startup often has none of these in meaningful amounts, which is why early valuation relies so much on judgement and negotiation rather than calculation.',
          'The value of a startup lies almost entirely in what it might become, not in what it is today. But what it might become is deeply uncertain — most startups fail, a few succeed modestly, and a very small number succeed enormously. Any early valuation is really a rough bet on an uncertain future, dressed up as a number.',
        ],
      },
      {
        heading: 'Projections cannot be trusted',
        body: [
          'Founders often build financial projections showing rapid growth, and these can be useful for showing how you think. But everyone knows early projections are usually wrong, often by a wide margin. An investor will not value your company by taking your projections at face value.',
        ],
      },
      {
        heading: 'So valuation becomes negotiation',
        body: [
          'Because there is little hard data and the future is so uncertain, early valuation ends up being settled by negotiation, guided by the drivers from the last lesson and by what similar companies have raised at. Accepting that valuation is a reasoned negotiation rather than a precise science frees you to focus on what actually moves it: reducing risk and building demand.',
        ],
      },
      {
        heading: 'What this means for founders',
        body: [
          'Hold your valuation with appropriate humility and flexibility. Do not cling to a precise number as if it were a measured truth. Instead, understand the range that fits your stage and drivers, aim within it, and be ready to justify your number with the evidence you have.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Early startups have little revenue, few assets, and an uncertain future, so the usual valuation tools have little to work with.',
          'A startup’s value lies in what it might become, and that range of outcomes is very wide.',
          'Early projections are known to be unreliable, so investors will not value you on them alone.',
          'Early valuation is therefore a reasoned negotiation under uncertainty, best approached with humility, a sensible range, and evidence.',
        ],
      },
    ],
  },
  {
    slug: 'an-overview-of-valuation-methods',
    title: 'An Overview of Valuation Methods',
    teaser: 'There are several recognised ways to estimate a startup’s value. This lesson maps them out, so you know which apply at your stage and which do not.',
    level: 'Beginner',
    readMins: 7,
    order: 6,
    sections: [
      {
        heading: 'Methods that suit later or profitable companies',
        body: [
          'Some valuation methods work well for mature businesses but poorly for early startups. Valuing a company from its profits or its steady cash flows needs profits and cash flows that early startups usually lack. It is worth knowing these methods exist, and knowing they are not the main tools for valuing an early company.',
        ],
      },
      {
        heading: 'Methods that suit early startups',
        body: [
          'Several methods were designed specifically for early, pre-revenue or low-revenue companies, working by comparison and judgement rather than precise calculation.',
          'The comparable method values your company by looking at what similar companies, at a similar stage and in a similar market, have recently raised at. The scorecard method starts from the typical valuation of funded startups in your region and stage, then adjusts based on how your company compares. Milestone-based methods assign value to qualitative achievements such as a strong team and a working prototype. The venture capital method works backwards from a possible future exit value.',
        ],
      },
      {
        heading: 'Why use methods at all if it is a negotiation',
        body: [
          'Methods matter because they give both sides a reasoned basis for their position. A founder who can say their valuation is in line with comparable deals, or justified by a scorecard of their strengths, negotiates from a much stronger place than one who simply names a number.',
        ],
      },
      {
        heading: 'Use more than one',
        body: [
          'No single method is definitive, so experienced investors often use two or three and look at where they converge. A range supported by several methods is more credible than a single figure from one.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Valuation methods give structured ways to reason about an early company’s worth, even though none is definitive.',
          'Profit and cash-flow based methods suit mature companies, not early startups, because early companies lack the numbers.',
          'Early-stage methods, including comparables, the scorecard, milestone-based approaches, and the venture capital method, work by comparison and judgement.',
          'Methods turn a valuation into a defensible argument, and using more than one produces a stronger range.',
        ],
      },
    ],
  },
  {
    slug: 'the-comparable-method',
    title: 'The Comparable Method',
    teaser: 'The most intuitive way to value a startup is to look at what similar companies are worth. This lesson covers the comparable method and its limits.',
    level: 'Beginner',
    readMins: 6,
    order: 7,
    sections: [
      {
        heading: 'How it works',
        body: [
          'The comparable method, sometimes called relative valuation, values your company by looking at what similar companies have raised at recently. To use it, you look for companies similar to yours in stage, sector, and market, and find what valuations they recently raised at. You then adjust up or down depending on how your company compares.',
        ],
      },
      {
        heading: 'Why investors like it',
        body: [
          'Investors use comparables constantly, because they want to pay a price in line with the market rather than far above it. When you propose a valuation supported by genuine comparable deals, you are speaking their language and grounding your number in reality.',
        ],
      },
      {
        heading: 'The challenge of finding comparables',
        body: [
          'The main difficulty is finding good comparables. Valuation data for private early-stage companies is not always public, and truly similar companies can be hard to identify. The method is only as good as the comparables you can find.',
        ],
      },
      {
        heading: 'The African market challenge',
        body: [
          'This difficulty is sharper in African markets, where there is often less public valuation data and fewer obvious comparables than in larger, more mature startup ecosystems. When comparables are thin, lean more on the other methods and on the fundamental drivers of value, while being honest about the limits.',
        ],
      },
      {
        heading: 'Use it as one input, not the answer',
        body: [
          'The comparable method is powerful but not sufficient on its own. Use it as one input among several, alongside the scorecard, milestone, and other methods.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The comparable method values your company by looking at what similar companies recently raised at.',
          'Investors favour it because it grounds valuation in real market deals rather than theory.',
          'Its weakness is the difficulty of finding good comparables, since private valuation data is limited and no two companies are identical.',
          'In African markets comparables are often scarce, so lean on other methods and be honest about the limits.',
        ],
      },
    ],
  },
  {
    slug: 'the-scorecard-and-milestone-methods',
    title: 'The Scorecard and Milestone Methods',
    teaser: 'When you cannot value a company on numbers, you value it on its qualities. This lesson covers two methods built for exactly that.',
    level: 'Beginner',
    readMins: 7,
    order: 8,
    sections: [
      {
        heading: 'The scorecard method',
        body: [
          'The scorecard method starts from a baseline: the typical valuation of funded startups at your stage in your region. It then adjusts that baseline up or down based on how your company compares on factors such as the strength of the team, the size of the opportunity, the product, the competitive situation, and how much further funding will be needed.',
          'The method is useful because it forces an honest, factor-by-factor comparison rather than a single gut number, and because it ties your valuation to what real companies in your region actually raise at.',
        ],
      },
      {
        heading: 'The milestone method',
        body: [
          'The milestone method, sometimes associated with the name Berkus, assigns value to specific achievements your company has reached: a sound idea, a working prototype, a quality team, key relationships, and early signs of customers. The logic is that each milestone reduces risk. It suits very early companies well, because it rewards what has been done rather than what is merely promised.',
        ],
      },
      {
        heading: 'Why these methods are useful, and their limits',
        body: [
          'Both methods replace a single guessed number with a structured reasoning process, which helps you arrive at a defensible figure and explain it to an investor. But like all early-stage methods, these are estimates, not precise truths — the baseline in the scorecard method depends on regional data that may be limited, especially in African markets.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The scorecard method adjusts a regional baseline valuation up or down based on factors like team, opportunity, product, and competition.',
          'The milestone method assigns value to real achievements, such as a prototype, team, and early customers, because each reduces risk.',
          'Both replace a guessed number with structured reasoning, which helps you set and explain a defensible valuation.',
          'They rely on judgement and regional data, so use them to build a range rather than a single exact figure.',
        ],
      },
    ],
  },
  {
    slug: 'traction-and-bottom-up-reasoning',
    title: 'Traction and Bottom-Up Reasoning',
    teaser: 'Once a company has real traction, valuation can rest on firmer ground. This lesson shows how evidence of demand supports a stronger number.',
    level: 'Beginner',
    readMins: 6,
    order: 9,
    sections: [
      {
        heading: 'Traction reduces uncertainty',
        body: [
          'Early valuation is hard mainly because the future is uncertain. Traction directly attacks that uncertainty. A company that can show customers, revenue, growth, and retention has proven that its solution works and that people will pay for it, and each of these facts removes a piece of the doubt that pulls valuations down.',
        ],
      },
      {
        heading: 'Reasoning from your own numbers',
        body: [
          'With traction, you can reason about value from your own numbers rather than only from comparison. This bottom-up reasoning, built from your actual performance, is powerful because it rests on facts an investor can verify rather than on projections they must take on trust.',
        ],
      },
      {
        heading: 'Revenue multiples at later stages',
        body: [
          'As companies mature and develop steady revenue, valuation often comes to be discussed in relation to that revenue, using multiples drawn from comparable companies. This does not apply cleanly to the earliest companies, but it shows the direction of travel: the more real financial performance you have, the more your valuation can rest on it.',
        ],
      },
      {
        heading: 'Traction changes your negotiating position',
        body: [
          'A founder with strong, growing traction is not asking an investor to believe a story, they are showing evidence and inviting the investor to back a proven trajectory. It also tends to attract more investor interest, which is itself one of the most powerful drivers of a higher valuation.',
        ],
      },
      {
        heading: 'Be honest about what traction shows',
        body: [
          'Present real traction, defined clearly, and do not stretch it, because it will be examined in diligence. Traction that is genuine but modest still strengthens your position, while traction that has been dressed up collapses under scrutiny.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Traction reduces the uncertainty that pulls early valuations down, so it strengthens your number more than almost anything.',
          'With traction you can reason from your own verifiable numbers, not only from comparison.',
          'As companies mature, valuation increasingly relates to revenue through multiples, showing the more performance you have, the firmer your valuation.',
          'Traction also attracts investor interest, which further supports valuation, so present it honestly and let it make your case.',
        ],
      },
    ],
  },
  {
    slug: 'valuation-caps-and-discounts',
    title: 'Valuation Caps and Discounts',
    teaser: 'When you raise on a SAFE or a note, you often delay the valuation but still shape it through a cap and a discount. This lesson explains how they work.',
    level: 'Beginner',
    readMins: 7,
    order: 10,
    sections: [
      {
        heading: 'Why a cap exists',
        body: [
          'Early rounds often use a SAFE, an advanced subscription agreement, or a convertible note, which let an investor put money in now and receive shares later, when a future priced round sets the value. When an early investor puts money in before a valuation is set, they take on extra risk. The valuation cap solves this: it sets a maximum valuation at which the early investor’s money converts into shares, regardless of how high the next round’s valuation actually is.',
        ],
      },
      {
        heading: 'How the cap and discount work',
        body: [
          'Suppose an investor puts money in on a SAFE with a valuation cap of 1,000,000. If the next priced round happens at a valuation of 1,000,000 or below, the investor converts at that actual valuation. But if the next round happens at 3,000,000, the capped investor still converts as if the valuation were 1,000,000, receiving more shares for their money.',
          'A discount is a simpler mechanism that can apply alongside or instead of a cap. If the discount is 20 percent, the early investor converts at 80 percent of the price the new investors pay.',
        ],
      },
      {
        heading: 'Cap and discount together',
        body: [
          'A SAFE or note may include a cap, a discount, or both. When both are present, the investor usually converts on whichever gives them the better deal. A low cap in particular can mean an early investor ends up with a larger slice than the headline of the deal suggested, so model the conversion carefully rather than assuming.',
        ],
      },
      {
        heading: 'Why founders must model the effect',
        body: [
          'Several SAFEs with low caps, converting at your next round, can dilute you more than you expected, all at once. Founders should model how every outstanding SAFE, ASA, and note will convert before agreeing terms.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'SAFEs, ASAs, and notes delay the valuation but shape it through a cap and a discount.',
          'A valuation cap sets the maximum valuation at which an early investor converts, rewarding them for early risk with more shares.',
          'A discount gives the early investor a reduction on the next round’s price, with a similar effect.',
          'Caps and discounts can dilute founders more than expected at conversion, so model every outstanding instrument before agreeing terms.',
        ],
      },
    ],
  },
  {
    slug: 'the-option-pool-and-its-hidden-effect',
    title: 'The Option Pool and Its Hidden Effect',
    teaser: 'The option pool looks like a small detail, but it can quietly lower your real valuation. This lesson exposes one of the most common traps in a term sheet.',
    level: 'Beginner',
    readMins: 6,
    order: 11,
    sections: [
      {
        heading: 'What the option pool is',
        body: [
          'Most companies set aside a portion of their shares to give to future employees, called the option pool, usually as share options that vest over time. It exists because attracting good people to an early company often means offering them a stake in its success.',
        ],
      },
      {
        heading: 'The hidden effect on valuation',
        body: [
          'Investors often ask that the option pool be created, or increased, before their investment, as part of the pre-money valuation. When the pool is created out of the pre-money value, the shares for it come from the existing shareholders — meaning the founders. The investor’s percentage is unaffected, while the founders are diluted to make room for the pool. A larger pool effectively lowers your real pre-money valuation, which is why the option pool is sometimes called a hidden part of the price.',
        ],
      },
      {
        heading: 'An example in plain terms',
        body: [
          'Imagine two investors both offer a pre-money valuation of 2,000,000. One asks for a small option pool created pre-money, the other asks for a large one. In the second case, more of your shares are set aside for the pool before the investor comes in, so you end up owning less, even though the headline valuation is identical.',
        ],
      },
      {
        heading: 'What to do about it',
        body: [
          'You cannot avoid having an option pool, and you should not try, but you can negotiate its size and timing. Argue for a pool sized to what you actually expect to need before your next round, and discuss whether the pool, or part of it, is created after the investment rather than before. Treat the pool as part of the valuation negotiation, not a separate detail to wave through.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The option pool is a reserve of shares set aside to grant to future employees, and every company needs one.',
          'When the pool is created out of the pre-money valuation, it dilutes founders, not the investor.',
          'A larger pool created pre-money effectively lowers your real valuation, even at the same headline number.',
          'Negotiate the pool’s size and timing, sizing it to real need, and treat it as part of the valuation negotiation.',
        ],
      },
    ],
  },
  {
    slug: 'overvaluation-down-rounds-and-getting-it-wrong',
    title: 'Overvaluation, Down Rounds, and Getting It Wrong',
    teaser: 'Founders often assume a higher valuation is always better. It is not. This lesson explains why overvaluation can hurt you and how a down round happens.',
    level: 'Beginner',
    readMins: 7,
    order: 12,
    sections: [
      {
        heading: 'The appeal and the trap',
        body: [
          'The appeal of a high valuation is obvious: you sell less of your company for the same money, and a big number is flattering. The trap is that a valuation is a promise about the future. When you raise at a high valuation, your next round must justify an even higher one.',
        ],
      },
      {
        heading: 'What a down round is',
        body: [
          'A down round is when a company raises money at a lower valuation than its previous round. It happens when a company set a high valuation, then failed to grow enough to justify a higher one next time. A down round dilutes existing shareholders more than expected, can trigger anti-dilution protections, and sends a negative signal to the market.',
        ],
      },
      {
        heading: 'Why overvaluation causes down rounds',
        body: [
          'The higher you set your valuation, the more you have to achieve to raise again at a higher one. A founder who accepts an inflated valuation in one round can find that even good progress is not enough to clear the bar next time, forcing a down round.',
        ],
      },
      {
        heading: 'The case for a sensible valuation',
        body: [
          'A valuation that is ambitious but grounded, one your next milestone can plausibly justify, sets you up to raise again from strength. This is why experienced founders often resist the very highest valuation on offer, preferring one they can comfortably beat.',
        ],
      },
      {
        heading: 'The investor’s perspective',
        body: [
          'A good investor may steer you away from an inflated number, because they do not want to fund a down round any more than you want to raise one. When both sides aim for a fair, sustainable valuation, they are protecting the same future.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A higher valuation is not always better, because a valuation is a promise your next round must exceed.',
          'A down round is raising at a lower valuation than before, and it dilutes founders, can trigger anti-dilution, and signals lost value.',
          'Overvaluation causes down rounds by setting a bar your next round cannot clear, turning a short-term gain into a later loss.',
          'Aim for an ambitious but grounded valuation you can grow into, since each round should set up the next.',
        ],
      },
    ],
  },
  {
    slug: 'valuation-across-multiple-rounds',
    title: 'Valuation Across Multiple Rounds',
    teaser: 'A single valuation is only one step in a long journey. This lesson shows how valuations and dilution stack across several rounds, and what that means for your ownership.',
    level: 'Beginner',
    readMins: 7,
    order: 13,
    sections: [
      {
        heading: 'Each round dilutes again',
        body: [
          'Every time you raise, the company issues new shares, and your percentage falls. This happens at each round, so the dilution compounds over the journey. What matters is understanding the pattern, so you are never surprised by how much of the company you have given away by a given stage.',
        ],
      },
      {
        heading: 'Rising valuations offset dilution',
        body: [
          'The reason founders accept repeated dilution is that valuations usually rise across successful rounds. If each round is at a higher valuation than the last, your shrinking percentage represents a slice of an ever more valuable company, so the value of your holding can rise over time even as the percentage falls.',
        ],
      },
      {
        heading: 'Modelling the sequence',
        body: [
          'It helps to model the sequence rather than looking at one round in isolation. A simple projection of how much you might raise at each stage, at roughly what valuation, and how much that dilutes you, shows where your ownership is likely to land by the time an exit might happen.',
        ],
      },
      {
        heading: 'Convertibles come home to roost, and pro-rata',
        body: [
          'Remember that any SAFEs, ASAs, or convertible notes you issued earlier convert into shares at a priced round, adding to the dilution at that moment. Investors often hold pro-rata rights, letting them invest again in later rounds to maintain their percentage — understanding who holds these rights is part of seeing the full picture.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Dilution compounds across rounds, so your percentage falls step by step as you raise.',
          'Rising valuations offset dilution, so a smaller share of a more valuable company can still grow in worth.',
          'Model the whole sequence of rounds, including converting SAFEs and notes, rather than one round in isolation.',
          'Account for pro-rata rights, and steward your ownership across the journey rather than maximising a single round.',
        ],
      },
    ],
  },
  {
    slug: 'valuation-in-african-markets-and-across-currencies',
    title: 'Valuation in African Markets and Across Currencies',
    teaser: 'Valuing a company built for African markets, funded by diaspora investors, brings challenges the standard advice ignores. This lesson addresses them directly.',
    level: 'Beginner',
    readMins: 7,
    order: 14,
    sections: [
      {
        heading: 'Scarce comparable data',
        body: [
          'The comparable method depends on finding similar companies with known valuations, and this data is often thin in African markets. You cannot lean as heavily on comparables as a founder in a larger ecosystem might, so rely more on the fundamental drivers, the scorecard and milestone methods, and your own traction.',
        ],
      },
      {
        heading: 'Which currency sets the valuation',
        body: [
          'Many deals involving diaspora and international investors are denominated in a major currency such as US dollars, even when the company operates in naira, cedi, or shilling. Be clear from the start about the currency of the valuation and the investment, and make sure your documents state it.',
        ],
      },
      {
        heading: 'Currency movement changes the picture',
        body: [
          'Exchange rates move, sometimes sharply, and this affects valuation in real terms. A valuation set in a local currency can look very different in dollar terms months later if the local currency has weakened. Acknowledging currency risk openly, rather than ignoring it, strengthens your credibility with investors.',
        ],
      },
      {
        heading: 'Investor perception and risk',
        body: [
          'Distant investors may perceive African markets as riskier than they are, and perceived risk pulls valuations down. Part of your job is to reduce that perception gap by explaining your market clearly, showing real traction, and demonstrating deep local understanding.',
        ],
      },
      {
        heading: 'Turn context into an advantage',
        body: [
          'Large and growing markets, rapid digital adoption, and problems worth solving are genuine strengths. Deep local knowledge and diaspora networks are real assets. Draw on these honestly when you build your valuation case.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Comparable data is often scarce in African markets, so rely more on fundamentals, the scorecard and milestone methods, and your own traction.',
          'Be explicit about which currency sets the valuation and the investment, and record it in your documents.',
          'Currency movement changes valuation in real terms, so acknowledge currency risk openly with investors.',
          'Reduce the perceived-risk gap by explaining your market and traction clearly, and let genuine strengths support your number.',
        ],
      },
    ],
  },
  {
    slug: 'negotiating-and-agreeing-a-valuation',
    title: 'Negotiating and Agreeing a Valuation',
    teaser: 'All the analysis leads to one moment: agreeing a number with an investor. This final lesson shows you how to negotiate a valuation you can stand behind.',
    level: 'Beginner',
    readMins: 7,
    order: 15,
    sections: [
      {
        heading: 'Arrive with a range, not a point',
        body: [
          'Come to the negotiation with a defensible range rather than a single rigid figure. Use the methods from this course, comparables where you have them, the scorecard and milestone approaches, and your own traction, to build a range you can justify.',
        ],
      },
      {
        heading: 'Let evidence carry the argument',
        body: [
          'The most persuasive thing in a valuation negotiation is evidence. Rather than insisting on a number, show why it is justified: the strength of your team, the size of your opportunity, your traction, and where comparable deals sit.',
        ],
      },
      {
        heading: 'Use demand as your strongest lever',
        body: [
          'The strongest thing you can bring to a negotiation is genuine demand from more than one investor. When you have real alternatives, you can hold firm on a fair valuation, because you are not dependent on any single investor.',
        ],
      },
      {
        heading: 'Remember the whole deal',
        body: [
          'Valuation is not the only term that matters. The option pool, the cap and discount on any convertible, and other terms all affect what the deal is really worth to you. A slightly lower valuation with a cleaner structure can leave you better off than a higher one loaded with founder-unfriendly terms.',
        ],
      },
      {
        heading: 'Aim for fair and sustainable',
        body: [
          'The goal is not to extract the highest possible valuation, but to reach a fair and sustainable one that you can grow into. Overreaching risks a down round later, and a valuation forced on an unwilling investor sours the partnership from the start.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Come to the negotiation with a defensible range built from the methods in this course, not a single rigid number.',
          'Let evidence carry your argument, so the investor is engaging with the facts rather than just with you.',
          'Use genuine investor demand as your strongest lever, and negotiate valuation as part of the whole deal.',
          'Aim for a fair, sustainable valuation you can grow into, since it sets up your next round and your relationship with investors.',
        ],
      },
    ],
  },
];

const TERM_SHEETS_LESSONS: AcademyLesson[] = [
  {
    slug: 'what-a-term-sheet-is',
    title: 'What a Term Sheet Is',
    teaser: 'The term sheet is where a deal takes shape. This lesson explains what it is, what it does, and why it carries more weight than almost any document that follows.',
    level: 'Beginner',
    readMins: 6,
    order: 1,
    sections: [
      {
        heading: 'A summary, not the full contract',
        body: [
          'The term sheet is the document that turns interest into a deal. It is a short summary of the key terms that a founder and an investor have agreed, written before the long binding contracts are drafted. It states how much is being raised, on what instrument, at what valuation, and the main rights that come with the investment. Think of it as the agreed outline that the lawyers turn into the finished contracts.',
        ],
      },
      {
        heading: 'Why it matters so much',
        body: [
          'Since the binding documents are drafted to match the term sheet, the terms you accept here tend to stick. Reopening a term after the term sheet is agreed is difficult and damages goodwill. This is why the real negotiation of a deal usually happens at the term sheet stage, not later.',
        ],
      },
      {
        heading: 'Economic terms and control terms',
        body: [
          'The terms in a term sheet fall broadly into two groups. Economic terms decide who gets what money: the valuation, the liquidation preference, the option pool, and similar. Control terms decide who makes decisions: the board, the matters that need investor consent, voting rights, and founder commitments. Founders often focus on the economic terms and overlook the control terms, but control can matter as much as ownership.',
        ],
      },
      {
        heading: 'It is mostly non-binding',
        body: [
          'A term sheet is mostly non-binding, meaning agreeing it does not force either side to complete the deal. There are usually a few binding clauses, though, which the next lesson covers, so you should never assume the whole document is optional.',
        ],
      },
      {
        heading: 'Your job with a term sheet',
        body: [
          'You do not draft the term sheet, and you should always have a solicitor review it. But your job is to understand it well enough to know what you are agreeing to, to recognise the terms that matter, and to negotiate the ones that affect you most.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A term sheet is a short summary of the key terms, written before the binding contracts that are drafted to match it.',
          'Terms accepted here tend to stick, so the real negotiation usually happens at the term sheet stage.',
          'Terms fall into economic terms, which decide who gets what money, and control terms, which decide who makes decisions.',
          'The term sheet is mostly non-binding with a few binding clauses, and your job is to understand it well enough to negotiate.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor review a term sheet before you sign.',
        ],
      },
    ],
  },
  {
    slug: 'binding-and-non-binding-clauses',
    title: 'Binding and Non-Binding Clauses',
    teaser: 'A term sheet is mostly non-binding, but not entirely. This lesson shows you which clauses commit you and why they matter more than founders expect.',
    level: 'Beginner',
    readMins: 6,
    order: 2,
    sections: [
      {
        heading: 'What non-binding means, and the binding exceptions',
        body: [
          'Most of a term sheet is non-binding, which means that agreeing it does not legally force either side to complete the deal on those terms. Within that mostly non-binding document, a few clauses are usually binding — most importantly exclusivity, confidentiality, and costs. These bind you from the moment you sign, even though the rest does not.',
        ],
      },
      {
        heading: 'Exclusivity, the clause that can trap you',
        body: [
          'The exclusivity clause, often called a no-shop, prevents you from negotiating with other investors for a set period while the deal is finalised. If the deal then falls through, you emerge having lost weeks or months, with your momentum with other investors gone cold. Keep the exclusivity period as short as is reasonable.',
        ],
      },
      {
        heading: 'Confidentiality and costs',
        body: [
          'The confidentiality clause keeps the terms of the deal, and often the fact of it, private — read it to understand what you can and cannot say, and to whom. The costs clause deals with who pays the legal fees, sometimes asking the company to cover the investor’s legal costs. This matters because investor legal fees can be significant, so if you are being asked to cover them, understand the amount and try to cap it.',
        ],
      },
      {
        heading: 'Read the binding parts closely',
        body: [
          'Because most of the term sheet is non-binding, founders sometimes skim the whole thing, and then are caught by an exclusivity period that is too long or a costs clause that is too open. Identify the binding clauses and negotiate them just as seriously as the headline terms.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Most of a term sheet is non-binding, so signing it does not force either side to complete the deal.',
          'A few clauses usually bind you from signing, most importantly exclusivity, confidentiality, and costs.',
          'Keep any exclusivity period short, so a failed deal does not leave you stranded with cold momentum.',
          'Read the costs clause closely and cap investor legal fees where you can, and do not skim the binding parts.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor review a term sheet before you sign.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-read-a-term-sheet',
    title: 'How to Read a Term Sheet',
    teaser: 'A term sheet can look dense and intimidating. This lesson gives you a way to read one calmly, so you know what to look for and where the important terms sit.',
    level: 'Beginner',
    readMins: 6,
    order: 3,
    sections: [
      {
        heading: 'Group the terms as you read',
        body: [
          'The single most useful habit is to sort the terms into groups as you read, rather than treating them as one long list: economic terms, control terms, and a third small group of procedural terms such as exclusivity and costs. Reading with these groups in mind turns a confusing document into three manageable sets of questions.',
        ],
      },
      {
        heading: 'The economic terms to find',
        body: [
          'Locate the economic terms first, because they decide your ownership and your outcome: the valuation and the amount raised, the option pool and how it is created, the liquidation preference, and any anti-dilution protection.',
        ],
      },
      {
        heading: 'The control terms to find',
        body: [
          'Next, find the control terms, which decide how the company is run: the make-up of the board, the list of decisions that need investor consent, voting rights, information rights, and founder commitments such as vesting. A founder can keep a large ownership share and still lose real control through the board and consent terms.',
        ],
      },
      {
        heading: 'Ask what each term does to you, and do not read it alone',
        body: [
          'For every term you find, ask a simple question: what does this do to me? A term you do not recognise is one to look up or ask about, not to skim past. Reading a term sheet yourself is essential, but you should not rely on your reading alone — a solicitor experienced in these deals will spot an unusual term and explain the practical effect of each one.',
        ],
      },
      {
        heading: 'Read it more than once',
        body: [
          'The first read is for the shape and the obvious terms, the second for the detail and the interactions between terms — as when the option pool changes your real valuation. Give the document the time it deserves, because it shapes your company for years.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Sort the terms as you read into economic terms, control terms, and procedural terms.',
          'Find the economic terms first, since valuation, option pool, liquidation preference, and anti-dilution decide your outcome.',
          'Read the control terms just as carefully, because you can keep ownership and still lose control.',
          'Ask what each term does to you, read it more than once, and rely on a solicitor alongside your own reading.',
        ],
      },
    ],
  },
  {
    slug: 'valuation-and-the-amount',
    title: 'Valuation and the Amount',
    teaser: 'The headline terms of any term sheet are how much is being raised and at what valuation. This lesson covers these economic anchors and how they set your ownership.',
    level: 'Beginner',
    readMins: 6,
    order: 4,
    sections: [
      {
        heading: 'The amount raised',
        body: [
          'The term sheet states how much money is being raised in this round. Check whether the amount is a fixed figure or a range, and whether it depends on other investors joining. Connect the amount back to your plan: it should be the sum that carries you to your next milestone with a sensible buffer, not simply the largest number on offer.',
        ],
      },
      {
        heading: 'The valuation',
        body: [
          'The term sheet states the valuation, and your first task is to confirm whether it is pre-money or post-money, because the difference changes how much you give away. Make sure the term sheet is explicit about which figure it uses, and that the ownership it implies matches your expectation and your cap table.',
        ],
      },
      {
        heading: 'Where the instrument sits',
        body: [
          'The term sheet also states how the money comes in: as a priced round with a valuation set now, or on a SAFE, advanced subscription agreement, or convertible note that delays the valuation. If it is a convertible instrument, the valuation may appear as a cap and a discount rather than a fixed number.',
        ],
      },
      {
        heading: 'The option pool lurks nearby',
        body: [
          'Close to the valuation, watch for the option pool, because how it is created interacts with your real valuation. If the term sheet requires a pool created out of the pre-money valuation, it dilutes you, not the investor, and effectively lowers your valuation.',
        ],
      },
      {
        heading: 'Confirm the ownership maths',
        body: [
          'Work out, from the term sheet, exactly what percentage each party will own after the round, including any pool and any converting instruments. Model it on your cap table so you see the real ownership the term sheet produces.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The amount and the valuation are the economic anchors of a term sheet, and together they set ownership.',
          'Confirm the amount, any minimum, and that it matches your milestone-based plan.',
          'Confirm whether the valuation is pre-money or post-money, and read any cap and discount if the money comes in on a convertible.',
          'Read the option pool alongside the valuation, and model the real ownership the term sheet produces on your cap table.',
        ],
      },
    ],
  },
  {
    slug: 'the-option-pool-in-a-term-sheet',
    title: 'The Option Pool',
    teaser: 'The option pool term looks minor but can quietly cost you real ownership. This lesson shows you how it works in a term sheet and how to handle it.',
    level: 'Beginner',
    readMins: 6,
    order: 5,
    sections: [
      {
        heading: 'Why the pool exists',
        body: [
          'Almost every term sheet includes an option pool: a reserve of shares set aside to grant to future employees. Investors want to see a pool because it signals you can hire and reward a team, and they do not want to be diluted themselves when you grant options later. The pool is legitimate and expected — the question is its size and, crucially, its timing.',
        ],
      },
      {
        heading: 'The pre-money trap',
        body: [
          'Watch whether the term sheet requires the pool to be created out of the pre-money valuation. When it is, the shares for the pool come from the existing shareholders — you and any co-founders — before the investor comes in. Because the pool is carved out of the pre-money value, a larger pool effectively lowers your real valuation, even when the headline number is unchanged. This is sometimes called the option pool shuffle.',
        ],
      },
      {
        heading: 'Size the pool to real need, and negotiate the timing',
        body: [
          'A term sheet may propose a pool larger than you actually need, because a bigger pool created pre-money benefits the investor. Size the pool to what you genuinely expect to grant before your next round. You can also negotiate the timing: a pool created after the investment is shared by all shareholders, including the new investor, rather than falling on founders alone.',
        ],
      },
      {
        heading: 'Treat it as part of the price',
        body: [
          'Two term sheets with the same headline valuation can leave you owning quite different amounts depending on their pool terms. When you compare offers, always read the pool and the valuation together, and work out the real ownership each produces.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The option pool is a reserve of shares for future employees, and every company needs one.',
          'When the pool is created out of the pre-money valuation, it dilutes founders and effectively lowers your real valuation.',
          'Size the pool to a realistic hiring plan, and push back on inflated pool requests.',
          'Negotiate the timing where you can, and always read the pool and valuation together to know the real ownership.',
        ],
      },
    ],
  },
  {
    slug: 'liquidation-preference',
    title: 'Liquidation Preference',
    teaser: 'Liquidation preference decides who gets paid first if the company is sold. It is one of the most important economic terms, and one of the most misunderstood.',
    level: 'Beginner',
    readMins: 7,
    order: 6,
    sections: [
      {
        heading: 'What a liquidation preference is',
        body: [
          'A liquidation preference gives certain investors the right to be paid before others when the company is sold. Investors usually receive preferred shares, which carry this preference, while founders and staff hold ordinary shares, which do not. When the company is sold, preferred shareholders are paid first, up to the amount their preference entitles them to.',
        ],
      },
      {
        heading: 'The founder-reasonable norm',
        body: [
          'The common, founder-reasonable form is a one-times non-participating preference: the investor gets back the greater of their original investment or the amount their percentage would give them in the sale, but not both. Aim for this form.',
        ],
      },
      {
        heading: 'Participating preferences take two bites',
        body: [
          'Watch for a participating preference, which is more aggressive: the investor gets their money back first, and then also shares in the remaining proceeds alongside everyone else — sometimes called double dipping. A participating preference is worth resisting firmly, or at least capping.',
        ],
      },
      {
        heading: 'Multiple preferences, and stacking across rounds',
        body: [
          'A preference can also be a multiple, such as two-times or three-times, meaning the investor gets back several times their investment before anyone else is paid. Multiple preferences above one-times are aggressive at the early stage. As you raise more rounds, each set of investors may have their own preference, and these can stack.',
        ],
      },
      {
        heading: 'Why it matters most at the exit',
        body: [
          'The liquidation preference often has no effect until the company is sold, which is why founders underestimate it. But the sale is the moment that matters most, when years of work turn into a payout.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A liquidation preference lets certain investors be paid first if the company is sold.',
          'Aim for a one-times non-participating preference, where the investor gets the greater of their money back or their percentage, not both.',
          'Resist participating preferences, which let investors take their money back and then share in the rest.',
          'Push back on multiple preferences above one-times, and remember preferences stack across rounds and matter most at the exit.',
        ],
      },
    ],
  },
  {
    slug: 'anti-dilution-protection',
    title: 'Anti-Dilution Protection',
    teaser: 'Anti-dilution protects investors if the company later raises at a lower price. This lesson explains the gentle form to accept and the harsh form to resist.',
    level: 'Beginner',
    readMins: 7,
    order: 7,
    sections: [
      {
        heading: 'The problem it addresses',
        body: [
          'When an investor buys shares at a certain price, they are exposed to the risk that the company later raises at a lower price, in a down round, which reduces the value of what they bought. Anti-dilution protects them against this. The protection only triggers in a down round, so if your valuation keeps rising, it never comes into play.',
        ],
      },
      {
        heading: 'Weighted average, the reasonable form',
        body: [
          'The common and reasonable form is broad-based weighted average. If a down round happens, it adjusts the earlier investor’s position modestly, taking into account both the lower price and the size of the new round. This is the form to aim for.',
        ],
      },
      {
        heading: 'Full ratchet, the harsh form',
        body: [
          'The aggressive form is a full ratchet: it reprices the earlier investor’s shares as though they had paid the new, lower price, regardless of how small the new round is. This can hand the earlier investor a large number of extra shares at the founders’ expense. It is worth resisting firmly.',
        ],
      },
      {
        heading: 'Anti-dilution and overvaluation',
        body: [
          'The main way anti-dilution hurts you is through a down round, and the main cause of a down round is overvaluation in an earlier round. So the best protection against anti-dilution biting is to avoid setting a valuation you cannot grow into.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Anti-dilution protects investors if the company later raises at a lower valuation, and only triggers in a down round.',
          'Broad-based weighted average is the reasonable form, adjusting the investor’s position modestly.',
          'A full ratchet is the harsh form, repricing earlier shares to the new low price and heavily diluting founders.',
          'Aim for weighted average and resist full ratchet, and avoid overvaluation, since a grounded valuation reduces the chance anti-dilution ever bites.',
        ],
      },
    ],
  },
  {
    slug: 'preferred-shares-and-the-rights-they-carry',
    title: 'Preferred Shares and the Rights They Carry',
    teaser: 'Investors usually receive a special class of shares with extra rights. This lesson explains what preferred shares are and the rights that come attached.',
    level: 'Beginner',
    readMins: 6,
    order: 8,
    sections: [
      {
        heading: 'Ordinary and preferred shares',
        body: [
          'Founders and employees typically hold ordinary shares, the basic form of ownership. Investors typically receive preferred shares, which sit above ordinary shares in certain respects and carry additional protections. The term sheet defines this new class of shares, and the articles of association then formally set them out.',
        ],
      },
      {
        heading: 'The rights preferred shares carry',
        body: [
          'Several of the terms covered elsewhere in this course are, in effect, rights that attach to preferred shares — the liquidation preference, anti-dilution protection, and certain voting and consent rights. Seeing them this way helps the term sheet hang together rather than reading as a random list.',
        ],
      },
      {
        heading: 'Dividends',
        body: [
          'Some term sheets mention dividends on preferred shares. Early-stage companies rarely pay dividends, so this term often has little practical effect early on. Still, watch for cumulative dividends, where unpaid dividends accumulate over time and must be paid before ordinary shareholders receive anything in a sale.',
        ],
      },
      {
        heading: 'Conversion rights',
        body: [
          'Preferred shares usually carry the right to convert into ordinary shares, often automatically in certain events, such as a large future round or a public listing. This affects how the liquidation preference and other rights play out.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Investors usually receive preferred shares, a special class with extra rights, while founders hold ordinary shares.',
          'Many term sheet protections, including the liquidation preference and anti-dilution, are rights that attach to preferred shares.',
          'Watch dividend terms, especially cumulative dividends, which can add to what preferred shareholders take ahead of you.',
          'Preferred shares carry conversion rights that interact with the preference, so understand the whole class rather than each term alone.',
        ],
      },
    ],
  },
  {
    slug: 'board-composition',
    title: 'Board Composition',
    teaser: 'The board makes a company’s biggest decisions, so who sits on it matters as much as who owns it. This lesson covers the board terms in a term sheet.',
    level: 'Beginner',
    readMins: 6,
    order: 9,
    sections: [
      {
        heading: 'What the board does',
        body: [
          'The board of directors oversees the company and makes or approves its most significant decisions. This means that whoever controls the board controls the direction of the company at the highest level, regardless of the exact ownership split.',
        ],
      },
      {
        heading: 'Board seats in a term sheet',
        body: [
          'A term sheet usually sets out how the board will be composed after the investment: how many seats there are, and who appoints each one. Early on, founders typically hold the board. As investors come in, they often want a seat, and one investor seat at an early round is common and usually reasonable.',
        ],
      },
      {
        heading: 'Guard board control early',
        body: [
          'Giving away a single investor seat while founders retain the majority is normal. Agreeing to a board where investors and outsiders can outvote the founders is a much bigger step, and one to avoid at an early round unless there is a strong reason.',
        ],
      },
      {
        heading: 'Independent directors',
        body: [
          'Some term sheets introduce an independent director, someone who is neither a founder nor an investor. Because they can hold a swing vote, who they are and how they are chosen matters a great deal.',
        ],
      },
      {
        heading: 'Board control and consent rights work together',
        body: [
          'The board is not the only mechanism of control. As the next lesson covers, investors also negotiate a list of decisions that need their consent regardless of the board. Read the board term and the consent term together.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'The board makes the company’s biggest decisions, so its make-up can matter as much as ownership.',
          'One investor board seat at an early round is common, but founders should retain a board majority.',
          'Losing board control means losing the ability to steer the company, even if you still own most of it.',
          'Watch how any independent director is chosen, and read the board term together with the consent rights that also shape control.',
        ],
      },
    ],
  },
  {
    slug: 'reserved-matters-and-consent-rights',
    title: 'Reserved Matters and Consent Rights',
    teaser: 'Beyond the board, investors negotiate a list of decisions that need their approval. This lesson covers reserved matters and how to keep the list reasonable.',
    level: 'Beginner',
    readMins: 7,
    order: 10,
    sections: [
      {
        heading: 'What reserved matters are',
        body: [
          'Reserved matters are specific decisions that require investor consent regardless of what the board or the founders want. Common reserved matters include raising more money, selling the company, taking on significant debt, changing the business substantially, issuing new shares, and spending above a set amount.',
        ],
      },
      {
        heading: 'Why some are reasonable, and the danger of an overbroad list',
        body: [
          'A degree of reserved matters is normal and fair — an investor reasonably wants protection against decisions that could destroy the value of their stake. The problem arises when the list grows so long and so detailed that ordinary running of the company requires constant investor approval.',
        ],
      },
      {
        heading: 'Watch the thresholds, and who holds the consent',
        body: [
          'Many reserved matters come with a threshold, such as spending above a certain amount needing consent — the threshold matters as much as the item. Also check whose consent is needed: sometimes a majority of the preferred shareholders, sometimes a specific investor, sometimes the investor director.',
        ],
      },
      {
        heading: 'Keep it focused and reasonable',
        body: [
          'The healthy outcome is a reserved matters list that is focused on genuinely major decisions, with sensible thresholds and a clear consent process. Negotiate the list down where it overreaches.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Reserved matters are decisions that need investor consent regardless of the board, protecting investors on major issues.',
          'A focused list of genuinely major decisions is reasonable and normal in most deals.',
          'An overbroad list, or very low thresholds, can leave you unable to run the company without constant consent.',
          'Negotiate the list down where it overreaches, check the thresholds and who holds the consent, and read it alongside the board term.',
        ],
      },
    ],
  },
  {
    slug: 'information-rights-and-founder-commitments',
    title: 'Information Rights and Founder Commitments',
    teaser: 'Term sheets set out what you must report to investors and what you commit to as a founder. This lesson covers both, and how to keep them manageable.',
    level: 'Beginner',
    readMins: 6,
    order: 11,
    sections: [
      {
        heading: 'Information rights',
        body: [
          'Information rights set out what the company must report to its investors and how often — typically financial accounts, regular updates, and access to certain numbers, on an agreed schedule such as monthly or quarterly.',
        ],
      },
      {
        heading: 'Keep reporting manageable',
        body: [
          'Very frequent or very detailed reporting can become a real burden for a small team. Agree to reporting you can genuinely sustain, then meet it reliably, rather than promising detailed monthly reports you cannot keep up.',
        ],
      },
      {
        heading: 'Founder commitments',
        body: [
          'Term sheets often include commitments from the founders: a promise to work full time on the company and a restriction on competing with it. These are usually reasonable, but read them so you understand exactly what you are promising and for how long.',
        ],
      },
      {
        heading: 'Read the restrictions carefully',
        body: [
          'Some founder commitments, particularly non-compete and similar restrictions, can be drawn more broadly than necessary. These provisions should be reasonable in scope and duration, and a solicitor can help you judge whether they are.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Information rights set out what you must report to investors and how often, and reasonable reporting strengthens the relationship.',
          'Commit to a reporting cadence you can sustain and always meet, rather than promising more than you can deliver.',
          'Founder commitments, such as working full time and not competing, are usually reasonable but should be read carefully.',
          'Watch that non-compete and similar restrictions are reasonable in scope and duration, and read these terms alongside founder vesting.',
        ],
      },
    ],
  },
  {
    slug: 'founder-vesting-and-leaver-provisions',
    title: 'Founder Vesting and Leaver Provisions',
    teaser: 'Investors often require founders to earn their own shares over time. This lesson explains vesting and what happens if a founder leaves.',
    level: 'Beginner',
    readMins: 7,
    order: 12,
    sections: [
      {
        heading: 'What founder vesting means',
        body: [
          'Founder vesting means that the founders’ shares are earned over a period of time, rather than being fully owned outright from day one. If a founder leaves before the period is complete, they may lose some of their shares — sometimes called reverse vesting.',
        ],
      },
      {
        heading: 'Why investors want it',
        body: [
          'Vesting protects the company and the other founders as much as the investors. Imagine a founder who leaves after a few months but keeps a large share of the company — the remaining founders then do years of work while that departed founder holds a big stake for little contribution. Vesting prevents this.',
        ],
      },
      {
        heading: 'The cliff and the schedule',
        body: [
          'Vesting arrangements often include a cliff, an initial period during which no shares vest at all, after which a first chunk vests and the rest vests gradually. If you have already been working on the company for some time before the raise, you can argue for credit for that time.',
        ],
      },
      {
        heading: 'Good leavers and bad leavers',
        body: [
          'Leaver provisions decide what happens to a founder’s shares if they leave, often distinguishing between a good leaver, treated more generously, and a bad leaver, who may lose more. Read these definitions carefully, because they decide your position if you ever have to leave.',
        ],
      },
      {
        heading: 'Negotiate the details',
        body: [
          'Vesting is standard, so you are unlikely to avoid it, and you should not want to, since it protects you against a co-founder leaving early too. Aim for a schedule that is fair, that recognises work already done, and that treats a good leaver reasonably.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Founder vesting means founders earn their shares over time and may lose unvested shares if they leave early.',
          'It protects the company and the other founders as much as the investors, so it is a fair mechanism rather than a punishment.',
          'Negotiate the schedule, the cliff, and credit for work already done before the raise.',
          'Read the good leaver and bad leaver definitions carefully, since they decide your position if you ever have to leave.',
        ],
      },
    ],
  },
  {
    slug: 'pre-emption-tag-along-and-drag-along',
    title: 'Pre-Emption, Tag-Along, and Drag-Along',
    teaser: 'Several term sheet provisions govern what happens when shares change hands. This lesson covers the main transfer terms and why they are usually fair.',
    level: 'Beginner',
    readMins: 7,
    order: 13,
    sections: [
      {
        heading: 'Pre-emption on transfers',
        body: [
          'Pre-emption on transfers, sometimes called a right of first refusal, means that a shareholder wanting to sell their shares must first offer them to the existing shareholders before selling to an outsider. This keeps ownership within the known group.',
        ],
      },
      {
        heading: 'Pre-emption on new shares',
        body: [
          'A related right is pre-emption on the issue of new shares, which gives existing shareholders the chance to buy their share of any new shares the company issues, so they can maintain their percentage if they wish. This is closely tied to pro-rata rights.',
        ],
      },
      {
        heading: 'Tag-along and drag-along rights',
        body: [
          'A tag-along right protects minority shareholders when larger holders sell, letting them join the sale on the same terms. A drag-along right lets a defined majority force the remaining shareholders to join a sale, so a small minority cannot block a good exit. Watch the threshold that triggers the drag.',
        ],
      },
      {
        heading: 'Read them, but do not over-worry',
        body: [
          'These transfer terms are mostly standard and fair. Read them and check the thresholds, but your negotiating energy is better spent on valuation, the option pool, liquidation preference, the board, and reserved matters.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Pre-emption on transfers means shares must first be offered to existing shareholders, keeping ownership within the known group.',
          'Pre-emption on new shares lets existing holders maintain their percentage, closely tied to pro-rata rights.',
          'Tag-along protects minority holders by letting them join a sale on the same terms; drag-along lets a majority prevent a holdout from blocking a sale.',
          'These transfer terms are mostly standard and fair, so check the thresholds but focus your effort on the economic and control terms.',
        ],
      },
    ],
  },
  {
    slug: 'pro-rata-and-follow-on-rights',
    title: 'Pro-Rata and Follow-On Rights',
    teaser: 'Investors often want the right to keep investing in future rounds. This lesson explains pro-rata rights and what they mean for your future raises.',
    level: 'Beginner',
    readMins: 6,
    order: 14,
    sections: [
      {
        heading: 'What a pro-rata right is',
        body: [
          'When a company raises a new round, existing investors are diluted along with everyone else. A pro-rata right lets an existing investor buy enough of the new round to keep their percentage from falling.',
        ],
      },
      {
        heading: 'Why investors want it',
        body: [
          'Investors value pro-rata rights because their best investments are the ones they most want to keep backing. If a company is doing well, an early investor wants the option to put more money in and hold their share of a rising success.',
        ],
      },
      {
        heading: 'How it affects your future rounds',
        body: [
          'When existing investors exercise their pro-rata, they take up part of the new round, which leaves less room for new investors. This is usually fine, and often positive, because existing investors following on is a strong signal to new ones.',
        ],
      },
      {
        heading: 'Major investor rights',
        body: [
          'Sometimes pro-rata and other rights are given only to major investors, meaning those holding above a certain amount, rather than to every small holder, which keeps the rights proportionate and the administration manageable.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'A pro-rata right lets an investor invest again in future rounds to maintain their percentage.',
          'Investors value pro-rata because it lets them keep backing their winners and concentrate capital over time.',
          'When existing investors exercise pro-rata, they take up part of a new round, leaving less room for new investors.',
          'Pro-rata is usually reasonable, but understand who holds it and any major investor threshold, so you can plan future rounds realistically.',
        ],
      },
    ],
  },
  {
    slug: 'negotiating-and-moving-to-completion',
    title: 'Negotiating and Moving to Completion',
    teaser: 'Understanding the terms is only useful if you can negotiate them and then close. This final lesson brings the course together and takes you from a term sheet to a completed deal.',
    level: 'Beginner',
    readMins: 7,
    order: 15,
    sections: [
      {
        heading: 'Decide your priorities first',
        body: [
          'You cannot fight every term, so decide in advance what matters most to you. For most founders, the priorities are keeping reasonable control and avoiding punitive economics — guarding board control, keeping reserved matters focused, holding a one-times non-participating liquidation preference, resisting a full ratchet, and watching the option pool.',
        ],
      },
      {
        heading: 'Know what is standard',
        body: [
          'Much of your negotiating power comes from knowing what is normal. When you know that a one-times non-participating preference is standard, or that a full ratchet is aggressive, you can push back on unreasonable terms with confidence and accept fair ones without wasting goodwill.',
        ],
      },
      {
        heading: 'Negotiate the whole deal together',
        body: [
          'The terms interact, so negotiate them as a package rather than one by one. A slightly lower valuation with a clean structure can leave you better off than a higher valuation loaded with a heavy preference and a large pre-money option pool.',
        ],
      },
      {
        heading: 'Use your leverage and take advice',
        body: [
          'Your strongest leverage is genuine investor interest from more than one source. Always take advice from a solicitor experienced in these deals, who will spot an unusual term and explain its real effect.',
        ],
      },
      {
        heading: 'From term sheet to completion',
        body: [
          'Once the term sheet is agreed, the deal moves to completion. Lawyers draft the binding documents to match the term sheet: the subscription agreement or instrument, the shareholders’ agreement, and the new articles, along with the supporting resolutions and disclosures. On WAAW, the funds then move through protected escrow and are released at completion, when the conditions are met and the shares are issued.',
        ],
      },
      {
        heading: 'Key takeaways',
        list: true,
        body: [
          'Decide your priorities, usually control and fair economics, so you can concede standard terms and fight the ones that matter.',
          'Knowing what is standard versus aggressive is much of your negotiating power.',
          'Negotiate the whole deal together, since the terms interact and a clean structure can beat a higher headline valuation.',
          'Use genuine investor demand as leverage, take a solicitor’s advice, and move to completion by checking the binding documents against the term sheet.',
        ],
      },
      {
        heading: 'A note on this article',
        body: [
          'WAAW Academy is educational and general. It is not investment, legal, or tax advice. Always have a solicitor review your term sheet and closing documents.',
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
    free: true,
  },
  {
    slug: 'how-to-raise',
    title: 'How to Raise',
    track: 'founder',
    description: 'Planning a round: how much to raise, at what valuation, and from whom.',
    lessons: HOW_TO_RAISE_LESSONS,
  },
  {
    slug: 'the-pitch-deck',
    title: 'The Pitch Deck',
    track: 'founder',
    description: 'Building the deck investors actually want to see.',
    lessons: PITCH_DECK_LESSONS,
    heroUrl: '/pitch-deck-hero.html',
  },
  {
    slug: 'the-documents',
    title: 'The Documents',
    track: 'founder',
    description: 'Term sheets, cap tables, and the paperwork behind a raise.',
    lessons: DOCUMENTS_LESSONS,
  },
  {
    slug: 'valuation',
    title: 'Valuation',
    track: 'founder',
    description: 'How early-stage companies get priced, and how to argue for yours.',
    lessons: VALUATION_LESSONS,
  },
  {
    slug: 'term-sheets',
    title: 'Term Sheets',
    track: 'founder',
    description: 'Reading the terms behind the headline number.',
    lessons: TERM_SHEETS_LESSONS,
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

function lessonKey(courseSlug: string, lessonSlug: string) {
  return `${courseSlug}/${lessonSlug}`;
}

export function courseCompletedCount(course: AcademyCourse, completed: Set<string>): number {
  return course.lessons.filter((l) => completed.has(lessonKey(course.slug, l.slug))).length;
}

export function isCourseFullyRead(course: AcademyCourse, completed: Set<string>): boolean {
  return course.lessons.length > 0 && courseCompletedCount(course, completed) === course.lessons.length;
}

// Courses with lessons unlock in order within their track, skipping over
// any "coming soon" placeholders (which have no lessons and so could never
// be "finished") when working out what the previous real course was.
// Foundations, and free courses generally, have no prerequisite.
function readableCoursesInTrack(track: AcademyTrack): AcademyCourse[] {
  return ACADEMY_COURSES.filter((c) => c.track === track && c.lessons.length > 0);
}

export function previousCourseInTrack(courseSlug: string): AcademyCourse | null {
  const course = ACADEMY_COURSES.find((c) => c.slug === courseSlug);
  if (!course || course.free) return null;
  const readable = readableCoursesInTrack(course.track);
  const idx = readable.findIndex((c) => c.slug === courseSlug);
  if (idx <= 0) return null;
  return readable[idx - 1];
}

export function isCourseUnlocked(courseSlug: string, completed: Set<string>): boolean {
  const course = ACADEMY_COURSES.find((c) => c.slug === courseSlug);
  if (!course) return false;
  if (course.free) return true;
  const prev = previousCourseInTrack(courseSlug);
  if (!prev) return true;
  return isCourseFullyRead(prev, completed);
}

export function nextLessonToRead(course: AcademyCourse, completed: Set<string>): AcademyLesson | null {
  if (course.lessons.length === 0) return null;
  const sorted = [...course.lessons].sort((a, b) => a.order - b.order);
  return sorted.find((l) => !completed.has(lessonKey(course.slug, l.slug))) ?? sorted[0];
}
