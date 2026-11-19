import Image from "next/image";
import type { ReactNode } from "react";

/** Stand-in page sections, so each divider is judged between real-looking content. */
export function DemoText({ heading, children, tone = "white", className = "" }: { heading: string; children: ReactNode; tone?: "white" | "mist"; className?: string }) {
  return (
    <div className={`do-text do-${tone} ${className}`}>
      <div className="m-w">
        <h3>{heading}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

const A = <DemoText heading="Independent">We&apos;re not owned by, or tied to, any bank, fund house or product provider. That means more choice, advice built around you, and no product bias.</DemoText>;

/** 1. A slim photo strip carrying one line. No parallax, no movement. */
export function DividerPhotoStrip() {
  return (
    <>
      {A}
      <div className="do-strip">
        <Image src="/images/lone-pine.jpg" alt="" fill sizes="100vw" quality={60} />
        <div className="do-strip-shade" aria-hidden="true" />
        <p>Independent. Transparent. Personal.</p>
      </div>
      <DemoText heading="Transparent about what you pay">You&apos;ll always know what you&apos;re paying and what you get for it, and you won&apos;t be asked to commit before you&apos;re ready.</DemoText>
    </>
  );
}

/** 2. A diagonal edge between a tinted section and a white one. */
export function DividerAngle() {
  return (
    <>
      <DemoText heading="Independent" tone="mist" className="do-angle">We&apos;re not owned by, or tied to, any bank, fund house or product provider. That means more choice, advice built around you, and no product bias.</DemoText>
      <DemoText heading="Transparent about what you pay" className="do-after-angle">You&apos;ll always know what you&apos;re paying and what you get for it, and you won&apos;t be asked to commit before you&apos;re ready.</DemoText>
    </>
  );
}

/** 3. A navy band with a large quote. */
export function DividerQuote() {
  return (
    <>
      {A}
      <div className="do-quote">
        <Image className="do-quote-mark" src="/images/symbol.png" alt="" width={238} height={240} aria-hidden="true" />
        <div className="m-w">
          <p>&ldquo;Our role isn&apos;t simply to recommend investments. It&apos;s to give clarity, guidance and reassurance at every stage of life.&rdquo;</p>
          <span><b>David Munro</b>, Managing Director</span>
        </div>
      </div>
      <DemoText heading="Transparent about what you pay">You&apos;ll always know what you&apos;re paying and what you get for it, and you won&apos;t be asked to commit before you&apos;re ready.</DemoText>
    </>
  );
}

/** 4. A soft curve into the next section. */
export function DividerCurve() {
  return (
    <>
      <DemoText heading="Independent" tone="mist" className="do-curve">
        We&apos;re not owned by, or tied to, any bank, fund house or product provider. That means more choice, advice built around you, and no product bias.
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70 L0 46 C 360 0 1080 0 1440 46 L1440 70 Z" fill="#FFFFFF" /></svg>
      </DemoText>
      <DemoText heading="Transparent about what you pay">You&apos;ll always know what you&apos;re paying and what you get for it, and you won&apos;t be asked to commit before you&apos;re ready.</DemoText>
    </>
  );
}

/** 5. A photo that fades into the page above and below, with the three values on top. */
export function DividerFade() {
  return (
    <>
      {A}
      <div className="do-fade">
        <Image src="/images/ashdown-valley.jpg" alt="" fill sizes="100vw" quality={60} />
        <ul>
          <li>Independent</li>
          <li>Transparent</li>
          <li>Personal</li>
        </ul>
      </div>
      <DemoText heading="Transparent about what you pay">You&apos;ll always know what you&apos;re paying and what you get for it, and you won&apos;t be asked to commit before you&apos;re ready.</DemoText>
    </>
  );
}
