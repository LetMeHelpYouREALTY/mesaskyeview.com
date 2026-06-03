import type { Metadata } from "next";
import type { DomainConfig } from "@/lib/domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  isMesaskyeviewDomain,
  localizeDescriptionForMesa,
  localizeTitleForMesa,
} from "@/lib/mesaskyeview-brand";

type StaticPageMeta = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
  noIndex?: boolean;
};

/** Applies mesaskyeview.com hyperlocal titles/descriptions to legacy static page metadata. */
export function applyMesaskyeviewToMetadata(
  config: DomainConfig,
  base: StaticPageMeta
): Metadata {
  if (!isMesaskyeviewDomain(config)) {
    return {
      title: base.title,
      description: base.description,
      keywords: base.keywords,
      robots: base.noIndex
        ? { index: false, follow: true }
        : { index: true, follow: true },
    };
  }

  const keywords = (base.keywords ?? []).map((k) =>
    k.replace(/Century Communities/gi, "Homes by Dr. Jan Duffy").replace(/heyberkshire/gi, "Mesa Skyeview")
  );

  return createPageMetadata(config, {
    title: localizeTitleForMesa(base.title),
    description: localizeDescriptionForMesa(base.description, config),
    pathname: base.pathname,
    keywords: [
      "Mesa at Skyeview homes",
      "Mesa at Skyeview REALTOR",
      "Skye Canyon real estate",
      "Homes by Dr. Jan Duffy",
      ...keywords,
    ],
    noIndex: base.noIndex,
  });
}
