# Architecture

## Stack

- **Next.js 14** App Router  
- **TypeScript**, **Tailwind CSS**, **shadcn/ui**  
- **pnpm** package manager  
- **Vercel** production hosting  
- Optional: **Cloudflare Workers** (`workers/security-headers.ts`) for security headers  

## Multi-domain pattern

```
Request → middleware.ts
         sets x-domain (host) and x-pathname
         → Server components read headers
         → getDomainConfig(host) from lib/domain-config.ts
```

Production host for this project: `www.mesaskyeview.com` (canonical in `getCanonicalSiteUrl`).

## Layout composition

```
app/layout.tsx
├── JSON-LD (generateSearchConsoleJsonLd)
├── RealScout + Calendly scripts (once)
├── DomainConfigProvider
│   ├── MesaskyeviewContextBar (mesa domain only)
│   ├── {page content — each page includes Navbar}
│   └── SiteChrome
│       ├── MesaskyeviewRealtorServicesSection (mesa only)
│       ├── OfficeSection
│       ├── ScheduleSection
│       ├── RealScoutListingsSection
│       └── Footer
```

## Important lib modules

| File | Role |
|------|------|
| `lib/domain-config.ts` | Per-host hero, SEO, email, RealScout agent ID |
| `lib/mesaskyeview-brand.ts` | Mesa site brand, community facts, title localization |
| `lib/mesa-at-skyeview-schema.ts` | Place / ResidentialComplex / contact @graph |
| `lib/page-metadata.ts` | Canonical metadata per route |
| `lib/domain-metadata.ts` | Applies Mesa titles to legacy static pages |
| `lib/gsc-sitemap-paths.ts` | Sitemap URL list |
| `middleware.ts` | `x-domain`, `x-pathname` headers |

## Metadata migration

Many routes use `generateMetadata()` + `applyMesaskyeviewToMetadata()` (see `scripts/migrate-mesa-metadata.mjs`). Pages with hand-written `createPageMetadata` include `/`, `/faq`, `/contact`, `/neighborhoods/skye-canyon`.

## CSP / third parties

`next.config.js` must allow:

- `em.realscout.com`, `www.realscout.com` (script + connect)  
- `assets.calendly.com`, `widgetbe.com`  
- Google Maps embed on contact page  

## Tests

- **Vitest** — `pnpm test:run`  
- Typecheck — `pnpm exec tsc --noEmit`  
