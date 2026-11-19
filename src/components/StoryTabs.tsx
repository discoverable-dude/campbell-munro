"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Story } from "@/content/who";
import { HASH_EVENT } from "./ClientEffects";
import { useDesign } from "./DesignOptions";
import { Icon, IconBox } from "./Icon";
import { StoryBeforeAfter, StoryOutcomes, StoryTimeline } from "./StoryLayouts";
import { StoryPhotoTabs } from "./StoryPhotoTabs";

/** All stories are in the server-rendered HTML; the tabs only switch which one is shown. */
export function StoryTabs({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState(0);
  const [gen, setGen] = useState(0);
  const { stories: layout } = useDesign();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const fromHash = useCallback(
    (id: string, scroll: boolean) => {
      const i = stories.findIndex((s) => s.id === id);
      if (i < 0) return;
      setActive(i);
      setGen((g) => g + 1);
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
    setGen((g) => g + 1);
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
            onClick={() => {
              setActive(i);
              setGen((g) => g + 1);
            }}
            onKeyDown={(e) => onKey(e, i)}
          >
            <small>{s.tab}</small>
            {s.who}
          </button>
        ))}
      </div>
      {stories.map((s, i) => (
        <div key={s.id} id={s.id} role="tabpanel" aria-labelledby={`tab-${s.id}`} className={`m-st-panel${layout === "a" ? "" : " so-bare"}`} data-gen={active === i ? (gen % 2 ? "a" : "b") : undefined} hidden={active === i ? undefined : ("until-found" as unknown as boolean)}>
          {layout === "b" && <StoryTimeline s={s} />}
          {layout === "c" && <StoryBeforeAfter s={s} />}
          {layout === "d" && <StoryOutcomes s={s} />}
          {layout === "e" && <StoryPhotoTabs s={s} />}
          {layout === "a" && (
            <>
              <h3>{s.title}</h3>
              <p className="m-st-who">{s.intro}</p>
              <div className="m-st-flow">
                {([
                  { icon: "chat", heading: s.concernsHeading, items: s.concerns },
                  { icon: "compass", heading: "How we helped", items: s.helped },
                  { icon: "circleCheck", heading: "The outcome", items: s.outcome },
                ] as const).map((step, n) => (
                  <Fragment key={step.heading}>
                    <div className="m-st-step" style={{ "--i": n } as CSSProperties}>
                      <IconBox name={step.icon} />
                      <h4>{step.heading}</h4>
                      <ul>{step.items.map((c) => <li key={c}>{c}</li>)}</ul>
                    </div>
                    {n < 2 && <span className="m-arr m-st-arr" style={{ "--i": n } as CSSProperties} aria-hidden="true"><Icon name="arrow" /></span>}
                  </Fragment>
                ))}
              </div>

            </>
          )}
        </div>
      ))}
      <p className="m-note">Stories are illustrative and to be signed off by compliance before launch.</p>
    </div>
  );
}
