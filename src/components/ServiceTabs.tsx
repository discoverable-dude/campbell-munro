"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Area } from "@/content/offer";
import { Icon, IconBox } from "./Icon";

function useRoving(count: number, onChange: (i: number) => void, horizontal: boolean) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const fwd = horizontal ? "ArrowRight" : "ArrowDown";
    const back = horizontal ? "ArrowLeft" : "ArrowUp";
    const next = e.key === fwd ? (i + 1) % count : e.key === back ? (i - 1 + count) % count : e.key === "Home" ? 0 : e.key === "End" ? count - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  };
  return { refs, onKey };
}

function Detail({ a }: { a: Area }) {
  return (
    <>
      <h3>{a.title}</h3>
      <p className="lo-lead">{a.blurb}</p>
      <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
      <Link href="/contact" className="m-btn m-btn-p">Book a free first meeting</Link>
    </>
  );
}

/** Layout C: list of services on the left, the selected one shown large on the right. */
export function ServiceMasterDetail({ areas }: { areas: Area[] }) {
  const [i, setI] = useState(0);
  const { refs, onKey } = useRoving(areas.length, setI, false);
  return (
    <div className="lo-md">
      <div className="lo-md-list" role="tablist" aria-orientation="vertical" aria-label="Our services">
        {areas.map((a, n) => (
          <button key={a.id} ref={(el) => { refs.current[n] = el; }} type="button" role="tab" id={`md-${a.id}`} aria-selected={i === n} aria-controls={`mdp-${a.id}`} tabIndex={i === n ? 0 : -1} onClick={() => setI(n)} onKeyDown={(e) => onKey(e, n)}>
            <IconBox name={a.icon} />
            <span>{a.title}</span>
            <Icon name="arrow" />
          </button>
        ))}
      </div>
      <div className="lo-md-panel">
        {areas.map((a, n) => (
          <div key={a.id} id={`mdp-${a.id}`} role="tabpanel" aria-labelledby={`md-${a.id}`} hidden={i !== n} className="lo-md-body">
            <Detail a={a} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Layout E: a row of icons across the top; the chosen service opens in a wide panel underneath. */
export function ServiceIconRail({ areas }: { areas: Area[] }) {
  const [i, setI] = useState(0);
  const { refs, onKey } = useRoving(areas.length, setI, true);
  return (
    <div className="lo-rail">
      <div className="lo-rail-tabs" role="tablist" aria-label="Our services">
        {areas.map((a, n) => (
          <button key={a.id} ref={(el) => { refs.current[n] = el; }} type="button" role="tab" id={`rl-${a.id}`} aria-selected={i === n} aria-controls={`rlp-${a.id}`} tabIndex={i === n ? 0 : -1} onClick={() => setI(n)} onKeyDown={(e) => onKey(e, n)}>
            <IconBox name={a.icon} />
            <span>{a.title}</span>
          </button>
        ))}
      </div>
      {areas.map((a, n) => (
        <div key={a.id} id={`rlp-${a.id}`} role="tabpanel" aria-labelledby={`rl-${a.id}`} hidden={i !== n} className="lo-rail-panel">
          <div className="lo-rail-intro">
            <h3>{a.title}</h3>
            <p className="lo-lead">{a.blurb}</p>
            <Link href="/contact" className="m-btn m-btn-p">Book a free first meeting</Link>
          </div>
          <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
