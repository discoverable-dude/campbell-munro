import type { IconName } from "@/components/Icon";

export type HeroSlide = {
  title: string;
  lede: string;
  /** Poster / background photo. */
  image: string;
  /** Optional background video that plays on this slide. The carousel moves on when it ends. */
  video?: { webm: string; mp4: string };
};

/**
 * Hero messages. The carousel fades between them, changing the background and the copy together.
 * Slide 1 is the page heading (h1). [To confirm] Wording of slides 2 and 3 is a draft for Campbell Munro and compliance.
 */
export const heroSlides: HeroSlide[] = [
  {
    title: "Clarity. Independence. Confidence.",
    lede: "Independent financial planning and investment management for business owners, families and anyone planning their next stage, across London and the south of England.",
    image: "/images/hero-heath.jpg",
    video: { webm: "/video/hero.webm", mp4: "/video/hero.mp4" },
  },
  {
    title: "What will your income look like when you stop work?",
    lede: "Stopping work is a big change. We help you turn what you've saved into an income you can rely on.",
    image: "/images/lone-pine.jpg",
  },
  {
    title: "How will your wealth support the next generation?",
    lede: "From helping family now to planning ahead for inheritance tax, we help you decide how and when to pass wealth on.",
    image: "/images/heather-sunset.jpg",
  },
];

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
