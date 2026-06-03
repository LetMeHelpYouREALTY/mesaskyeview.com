/**
 * Per-page JSON-LD @graph for SEO, AEO, and GEO.
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";
import { gbpFAQs, generateFAQSchema as generateGbpFaqSchema } from "@/lib/gbp-schema";
import { mesaDefaultSocialHero } from "@/lib/mesa-hero-images";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import { MESA_SPEAKABLE_CSS_SELECTORS } from "@/lib/mesa-aeo-content";
import { mesaFaqsToSchema, mesaHomepageFaqs } from "@/lib/mesa-page-faqs";
import { combineSchemas } from "@/lib/schema";
import { generateSearchConsoleJsonLd } from "@/lib/search-console-schema";
import { agentId, websiteId } from "@/lib/schema-ids";

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

  const mesa = isMesaskyeviewDomain(config);
  const hero = mesa ? mesaDefaultSocialHero : null;
  const heroUrl = hero
    ? hero.src.startsWith("http")
      ? hero.src
      : `${siteUrl}${hero.src}`
    : `${siteUrl}/images/dr-jan-duffy-headshot.jpg`;

  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: config.description,
    isPartOf: { "@id": websiteId(siteUrl) },
    about: { "@id": mesa ? agentId(siteUrl) : `${siteUrl}/#organization` },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: heroUrl,
      width: hero?.width ?? 1200,
      height: hero?.height ?? 630,
      caption: hero?.alt ?? pageName,
    },
  };

  if (mesa && path === "/") {
    page.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: [...MESA_SPEAKABLE_CSS_SELECTORS],
    };
  }

  return page;
}

function buildBreadcrumbSchema(siteUrl: string, pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const items = buildBreadcrumbItems(siteUrl, pathname);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Homepage FAQ graph (AEO); /faq keeps its own page-level FAQPage. */
function buildHomepageFaqSchema(pathname: string, config: DomainConfig) {
  if (pathname !== "/") return null;
  if (isMesaskyeviewDomain(config)) {
    return mesaFaqsToSchema(mesaHomepageFaqs);
  }
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
    buildWebPageSchema(config, siteUrl, normalizedPath),
    buildBreadcrumbSchema(siteUrl, normalizedPath),
  ];

  const faq = buildHomepageFaqSchema(normalizedPath, config);
  if (faq) pieces.push(faq);

  return combineSchemas(...pieces);
}
