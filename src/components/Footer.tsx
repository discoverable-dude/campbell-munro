import Image from "next/image";
import Link from "next/link";
import { FCA_STATEMENT } from "@/lib/site";

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
      <div className="m-w m-ft-in">
        <div className="m-ft-top">
          <Link href="/" aria-label="Campbell Munro home">
            <Image src="/images/logo-white.png" alt="Campbell Munro" width={235} height={30} />
          </Link>
          <nav className="m-ft-links" aria-label="Footer">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p>{FCA_STATEMENT}</p>
      </div>
    </footer>
  );
}
