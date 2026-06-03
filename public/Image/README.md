# Site images (Cloudflare-cached `/Image/*`)

## Active assets (realtor-appropriate)

| File | Use |
|------|-----|
| `agent1.png` | Dr. Jan Duffy headshot |
| `hero_bg_1.jpg` | Modern luxury home exterior |
| `hero_bg_2.jpg` | Home with pool and patio |
| `hero_bg_3.jpg` | Estate-style home and backyard |

Configured in `lib/site-images.ts`.

## Deprecated (do not reference in code)

These files remain on disk for cleanup only; they are AI/corporate stock or fake testimonial photos:

- `mission.webp` — AI corporate meeting with garbled text
- `services.webp` — generic corporate stock
- `story.png` — unrelated stock “team” photo
- `house.jpeg` — AI-generated home with watermark
- `person1.jpeg`, `person_2-min.jpg`, `person_4-min.jpg` — stock faces for testimonials

Safe to delete from the repo once production cache is purged.
