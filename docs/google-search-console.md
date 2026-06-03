# Google Search Console — mesaskyeview.com

Production canonical host: **https://www.mesaskyeview.com**

## 1. Vercel environment variables

In the Vercel project (`mesaskyeview-com`), set:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.mesaskyeview.com` (must **not** be `heyberkshire.com` — OG/Twitter URLs and titles use this when host headers are empty at build) |
| `GOOGLE_SITE_VERIFICATION` | Content token only from GSC HTML tag method (not the full `<meta>` tag) |

Redeploy after saving env vars so the verification meta tag appears in the page source.

## 2. Add property in Search Console

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property → **URL prefix**: `https://www.mesaskyeview.com`
3. Verify ownership → **HTML tag** → copy the `content="..."` value into `GOOGLE_SITE_VERIFICATION` in Vercel → redeploy → click **Verify**.

Optional: use **Domain** property for `mesaskyeview.com` (DNS TXT) if you manage DNS at Cloudflare.

## 3. Submit sitemap

After verification:

- **Sitemaps** → add: `https://www.mesaskyeview.com/sitemap.xml`

`robots.txt` already references this URL via the `Sitemap:` directive.

## 4. Confirm crawl basics

| URL | Expected |
|-----|----------|
| `/robots.txt` | `Allow: /`, `Disallow: /api/`, sitemap line |
| `/sitemap.xml` | All static marketing routes (no dynamic `/listings/[id]`) |
| Homepage | `rel=canonical`, JSON-LD `@graph` (RealEstateAgent, WebSite, Person, WebPage, BreadcrumbList, FAQPage) |
| Any page | Per-route `WebPage` + `BreadcrumbList` via `components/seo/SitePageSchema.tsx` |

Use [URL Inspection](https://search.google.com/search-console) for high-priority URLs (`/`, `/listings`, `/neighborhoods/skye-canyon`, `/contact`) and request indexing sparingly.

## 5. Rich Results

Validate with [Rich Results Test](https://search.google.com/test/rich-results):

- Root layout JSON-LD (`lib/seo-page-graph.ts` + `lib/search-console-schema.ts`)
- Homepage: `FAQPage` from GBP-aligned Q&A (`lib/gbp-schema.ts`)
- Dedicated FAQ routes: page-level `FAQPage` where implemented (e.g. `/faq`, neighborhood pages)

## Production-only deploys

- **Only `main`** triggers Vercel production (`vercel.json` → `git.deploymentEnabled`).
- Public site: **https://www.mesaskyeview.com** — do not use PR preview `*.vercel.app` URLs for SEO or client review unless you intentionally ran a manual preview workflow.

## 6. Apex vs www

Apex `https://mesaskyeview.com` should 308 to `https://www.mesaskyeview.com` (Vercel domain settings + `vercel.json` redirect). GSC property, sitemap, and `metadataBase` must all use **www**.

## 7. Post-deploy checklist

- [ ] View source: `google-site-verification` meta present
- [ ] `curl -I https://www.mesaskyeview.com/sitemap.xml` → 200
- [ ] Sitemap submitted in GSC
- [ ] Page indexing report reviewed after 3–7 days
