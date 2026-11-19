"use client";

import { useState } from "react";
import type { Story } from "@/content/who";
import { StoryPhoto } from "./StoryLayouts";

/** E. A photo on the left; concerns, help and outcome as three quick tabs on the right. */
export function StoryPhotoTabs({ s }: { s: Story }) {
  const tabs = [
    { id: "c", label: s.concernsHeading, items: s.concerns },
    { id: "h", label: "How we helped", items: s.helped },
    { id: "o", label: "The outcome", items: s.outcome },
  ];
  const [i, setI] = useState(0);
  return (
    <div className="so-pt">
      <StoryPhoto src="/images/heath-track.jpg" />
      <div className="so-pt-body">
        <small className="so-kicker">{s.tab}, {s.who}</small>
        <h3>{s.title}</h3>
        <p className="m-st-who">{s.intro}</p>
        <div className="so-pt-tabs" role="tablist" aria-label="Story">
          {tabs.map((t, n) => (
            <button key={t.id} type="button" role="tab" aria-selected={i === n} onClick={() => setI(n)}>{t.label}</button>
          ))}
        </div>
        {tabs.map((t, n) => (
          <ul key={t.id} role="tabpanel" hidden={i !== n}>
            {t.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}
