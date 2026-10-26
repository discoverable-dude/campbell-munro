"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Icon } from "./Icon";

/** Transparent over the hero photo at the top of each page, solid white once scrolled. */
export function Header() {
  const pathname = usePathname();
  const [over, setOver] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector("[data-hero]");
      const hd = document.getElementById("site-header");
      if (!hero || !hd) return setOver(false);
      setOver(hero.getBoundingClientRect().bottom > hd.getBoundingClientRect().bottom + 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const isCurrent = (href: string) => pathname === href;
  const close = () => setOpen(false);

  return (
    <header id="site-header" className={`m-hd${over && !open ? " over" : ""}`}>
      <div className="m-hd-in">
        <Link href="/" className="m-logo" aria-label="Campbell Munro home" onClick={close}>
          <Image className="lg-col" src="/images/logo.png" alt="Campbell Munro" width={227} height={29} priority />
          <Image className="lg-wht" src="/images/logo-white.png" alt="" width={227} height={29} priority />
        </Link>
        <button type="button" className="m-menu" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((o) => !o)}>
          Menu
        </button>
        <nav id="site-nav" className={`m-nav${open ? " open" : ""}`} aria-label="Main">
          {NAV.map((item) => (
            <div className="m-ni" key={item.href}>
              <Link href={item.href} className={`m-nl${isCurrent(item.href) ? " on" : ""}`} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={close}>
                {item.label}
              </Link>
              {item.children.length > 0 && (
                <div className="m-dd">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={close}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="m-hd-btns">
            <Link href="/client-login" className="m-btn m-btn-o m-login" onClick={close}>
              <Icon name="lock" />
              Client login
            </Link>
            <Link href="/contact" className="m-btn m-btn-p" onClick={close}>
              Book a free meeting
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
