# SEO & structured data

## On-page SEO

- **Title template (mesa domain):** `%s | Mesa at Skyeview | Homes by Dr. Jan Duffy`  
- **Default title:** `Mesa at Skyeview | Homes by Dr. Jan Duffy`  
- Per-route metadata via `createPageMetadata()` or `applyMesaskyeviewToMetadata()`  
- **Canonical host:** `https://www.mesaskyeview.com`  

## Sitemap & robots

- `app/sitemap.ts` — host-aware paths from `lib/gsc-sitemap-paths.ts`  
- `app/robots.ts` — production `Host: www.mesaskyeview.com`  

## JSON-LD (layout + contact)

### Every page (`app/layout.tsx`)

From `lib/search-console-schema.ts` on mesaskyeview.com:

1. `RealEstateAgent` (`#organization`) — Dr. Jan + BHHS office NAP  
2. `WebSite` — publisher link  
3. `Place` (`#mesa-at-skyeview`) — 8544 Vanhoy Crk St  
4. `ResidentialComplex` (`#mesa-at-skyeview-community`)  

### Contact page (`/contact`)

`generateMesaContactPageSchema()` — `@graph` with `ContactPage`, Place, community, and agent linkage.

## E-E-A-T / GBP alignment

- Visible BHHS office NAP in `OfficeSection` (matches GBP)  
- Community address labeled separately (Mesa at Skyeview)  
- Phone: tel link `(702) 500-1942`  
- Reviews / directions CTAs in office section  

## Hyperlocal UI (mesa domain)

- `MesaskyeviewContextBar` — path-aware intro on every page  
- `MesaskyeviewRealtorServicesSection` — six realtor service cards above footer  

## Validation tools

- [Rich Results Test](https://search.google.com/test/rich-results)  
- Google Search Console → URL inspection after deploy  
- Monthly: NAP consistency vs GBP, schema vs visible text  

## Content rules

- No fabricated market stats on homepage for Mesa — use community highlights (sq ft range, ZIP, plan count)  
- Builder incentives: “ask for current MLS / builder promotions” unless sourced  
