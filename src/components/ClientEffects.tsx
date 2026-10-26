"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const HASH_EVENT = "cm:hash";

/**
 * Progressive enhancements that need the browser:
 *  - scroll reveal (content is fully visible without JS; `.js` is set by an inline script)
 *  - telling components about same-page hash navigation, and opening <details> that a hash points at
 */
export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("rv")) : [];
      el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 0.08 + "s");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const announce = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      const details = target?.closest("details");
      if (details && !details.open) details.open = true;
      window.dispatchEvent(new CustomEvent(HASH_EVENT, { detail: id }));
    };
    // Next.js changes the hash with pushState, which fires no event, so watch link clicks too.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (a) window.setTimeout(announce, 0);
    };
    announce();
    window.addEventListener("hashchange", announce);
    window.addEventListener("popstate", announce);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", announce);
      window.removeEventListener("popstate", announce);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
