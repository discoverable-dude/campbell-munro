import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/Sections";
import { breadcrumbs, pageMeta } from "@/lib/metadata";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Book a Free First Meeting",
  description: "Book a free, no-obligation first meeting with a Campbell Munro adviser, in Crowborough, Lichfield or by video call. An adviser will be in touch within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHead title="Contact" intro="Start with a free, no-obligation first meeting." image="/images/pine-gorse.jpg" pos="center 45%" />
      <section className="m-w m-sec m-split m-contact">
        <div className="grow m-formbox rv">
          <h2 className="m-h2">Book a free first meeting</h2>
          <ContactForm />
        </div>
        <div className="side m-contact-side">
          <div className="m-box rv">
            <h3>What happens next</h3>
            <p>An adviser gets in touch within one working day to arrange a time. Your first meeting is free, with no obligation, in person or by video call.</p>
          </div>
          {SITE.offices.map((o) => (
            <div className="m-box rv" key={o.id}>
              <h3><Icon name="pin" />{o.name}</h3>
              <address style={{ fontStyle: "normal" }}>{o.street}, {o.locality}, {o.region} {o.postcode}</address>
              <p className="m-dl">
                <Icon name="phone" />
                {o.phone ? <a href={`tel:${"+44" + o.phone.replace(/\s/g, "").replace(/^0/, "")}`}>{o.phone}</a> : "[Lichfield number to confirm]"}
              </p>
            </div>
          ))}
          <div className="m-box rv">
            <p className="m-dl"><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }], SITE_URL)} />
    </>
  );
}
