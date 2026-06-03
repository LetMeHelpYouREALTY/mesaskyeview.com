import type { Metadata } from "next";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";

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

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords ?? config.keywords,
    alternates: {
      canonical: path,
    },
    robots: options.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: options.title,
      description: options.description,
      url: pageUrl,
      type: "website",
      siteName: `Dr. Jan Duffy — ${config.neighborhood}`,
    },
  };
}
