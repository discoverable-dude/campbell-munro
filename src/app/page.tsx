import Image from "next/image";
import Link from "next/link";
import { CtaBand, AccordionItem, TextLink } from "@/components/Sections";
import { HeroVideo } from "@/components/HeroVideo";
import { Icon, IconBox } from "@/components/Icon";
import { hero, panels, planning, trust } from "@/content/home";
import { stories } from "@/content/who";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Campbell Munro | Independent Financial Planning",
  absoluteTitle: true,
  description: "Independent, family-owned financial planning and investment management for business owners, families and people planning retirement. Free first meeting. FCA authorised.",
  path: "/",
});

export default function HomePage() {
  const homeStories = stories;
  return (
    <>
      <section className="m-hero" data-hero>
        <Image className="m-hero-img" src="/images/hero-heath.jpg" alt="" fill priority sizes="100vw" quality={70} />
        <HeroVideo />
        <div className="m-hero-shade" />
        <div className="m-w m-hero-in">
          <div className="m-hero-txt">
            <h1>{hero.title}</h1>
            <p className="m-lede">{hero.lede}</p>
            <div className="m-btns">
              <Link href="/contact" className="m-btn m-btn-p">Book a free first meeting</Link>
              <Link href="/who-we-help" className="m-btn m-btn-ow">Who we help</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="m-w m-panels">
        {panels.map((p) => (
          <Link key={p.title} href={p.href} className="m-panel rv">
            <IconBox name={p.icon} />
            <b>{p.title}</b>
            <span>{p.text}</span>
            <em>{p.cta} <Icon name="arrow" /></em>
          </Link>
        ))}
      </div>

      <section className="m-w m-sec m-split m-who-sum">
        <div className="grow rv">
          <h2 className="m-h2">Whatever life stage you&apos;re at, we can help you plan for your future</h2>
          <p>From building a business to passing wealth on, our advice starts with where you are now and where you want to be.</p>
          <div>
            <Link href="/who-we-help#stories" className="m-btn m-btn-s">Read the client stories</Link>
          </div>
        </div>
        <div className="side m-acc rv">
          {homeStories.map((s, i) => (
            <AccordionItem
              key={s.id}
              group="home-stories"
              open={i === 0}
              summary={<span><small>{s.tab}</small>{s.homeTitle}</span>}
            >
              <p>{s.homeSummary}</p>
              {!s.placeholder && <TextLink href={`/who-we-help#${s.id}`}>Read {s.who.split(",")[0]}&apos;s story</TextLink>}
            </AccordionItem>
          ))}
        </div>
      </section>

      <section className="m-band">
        <div className="m-w m-trust">
          {trust.map((t) => (
            <div className="rv" key={t.title}>
              <IconBox name={t.icon} />
              <b>{t.title}</b>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="m-w m-sec m-split m-md">
        <div className="m-ph m-md-ph rv">[Photo of David Munro]</div>
        <div className="grow rv">
          <h2 className="m-h2">A message from our Managing Director</h2>
          <p className="m-quote">&ldquo;When clients come to us, they&apos;re often facing decisions that will affect their family, their retirement or their future security. Our role isn&apos;t simply to recommend investments. It&apos;s to give clarity, guidance and reassurance at every stage of life.&rdquo;</p>
          <p className="m-by"><b>David Munro</b>, Managing Director</p>
          <div><TextLink href="/about-us#message">Read David&apos;s full message</TextLink></div>
        </div>
      </section>

      <section className="m-band">
        <div className="m-w m-sec">
          <div className="m-sec-head rv">
            <h2 className="m-h2">Comprehensive financial planning</h2>
            <p>One joined-up plan for your whole financial life, with your own adviser and a portfolio managed by our in-house team included as part of the service.</p>
          </div>
          <div className="m-grid5">
            {planning.map((p) => (
              <Link key={p.title} href={p.href} className="m-card m-card-link rv">
                <IconBox name={p.icon} />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Link>
            ))}
          </div>
          <div className="m-split m-invest rv">
            <p className="grow"><b>How we invest.</b> Long-term investment success comes from staying invested through market cycles, with a growing income and a broad spread of investments.</p>
            <TextLink href="/what-we-offer#approach">Our investment approach</TextLink>
          </div>
        </div>
      </section>

      <CtaBand
        title="Talk to an adviser"
        text="Your first meeting is free, with no obligation. Meet us in Crowborough, Lichfield or by video call, wherever you live."
        image="/images/ashdown-valley.jpg"
        pos="center 55%"
      />
    </>
  );
}
