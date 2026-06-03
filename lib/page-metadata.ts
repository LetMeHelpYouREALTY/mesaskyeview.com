import type { Metadata } from "next";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";
import { getDefaultSocialImageMetadata } from "@/lib/google-search-console";
import {
  isMesaskyeviewDomain,
  localizeDescriptionForMesa,
  localizeTitleForMesa,
  MESA_SITE_BRAND,
} from "@/lib/mesaskyeview-brand";

type PageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
  noIndex?: boolean;
};

/** Per-route metadata with canonical URL for Google Search Console / SEO. */
export function createPageMetadata(
  config: DomainConfig,
  options: PageMetadataOptions
): Metadata {
  const siteUrl = getCanonicalSiteUrl(config);
  const path = options.pathname.startsWith("/") ? options.pathname : `/${options.pathname}`;
  const pageUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const siteBrand = config.siteBrand ?? `Dr. Jan Duffy — ${config.neighborhood}`;
  const title = isMesaskyeviewDomain(config)
    ? localizeTitleForMesa(options.title)
    : options.title.includes(siteBrand)
      ? options.title
      : `${options.title} | ${siteBrand}`;
  const description = isMesaskyeviewDomain(config)
    ? localizeDescriptionForMesa(options.description, config)
    : options.description;

  const authorName = "Dr. Jan Duffy";

  return {
    title,
    description,
    keywords: options.keywords ?? config.keywords,
    authors: [{ name: authorName, url: `${siteUrl}/about` }],
    creator: authorName,
    publisher: isMesaskyeviewDomain(config) ? MESA_SITE_BRAND : siteBrand,
    category: "Real Estate",
    alternates: {
      canonical: path,
    },
    robots: options.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: isMesaskyeviewDomain(config) ? MESA_SITE_BRAND : siteBrand,
      locale: "en_US",
      ...getDefaultSocialImageMetadata().openGraph,
    },
    twitter: {
      ...getDefaultSocialImageMetadata().twitter,
      title,
      description,
    },
  };
}
