"use client";

import { useState } from "react";
import { feeBands } from "@/content/about";

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const pct = (r: number) => (r * 100).toFixed(2) + "%";

/** How much of `value` falls in each fee band, and the overall (blended) rate. No pound fee is shown, by design. */
function split(value: number) {
  let left = value;
  let fee = 0;
  const parts: { label: string; amount: number; rate: number }[] = [];
  for (const b of feeBands) {
    if (left <= 0) break;
    const amount = Math.min(left, b.width);
    fee += amount * b.rate;
    left -= amount;
    parts.push({ label: b.label, amount, rate: b.rate });
  }
  return { overall: value ? fee / value : 0, parts };
}

const MIN = 100_000;
const MAX = 5_000_000;

export function FeeCalculator() {
  const [value, setValue] = useState(750_000);
  const [text, setText] = useState("750,000");

  const set = (v: number, fromText = false) => {
    const clamped = Math.max(0, Math.min(v || 0, 100_000_000));
    setValue(clamped);
    if (!fromText) setText(Math.round(clamped).toLocaleString("en-GB"));
  };

  const { overall, parts } = split(value);
  const summary = parts.map((p) => `${pct(p.rate)} on ${gbp(p.amount)}`).join(", ");

  return (
    <div className="m-calc">
      <label htmlFor="fee-amount">See how the fee works on your investments</label>
      <div className="m-calc-row">
        <div className="m-calc-field">
          <span aria-hidden="true">£</span>
          <input
            id="fee-amount"
            inputMode="numeric"
            value={text}
            aria-describedby="fee-result"
            onChange={(e) => {
              setText(e.target.value);
              set(Number(e.target.value.replace(/[^0-9.]/g, "")), true);
            }}
            onBlur={() => set(value)}
          />
        </div>
        <input type="range" min={MIN} max={MAX} step={50_000} value={Math.min(Math.max(value, MIN), MAX)} aria-label="Value of investments" onChange={(e) => set(Number(e.target.value))} />
      </div>

      <p className="m-calc-out" id="fee-result" aria-live="polite">
        {value ? (
          <>
            On {gbp(value)}, your overall rate would be <b>{pct(overall)} a year</b>.
          </>
        ) : (
          "Enter the value of your investments."
        )}
      </p>

      {value > 0 && (
        <>
          <p className="m-calc-sub">Each rate applies only to the part of your money in that band, so your overall rate is a blend of them.</p>
          <div className="m-bar" role="img" aria-label={`Your ${gbp(value)} is charged at ${summary}.`}>
            {parts.map((p, i) => {
              const share = (p.amount / value) * 100;
              return (
                <span key={p.label} className={`m-seg m-seg-${i}`} style={{ width: `${share}%` }}>
                  {share >= 11 ? pct(p.rate) : null}
                </span>
              );
            })}
          </div>
          <table className="m-bands">
            <thead>
              <tr>
                <th scope="col">Band</th>
                <th scope="col">Your investments in it</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p, i) => (
                <tr key={p.label}>
                  <td>
                    <span className={`m-dot m-seg-${i}`} aria-hidden="true" />
                    {p.label}
                  </td>
                  <td>{gbp(p.amount)}</td>
                  <td>{pct(p.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
