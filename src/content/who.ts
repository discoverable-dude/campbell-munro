import type { IconName } from "@/components/Icon";

export const stages: { icon: IconName; title: string; text: string }[] = [
  { icon: "trend", title: "Growing your wealth", text: "You're building your career or savings and want your money working harder, with tax in mind." },
  { icon: "briefcase", title: "Running a business", text: "You want to take profits efficiently and plan ahead for a sale, exit or succession." },
  { icon: "sun", title: "Approaching or in retirement", text: "You want to know when you can stop work, and that your income will last." },
  { icon: "home", title: "Passing wealth on", text: "You want to help family during your lifetime and plan ahead for inheritance tax." },
];

export type Story = {
  id: string;
  who: string;
  tab: string;
  /** Short label on the home page accordion. */
  homeTitle: string;
  homeSummary: string;
  title: string;
  intro: string;
  concernsHeading: string;
  concerns: string[];
  helped: string[];
  outcome: string[];
  placeholder?: boolean;
};

export const stories: Story[] = [
  {
    id: "story-john",
    who: "John, 51",
    tab: "Business owner",
    homeTitle: "Taking more from the business, and an exit on their terms",
    homeSummary:
      "John wanted to reduce his involvement in his company within five years. We moved more of his wealth into pensions and personal savings, tax-efficiently, so his future no longer relies on the business.",
    title: "Taking more from the business, and an exit on his terms",
    intro:
      "John owns a successful limited company. He's spent years building it, keeps significant profits within it, and wants to step back or sell within three to five years.",
    concernsHeading: "His concerns",
    concerns: [
      "Whether years of hard work would give his family lasting security",
      "Too much of his wealth tied to the business and how it performs",
      "How to take profits without unnecessary tax, and prepare for life after work",
    ],
    helped: [
      "A clear financial plan built around retirement, lifestyle and long-term security",
      "A tax-efficient strategy to move wealth from the business into personal and pension savings",
      "Pension funding and allowances used to reduce reliance on future business income",
    ],
    outcome: [
      "Confidence to reduce his involvement in the business on his own terms",
      "More of his wealth held personally and in pensions, separate from the business",
      "A clearer path to retirement, and more peace of mind",
    ],
  },
  {
    id: "story-sarah",
    who: "Sarah, 59",
    tab: "Retirement income",
    homeTitle: "Knowing she could stop work at 62",
    homeSummary:
      "Sarah had built up pensions and investments but didn't know if it was enough. A cash flow plan showed when she could retire and the income she'd have.",
    title: "Knowing she could retire at 62",
    intro:
      "Sarah has worked hard throughout her career and plans to retire within a few years. She has built up pensions and investments, but wanted to know what retirement would look like financially.",
    concernsHeading: "Her concerns",
    concerns: [
      "Whether she had saved enough to retire comfortably at 62",
      "Running out of money later, or having to cut back",
      "Whether her income would be sustainable, tax-efficient and flexible",
    ],
    helped: [
      "A detailed cash flow plan showing how her savings could support her lifestyle",
      "Pensions and investments arranged to give a sustainable, tax-efficient income",
      "A flexible withdrawal plan that can change with her circumstances",
    ],
    outcome: [
      "A clear picture of when she can retire and the income she'll have",
      "Confidence her goals are achievable without unnecessary risk",
      "Peace of mind that her finances support the life she wants",
    ],
  },
  {
    id: "story-margaret",
    who: "Margaret, 67",
    tab: "Inheritance tax",
    homeTitle: "Helping her family now, and less lost to inheritance tax",
    homeSummary:
      "Margaret wanted her savings to benefit her children. Trust planning began moving surplus wealth out of her estate, while keeping enough for her own security.",
    title: "Helping her family now, with less lost to inheritance tax",
    intro:
      "Margaret is retired and financially secure, with more savings than she needs for her lifestyle. She wants her wealth to benefit her family in the most effective way.",
    concernsHeading: "Her concerns",
    concerns: [
      "A large part of her estate going in inheritance tax rather than to her children",
      "Wanting to help her family during her lifetime, while staying secure herself",
      "Balancing planning with possible future care costs",
    ],
    helped: [
      "An estate plan built around her family's goals and her own long-term needs",
      "Trust planning to begin moving surplus wealth outside her estate, with safeguards",
      "Flexibility kept, so funds are there if she needs them",
    ],
    outcome: [
      "A clear plan to reduce the inheritance tax due on her estate",
      "More of her wealth set to pass to her children",
      "Peace of mind that her family's future is planned for, without risking her own",
    ],
  },
  {
    id: "story-growth",
    who: "[To confirm]",
    tab: "Growing your wealth",
    homeTitle: "[Fourth story to confirm]",
    homeSummary: "[For example, a professional in their 40s investing for growth and building a pension.]",
    title: "[Headline for a growth-focused client story]",
    intro: "[For example, a professional in their 40s investing for growth and building a pension alongside their career.]",
    concernsHeading: "Their concerns",
    concerns: ["[Two or three lines]"],
    helped: ["[Two or three lines]"],
    outcome: ["[Two or three lines]"],
    placeholder: true,
  },
];

export const faqs: { q: string; a: string; link?: { href: string; label: string }; placeholder?: boolean }[] = [
  { q: "Is the first meeting really free?", a: "Yes. Your first meeting is free and there's no obligation. We'll talk about what you're looking for and whether we can help." },
  {
    q: "How do you charge?",
    a: "After a full financial planning meeting we give you a clear quote, and nothing starts until you've agreed it. Our ongoing fee is tiered: 1% on the first £500,000, then lower rates on each part above that.",
    link: { href: "/about-us#fees", label: "See our fees" },
  },
  { q: "Can you help if I own a business?", a: "Yes. We help business owners take profits tax-efficiently, fund pensions through the business and plan ahead for a sale or succession." },
  { q: "Do I need to live near one of your offices?", a: "No. Our clients live across London and the south of England. We can meet at our Crowborough or Lichfield offices, at your home, or by video call." },
  { q: "Will I always deal with the same person?", a: "Yes. You'll have a dedicated adviser who knows your circumstances, supported by the rest of the team." },
  { q: "Is there a minimum amount to invest?", a: "[Campbell Munro to confirm.]", placeholder: true },
];
