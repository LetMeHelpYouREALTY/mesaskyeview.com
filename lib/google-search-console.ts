import type { Metadata } from "next";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { mesaGeneratedHeroes } from "@/lib/mesa-hero-images";
import { cloudflareImages } from "@/lib/site-images";

/** Canonical GSC property host for mesaskyeview.com production. */
export const MESASKYEVIEW_GSC_PROPERTY = "https://www.mesaskyeview.com";

export function getSitemapUrl(config: DomainConfig): string {
  return `${getCanonicalSiteUrl(config)}/sitemap.xml`;
}

export function getRobotsUrl(config: DomainConfig): string {
  return `${getCanonicalSiteUrl(config)}/robots.txt`;
}

/** Default Open Graph / Twitter image — domain-aware absolute URLs. */
export function getDefaultSocialImageMetadata(
  config: DomainConfig
): Pick<Metadata, "openGraph" | "twitter"> {
  const siteUrl = getCanonicalSiteUrl(config);
  const image = isMesaskyeviewDomain(config)
    ? mesaGeneratedHeroes.community
    : cloudflareImages.hero.lasVegasSkyline;
  const absoluteUrl = image.src.startsWith("http") ? image.src : `${siteUrl}${image.src}`;

  const ogImage = {
    url: absoluteUrl,
    width: image.width,
    height: image.height,
    alt: image.alt,
  };

  return {
    openGraph: { images: [ogImage] },
    twitter: {
      card: "summary_large_image",
      images: [absoluteUrl],
    },
  };
}
