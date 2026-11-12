import { Footer, type FooterVariant } from "@/components/Footer";
import { PageHead } from "@/components/Sections";
import { pageMeta } from "@/lib/metadata";

// Temporary review page: remove it once Campbell Munro has picked a footer.
export const metadata = pageMeta({ title: "Footer options", description: "Footer design options for review.", path: "/footer-options", noindex: true });

const OPTIONS: { id: FooterVariant; name: string; note: string }[] = [
  { id: "mist", name: "A. Soft mist", note: "Light grey-blue panel, full-colour logo. The quietest option and the closest to the rest of the page." },
  { id: "photo", name: "B. Heath photo wash", note: "The Ashdown Forest photo under a see-through navy wash, like the call-to-action bands. Dark, but with texture." },
  { id: "sky", name: "C. Sky gradient", note: "White fading to a soft sky blue, with the logo symbol as a faint watermark and a gold line on top." },
];

export default function FooterOptionsPage() {
  return (
    <div className="fo-page">
      <PageHead title="Footer options" intro="Three alternatives to the solid navy footer. Scroll down to compare." />
      {OPTIONS.map((o) => (
        <section key={o.id} className="fo-opt">
          <div className="m-w fo-cap">
            <h2>{o.name}</h2>
            <p>{o.note}</p>
          </div>
          <Footer variant={o.id} />
        </section>
      ))}
    </div>
  );
}
