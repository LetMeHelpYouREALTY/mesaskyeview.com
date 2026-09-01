/**
 * Compact global hero banner config — shown on every page via root layout.
 * Distinct from full-bleed PageHero (homepage / page-level heroes).
 */

import { agentInfo } from "@/lib/site-config";

export type GlobalHeroConfig = {
  src: string;
  alt: string;
  tagline: string;
  phoneDisplay?: string;
  phoneTel?: string;
};

export const GLOBAL_HERO: GlobalHeroConfig = {
  src: "/images/global-hero/mesa-skye-view.jpg",
  alt: "Mesa at Skyeview homes overlooking the Las Vegas Valley, Skye Canyon, NV 89166",
  tagline: "Mesa at Skyeview | Homes by Dr. Jan Duffy",
  phoneDisplay: agentInfo.phoneFormatted,
  phoneTel: agentInfo.phoneTel,
};
