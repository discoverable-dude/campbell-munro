"use client";

import { useState } from "react";
import { feeBands } from "@/content/about";

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

function calc(value: number) {
  let left = value;
  let fee = 0;
  const parts: string[] = [];
  for (const b of feeBands) {
    if (left <= 0) break;
    const amount = Math.min(left, b.width);
    fee += amount * b.rate;
    left -= amount;
    parts.push(`${(b.rate * 100).toFixed(2)}% on ${gbp(amount)}`);
  }
  return { fee, parts };
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

  const { fee, parts } = calc(value);
  return (
    <div className="m-calc">
      <label htmlFor="fee-amount">Work out your fee</label>
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
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={50_000}
          value={Math.min(Math.max(value, MIN), MAX)}
          aria-label="Value of investments"
          onChange={(e) => set(Number(e.target.value))}
        />
      </div>
      <p className="m-calc-out" id="fee-result" aria-live="polite">
        {value ? (
          <>
            On {gbp(value)}, your fee would be <b>{gbp(fee)} a year</b>, an overall rate of <b>{((fee / value) * 100).toFixed(2)}%</b>.
          </>
        ) : (
          "Enter the value of your investments."
        )}
      </p>
      <p className="m-calc-break">{value ? parts.join(", then ") + "." : ""}</p>
    </div>
  );
}
