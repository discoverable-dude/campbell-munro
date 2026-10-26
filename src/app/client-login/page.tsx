import { PageHead } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { portals } from "@/content/login";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Client Login",
  description: "Log in to see your financial plan, documents and investments online, through Plannr, Transact, M&G or AJ Bell.",
  path: "/client-login",
});

export default function ClientLoginPage() {
  return (
    <>
      <PageHead title="Client login" intro="See your plan, documents and investments online." image="/images/sky-clouds.jpg" pos="center 35%" />
      <section className="m-w m-sec">
        <div className="m-grid4">
          {portals.map((p) => (
            <div className="m-card m-portal rv" key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <div className="m-plinks">
                <a className="m-btn m-btn-s" href={p.loginUrl} target="_blank" rel="noopener noreferrer" aria-disabled={p.loginUrl ? undefined : true} aria-label={`Log in to ${p.name} (opens in a new tab)`}>
                  Log in <Icon name="external" />
                </a>
                {p.appUrl && <a className="m-link" href={p.appUrl} target="_blank" rel="noopener noreferrer">Get the app</a>}
              </div>
            </div>
          ))}
        </div>
        <div className="m-split m-help rv">
          <div className="grow">
            <h2 className="m-h2">Helpful documents</h2>
            <p>[Login instructions for each portal, and documents such as our terms of business and privacy notice.]</p>
          </div>
          <div className="side m-box">
            <h3>Trouble logging in?</h3>
            <p>Call us on <a href="tel:+441892575575">01892 575575</a> and we&apos;ll help you get set up.</p>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Client login", path: "/client-login" }], SITE_URL)} />
    </>
  );
}
