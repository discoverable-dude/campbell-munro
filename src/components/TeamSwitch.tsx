"use client";

import type { Person } from "@/content/about";
import { useDesign } from "./DesignOptions";
import { TeamGrid } from "./TeamGrid";
import { TeamByOffice, TeamHover, TeamLead } from "./TeamLayouts";
import { TeamPanel } from "./TeamPanel";

/** The team, in whichever layout is chosen in the design options panel. The filterable grid is the default. */
export function TeamSwitch({ team }: { team: Person[] }) {
  const { team: layout } = useDesign();
  if (layout === "a") return <TeamGrid team={team} />;
  return (
    <>
      <div className="m-split m-team-head">
        <div className="grow">
          <h2 className="m-h2">Personal: meet the team</h2>
          <p>You&apos;ll have a dedicated adviser who gets to know you, backed by the whole team.</p>
        </div>
      </div>
      {layout === "b" && <TeamLead team={team} />}
      {layout === "c" && <TeamHover team={team} />}
      {layout === "d" && <TeamPanel team={team} />}
      {layout === "e" && <TeamByOffice team={team} />}
    </>
  );
}
