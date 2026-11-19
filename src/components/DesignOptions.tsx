"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

/**
 * Review mode: lets the client switch between the design options on the real pages.
 * Hidden for normal visitors. Open any page with ?review=1 to show the panel (it then stays on for that browser,
 * ?review=0 hides it). Once the client has chosen, the winning options become the defaults and this file is deleted.
 */
export const GROUPS = [
  { key: "footer", label: "Footer", where: null, options: [["navy", "Solid navy (before)"], ["mist", "Soft mist"], ["photo", "Heath photo wash"], ["sky", "Sky gradient"]], default: "mist" },
  { key: "icons", label: "Icon style", where: { href: "/", label: "the home page" }, options: [["a", "Current"], ["b", "Navy circle"], ["c", "Large line, gold rule"], ["d", "Photo tile"], ["e", "Ringed badge"]], default: "a" },
  { key: "services", label: "Services layout", where: { href: "/what-we-offer", label: "What we offer" }, options: [["a", "Expandable cards"], ["b", "Hover tiles"], ["c", "List and detail"], ["d", "Photo cards"], ["e", "Icon rail"]], default: "a" },
  { key: "dividers", label: "Section dividers", where: { href: "/who-we-help", label: "Who we help" }, options: [["none", "None"], ["1", "Photo strip"], ["2", "Angled edge"], ["3", "Quote band"], ["4", "Soft curve"], ["5", "Fading photo"]], default: "none" },
  { key: "stories", label: "Client stories", where: { href: "/who-we-help#stories", label: "Who we help" }, options: [["a", "Three-step flow"], ["b", "Timeline"], ["c", "Before and after"], ["d", "Outcome first"], ["e", "Photo and tabs"]], default: "a" },
  { key: "team", label: "Team", where: { href: "/about-us#team", label: "About us" }, options: [["a", "Uniform grid"], ["b", "Director first"], ["c", "Hover bios"], ["d", "Portrait row and panel"], ["e", "By office"]], default: "a" },
] as const;

type Key = (typeof GROUPS)[number]["key"];
export type DesignState = Record<Key, string>;

const DEFAULTS = Object.fromEntries(GROUPS.map((g) => [g.key, g.default])) as DesignState;
const DESIGN_KEY = "cm-design";
const REVIEW_KEY = "cm-review";
const ENV_REVIEW = process.env.NEXT_PUBLIC_REVIEW_PANEL === "true";

type Snap = { design: DesignState; review: boolean };
const SERVER: Snap = { design: DEFAULTS, review: ENV_REVIEW };
let snap: Snap = SERVER;
let loaded = false;
const listeners = new Set<() => void>();

const isValid = (key: string, value: string) => GROUPS.some((g) => g.key === key && g.options.some((o) => o[0] === value));

/** Footer and icons are styled from attributes on <html>, so they apply before React and to every page. */
function apply(d: DesignState) {
  document.documentElement.dataset.footer = d.footer;
  document.documentElement.dataset.icons = d.icons;
}

function load() {
  const design = { ...DEFAULTS };
  let review = ENV_REVIEW;
  try {
    const saved = JSON.parse(localStorage.getItem(DESIGN_KEY) ?? "{}") as Record<string, string>;
    for (const k of Object.keys(saved)) if (isValid(k, saved[k])) design[k as Key] = saved[k];
    const flag = localStorage.getItem(REVIEW_KEY);
    if (flag) review = flag === "1";
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const shared = params.get("design");
  if (shared) {
    for (const part of shared.split(",")) {
      const [k, v] = part.split(":");
      if (isValid(k, v)) design[k as Key] = v;
    }
  }
  const r = params.get("review");
  if (r === "1" || r === "0") {
    review = r === "1";
    try {
      localStorage.setItem(REVIEW_KEY, r);
    } catch {}
  }
  snap = { design, review };
  apply(design);
}

function ensure() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  load();
}

const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  ensure();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const getSnapshot = () => {
  ensure();
  return snap;
};
const getServerSnapshot = () => SERVER;

function persist() {
  try {
    localStorage.setItem(DESIGN_KEY, JSON.stringify(snap.design));
  } catch {}
}

function setDesign(key: Key, value: string) {
  snap = { ...snap, design: { ...snap.design, [key]: value } };
  persist();
  apply(snap.design);
  emit();
}

function resetDesign() {
  snap = { ...snap, design: { ...DEFAULTS } };
  persist();
  apply(snap.design);
  emit();
}

function setReview(on: boolean) {
  snap = { ...snap, review: on };
  try {
    localStorage.setItem(REVIEW_KEY, on ? "1" : "0");
  } catch {}
  emit();
}

const useSnap = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

/** The current choices. On the server and for the first paint these are the defaults. */
export const useDesign = () => useSnap().design;

const labelOf = (key: Key, value: string) => GROUPS.find((g) => g.key === key)?.options.find((o) => o[0] === value)?.[1] ?? value;

export function DesignPanel() {
  const { design, review } = useSnap();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  if (!review) return null;

  const copy = async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNote(msg);
    } catch {
      setNote("Couldn't copy. Select the text and copy it manually.");
    }
    window.setTimeout(() => setNote(""), 3000);
  };
  const summary = GROUPS.map((g) => `${g.label}: ${labelOf(g.key, design[g.key])}`).join("\n");
  const link = () => `${window.location.origin}${window.location.pathname}?review=1&design=${GROUPS.map((g) => `${g.key}:${design[g.key]}`).join(",")}`;

  return (
    <div className="dp">
      <button type="button" className="dp-fab" aria-expanded={open} aria-controls="dp-panel" onClick={() => setOpen((o) => !o)}>
        <Icon name="compass" /> Design options
      </button>
      {open && (
        <div id="dp-panel" className="dp-panel" role="dialog" aria-label="Design options">
          <p className="dp-intro">Switch between the options on the real pages. Your choices stay on this browser and apply across the site.</p>
          {GROUPS.map((g) => (
            <fieldset key={g.key}>
              <legend>{g.label}</legend>
              <div className="dp-opts">
                {g.options.map(([v, label]) => (
                  <button key={v} type="button" aria-pressed={design[g.key] === v} onClick={() => setDesign(g.key, v)}>
                    {label}
                  </button>
                ))}
              </div>
              {g.where && <Link className="dp-see" href={g.where.href}>See it on {g.where.label}</Link>}
            </fieldset>
          ))}
          <div className="dp-actions">
            <button type="button" onClick={() => copy(summary, "Copied. Paste it into your reply.")}>Copy my choices</button>
            <button type="button" onClick={() => copy(link(), "Link copied.")}>Copy link</button>
            <button type="button" onClick={resetDesign}>Reset</button>
            <button type="button" onClick={() => setReview(false)}>Hide panel</button>
          </div>
          <p className="dp-note" role="status">{note}</p>
        </div>
      )}
    </div>
  );
}
