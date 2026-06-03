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

PNG heroes are ~2–3 MB each. After deploy, confirm `https://www.mesaskyeview.com/Image/hero_mesa_community.png` loads. Consider converting to WebP in a future pass to reduce transfer size.
