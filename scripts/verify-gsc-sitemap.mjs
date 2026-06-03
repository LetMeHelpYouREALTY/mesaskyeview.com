// Compare app route folders to lib/gsc-sitemap-paths.ts. Run: node scripts/verify-gsc-sitemap.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "app");

function walkPages(dir, base = "") {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue;
      routes.push(...walkPages(full, `${base}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      routes.push(base || "/");
    }
  }
  return routes;
}

const gscFile = fs.readFileSync(path.join(root, "lib/gsc-sitemap-paths.ts"), "utf8");
const sitemapPaths = new Set(
  [...gscFile.matchAll(/path:\s*"([^"]*)"/g)].map((m) => (m[1] === "" ? "/" : m[1]))
);

const appRoutes = new Set(
  walkPages(appDir).map((r) => (r === "/" ? "/" : r.replace(/\/$/, "")))
);

const skip = new Set(["/security-policy", "/listings"]);
const missingFromSitemap = [...appRoutes].filter((r) => !sitemapPaths.has(r) && !skip.has(r));
const extraInSitemap = [...sitemapPaths].filter((r) => !appRoutes.has(r));

console.log("App routes:", appRoutes.size);
console.log("Sitemap paths:", sitemapPaths.size);
if (missingFromSitemap.length) {
  console.log("\nMissing from sitemap (add to gsc-sitemap-paths.ts or skip intentionally):");
  missingFromSitemap.forEach((r) => console.log("  ", r));
}
if (extraInSitemap.length) {
  console.log("\nIn sitemap but no page.tsx:");
  extraInSitemap.forEach((r) => console.log("  ", r));
}
if (!missingFromSitemap.length && !extraInSitemap.length) {
  console.log("\nOK — sitemap paths match static app routes.");
}
process.exit(missingFromSitemap.length || extraInSitemap.length ? 1 : 0);
