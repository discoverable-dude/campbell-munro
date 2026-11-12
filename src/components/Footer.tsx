import Image from "next/image";
import Link from "next/link";
import { FCA_STATEMENT, SITE, toTel } from "@/lib/site";

export type FooterVariant = "mist" | "photo" | "sky";

/** Which footer the site uses. See /footer-options to compare the three. */
export const FOOTER_VARIANT: FooterVariant = "mist";

const LINKS = [
  { label: "Who we help", href: "/who-we-help" },
  { label: "About us", href: "/about-us" },
  { label: "What we offer", href: "/what-we-offer" },
  { label: "Contact", href: "/contact" },
  { label: "Client login", href: "/client-login" },
  { label: "Privacy Notice", href: "/privacy-notice" },
];

export function Footer({ variant = FOOTER_VARIANT }: { variant?: FooterVariant }) {
  const dark = variant === "photo";
  return (
    <footer className={`m-ft m-ft--${variant}`}>
      {variant === "photo" && (
        <>
          <Image className="m-ft-bg" src="/images/forest-view.jpg" alt="" fill sizes="100vw" quality={60} />
          <div className="m-ft-wash" aria-hidden="true" />
        </>
      )}
      {variant === "sky" && <Image className="m-ft-mark" src="/images/symbol.png" alt="" width={238} height={240} aria-hidden="true" />}
      <div className="m-w m-ft-in">
        <div className="m-ft-grid">
          <div className="m-ft-brand">
            <Link href="/" aria-label="Campbell Munro home">
              <Image src={dark ? "/images/logo-white.png" : "/images/logo.png"} alt="Campbell Munro" width={235} height={30} />
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
