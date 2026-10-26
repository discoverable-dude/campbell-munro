"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

const subscribe = () => () => {};
const motionAllowed = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !reduce && !saveData;
};

/** Background video. Not loaded at all for reduced-motion or data-saver visitors; the poster photo stays. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const enabled = useSyncExternalStore(subscribe, motionAllowed, () => false);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  if (!enabled) return null;
  return (
    <>
      <video ref={ref} className="m-hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <button type="button" className="m-vctl" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>
        <Icon name={playing ? "pause" : "play"} />
      </button>
    </>
  );
}
