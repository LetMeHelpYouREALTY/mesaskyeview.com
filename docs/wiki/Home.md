# mesaskyeview.com Wiki

Welcome to the project wiki for **[mesaskyeview.com](https://www.mesaskyeview.com)** — a hyperlocal real estate site for **Mesa at Skyeview** in Skye Canyon, Las Vegas (89166), marketed as **Homes by Dr. Jan Duffy**.

## Quick links

| Page | Purpose |
|------|---------|
| [Project overview](Project-Overview) | What the site is and who it serves |
| [Branding & NAP](Branding-and-NAP) | Site name, community address, agent details |
| [Architecture](Architecture) | Stack, routing, multi-domain pattern |
| [Deployment](Deployment) | Vercel production workflow |
| [Environment variables](Environment-Variables) | Required and optional env keys |
| [SEO & structured data](SEO-and-Structured-Data) | GSC, sitemap, JSON-LD |
| [Roadmap](Roadmap) | Current status and planned work |

## Repository

- **GitHub:** https://github.com/LetMeHelpYouREALTY/mesaskyeview.com  
- **Production:** https://www.mesaskyeview.com (apex redirects to `www`)  
- **Vercel project:** `janet-duffys-projects/mesaskyeview-com`

## Agent & brokerage

- **Agent:** Dr. Jan Duffy, REALTOR® (not “Janet”)  
- **License:** S.0197614.LLC  
- **Brokerage:** Berkshire Hathaway HomeServices Nevada Properties  
- **Phone:** (702) 500-1942  
- **Site email:** DrDuffySells@MesaSkyeview.com  
- **BHHS office NAP (GBP):** 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134  

## Community location (Mesa at Skyeview)

**8544 Vanhoy Crk St, Las Vegas, NV 89166** — Skye Canyon master plan; used on-site for tours/directions and `Place` schema (separate from BHHS office NAP).

## Local development

```bash
git clone https://github.com/LetMeHelpYouREALTY/mesaskyeview.com.git
cd mesaskyeview.com
pnpm install
cp .env.example .env.local
pnpm run next-dev
```

Open http://localhost:3000. For domain-aware content locally, set host header or use `NEXT_PUBLIC_SITE_URL=https://www.mesaskyeview.com`.

## Status (June 2026)

- Production deploy with Mesa hyperlocal branding, global site chrome (office, Calendly, RealScout, footer)  
- Domain config for `mesaskyeview.com` with **Homes by Dr. Jan Duffy** (replaces on-site Century Communities references for this community)  
- JSON-LD: `RealEstateAgent`, `WebSite`, `Place`, `ResidentialComplex` on mesaskyeview.com  
- Host-aware `sitemap.xml` and `robots.txt`  
- Pending: commit/push latest local changes to `main` if not yet merged  

_Last updated: June 2026_
