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
    lessons: HOW_TO_RAISE_LESSONS,
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
