#!/usr/bin/env node
/**
 * Attach fub-pixel-injector Worker routes to every zone on the Cloudflare account.
 *
 * Prerequisites:
 *   1. Deploy worker:  npm run cloudflare:fub-pixel:deploy
 *   2. Env vars:       CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
 *
 * Usage:
 *   node scripts/cloudflare/attach-fub-pixel-to-all-zones.mjs
 *   node scripts/cloudflare/attach-fub-pixel-to-all-zones.mjs --dry-run
 *
 * Note: Worker routes only run on proxied (orange-cloud) traffic. Vercel sites on
 * DNS-only still get the pixel from Next.js FubPixelScript in the app.
 */

const DRY_RUN = process.argv.includes("--dry-run");
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const WORKER_NAME = process.env.FUB_PIXEL_WORKER_NAME || "fub-pixel-injector";

if (!TOKEN || !ACCOUNT_ID) {
  console.error(
    "Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID. Set in env or .env.local."
  );
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function api(path, options = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const json = await res.json();
  if (!json.success) {
    const err = json.errors?.[0]?.message || res.statusText;
    throw new Error(`${path}: ${err}`);
  }
  return json;
}

async function listAllZones() {
  const zones = [];
  let page = 1;
  while (true) {
    const { result, result_info: info } = await api(
      `/zones?account.id=${ACCOUNT_ID}&per_page=50&page=${page}`
    );
    zones.push(...result);
    if (page >= (info?.total_pages || 1)) break;
    page += 1;
  }
  return zones;
}

async function listZoneRoutes(zoneId) {
  const { result } = await api(`/zones/${zoneId}/workers/routes`);
  return result || [];
}

async function addRoute(zoneId, pattern) {
  if (DRY_RUN) {
    console.log(`  [dry-run] would add route: ${pattern}`);
    return;
  }
  try {
    await api(`/zones/${zoneId}/workers/routes`, {
      method: "POST",
      body: JSON.stringify({ pattern, script: WORKER_NAME }),
    });
    console.log(`  + route ${pattern}`);
  } catch (e) {
    if (String(e.message).includes("already exists")) {
      console.log(`  = route exists ${pattern}`);
      return;
    }
    throw e;
  }
}

async function main() {
  console.log(
    `${DRY_RUN ? "[dry-run] " : ""}Attaching ${WORKER_NAME} to all account zones…\n`
  );

  const zones = await listAllZones();
  console.log(`Found ${zones.length} zone(s)\n`);

  let attached = 0;
  let skipped = 0;

  for (const zone of zones) {
    const name = zone.name;
    if (zone.status !== "active") {
      console.log(`- skip ${name} (status: ${zone.status})`);
      skipped += 1;
      continue;
    }

    console.log(`• ${name} (${zone.id})`);

    const patterns = [`*${name}/*`, `*www.${name}/*`];
    const existing = await listZoneRoutes(zone.id);
    const existingPatterns = new Set(existing.map((r) => r.pattern));

    for (const pattern of patterns) {
      if (existingPatterns.has(pattern)) {
        console.log(`  = route exists ${pattern}`);
        continue;
      }
      await addRoute(zone.id, pattern);
      attached += 1;
    }
  }

  console.log(`\nDone. New routes: ${attached}, zones skipped: ${skipped}`);
  console.log(
    "\nReminder: DNS-only (gray cloud) zones bypass Workers — Next.js FubPixelScript covers Vercel deploys."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
