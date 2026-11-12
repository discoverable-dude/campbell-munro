import { IconBox } from "@/components/Icon";
import { PageHead } from "@/components/Sections";
import { areas } from "@/content/offer";
import { panels } from "@/content/home";
import { pageMeta } from "@/lib/metadata";

// Temporary review page: remove it once Campbell Munro has picked an icon style.
export const metadata = pageMeta({ title: "Icon options", description: "Icon style options for review.", path: "/icon-options", noindex: true });

const OPTIONS = [
  { cls: "ico-a", name: "A. Current", note: "Thin line icon on a pale tile. The version the client rated 6 out of 10." },
  { cls: "ico-b", name: "B. Solid navy circle", note: "White icon on a navy-to-blue circle. Stronger, more confident, and still very clean." },
  { cls: "ico-c", name: "C. Large line icon, gold rule", note: "No box. A big, fine-line icon with a gold underline. More editorial and lighter on the page." },
  { cls: "ico-d", name: "D. Photo tile", note: "The icon over a navy-tinted crop of Ashdown Forest, tying the icons to the imagery (the 'image based' idea). With licensed photos, each tile could use a different crop." },
  { cls: "ico-e", name: "E. Ringed badge", note: "A pale circle with a blue ring, a little like a seal. Classic and reassuring." },
];

export default function IconOptionsPage() {
  return (
    <>
      <PageHead title="Icon options" intro="Five icon styles, shown on the home page boxes and the services. Scroll down to compare." />
      {OPTIONS.map((o) => (
        <section key={o.cls} className={`ico-opt ${o.cls}`}>
          <div className="m-w">
            <h2>{o.name}</h2>
            <p>{o.note}</p>
            <div className="m-grid4" style={{ marginBottom: 24 }}>
              {panels.map((p) => (
                <div className="m-card" key={p.title}>
                  <IconBox name={p.icon} />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <div className="m-grid3">
              {areas.map((a) => (
                <div className="m-card" key={a.id}>
                  <IconBox name={a.icon} />
                  <h3>{a.title}</h3>
                  <p>{a.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
