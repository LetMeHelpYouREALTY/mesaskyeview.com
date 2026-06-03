/**
 * Per-page JSON-LD for SEO, AEO (FAQ/answer engines), and GEO (entity graphs for AI citation).
 * Based on Google Search Central structured data guidance and RealEstateAgent best practices.
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";
import { businessInfo, gbpFAQs, generateFAQSchema as generateGbpFaqSchema } from "@/lib/gbp-schema";
import {
  isMesaskyeviewDomain,
  MESA_SITE_BRAND,
  mesaAtSkyeviewCommunity,
} from "@/lib/mesaskyeview-brand";
import { combineSchemas } from "@/lib/schema";
import { generateSearchConsoleJsonLd } from "@/lib/search-console-schema";
import { drJanDuffyPhotos } from "@/lib/agent-photos";

const SEGMENT_LABELS: Record<string, string> = {
  about: "About Dr. Jan Duffy",
  contact: "Contact",
  listings: "Homes for Sale",
  faq: "FAQ",
  "home-valuation": "Home Valuation",
  "market-report": "Market Report",
  "market-update": "Market Update",
  "market-insights": "Market Insights",
  "google-business": "Office & Reviews",
  neighborhoods: "Neighborhoods",
  "mesa-at-skyeview": "Mesa at Skyeview",
  "buyer-representation": "Buyer Representation",
  "sell-your-home": "Sell Your Home",
  amenities: "Amenities",
  "new-construction-homes": "New Construction",
  "floor-plans": "Floor Plans",
  area: "Area",
  "89166-homes": "ZIP 89166 Homes",
  map: "ZIP 89166 Map",
  "skye-canyon": "Skye Canyon",
  summerlin: "Summerlin",
  henderson: "Henderson",
  "green-valley": "Green Valley",
  "the-ridges": "The Ridges",
  "southern-highlands": "Southern Highlands",
  "north-las-vegas": "North Las Vegas",
  "centennial-hills": "Centennial Hills",
  inspirada: "Inspirada",
  "mountains-edge": "Mountain's Edge",
  buyers: "Buyers",
  sellers: "Sellers",
  "luxury-homes": "Luxury Homes",
  "new-construction": "New Construction",
  "investment-properties": "Investment Properties",
  relocation: "Relocation",
  services: "Services",
  "55-plus-communities": "55+ Communities",
  "why-berkshire-hathaway": "Why Berkshire Hathaway",
  "security-policy": "Security Policy",
};

function humanizeSegment(segment: string): string {
  return (
    SEGMENT_LABELS[segment] ??
    segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export function buildBreadcrumbItems(siteUrl: string, pathname: string) {
  const items = [{ name: "Home", url: siteUrl }];
  if (pathname === "/" || !pathname) return items;

  const segments = pathname.split("/").filter(Boolean);
  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    items.push({
      name: humanizeSegment(segment),
      url: `${siteUrl}${path}`,
    });
  }
  return items;
}

function buildWebPageSchema(
  config: DomainConfig,
  siteUrl: string,
  pathname: string
) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const lastSegment = path.split("/").filter(Boolean).pop();
  const pageName =
    path === "/"
      ? isMesaskyeviewDomain(config)
        ? MESA_SITE_BRAND
        : config.heroHeadline
      : `${humanizeSegment(lastSegment ?? "Page")} | ${isMesaskyeviewDomain(config) ? MESA_SITE_BRAND : config.neighborhood}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: config.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
    },
  };
}

function buildBreadcrumbSchema(siteUrl: string, pathname: string) {
  const items = buildBreadcrumbItems(siteUrl, pathname);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${pathname === "/" ? "" : pathname}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Person entity for E-E-A-T / GEO — linked from RealEstateAgent. */
function buildPersonSchema(config: DomainConfig, siteUrl: string) {
  const knowsAbout = isMesaskyeviewDomain(config)
    ? [
        "Mesa at Skyeview",
        "Skye Canyon new construction",
        "Las Vegas buyer representation",
        "Las Vegas seller representation",
        "Nevada relocation",
        "Berkshire Hathaway HomeServices",
      ]
    : [
        "Las Vegas real estate",
        "Henderson homes",
        "Summerlin real estate",
        "Luxury homes Las Vegas",
        "55+ communities Nevada",
      ];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/about#dr-jan-duffy`,
    name: "Dr. Jan Duffy",
    honorificPrefix: "Dr.",
    jobTitle: "REALTOR®",
    description:
      "Licensed Nevada REALTOR® with Berkshire Hathaway HomeServices Nevada Properties, serving buyers and sellers across the Las Vegas Valley.",
    url: `${siteUrl}/about`,
    image: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
    telephone: businessInfo.phone.tel,
    worksFor: { "@id": `${siteUrl}/#organization` },
    knowsAbout,
    sameAs: businessInfo.socialProfiles,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      identifier: "S.0197614.LLC",
    },
  };
}

/** Homepage FAQ graph (AEO); /faq keeps its own page-level FAQPage. */
function buildHomepageFaqSchema(pathname: string) {
  if (pathname !== "/") return null;
  return generateGbpFaqSchema(gbpFAQs);
}

/**
 * Full JSON-LD @graph for the current request — inject once in root layout.
 */
export function buildPageJsonLdGraph(config: DomainConfig, pathname: string) {
  const siteUrl = getCanonicalSiteUrl(config);
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const core = generateSearchConsoleJsonLd(config);

  const pieces: Record<string, unknown>[] = [
    ...core,
    buildPersonSchema(config, siteUrl),
    buildWebPageSchema(config, siteUrl, normalizedPath),
    buildBreadcrumbSchema(siteUrl, normalizedPath),
  ];

  const faq = buildHomepageFaqSchema(normalizedPath);
  if (faq) pieces.push(faq);

  return combineSchemas(...pieces);
}
