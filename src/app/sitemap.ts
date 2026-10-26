import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/who-we-help", priority: 0.8 },
  { path: "/about-us", priority: 0.8 },
  { path: "/what-we-offer", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/client-login", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: SITE_URL + (p.path === "/" ? "" : p.path), priority: p.priority }));
}
