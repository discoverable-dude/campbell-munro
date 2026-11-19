"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { HeroSlide } from "@/content/home";
import { Icon } from "./Icon";

/** How long a photo slide stays before fading to the next. Video slides move on when the video ends. */
const PHOTO_MS = 9000;

const noSubscribe = () => () => {};
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const dataSaver = () => !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

/**
 * Hero that fades between photo/video backgrounds and changes the headline and intro with them.
 * Slide 1 is server-rendered (its photo is the LCP image); the rest is progressive enhancement.
 * Rotation and video are off for reduced-motion visitors, and there is a pause control for everyone else.
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const reduce = useSyncExternalStore(noSubscribe, reducedMotion, () => true);
  const saver = useSyncExternalStore(noSubscribe, dataSaver, () => true);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [armed, setArmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rotate = !reduce && playing;
  const videoOk = !reduce && !saver && !videoFailed;
  const slide = slides[active];
  const onVideo = !!slide.video && videoOk;

  // Load the later photos only once the first screen has settled.
  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  // Start the video from the beginning each time its slide comes round.
  useEffect(() => {
    if (onVideo && videoRef.current) videoRef.current.currentTime = 0;
  }, [active, onVideo]);

  // Play or pause the video with the slide and the pause button.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (onVideo && playing) v.play().catch(() => {});
    else v.pause();
  }, [onVideo, playing, active]);

  // Move to the next slide: when the video ends, or after a pause on photo slides.
  useEffect(() => {
    if (!rotate) return;
    const next = () => setActive((i) => (i + 1) % slides.length);
    const v = videoRef.current;
    if (onVideo && v) {
      v.addEventListener("ended", next, { once: true });
      const safety = window.setTimeout(next, 60_000);
      return () => {
        v.removeEventListener("ended", next);
        window.clearTimeout(safety);
      };
    }
    const t = window.setTimeout(next, PHOTO_MS);
    return () => window.clearTimeout(t);
  }, [active, rotate, onVideo, slides.length]);

  return (
    <section className="m-hero" data-hero>
      <div className="m-slides" aria-hidden="true">
        {slides.map((s, i) => {
          if (i > 0 && !armed && i !== active) return null;
          return (
            <div key={s.image} className={`m-slide${active === i ? " is-active" : ""}${s.video ? "" : " kb"}`}>
              <Image className="m-slide-img" src={s.image} alt="" fill sizes="100vw" quality={70} priority={i === 0} />
              {s.video && videoOk && (
                <video ref={videoRef} className="m-slide-video" muted playsInline preload="auto" onError={() => setVideoFailed(true)}>
                  <source src={s.video.webm} type="video/webm" />
                  <source src={s.video.mp4} type="video/mp4" />
                </video>
              )}
            </div>
          );
        })}
      </div>
      <div className="m-hero-shade" />
      <div className="m-w m-hero-in">
        <div className="m-hero-txt">
          <div className="m-hero-copy-stack">
            {slides.map((s, i) => (
              <div key={s.title} className={`m-hero-copy${i === 0 ? " m-hero-first" : ""}${active === i ? " is-active" : ""}`} aria-hidden={active !== i}>
                {i === 0 ? <h1 className="m-hero-title">{s.title}</h1> : <p className="m-hero-title">{s.title}</p>}
                <p className="m-lede">{s.lede}</p>
              </div>
            ))}
          </div>
          <div className="m-btns">
            <Link href="/contact" className="m-btn m-btn-p">Book a free first meeting</Link>
            <Link href="/who-we-help" className="m-btn m-btn-ow">Who we help</Link>
          </div>
        </div>
      </div>
      <div className="m-hero-ctl">
        <div className="m-hero-dots" role="group" aria-label="Hero messages">
          {slides.map((s, i) => (
            <button key={s.title} type="button" className={active === i ? "on" : ""} aria-label={`Show message ${i + 1} of ${slides.length}`} aria-current={active === i} onClick={() => setActive(i)} />
          ))}
        </div>
        {!reduce && (
          <button type="button" className="m-vctl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the moving background" : "Play the moving background"}>
            <Icon name={playing ? "pause" : "play"} />
          </button>
        )}
      </div>
    </section>
  );
}
