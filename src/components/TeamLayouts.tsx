import Link from "next/link";
import type { Person } from "@/content/about";
import { Icon } from "./Icon";

const Creds = ({ p }: { p: Person }) =>
  p.credentials ? <ul className="m-creds" aria-label="Qualifications">{p.credentials.map((c) => <li key={c}>{c}</li>)}</ul> : null;

const Office = ({ p }: { p: Person }) => <span className="off"><Icon name="pin" />{p.office}</span>;

export const Portrait = ({ ratio = "4 / 5", label = "[Portrait]" }: { ratio?: string; label?: string }) => (
  <div className="to-ph" style={{ aspectRatio: ratio }}>{label}</div>
);

/** A. The current uniform grid. */
export function TeamUniform({ team }: { team: Person[] }) {
  return (
    <div className="m-team">
      {team.map((p) => (
        <div className="m-person" key={p.name}>
          <div className="m-ph">[Portrait]</div>
          <div className="txt">
            <h3>{p.name}</h3>
            <span className="role">{p.role}</span>
            <Creds p={p} />
            <Office p={p} />
            <p className="bio">{p.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** B. The Managing Director large, everyone else in a tighter grid. */
export function TeamLead({ team }: { team: Person[] }) {
  const [lead, ...rest] = team;
  return (
    <div className="to-lead-wrap">
      <div className="to-lead">
        <Portrait ratio="1 / 1" />
        <div>
          <h3>{lead.name}</h3>
          <span className="role">{lead.role}</span>
          <Creds p={lead} />
          <p className="bio">{lead.bio}</p>
          <Office p={lead} />
        </div>
      </div>
      <div className="to-grid4">
        {rest.map((p) => (
          <div className="to-card" key={p.name}>
            <Portrait />
            <h3>{p.name}</h3>
            <span className="role">{p.role}</span>
            <Creds p={p} />
            <Office p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** C. Portrait-led cards. Hover, focus or tap to read the bio over the photo. */
export function TeamHover({ team }: { team: Person[] }) {
  return (
    <div className="to-hover">
      {team.map((p) => (
        <div className="to-hcard" key={p.name} tabIndex={0}>
          <Portrait ratio="3 / 4" />
          <div className="to-hfront">
            <h3>{p.name}</h3>
            <span>{p.role}</span>
          </div>
          <div className="to-hmore">
            <h3>{p.name}</h3>
            <span>{p.role}</span>
            <Creds p={p} />
            <p>{p.bio}</p>
            <Link href="/contact">Book a free meeting <Icon name="arrow" /></Link>
          </div>
        </div>
      ))}
    </div>
  );
}

/** E. Grouped by office, as a compact list. Works with or without portraits. */
export function TeamByOffice({ team }: { team: Person[] }) {
  const offices = ["Crowborough", "Lichfield"] as const;
  return (
    <div className="to-offices">
      {offices.map((o) => (
        <div key={o}>
          <h3><Icon name="pin" />{o}</h3>
          <ul>
            {team.filter((p) => p.office === o).map((p) => (
              <li key={p.name}>
                <div className="to-avatar" aria-hidden="true">{p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                <div>
                  <b>{p.name}</b>
                  <span>{p.role}</span>
                  <Creds p={p} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
