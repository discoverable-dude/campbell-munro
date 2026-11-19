import Image from "next/image";
import Link from "next/link";
import { FCA_STATEMENT, SITE, toTel } from "@/lib/site";

/**
 * The footer is skinned from html[data-footer] (navy | mist | photo | sky), chosen in the design options panel.
 * Every variant's decoration is in the markup and hidden by CSS unless chosen, so this stays a server component.
 */
const LINKS = [
  { label: "Who we help", href: "/who-we-help" },
  { label: "About us", href: "/about-us" },
  { label: "What we offer", href: "/what-we-offer" },
  { label: "Contact", href: "/contact" },
  { label: "Client login", href: "/client-login" },
  { label: "Privacy Notice", href: "/privacy-notice" },
];

export function Footer() {
  return (
    <footer className="m-ft">
      <Image className="m-ft-bg" src="/images/forest-view.jpg" alt="" fill sizes="100vw" quality={60} />
      <div className="m-ft-wash" aria-hidden="true" />
      <Image className="m-ft-mark" src="/images/symbol.png" alt="" width={238} height={240} aria-hidden="true" />
      <div className="m-w m-ft-in">
        <div className="m-ft-grid">
          <div className="m-ft-brand">
            <Link href="/" aria-label="Campbell Munro home">
              <Image className="ft-logo-col" src="/images/logo.png" alt="Campbell Munro" width={235} height={30} />
              <Image className="ft-logo-wht" src="/images/logo-white.png" alt="" width={235} height={30} aria-hidden="true" />
            </Link>
            <p>Independent financial planning and investment management for business owners, families and anyone planning their next stage.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="m-ft-h">Explore</h2>
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="m-ft-h">Our offices</h2>
            <ul className="m-ft-offices">
              {SITE.offices.map((o) => (
                <li key={o.id}>
                  <b>{o.name}</b>
                  <address>
                    {o.street}, {o.locality}, {o.postcode}
                  </address>
                  {o.phone && <a href={`tel:${toTel(o.phone)}`}>{o.phone}</a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="m-ft-base">
          <p>{FCA_STATEMENT}</p>
        </div>
      </div>
    </footer>
  );
}
