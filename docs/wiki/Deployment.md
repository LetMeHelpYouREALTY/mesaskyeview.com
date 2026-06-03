# Deployment

## Production (recommended)

From the project root, with Vercel CLI linked to `janet-duffys-projects/mesaskyeview-com`:

```bash
vercel --prod --yes
```

Prefer **`vercel build`** / **`vercel --prod`** over raw `pnpm build` for production parity.

## Domains

| Host | Behavior |
|------|----------|
| `mesaskyeview.com` | 308 redirect to `www` (Vercel) |
| `www.mesaskyeview.com` | Canonical production |

Set `NEXT_PUBLIC_SITE_URL=https://www.mesaskyeview.com` in Vercel.

## Environment sync

```bash
vercel link
vercel env pull .env.local
```

See [Environment Variables](Environment-Variables).

## Post-deploy checks

1. https://www.mesaskyeview.com/robots.txt — `Host: www.mesaskyeview.com`  
2. https://www.mesaskyeview.com/sitemap.xml — mesaskyeview URLs only  
3. https://www.mesaskyeview.com/contact — `#mesa-community` map + Vanhoy Crk NAP  
4. [Google Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/contact`  
5. RealScout widget loads (no CSP console errors)  

## Google Search Console

- Verify with `GOOGLE_SITE_VERIFICATION` (HTML tag content token only)  
- Submit sitemap: `https://www.mesaskyeview.com/sitemap.xml`  

## Cloudflare

If DNS uses Cloudflare: **DNS only (gray cloud)** when origin is Vercel — orange-cloud proxy can cause SSL issues.

**Do not use Cloudflare Pages for production** on this site; Vercel is canonical. The GitHub workflow `Cloudflare Pages Deployment` is manual-only (`workflow_dispatch`) so pushes to `main` do not fail on missing CF secrets.

Optional manual deploy: Actions → Cloudflare Pages Deployment → Run workflow → enable `deploy_pages` (requires `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and a `mesaskyeview-com` Pages project).

## Latest production deploy

Inspect deployments in Vercel dashboard or:

```bash
vercel ls mesaskyeview-com
```
