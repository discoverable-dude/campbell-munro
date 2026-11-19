/**
 * Redirects from the old campbellmunro.co.uk URLs, so Google keeps the existing search history.
 *
 * [To confirm] The old site's URL list has not been crawled yet. Before launch, export it (Search Console
 * Pages report, or a Screaming Frog crawl of the live site) and add every old path here, mapped to the closest
 * new page. Permanent (301) redirects are used.
 *
 * Example: { source: "/about-us-old", destination: "/about-us" }
 */
export const REDIRECTS: { source: string; destination: string }[] = [];
