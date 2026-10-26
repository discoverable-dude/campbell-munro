import { PageHead } from "@/components/Sections";
import { pageMeta } from "@/lib/metadata";

// [To confirm] Carry the current Privacy Notice across unchanged (agreed scope), then remove noindex here and add the page to sitemap.ts.
export const metadata = pageMeta({ title: "Privacy Notice", description: "How Campbell Munro Limited collects and uses your personal information.", path: "/privacy-notice", noindex: true });

export default function PrivacyPage() {
  return (
    <>
      <PageHead title="Privacy Notice" />
      <section className="m-w m-sec">
        <div className="m-prose">
          <p>[Privacy Notice to be carried across unchanged from the current Campbell Munro website.]</p>
        </div>
      </section>
    </>
  );
}
