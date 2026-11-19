import Link from "next/link";
import { IconBox } from "@/components/Icon";
import { PageHead } from "@/components/Sections";
import { ServiceHoverTiles, ServicePhotoCards } from "@/components/ServiceLayouts";
import { ServiceIconRail, ServiceMasterDetail } from "@/components/ServiceTabs";
import { areas } from "@/content/offer";
import { pageMeta } from "@/lib/metadata";

// Temporary review page: remove it once Campbell Munro has picked a layout.
export const metadata = pageMeta({ title: "Layout options", description: "Layout options for the services section, for review.", path: "/layout-options", noindex: true });

function Caption({ name, note, best }: { name: string; note: string; best: string }) {
  return (
    <div className="lo-cap">
      <h2>{name}</h2>
      <p>{note}</p>
      <p className="lo-for"><b>Works best for:</b> {best}</p>
    </div>
  );
}

export default function LayoutOptionsPage() {
  return (
    <>
      <PageHead title="Layout options" intro="Five ways to lay out the six services on What we offer. The same layouts could be used for the home page boxes and the About pillars. Scroll down to compare." />

      <section className="lo-opt">
        <div className="m-w">
          <Caption name="A. Expandable cards (current)" note="A 3×2 grid of cards. Click a card to open the list of what's included; it grows in place." best="a clean, familiar layout. Opening several cards makes the section long." />
          <div className="m-svc-grid">
            {areas.map((a) => (
              <details key={a.id} name="lo-a" className="m-svc">
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
        </div>
      </section>

      <section className="lo-opt">
        <div className="m-w">
          <Caption name="B. Hover-reveal tiles" note="A 3×2 grid of tall tiles with the icon, title and one line. Hover, focus or tap a tile and a navy panel slides up with what's included. Nothing changes size, so the page never jumps." best="making the section feel impactful and compact, like the landing page example from the call. The list is hidden until you interact." />
          <ServiceHoverTiles areas={areas} />
        </div>
      </section>

      <section className="lo-opt">
        <div className="m-w">
          <Caption name="C. List and detail" note="The six services as a list on the left; the one you choose is shown large on the right with its full list and a button to book." best="people who want to read one service properly. Only one service takes up space at a time." />
          <ServiceMasterDetail areas={areas} />
        </div>
      </section>

      <section className="lo-opt">
        <div className="m-w">
          <Caption name="D. Photo cards" note="Each service gets a landscape photo from Ashdown Forest with the icon overlapping it. The full list is always visible, with no clicking." best="the 'more image based' direction Michael mentioned, and the nearest thing to a no-stock-photos, no-icon-clichés look. Photos here are the watermarked previews." />
          <ServicePhotoCards areas={areas} />
        </div>
      </section>

      <section className="lo-opt">
        <div className="m-w">
          <Caption name="E. Icon rail with detail panel" note="The six icons sit in a row across the top like a menu. Choose one and a wide panel opens underneath with the intro on the left and the list on the right." best="giving the icons a bigger role, so the icon style choice matters most. Compact on desktop, two or three per row on a phone." />
          <ServiceIconRail areas={areas} />
        </div>
      </section>

      <section className="lo-opt">
        <div className="m-w">
          <p>Icon styles are on <Link href="/icon-options" style={{ textDecoration: "underline" }}>the icon options page</Link>. Any layout above can use any icon style.</p>
        </div>
      </section>
    </>
  );
}
