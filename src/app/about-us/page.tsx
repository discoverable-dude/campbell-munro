import Link from "next/link";
import { CtaBand, PageHead } from "@/components/Sections";
import { FeeCalculator } from "@/components/FeeCalculator";
import { Icon, IconBox } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { TeamGrid } from "@/components/TeamGrid";
import { feeBands, feeFlow, independence, mdMessage, pillars, team } from "@/content/about";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { Fragment } from "react";

export const metadata = pageMeta({
  title: "Independent, Family-Owned Financial Advisers",
  description: "Campbell Munro is an independent, family-owned firm with clear, published fees and a dedicated adviser for every client. Meet the team in Crowborough and Lichfield.",
  path: "/about-us",
});

const pct = (r: number) => (r * 100).toFixed(2) + "%";

export default function AboutPage() {
  return (
    <>
      <PageHead title="About us" intro="An independent, family-owned firm, built on long-term relationships." image="/images/forest-view.jpg" pos="center 62%" />

      <section className="m-w m-sec">
        <div className="m-sec-head rv">
          <h2 className="m-h2">Independent, transparent, personal</h2>
          <p>Campbell Munro was founded more than 20 years ago to give clear, independent advice that puts clients first. Three things shape how we work.</p>
        </div>
        <div className="m-grid3">
          {pillars.map((p) => (
            <Link key={p.title} href={p.href} className="m-card m-card-link rv">
              <IconBox name={p.icon} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <em>{p.cta} <Icon name="arrow" /></em>
            </Link>
          ))}
        </div>
      </section>

      <section className="m-band" id="independent">
        <div className="m-w m-sec m-split">
          <div className="grow rv">
            <h2 className="m-h2">Independent</h2>
            <p className="m-intro">We&apos;re not owned by, or tied to, any bank, fund house or product provider. That gives you:</p>
            <div className="m-ticks">
              {independence.map((t) => (
                <div key={t.title}>
                  <IconBox name="check" />
                  <p><b>{t.title}</b> {t.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="side m-ph m-side-ph rv">[Photo: adviser with a client, or the Crowborough office]</div>
        </div>
      </section>

      <section className="m-w m-sec" id="fees">
        <div className="m-sec-head rv">
          <h2 className="m-h2">Transparent about what you pay</h2>
          <p>You&apos;ll always know what you&apos;re paying and what you get for it, and you won&apos;t be asked to commit before you&apos;re ready.</p>
        </div>
        <div className="m-flow rv">
          {feeFlow.map((f, i) => (
            <Fragment key={f.title}>
              <div className="m-fl">
                <span className={`m-tag${f.free ? "" : " m-tag-n"}`}>{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
              {i < feeFlow.length - 1 && <span className="m-arr" aria-hidden="true"><Icon name="arrow" /></span>}
            </Fragment>
          ))}
        </div>
        <div className="m-fees rv">
          <div className="grow">
            <h3>Ongoing advice fee</h3>
            <p>A yearly fee based on the investments we manage for you. It includes your adviser, your annual reviews and your portfolio, managed by our own investment team.</p>
            <p>The fee is tiered. Each rate applies only to the part of your investments in that band, so the more you invest, the lower your overall rate.</p>
          </div>
          <table className="m-tbl">
            <thead>
              <tr><th scope="col">Part of your investments</th><th scope="col">Fee per year</th></tr>
            </thead>
            <tbody>
              {feeBands.map((b) => (
                <tr key={b.label}><td>{b.label}</td><td>{pct(b.rate)}</td></tr>
              ))}
            </tbody>
          </table>
          <FeeCalculator />
        </div>
      </section>

      <section className="m-band" id="team">
        <div className="m-w m-sec">
          <TeamGrid team={team} />
          <p className="m-note">Bios: 50 to 70 words each, in three sentences: role and qualifications, the clients they help most, and one plain line about them.</p>
        </div>
      </section>

      <section className="m-w m-sec m-split m-md" id="message">
        <div className="m-ph m-md-ph rv">[Photo of David Munro]</div>
        <div className="grow rv">
          <h2 className="m-h2">A message from David Munro</h2>
          {mdMessage.paragraphs.map((p) => <p className="m-quote" key={p.slice(0, 24)}>{p}</p>)}
          <p className="m-by"><b>David Munro</b>, Managing Director</p>
          <p className="m-note">Draft from option 2 in your deck, to be finalised with David.</p>
        </div>
      </section>

      <CtaBand title="Get to know us before you decide" text="A free, no-obligation first meeting is the best way to see if we're right for you." image="/images/ashdown-valley.jpg" pos="center 55%" />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "About us", path: "/about-us" }], SITE_URL)} />
    </>
  );
}
