import Image from "next/image";
import type { Area } from "@/content/offer";
import { Icon, IconBox } from "./Icon";

/** Layout B: tiles that slide up to show what's included when you hover, focus or tap them. */
export function ServiceHoverTiles({ areas }: { areas: Area[] }) {
  return (
    <div className="lo-tiles">
      {areas.map((a) => (
        <div key={a.id} className="lo-tile" tabIndex={0}>
          <div className="lo-tile-front">
            <IconBox name={a.icon} />
            <div>
              <h3>{a.title}</h3>
              <p>{a.blurb}</p>
            </div>
            <span className="lo-tile-hint">What&apos;s included <Icon name="arrow" /></span>
          </div>
          <div className="lo-tile-more">
            <h3>{a.title}</h3>
            <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  );
}

const PHOTOS = ["/images/pines-sky.jpg", "/images/lone-pine.jpg", "/images/ashdown-valley.jpg", "/images/forest-view.jpg", "/images/heath-track.jpg", "/images/heather-sunset.jpg"];

/** Layout D: each service gets a landscape photo, with the icon overlapping it and the list always visible. */
export function ServicePhotoCards({ areas }: { areas: Area[] }) {
  return (
    <div className="lo-photos">
      {areas.map((a, n) => (
        <article key={a.id} className="lo-pcard">
          <div className="lo-pcard-img">
            <Image src={PHOTOS[n % PHOTOS.length]} alt="" fill sizes="(max-width: 720px) 100vw, 380px" quality={60} />
            <div className="lo-pcard-shade" aria-hidden="true" />
          </div>
          <div className="lo-pcard-badge"><IconBox name={a.icon} /></div>
          <div className="lo-pcard-body">
            <h3>{a.title}</h3>
            <p>{a.blurb}</p>
            <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  );
}
