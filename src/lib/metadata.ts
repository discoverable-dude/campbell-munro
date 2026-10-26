import type { Metadata } from "next";
import { SITE } from "./site";

export function pageMeta({ title, description, path, absoluteTitle, noindex }: { title: string; description: string; path: string; absoluteTitle?: boolean; noindex?: boolean }): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type: "website", siteName: SITE.name, locale: "en_GB" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function breadcrumbs(items: { name: string; path: string }[], base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: base + it.path })),
  };
}
