# Roadmap

## Done (2026)

- [x] mesaskyeview.com domain config and canonical `www`  
- [x] Global site chrome: office, Calendly, RealScout listings, footer  
- [x] Hyperlocal branding: **Mesa at Skyeview | Homes by Dr. Jan Duffy**  
- [x] Replace on-site Century Communities references for Mesa / Skye Canyon copy  
- [x] Community NAP: 8544 Vanhoy Crk St, Las Vegas, NV 89166  
- [x] Contact page community map + JSON-LD Place / ResidentialComplex  
- [x] Host-aware sitemap and robots.txt  
- [x] Production Vercel deploy  

## In progress / local only

- [ ] Commit and push hyperlocal + wiki-related code to `main`  
- [ ] Shorten duplicate title suffixes on some pages (template + localization)  
- [ ] GSC: confirm `GOOGLE_SITE_VERIFICATION` in Vercel production  

## Next

- [ ] Request indexing for `/`, `/contact`, `/neighborhoods/skye-canyon`, `/new-construction`  
- [ ] GBP: link website to `https://www.mesaskyeview.com` if not already  
- [ ] Optional: dedicated `/mesa-at-skyeview` landing route for ads  
- [ ] Optional: FAQ schema on Skye Canyon page aligned with visible FAQs  
- [ ] Notion / FUB logging for mesaskyeview leads (when `NOTION_TOKEN` configured)  

## Backlog

- [ ] Security policy page: domain-aware copy (still heyberkshire defaults)  
- [ ] Rate limit / API routes: allow `mesaskyeview.com` referrers  
- [ ] Image optimization: Cloudinary patterns for community photography  
- [ ] Playwright smoke tests for mesa context bar + contact map  

## How to update this wiki

Wiki repo: `https://github.com/LetMeHelpYouREALTY/mesaskyeview.com.wiki.git`

```bash
git clone https://github.com/LetMeHelpYouREALTY/mesaskyeview.com.wiki.git
# edit *.md
git add -A && git commit -m "Update wiki" && git push
```

Or edit in GitHub: **Wiki** tab → page → Save.
