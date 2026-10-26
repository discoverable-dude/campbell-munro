import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { ClientEffects } from "@/components/ClientEffects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ALLOW_INDEXING, SITE, SITE_URL, toTel } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-source", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Campbell Munro | Independent Financial Planning", template: "%s | Campbell Munro" },
  description: "Independent financial planning and investment management for business owners, families and anyone planning their next stage, across London and the south of England.",
  applicationName: SITE.name,
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#19226D", width: "device-width", initialScale: 1, viewportFit: "cover" };

const organisation = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      alternateName: SITE.legalName,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": ["FinancialService", "Organization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      description: SITE.tagline,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/logo.png`,
      email: SITE.email,
      telephone: toTel(SITE.offices[0].phone!),
      areaServed: ["London", "South East England", "Sussex", "Kent", "Surrey", "Staffordshire"],
      identifier: [
        { "@type": "PropertyValue", propertyID: "FCA Firm Reference Number", value: SITE.fca.frn },
        { "@type": "PropertyValue", propertyID: "Companies House number", value: SITE.fca.companyNumber },
      ],
      location: SITE.offices.map((o) => ({
        "@type": "FinancialService",
        name: `${SITE.name}, ${o.name}`,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        ...(o.phone ? { telephone: toTel(o.phone) } : {}),
        address: { "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.locality, addressRegion: o.region, postalCode: o.postcode, addressCountry: "GB" },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${outfit.variable} ${source.variable}`}>
      <head>
        {/* Scroll-reveal styles only apply once JS is running, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div className="site">
          <a className="skip" href="#main">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <ClientEffects />
        <JsonLd data={organisation} />
      </body>
    </html>
  );
}
