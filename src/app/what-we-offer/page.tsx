import { Fragment } from "react";
import { AccordionItem, CtaBand, PageHead } from "@/components/Sections";
import { Icon, IconBox } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { approach, areas, RISK_WARNING, steps } from "@/content/offer";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Financial Planning & Investment Management",
  description: "One joined-up financial plan covering retirement, investment, estate and corporate planning, with your portfolio managed by our own investment team. Start with a free first meeting.",
  path: "/what-we-offer",
});

export default function WhatWeOfferPage() {
  return (
    <>
      <PageHead title="What we offer" intro="Comprehensive financial planning, with your portfolio managed by our own investment team." image="/images/lone-pine.jpg" pos="center 60%" />

      <section className="m-w m-sec m-split" id="planning">
        <div className="side rv">
          <h2 className="m-h2">Comprehensive financial planning</h2>
          <p><b>What does that mean?</b> One plan that covers every part of your financial life, built with professional planning software and reviewed with you every year.</p>
          <p className="m-gap">Open each area to see what&apos;s included.</p>
        </div>
        <div className="grow m-acc m-acc-ic rv">
          {areas.map((a, i) => (
            <AccordionItem key={a.id} id={a.id} group="offer" open={i === 0} summary={<><IconBox name={a.icon} /><span>{a.title}</span></>}>
              <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </AccordionItem>
          ))}
        </div>
      </section>

      <section className="m-band" id="working">
        <div className="m-w m-sec">
          <div className="m-sec-head rv">
            <h2 className="m-h2">Working with us</h2>
            <p>From a first conversation to a long-term partnership. You decide at each stage whether to go ahead.</p>
          </div>
          <ol className="m-steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {steps.map((s, i) => (
              <Fragment key={s.title}>
                <li className="m-step rv">
                  <IconBox name={s.icon} />
                  {s.tag && <span className="m-tag">{s.tag}</span>}
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
                {i < steps.length - 1 && (
                  <li className="m-arr" aria-hidden="true"><Icon name="arrow" /></li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>

      <section className="m-w m-sec" id="approach">
        <div className="m-sec-head rv">
          <h2 className="m-h2">Our investment approach</h2>
          <p>Long-term thinking, staying invested and building resilience through diversification.</p>
        </div>
        <div className="m-grid3">
          {approach.map((a) => (
            <div className="m-card rv" key={a.title}>
              <IconBox name={a.icon} />
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
        <p className="m-note m-risk">{RISK_WARNING}</p>
      </section>

      <CtaBand title="See what a plan could look like for you" text="Start with a free, no-obligation first meeting, in person or by video call." image="/images/pines-sky.jpg" pos="center 42%" />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "What we offer", path: "/what-we-offer" }], SITE_URL)} />
    </>
  );
}
