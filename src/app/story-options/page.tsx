import { PageHead } from "@/components/Sections";
import { StoryBeforeAfter, StoryFlow, StoryOutcomes, StoryTimeline } from "@/components/StoryLayouts";
import { StoryPhotoTabs } from "@/components/StoryPhotoTabs";
import { stories } from "@/content/who";
import { pageMeta } from "@/lib/metadata";

// Temporary review page: remove it once Campbell Munro has picked a client story layout.
export const metadata = pageMeta({ title: "Client story options", description: "Client story layout options for review.", path: "/story-options", noindex: true });

const john = stories[0];

const OPTIONS = [
  { name: "A. Three-step flow (current)", note: "Concerns, how we helped, outcome as three connected cards that appear one after another.", el: <StoryFlow s={john} /> },
  { name: "B. Timeline", note: "The story runs down the page on a line: where he started, what we did, where he is now. Reads like a story, and is easy to follow on a phone.", el: <StoryTimeline s={john} /> },
  { name: "C. Before and after", note: "Two big panels side by side, the worries on one side and the result on the other, with what we did underneath. The change is the headline.", el: <StoryBeforeAfter s={john} /> },
  { name: "D. Outcome first", note: "Leads with the headline and the three outcomes as large tiles. The concerns and the help sit behind 'How we got there'. The least text on show.", el: <StoryOutcomes s={john} /> },
  { name: "E. Photo and tabs", note: "A photo beside the story, with three quick tabs. Needs a photo or illustration for each story. This one shows a stand-in.", el: <StoryPhotoTabs s={john} /> },
];

export default function StoryOptionsPage() {
  return (
    <>
      <PageHead title="Client story options" intro="Five ways to show a client story, using John's story. The client said the current stories feel dry." />
      {OPTIONS.map((o, n) => (
        <section key={o.name} className={`so-opt${n % 2 ? "" : " so-mist"}`}>
          <div className="m-w">
            <div className="so-cap">
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
