"use client";

import Link from "next/link";
import { useState } from "react";
import type { Person } from "@/content/about";
import { Icon } from "./Icon";
import { Portrait } from "./TeamLayouts";

/** D. A tidy row of small portraits. Choose a person and their details open in a panel underneath. */
export function TeamPanel({ team }: { team: Person[] }) {
  const [i, setI] = useState(0);
  const p = team[i];
  return (
    <div className="to-panel-wrap">
      <div className="to-tiles" role="tablist" aria-label="Our team">
        {team.map((t, n) => (
          <button key={t.name} type="button" role="tab" aria-selected={i === n} onClick={() => setI(n)}>
            <Portrait ratio="1 / 1" label="" />
            <b>{t.name}</b>
            <span>{t.role}</span>
          </button>
        ))}
      </div>
      <div className="to-panel" role="tabpanel">
        <Portrait ratio="4 / 5" />
        <div>
          <h3>{p.name}</h3>
          <span className="role">{p.role}</span>
          {p.credentials && (
            <ul className="m-creds" aria-label="Qualifications">{p.credentials.map((c) => <li key={c}>{c}</li>)}</ul>
          )}
          <p className="bio">{p.bio}</p>
          <span className="off"><Icon name="pin" />{p.office}</span>
          <div><Link href="/contact" className="m-btn m-btn-p">Book a free first meeting</Link></div>
        </div>
      </div>
    </div>
  );
}
