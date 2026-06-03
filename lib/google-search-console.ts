import type { Metadata } from "next";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl } from "@/lib/domain-config";
import { cloudflareImages } from "@/lib/site-images";

/** Canonical GSC property host for mesaskyeview.com production. */
export const MESASKYEVIEW_GSC_PROPERTY = "https://www.mesaskyeview.com";

export function getSitemapUrl(config: DomainConfig): string {
  return `${getCanonicalSiteUrl(config)}/sitemap.xml`;
}

export function getRobotsUrl(config: DomainConfig): string {
  return `${getCanonicalSiteUrl(config)}/robots.txt`;
}

/** Default Open Graph / Twitter image for layout and pages without a custom hero. */
export function getDefaultSocialImageMetadata(): Pick<Metadata, "openGraph" | "twitter"> {
  const image = cloudflareImages.hero.lasVegasSkyline;
  const ogImage = {
    url: image.src,
    width: image.width,
    height: image.height,
    alt: image.alt,
  };

  return {
    openGraph: { images: [ogImage] },
    twitter: {
      card: "summary_large_image",
      images: [image.src],
    },
  };
}
