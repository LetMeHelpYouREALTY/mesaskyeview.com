# Hero images (mesaskyeview.com)

## Assets

Ten AI-generated originals live in `public/Image/hero_*.webp` (1920×1080, quality 85). Source PNGs were converted for faster loads. They are **not** copied from third-party listing photos; visual direction was informed by:

- [Skye Canyon new homes (Century Communities)](https://www.centurycommunities.com/find-your-new-home/nevada/las-vegas-metro/las-vegas/skye-canyon) — desert master-planned exteriors, pools, amenities
- [Exterior real estate photography guidance (Matterport)](https://matterport.com/learn/real-estate-photography) — golden hour, landscaping, MLS clarity

## Wiring

| File | Role |
|------|------|
| `lib/mesa-hero-images.ts` | Asset registry + homepage rotation |
| `lib/site-images.ts` | `getPageBannerImage()` — longest-prefix route → hero |
| `components/layouts/SitePageBanner.tsx` | Inner-page hero band (taller on Mesa domain) |
| `components/mesaskyeview/MesaskyeviewHeroBackground.tsx` | Homepage rotating heroes |

## Deploy note

Primary social/home hero: `hero_mesa_flagship.webp`. After deploy, confirm `https://www.mesaskyeview.com/Image/hero_mesa_flagship.webp` loads.

Requires `NEXT_PUBLIC_SITE_URL=https://www.mesaskyeview.com` on Vercel Production.
