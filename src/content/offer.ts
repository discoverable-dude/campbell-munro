import type { IconName } from "@/components/Icon";

export const areas: { id: string; icon: IconName; title: string; items: string[] }[] = [
  { id: "financial-planning", icon: "trend", title: "Financial planning", items: ["Annual cash flow forecasting, so you can see what you can afford", "Annual attitude to risk review", "ISA, pension and Capital Gains Tax allowance review", "Annual income tax review and tax return"] },
  { id: "retirement-planning", icon: "sun", title: "Retirement planning", items: ["Working out when you can stop work", "Pensions and savings arranged for a sustainable, tax-efficient income", "A flexible withdrawal plan that adapts as life changes", "Ongoing support all the way through retirement"] },
  { id: "investment-management", icon: "pie", title: "Investment management", items: ["A portfolio built around your goals and risk profile by our in-house team, included in your service", "Specialist knowledge of investment trusts", "Capital Gains Tax monitoring", "Online access to your portfolio, any time"] },
  { id: "estate-planning", icon: "home", title: "Estate planning", items: ["Inheritance tax and will review", "Trust planning and gifting to family during your lifetime", "The Campbell Munro family proposition, for children and grandchildren"] },
  { id: "corporate-planning", icon: "briefcase", title: "Corporate planning", items: ["Taking profits from your company tax-efficiently", "Pension funding through the business", "Planning ahead for a sale, exit or succession"] },
  { id: "adviser-and-team", icon: "user", title: "Your adviser and team", items: ["Regular reviews with your own adviser", "Access to the whole Campbell Munro team when you need it", "Online access to your plan and documents"] },
];

export const steps: { icon: IconName; tag?: string; title: string; text: string }[] = [
  { icon: "chat", tag: "Free, no obligation", title: "Discovery conversation", text: "A free 30-minute conversation. You tell us what you'd like to achieve, and we explain how we work and whether we can help." },
  { icon: "clipboard", title: "Understanding your circumstances", text: "We build a detailed picture of your finances, goals and concerns. Then we give you a clear quote before any work starts." },
  { icon: "file", title: "Recommendations", text: "We present clear, personal recommendations and explain our thinking in plain English, so you can decide with confidence." },
  { icon: "circleCheck", title: "Putting it in place", text: "We put the agreed plan into action for you, and handle the providers and paperwork so the move is smooth." },
  { icon: "refresh", title: "Ongoing partnership", text: "Regular reviews keep your plan in line with your goals, with advice whenever your circumstances change." },
];

export const approach: { icon: IconName; title: string; text: string }[] = [
  { icon: "clock", title: "Long-term thinking", text: "We build portfolios to do well over many years, rather than trying to predict short-term market moves." },
  { icon: "trend", title: "Staying invested, with a growing income", text: "Many of the holdings we choose have long records of raising their payouts. A reliable income means you don't need to sell investments to fund your spending, and helps you stay invested when markets are volatile." },
  { icon: "pie", title: "Resilience through diversification", text: "A broad spread across asset classes, sectors and regions, without relying too heavily on any single company or theme." },
];

export const RISK_WARNING = "The value of investments and the income from them can go down as well as up, and you may get back less than you invest.";
