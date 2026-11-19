import { PageHead } from "@/components/Sections";
import { TeamByOffice, TeamHover, TeamLead, TeamUniform } from "@/components/TeamLayouts";
import { TeamPanel } from "@/components/TeamPanel";
import { team } from "@/content/about";
import { pageMeta } from "@/lib/metadata";

// Temporary review page: remove it once Campbell Munro has picked a team layout.
export const metadata = pageMeta({ title: "Team layout options", description: "Team section layout options for review.", path: "/team-options", noindex: true });

const OPTIONS = [
  { name: "A. Uniform grid (current)", note: "Nine equal cards with portrait, role, qualifications and bio. Fair to everyone, but long, and the bios make it text-heavy.", el: <TeamUniform team={team} /> },
  { name: "B. Managing Director first", note: "David gets a large feature card, and the other eight sit in a tighter grid beneath without bios. Short and clear who leads the firm. The bios would live on a click or a separate page.", el: <TeamLead team={team} /> },
  { name: "C. Portrait-led, bio on hover", note: "Tall portrait cards with only name and role showing. Hover, focus or tap and a navy panel slides up with the bio, qualifications and a booking link. Photos do the work, and the page stays short.", el: <TeamHover team={team} /> },
  { name: "D. Row of portraits, details in a panel", note: "A compact row of small portraits. Pick someone and their full details open in a panel underneath. Everyone is visible at a glance, with room for a proper bio.", el: <TeamPanel team={team} /> },
  { name: "E. By office, as a list", note: "A compact list for each office, with initials until portraits arrive. The quickest to launch without photos, and it answers 'who is where' directly.", el: <TeamByOffice team={team} /> },
];

export default function TeamOptionsPage() {
  return (
    <>
      <PageHead title="Team layout options" intro="Five ways to lay out the team. The portraits and bios are still placeholders, so the grey boxes stand in for the photos to come." />
      {OPTIONS.map((o, n) => (
        <section key={o.name} className={`to-opt${n % 2 ? " to-mist" : ""}`}>
          <div className="m-w">
            <div className="to-cap">
              <h2>{o.name}</h2>
              <p>{o.note}</p>
            </div>
            {o.el}
          </div>
        </section>
      ))}
    </>
  );
}
