# Branding & NAP

## Site identity

| Field | Value |
|-------|--------|
| Site name | Mesa at Skyeview \| Homes by Dr. Jan Duffy |
| Home brand (on-site) | Homes by Dr. Jan Duffy |
| Community | Mesa at Skyeview |
| Master plan | Skye Canyon |
| ZIP | 89166 |

Configured in `lib/domain-config.ts` under `mesaskyeview.com` and `lib/mesaskyeview-brand.ts`.

## Two addresses (do not merge)

### 1. Community NAP — Mesa at Skyeview

Used for hyperlocal copy, directions, maps, and `Place` / `ResidentialComplex` schema:

```
8544 Vanhoy Crk St
Las Vegas, NV 89166
```

**Coordinates (WGS84):** `36.31558648812897, -115.32930209279098`  
Used in JSON-LD `GeoCoordinates`, Google Maps embed, and directions links (`lib/mesaskyeview-brand.ts`).

### 2. Brokerage NAP — Google Business Profile

Used in footer, office section, and `RealEstateAgent` office address (must match GBP):

```
Berkshire Hathaway HomeServices Nevada Properties
9406 W Lake Mead Blvd, Suite 100
Las Vegas, NV 89134
Phone: (702) 500-1942
```

## Contact email

- **mesaskyeview.com:** DrDuffySells@MesaSkyeview.com (`contactEmail` in domain config)  
- **Fallback (other domains):** homes@heyberkshire.com  

## Replacing “Century Communities” on this site

On **mesaskyeview.com**, user-facing references to the builder sales brand for this community use **Homes by Dr. Jan Duffy**. Other neighborhood pages in the shared repo may still name national builders where factually accurate (e.g. Inspirada).

## Navbar & footer

- Navbar reads domain from `DomainConfigProvider` (root layout)  
- Footer and `OfficeSection` use `getPageDomainConfig()` for neighborhood and email  
