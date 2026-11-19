"use client";

import type { Area } from "@/content/offer";
import { useDesign } from "./DesignOptions";
import { IconBox } from "./Icon";
import { ServiceHoverTiles, ServicePhotoCards } from "./ServiceLayouts";
import { ServiceIconRail, ServiceMasterDetail } from "./ServiceTabs";

/** The six services, in whichever layout is chosen in the design options panel. Expandable cards are the server-rendered default. */
export function ServicesSwitch({ areas }: { areas: Area[] }) {
  const { services } = useDesign();
  if (services === "b") return <ServiceHoverTiles areas={areas} />;
  if (services === "c") return <ServiceMasterDetail areas={areas} />;
  if (services === "d") return <ServicePhotoCards areas={areas} />;
  if (services === "e") return <ServiceIconRail areas={areas} />;
  return (
    <div className="m-svc-grid">
      {areas.map((a) => (
        <details key={a.id} id={a.id} name="offer" className="m-svc">
          <summary>
            <IconBox name={a.icon} />
            <h3>{a.title}</h3>
            <p>{a.blurb}</p>
            <span className="m-svc-more" aria-hidden="true"><i /></span>
          </summary>
          <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </details>
      ))}
    </div>
  );
}
