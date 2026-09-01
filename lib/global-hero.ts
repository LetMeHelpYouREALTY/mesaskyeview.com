/**
 * Compact global hero banner — Cloudflare-cached `/Image/*` only.
 * Do not add files under public/images/; site photography lives in public/Image/
 * and is cached at the edge (see workers/edge-cache.ts).
 */

import { mesaGeneratedHeroes } from "@/lib/mesa-hero-images";
import { agentInfo } from "@/lib/site-config";

const vista = mesaGeneratedHeroes.skyeVista;

export type GlobalHeroConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  tagline: string;
  phoneDisplay?: string;
  phoneTel?: string;
};

export const GLOBAL_HERO: GlobalHeroConfig = {
  src: vista.src,
  alt: vista.alt,
  width: vista.width,
  height: vista.height,
  tagline: "Mesa at Skyeview | Homes by Dr. Jan Duffy",
  phoneDisplay: agentInfo.phoneFormatted,
  phoneTel: agentInfo.phoneTel,
};
