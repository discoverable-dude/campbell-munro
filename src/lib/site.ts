export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://campbellmunro.co.uk").replace(/\/$/, "");

/** Search engines are blocked until ALLOW_INDEXING=true (set on Production only, at launch). */
export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === "true";

export const SITE = {
  name: "Campbell Munro",
  legalName: "Campbell Munro Limited",
  tagline: "Independent financial planning and investment management",
  email: "enquiries@campbellmunro.co.uk",
  fca: {
    frn: "170068",
    companyNumber: "03732479",
    registerUrl: "https://register.fca.org.uk",
  },
  registeredOffice: "Thorpe House, Croft Road, Crowborough, East Sussex, TN6 1DL",
  offices: [
    {
      id: "crowborough",
      name: "Crowborough",
      street: "Thorpe House, Croft Road",
      locality: "Crowborough",
      region: "East Sussex",
      postcode: "TN6 1DL",
      phone: "01892 575575" as string | null,
    },
    {
      id: "lichfield",
      name: "Lichfield",
      street: "129 Beacon Street",
      locality: "Lichfield",
      region: "Staffordshire",
      postcode: "WS13 7BG",
      // [To confirm] Campbell Munro to supply the Lichfield number.
      phone: null as string | null,
    },
  ],
} as const;

export const FCA_STATEMENT = `Campbell Munro Limited is Authorised and Regulated by the Financial Conduct Authority, Firm Reference Number ${SITE.fca.frn}. You can check our details on the FCA register at register.fca.org.uk. Registered in England No. ${SITE.fca.companyNumber}. Registered office: ${SITE.registeredOffice}.`;

export const toTel = (phone: string) => "+44" + phone.replace(/\s/g, "").replace(/^0/, "");

export const NAV = [
  {
    label: "Who we help",
    href: "/who-we-help",
    children: [
      { label: "Life stages", href: "/who-we-help#stages" },
      { label: "Client stories", href: "/who-we-help#stories" },
      { label: "Questions people ask", href: "/who-we-help#faq" },
    ],
  },
  {
    label: "About us",
    href: "/about-us",
    children: [
      { label: "Independent", href: "/about-us#independent" },
      { label: "How we charge", href: "/about-us#fees" },
      { label: "Meet the team", href: "/about-us#team" },
      { label: "A message from David", href: "/about-us#message" },
    ],
  },
  {
    label: "What we offer",
    href: "/what-we-offer",
    children: [
      { label: "Comprehensive financial planning", href: "/what-we-offer#planning" },
      { label: "Working with us", href: "/what-we-offer#working" },
      { label: "Our investment approach", href: "/what-we-offer#approach" },
    ],
  },
  { label: "Contact", href: "/contact", children: [] },
] as const;
