import { DividerAngle, DividerCurve, DividerFade, DividerPhotoStrip, DividerQuote } from "@/components/DividerDemos";
import { PageHead } from "@/components/Sections";
import { pageMeta } from "@/lib/metadata";

// Temporary review page: remove it once Campbell Munro has picked a divider style.
export const metadata = pageMeta({ title: "Divider options", description: "Section divider options for review.", path: "/divider-options", noindex: true });

const OPTIONS = [
  { name: "1. Photo strip", note: "A slim band of Ashdown Forest with one line over it. Still, calm, and it adds the imagery the client keeps asking for.", Demo: DividerPhotoStrip },
  { name: "2. Angled edge", note: "The tinted section ends on a diagonal instead of a straight line. Adds energy without adding anything to read.", Demo: DividerAngle },
  { name: "3. Quote band", note: "A navy band with a large quote and the logo symbol faintly behind it. Breaks up text with a human voice. Could carry David's message or a client line.", Demo: DividerQuote },
  { name: "4. Soft curve", note: "The tinted section ends on a gentle curve. The softest of the edge options.", Demo: DividerCurve },
  { name: "5. Fading photo", note: "A landscape that melts into the white page above and below, with the three values across it. No hard edges at all.", Demo: DividerFade },
];

export default function DividerOptionsPage() {
  return (
    <>
      <PageHead title="Divider options" intro="Five ways to break up text-heavy sections, with no parallax. Each is shown between two sections of real About page text." />
      {OPTIONS.map(({ name, note, Demo }) => (
        <section key={name} className="do-opt">
          <div className="m-w do-cap">
            <h2>{name}</h2>
            <p>{note}</p>
          </div>
          <div className="do-frame"><Demo /></div>
        </section>
      ))}
    </>
  );
}
