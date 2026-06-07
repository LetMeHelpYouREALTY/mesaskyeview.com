# FUB Pixel — Cloudflare account-wide injector

Injects the Follow Up Boss Widget Tracker (`WT-XQHVYQWW` by default) into HTML responses for **every zone** on your Cloudflare account.

## Two layers (use both)

| Layer | Covers |
|-------|--------|
| **Next.js `FubPixelScript`** | Vercel multi-domain app (heyberkshire.com + satellites) — already in `DomainThirdPartyScripts` |
| **This Worker** | Legacy/static sites, proxied origins, any HTML not served by Next.js |

The Worker **skips** pages that already load `fubTracker` (no double pixel).

## Deploy

```bash
# 1. Log in (if needed)
npx wrangler login

# 2. Deploy worker
npm run cloudflare:fub-pixel:deploy

# 3. Attach routes to ALL zones on the account
#    Requires CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
npm run cloudflare:fub-pixel:routes:dry-run   # preview
npm run cloudflare:fub-pixel:routes           # apply
```

## Environment

| Variable | Purpose |
|----------|---------|
| `CLOUDFLARE_API_TOKEN` | API token with Zone:Read + Workers Routes:Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from Cloudflare dashboard |
| `FUB_PIXEL_ID` | Worker var in `wrangler.jsonc` (default `WT-XQHVYQWW`) |
| `NEXT_PUBLIC_FUB_PIXEL_ID` | Next.js app (Vercel) |

## DNS-only (gray cloud) zones

Worker routes **do not** run when traffic bypasses Cloudflare proxy. Those domains still get the pixel from the **Next.js deploy** if they point to Vercel.

## FUB Admin

- Keep **Form Capture OFF** (leads already flow via `/api/leads/capture`)
- Enable **Pixel CTA** for opt-in call/text popup if desired
