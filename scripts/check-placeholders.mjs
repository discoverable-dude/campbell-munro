// Lists every [square bracket] placeholder still in the site content, plus unset external links.
// Run before launch: npm run check:placeholders
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src/content", "src/app", "src/components", "src/lib"];
const found = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        for (const m of line.matchAll(/["'`>]\s*(\[[A-Z][^\]\n]{3,}\])/g)) found.push(`${p}:${i + 1}  ${m[1]}`);
        if (/\[To confirm\]/.test(line)) found.push(`${p}:${i + 1}  ${line.trim()}`);
      });
    }
  }
};
roots.forEach(walk);
const unique = [...new Set(found)];
console.log(unique.length ? unique.join("\n") + `\n\n${unique.length} placeholder(s) still to resolve.` : "No placeholders found.");
process.exit(unique.length ? 1 : 0);
