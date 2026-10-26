import Link from "next/link";
import { PageHead } from "@/components/Sections";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({ title: "Thank you", description: "We've received your enquiry.", path: "/contact/thank-you", noindex: true });

export default function ThankYouPage() {
  return (
    <>
      <PageHead title="Thank you" intro="We've got your details." />
      <section className="m-w m-sec">
        <div className="m-prose" role="status">
          <h2>One of our advisers will be in touch within one working day</h2>
          <p>They&apos;ll arrange your free first meeting, in person or by video call. If it&apos;s urgent, call us on <a href="tel:+441892575575">01892 575575</a>.</p>
          <div><Link href="/" className="m-btn m-btn-s">Back to the homepage</Link></div>
        </div>
      </section>
    </>
  );
}
