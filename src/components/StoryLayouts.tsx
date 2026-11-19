import Image from "next/image";
import { Fragment } from "react";
import type { Story } from "@/content/who";
import { Icon, IconBox } from "./Icon";

const List = ({ items }: { items: string[] }) => <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>;

/** A. The current flow: three connected cards. */
export function StoryFlow({ s }: { s: Story }) {
  const steps = [
    { icon: "chat", h: s.concernsHeading, items: s.concerns },
    { icon: "compass", h: "How we helped", items: s.helped },
    { icon: "circleCheck", h: "The outcome", items: s.outcome },
  ] as const;
  return (
    <div className="m-st-panel">
      <h3>{s.title}</h3>
      <p className="m-st-who">{s.intro}</p>
      <div className="m-st-flow">
        {steps.map((st, n) => (
          <Fragment key={st.h}>
            <div className="m-st-step">
              <IconBox name={st.icon} />
              <h4>{st.h}</h4>
              <List items={st.items} />
            </div>
            {n < 2 && <span className="m-arr m-st-arr" aria-hidden="true"><Icon name="arrow" /></span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** B. A timeline running down the page. */
export function StoryTimeline({ s }: { s: Story }) {
  const steps = [
    { icon: "chat", label: "Where they started", h: s.concernsHeading, items: s.concerns },
    { icon: "compass", label: "What we did", h: "How we helped", items: s.helped },
    { icon: "circleCheck", label: "Where they are now", h: "The outcome", items: s.outcome },
  ] as const;
  return (
    <div className="so-wrap">
      <h3>{s.title}</h3>
      <p className="m-st-who">{s.intro}</p>
      <ol className="so-tl">
        {steps.map((st) => (
          <li key={st.h}>
            <span className="so-node"><IconBox name={st.icon} /></span>
            <div>
              <small>{st.label}</small>
              <h4>{st.h}</h4>
              <List items={st.items} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** C. Before and after, with what we did in between. */
export function StoryBeforeAfter({ s }: { s: Story }) {
  return (
    <div className="so-wrap">
      <h3>{s.title}</h3>
      <p className="m-st-who">{s.intro}</p>
      <div className="so-ba">
        <div className="so-before">
          <small>Before</small>
          <h4>{s.concernsHeading}</h4>
          <List items={s.concerns} />
        </div>
        <span className="so-ba-arrow m-arr" aria-hidden="true"><Icon name="arrow" /></span>
        <div className="so-after">
          <small>After</small>
          <h4>The outcome</h4>
          <List items={s.outcome} />
        </div>
      </div>
      <div className="so-between">
        <h4>How we helped</h4>
        <ul>{s.helped.map((h) => <li key={h}><Icon name="check" />{h}</li>)}</ul>
      </div>
    </div>
  );
}

/** D. Led by the headline and the three outcomes. The detail sits behind a button. */
export function StoryOutcomes({ s }: { s: Story }) {
  return (
    <div className="so-wrap">
      <small className="so-kicker">{s.tab}, {s.who}</small>
      <h3 className="so-big">{s.title}</h3>
      <p className="m-st-who">{s.intro}</p>
      <div className="so-tiles">
        {s.outcome.map((o) => (
          <div key={o} className="so-tile"><IconBox name="circleCheck" /><p>{o}</p></div>
        ))}
      </div>
      <details className="so-more">
        <summary>How we got there <i aria-hidden="true" /></summary>
        <div className="so-more-grid">
          <div><h4>{s.concernsHeading}</h4><List items={s.concerns} /></div>
          <div><h4>How we helped</h4><List items={s.helped} /></div>
        </div>
      </details>
    </div>
  );
}

/** E (static part). A photo beside the story. */
export function StoryPhoto({ src }: { src: string }) {
  return (
    <div className="so-photo">
      <Image src={src} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" quality={60} />
      <div className="so-photo-shade" aria-hidden="true" />
      <span>[Client photo or illustration]</span>
    </div>
  );
}
