# Campbell Munro website

Next.js (App Router) site for campbellmunro.co.uk, built from the Round 2 mockups (Direction A). Hosted on Vercel.

## Why it is SEO friendly (not an SPA)

- Every page is a real route, pre-rendered to static HTML at build time: `/`, `/who-we-help`, `/about-us`, `/what-we-offer`, `/contact`, `/client-login`, `/privacy-notice`.
- All copy (accordions, client stories, team, fee table) is in the HTML. JavaScript only adds behaviour (tabs, filter, fee calculator, header, scroll reveal). With JS off the site still reads and the enquiry form still submits.
- Per-page title, meta description, canonical, Open Graph and Twitter tags; `sitemap.xml`, `robots.txt`; JSON-LD (`FinancialService` with both offices and the FCA number, `FAQPage`, `BreadcrumbList`). The legal and brand names are in the schema to help correct "Campbell Monroe" in Google.
- Nav and cards are real links, with deep links to sections (e.g. `/about-us#fees`).
- Fonts are self-hosted by `next/font`; images go through `next/image`; the hero video is skipped for reduced-motion and data-saver visitors.

## Enquiry form (Resend)

`src/app/contact/actions.ts` is a server action that validates, then emails the enquiry with Resend (reply-to is the enquirer) and redirects to `/contact/thank-you` (noindex, useful as a GA4/Ads conversion URL). It includes a honeypot field.

Environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Recipient(s), comma separated |
| `CONTACT_FROM_EMAIL` | Sender, on a domain verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash |
| `ALLOW_INDEXING` | `true` on Production at launch. Anything else blocks all crawlers |

`ALLOW_INDEXING` is read at build time, so redeploy after changing it. Without Resend configured, `npm run dev` logs the enquiry and carries on; production shows an error with the phone number.

## Before launch

Run `npm run check:placeholders` for the `[square bracket]` content still to supply. Main items:

- Portraits, bios and Helen Finn's job title (`src/content/about.ts`; put photos in `public/team/` and set `photo`)
- Fourth client story, minimum investment FAQ, Lichfield phone, Privacy Notice, "Helpful documents" text
- Client login and app URLs for Plannr, Transact, M&G and AJ Bell (`src/content/login.ts`)
- Licensed photography: the images in `public/images` are watermarked Shutterstock previews
- Old-URL redirects in `src/lib/redirects.ts` (export the live site's URLs first)
- Compliance sign-off on stories, FAQ and fee wording

## Commands

`npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.
