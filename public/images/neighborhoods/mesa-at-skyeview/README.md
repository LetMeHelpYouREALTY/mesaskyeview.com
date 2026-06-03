# Mesa at Skyeview — hyperlocal photos

Assets used on **mesaskyeview.com** for community, hero, and gallery sections.

| File | Use |
|------|-----|
| `hero-community.jpg` | Community / neighborhood hero |
| `hero-skye-canyon.jpg` | Skye Canyon lifestyle hero |
| `hero-new-home.jpg` | New home exterior hero |
| `model-interior-living.jpg` | Model home interior gallery |

## Adding photos

1. Optimize to WebP or JPG under ~200KB for heroes when possible ([Squoosh](https://squoosh.app)).
2. Use descriptive filenames: `mesa-plan-1635-exterior.webp`.
3. Update `lib/mesaskyeview-photos.ts` with `src`, hyperlocal `alt` (include Mesa at Skyeview, Skye Canyon, 89166), and `caption`.
4. Prefer builder-approved or MLS marketing media you have rights to use.

## Code

- `lib/mesaskyeview-photos.ts` — catalog
- `components/mesaskyeview/MesaskyeviewPhotoGallery.tsx` — grid
- `components/mesaskyeview/MesaskyeviewHeroBackground.tsx` — homepage hero rotation
