"use client";

import Image from "next/image";
import { useDesign } from "./DesignOptions";

const COLOUR = { white: "#FFFFFF", mist: "#EEF2F7" } as const;
type Tone = keyof typeof COLOUR;

/** Optional break between two sections, chosen in the design options panel. Renders nothing when set to "None". */
export function Divider({ from, to, photo = "/images/lone-pine.jpg" }: { from: Tone; to: Tone; photo?: string }) {
  const { dividers } = useDesign();
  if (dividers === "none") return null;

  if (dividers === "1")
    return (
      <div className="do-strip">
        <Image src={photo} alt="" fill sizes="100vw" quality={60} />
        <div className="do-strip-shade" aria-hidden="true" />
        <p>Independent. Transparent. Personal.</p>
      </div>
    );

  if (dividers === "2")
    return (
      <div className="dv-edge" style={{ background: COLOUR[to] }} aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,0 100,0 0,100" fill={COLOUR[from]} /></svg>
      </div>
    );

  if (dividers === "3")
    return (
      <div className="do-quote">
        <Image className="do-quote-mark" src="/images/symbol.png" alt="" width={238} height={240} aria-hidden="true" />
        <div className="m-w">
          <p>&ldquo;Our role isn&apos;t simply to recommend investments. It&apos;s to give clarity, guidance and reassurance at every stage of life.&rdquo;</p>
          <span><b>David Munro</b>, Managing Director</span>
        </div>
      </div>
    );

  if (dividers === "4")
    return (
      <div className="dv-edge" style={{ background: COLOUR[to] }} aria-hidden="true">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 0 H1440 V14 C1080 76 360 76 0 14 Z" fill={COLOUR[from]} /></svg>
      </div>
    );

  return (
    <div className="do-fade" style={{ background: `linear-gradient(180deg, ${COLOUR[from]}, ${COLOUR[to]})` }}>
      <Image src={photo} alt="" fill sizes="100vw" quality={60} />
      <ul>
        <li>Independent</li>
        <li>Transparent</li>
        <li>Personal</li>
      </ul>
    </div>
  );
}
