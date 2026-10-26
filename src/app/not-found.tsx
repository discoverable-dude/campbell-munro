import Link from "next/link";
import { PageHead } from "@/components/Sections";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <PageHead title="Page not found" intro="Sorry, we couldn't find that page." />
      <section className="m-w m-sec">
        <div className="m-prose">
          <p>It may have moved. These pages should help:</p>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/who-we-help">Who we help</Link></li>
            <li><Link href="/what-we-offer">What we offer</Link></li>
            <li><Link href="/contact">Book a free first meeting</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
