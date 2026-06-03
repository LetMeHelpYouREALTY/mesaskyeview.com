# Project overview

## Purpose

**mesaskyeview.com** is a lead-generation and education site focused on:

1. **Mesa at Skyeview** — one-story new construction and resales in Skye Canyon (ZIP 89166)  
2. **Realtor services** — buyer/seller representation, new construction advocacy, valuations, and relocation support by **Dr. Jan Duffy**

The public brand line is:

> **Mesa at Skyeview | Homes by Dr. Jan Duffy**

## Audience

- Buyers comparing quick move-ins and to-be-built plans in Mesa at Skyeview  
- Sellers pricing homes in Skye Canyon  
- Relocating buyers targeting northwest Las Vegas  
- Secondary traffic from shared “Las Vegas valley” pages (neighborhoods, 55+, luxury) with a Mesa-first context bar on this domain

## What this repo is not

- Not the builder’s corporate site (on-site builder brand is **Homes by Dr. Jan Duffy** for this community)  
- Not a standalone MLS portal — listings use **RealScout** (`em.realscout.com` + `www.realscout.com`)  
- Shares codebase patterns with other Dr. Jan Duffy domains via `lib/domain-config.ts`

## Key routes

| Path | Focus |
|------|--------|
| `/` | Domain-aware hero, Mesa market highlights |
| `/contact` | BHHS office + **Mesa community map** (`#mesa-community`) |
| `/neighborhoods/skye-canyon` | Skye Canyon + Mesa at Skyeview guide |
| `/new-construction` | Buyer representation, Mesa-first on this domain |
| `/buyers`, `/sellers` | Service funnels |
| `/home-valuation` | Seller leads |

## Integrations

- **RealScout** — search and office listings widgets  
- **Calendly** — scheduling (global in layout)  
- **Follow Up Boss** — lead capture API (when configured)  
- **Google Analytics 4** — optional via `NEXT_PUBLIC_GA_MEASUREMENT_ID`  
- **Vercel** — hosting and analytics  
