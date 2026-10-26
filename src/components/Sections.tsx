import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

/** Landscape photo with the navy overlay. Used for page heads and call-to-action bands. */
export function Photo({ src, pos, priority }: { src: string; pos?: string; priority?: boolean }) {
  return (
    <>
      <Image className="m-bg" src={src} alt="" fill sizes="100vw" quality={70} priority={priority} style={{ objectPosition: pos ?? "center" }} />
      <div className="m-shade" aria-hidden="true" />
    </>
  );
}

export function PageHead({ title, intro, image, pos }: { title: string; intro?: string; image?: string; pos?: string }) {
  return (
    <section className={`m-head m-photo${image ? "" : " m-plain"}`} data-hero>
      {image && <Photo src={image} pos={pos} priority />}
      <div className="m-w m-head-in">
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ title, text, image, pos }: { title: string; text: string; image: string; pos?: string }) {
  return (
    <section className="m-cta m-photo">
      <Photo src={image} pos={pos} />
      <div className="m-w m-cta-in rv">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="m-btns">
          <Link href="/contact" className="m-btn m-btn-p">
            Book a free first meeting
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="m-link">
      {children} <Icon name="arrow" />
    </Link>
  );
}

/** Exclusive-open accordion built on native <details name>, so every answer is in the HTML and works without JS. */
export function AccordionItem({ id, group, open, summary, children }: { id?: string; group: string; open?: boolean; summary: ReactNode; children: ReactNode }) {
  return (
    <details className="m-q" id={id} name={group} open={open}>
      <summary>
        {summary}
        <i aria-hidden="true" />
      </summary>
      <div className="a">{children}</div>
    </details>
  );
}
