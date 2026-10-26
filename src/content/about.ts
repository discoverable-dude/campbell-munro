import type { IconName } from "@/components/Icon";

export const pillars: { icon: IconName; title: string; text: string; cta: string; href: string }[] = [
  { icon: "shield", title: "Independent", text: "Advice shaped by your goals, not by product providers.", cta: "What that means", href: "/about-us#independent" },
  { icon: "eye", title: "Transparent", text: "Clear fees, agreed with you before any work starts.", cta: "How we charge", href: "/about-us#fees" },
  { icon: "user", title: "Personal", text: "A dedicated adviser who understands your circumstances.", cta: "Meet the team", href: "/about-us#team" },
];

export const independence: { title: string; text: string }[] = [
  { title: "More choice.", text: "Solutions from across the whole market, not a limited range." },
  { title: "Advice built around you.", text: "Recommendations based on your goals, circumstances and plans." },
  { title: "No product bias.", text: "No sales targets, incentives or provider influence." },
  { title: "Your interests first.", text: "Every recommendation made with one aim: the best outcome for you." },
];

export const feeFlow: { tag: string; free?: boolean; title: string; text: string }[] = [
  { tag: "Free", free: true, title: "First meeting", text: "We talk about what you're looking for and whether we can help. No obligation." },
  { tag: "Quote agreed first", title: "Financial planning meeting", text: "We build a full picture of your finances, then give you a clear quote for any work needed." },
  { tag: "Your decision", title: "You decide", text: "Nothing starts until you've agreed the quote. If you'd rather not go ahead, that's fine." },
];

/** Tiered (marginal) ongoing advice fee. `width` is the size of the band in pounds. */
export const feeBands = [
  { label: "First £500,000", width: 500_000, rate: 0.01 },
  { label: "Next £500,000", width: 500_000, rate: 0.0075 },
  { label: "Next £2 million", width: 2_000_000, rate: 0.005 },
  { label: "Anything over £3 million", width: Infinity, rate: 0.0025 },
];

export type Person = {
  name: string;
  role: string;
  office: "Crowborough" | "Lichfield";
  bio: string;
  /** Path under /public, e.g. "/team/david-munro.jpg". Placeholder box shown until supplied. */
  photo?: string;
};

export const team: Person[] = [
  { name: "David Munro", role: "Managing Director", office: "Crowborough", bio: "[David's short bio, 50 to 70 words.]" },
  { name: "Lewis Munro", role: "Director, DipPFS", office: "Crowborough", bio: "[Lewis's short bio, 50 to 70 words.]" },
  { name: "Luke Fizia", role: "Chartered Wealth Manager, Chartered FCSI", office: "Crowborough", bio: "[Luke's short bio, 50 to 70 words.]" },
  { name: "Michael McCulloch", role: "Independent Wealth Manager, CFA, DipPFS", office: "Crowborough", bio: "[Michael's short bio, 50 to 70 words.]" },
  { name: "Miller Perry", role: "Trainee Financial Adviser", office: "Crowborough", bio: "[Miller's short bio, 50 to 70 words.]" },
  { name: "Helen Finn", role: "[Job title to confirm]", office: "Crowborough", bio: "[Helen's short bio, 50 to 70 words.]" },
  { name: "Andrew Fearne", role: "Financial Adviser", office: "Lichfield", bio: "[Andrew's short bio, 50 to 70 words.]" },
  { name: "Joe Cobden", role: "Financial Adviser", office: "Lichfield", bio: "[Joe's short bio, 50 to 70 words.]" },
  { name: "Dylan Perry", role: "Financial Adviser", office: "Lichfield", bio: "[Dylan's short bio, 50 to 70 words.]" },
];

export const mdMessage = {
  photo: undefined as string | undefined,
  paragraphs: [
    "“When clients come to us, they're often facing important decisions that will affect their family, their retirement or their future security. Our role isn't simply to recommend investments. It's to give clarity, guidance and reassurance at every stage of life.",
    "As an independent, family-owned business, we can focus on one thing: helping our clients achieve better financial outcomes. Many of our client relationships span decades, and that's a responsibility we never take for granted.”",
  ],
};
