import { CtaBand, AccordionItem, PageHead, TextLink } from "@/components/Sections";
import { IconBox } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { StoryTabs } from "@/components/StoryTabs";
import { faqs, stages, stories } from "@/content/who";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Financial Planning for Every Life Stage",
  description: "Financial planning for business owners, people approaching retirement, families and anyone growing or passing on their wealth. Read our client stories and answers to common questions.",
  path: "/who-we-help",
});

export default function WhoWeHelpPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => !f.placeholder)
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHead title="Who we help" intro="Whatever life stage you're at, we can help you plan for your future." image="/images/heath-track.jpg" pos="center 70%" />

      <section className="m-w m-sec" id="stages">
        <div className="m-sec-head rv">
          <h2 className="m-h2">Where are you now?</h2>
          <p>Most clients come to us at a turning point. These are the ones we help with most.</p>
        </div>
        <div className="m-grid4">
          {stages.map((s) => (
            <div className="m-card rv" key={s.title}>
              <IconBox name={s.icon} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="m-band" id="stories">
        <div className="m-w m-sec">
          <div className="m-sec-head rv">
            <h2 className="m-h2">Client stories</h2>
            <p>Real situations, with names and some details changed to protect our clients&apos; privacy. Choose a story to read it in full.</p>
          </div>
          <StoryTabs stories={stories} />
        </div>
      </section>

      <section className="m-w m-sec m-split" id="faq">
        <div className="side rv">
          <h2 className="m-h2">Questions people ask</h2>
          <p>Something else on your mind? Ask us in your free first meeting.</p>
        </div>
        <div className="grow m-acc rv">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} group="faq" open={i === 0} summary={<span>{f.q}</span>}>
              <p>{f.a}</p>
              {f.link && <TextLink href={f.link.href}>{f.link.label}</TextLink>}
            </AccordionItem>
          ))}
        </div>
      </section>

      <CtaBand title="Not sure where you fit? Start with a conversation" text="Tell us where you are and where you want to be. Your first meeting is free, with no obligation." image="/images/heather-sunset.jpg" pos="center 45%" />

      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Who we help", path: "/who-we-help" }], SITE_URL)} />
    </>
  );
}
