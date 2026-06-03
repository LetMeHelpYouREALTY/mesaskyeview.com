# Environment variables

Copy `.env.example` to `.env.local` for local development. Production values live in **Vercel** (Project → Settings → Environment Variables).

## Required for production SEO

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.mesaskyeview.com` |
| `GOOGLE_SITE_VERIFICATION` | GSC HTML tag `content=` token only |

## Recommended

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID |
| `FOLLOW_UP_BOSS_API_KEY` | Lead capture → FUB (`lib/env.ts` aliases `FUB_API_KEY`) |
| `FUB_SYSTEM_KEY` | FUB webhooks / system API |

## Optional

| Variable | Description |
|----------|-------------|
| `OPENROUTER_API_KEY` | AI chat route |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Image CDN |
| `CLOUDINARY_*` | Server-side Cloudinary |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Only if moving off embed iframe maps |
| `NOTION_TOKEN` | Future logging/CMS |
| `V0_API_KEY` | Design tooling |
| `CLOUDFLARE_API_TOKEN` | Worker deploy automation |

## Not in env (code config)

| Setting | Location |
|---------|----------|
| Mesa contact email | `lib/domain-config.ts` → `DrDuffySells@MesaSkyeview.com` |
| RealScout agent ID | `lib/domain-config.ts` → `REALSCOUT_AGENT_ID` |
| Canonical URL map | `CANONICAL_SITE_URLS` in `lib/domain-config.ts` |

## Pull from Vercel

```bash
vercel env pull .env.local
```

Never commit `.env.local` or secrets to git.
