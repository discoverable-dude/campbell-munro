"use client";

import Image from "next/image";
import { useState } from "react";
import type { Person } from "@/content/about";
import { Icon } from "./Icon";

const OFFICES = ["Everyone", "Crowborough", "Lichfield"] as const;

export function TeamGrid({ team }: { team: Person[] }) {
  const [office, setOffice] = useState<(typeof OFFICES)[number]>("Everyone");
  return (
    <>
      <div className="m-split m-team-head rv">
        <div className="grow">
          <h2 className="m-h2">Personal: meet the team</h2>
          <p>You&apos;ll have a dedicated adviser who gets to know you, backed by the whole team.</p>
        </div>
        <div className="m-filter" role="group" aria-label="Filter by office">
          {OFFICES.map((o) => (
            <button key={o} type="button" aria-pressed={office === o} onClick={() => setOffice(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="m-team">
        {team.map((p) => (
          <div className="m-person rv" key={p.name} hidden={office !== "Everyone" && p.office !== office}>
            <div className="m-ph">
              {p.photo ? <Image src={p.photo} alt={`${p.name}, ${p.role}`} fill sizes="(max-width: 720px) 100vw, 380px" /> : "[Portrait]"}
            </div>
            <div className="txt">
              <h3>{p.name}</h3>
              <span className="role">{p.role}</span>
              <span className="off">
                <Icon name="pin" />
                {p.office}
              </span>
              <p className="bio">{p.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
