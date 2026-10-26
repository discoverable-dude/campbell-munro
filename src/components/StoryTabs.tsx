"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Story } from "@/content/who";
import { HASH_EVENT } from "./ClientEffects";

/** All stories are in the server-rendered HTML; the tabs only switch which one is shown. */
export function StoryTabs({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const fromHash = useCallback(
    (id: string, scroll: boolean) => {
      const i = stories.findIndex((s) => s.id === id);
      if (i < 0) return;
      setActive(i);
      if (scroll) document.getElementById("stories")?.scrollIntoView({ block: "start" });
    },
    [stories],
  );

  useEffect(() => {
    const on = (e: Event) => fromHash((e as CustomEvent<string>).detail, true);
    window.addEventListener(HASH_EVENT, on);
    // ClientEffects announces the initial hash too, but it may run before this listener exists.
    const raf = requestAnimationFrame(() => fromHash(decodeURIComponent(window.location.hash.slice(1)), true));
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(HASH_EVENT, on);
    };
  }, [fromHash]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = stories.length;
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="m-stories rv">
      <div className="m-st-tabs" role="tablist" aria-label="Client stories">
        {stories.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={active === i}
            aria-controls={s.id}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <small>{s.tab}</small>
            {s.who}
          </button>
        ))}
      </div>
      {stories.map((s, i) => (
        <div key={s.id} id={s.id} role="tabpanel" aria-labelledby={`tab-${s.id}`} className="m-st-panel" hidden={active === i ? undefined : ("until-found" as unknown as boolean)}>
          <h3>{s.title}</h3>
          <p className="m-st-who">{s.intro}</p>
          <div className="m-st-grid">
            <div>
              <h4>{s.concernsHeading}</h4>
              <ul>{s.concerns.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
            <div>
              <h4>How we helped</h4>
              <ul>{s.helped.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
            <div>
              <h4>The outcome</h4>
              <ul>{s.outcome.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </div>
      ))}
      <p className="m-note">Stories are illustrative and to be signed off by compliance before launch.</p>
    </div>
  );
}
