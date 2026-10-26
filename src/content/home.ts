import type { IconName } from "@/components/Icon";

export const hero = {
  title: "Clarity. Independence. Confidence.",
  lede: "Independent financial planning and investment management for business owners, families and anyone planning their next stage, across London and the south of England.",
};

export const panels: { icon: IconName; title: string; text: string; cta: string; href: string }[] = [
  { icon: "users", title: "Who we help", text: "Business owners, families, and people approaching or enjoying retirement.", cta: "Is this you", href: "/who-we-help" },
  { icon: "compass", title: "What we offer", text: "One joined-up plan, with your portfolio managed by our own team.", cta: "See what's included", href: "/what-we-offer" },
  { icon: "shield", title: "About us", text: "Independent, open about fees and family-owned.", cta: "Why Campbell Munro", href: "/about-us" },
  { icon: "user", title: "Meet the team", text: "Nine people across our Crowborough and Lichfield offices.", cta: "Meet them", href: "/about-us#team" },
];

export const trust: { icon: IconName; title: string; text: string }[] = [
  { icon: "bank", title: "FCA authorised", text: "Firm Reference Number 170068" },
  { icon: "clock", title: "20+ years", text: "Advising clients" },
  { icon: "shield", title: "Independent", text: "Not tied to any provider" },
  { icon: "users", title: "Family-owned", text: "Most clients join by recommendation" },
];

export const planning: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "trend", title: "Financial planning", text: "A cash flow plan that shows what you can afford, now and in the years ahead.", href: "/what-we-offer#financial-planning" },
  { icon: "sun", title: "Retirement planning", text: "Pensions, ISAs and income arranged so you know when you can stop, and what you'll live on.", href: "/what-we-offer#retirement-planning" },
  { icon: "pie", title: "Investment management", text: "Portfolios built around you by our own investment team, included in your service.", href: "/what-we-offer#investment-management" },
  { icon: "home", title: "Estate planning", text: "Passing wealth on the way you want, and planning ahead for inheritance tax.", href: "/what-we-offer#estate-planning" },
  { icon: "briefcase", title: "Corporate planning", text: "For business owners: taking profits efficiently, and planning a sale or succession.", href: "/what-we-offer#corporate-planning" },
];
