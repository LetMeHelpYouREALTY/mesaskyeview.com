/**
 * Site imagery under /Image/* (Cloudflare-cached static assets).
 * Mesa heroes: AI-generated originals in /Image/hero_*.webp
 * Legacy fallbacks: hero_bg_*.jpg where still deployed.
 */

import { mesaGeneratedHeroes } from "@/lib/mesa-hero-images";

export type SiteImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const legacy = {
  lasVegasSkyline: {
    src: "/Image/hero_bg_1.jpg",
    alt: "Modern luxury home exterior in Las Vegas at dusk",
    width: 1920,
    height: 1080,
  },
  communityAerial: {
    src: "/Image/hero_bg_2.jpg",
    alt: "Contemporary Las Vegas home with pool and patio",
    width: 1920,
    height: 1080,
  },
  newHomeExterior: {
    src: "/Image/hero_bg_3.jpg",
    alt: "Las Vegas area home with landscaped backyard",
    width: 1920,
    height: 1080,
  },
} as const;

export const cloudflareImages = {
  agent: {
    drJanHeadshot: {
      src: "/Image/agent1.png",
      alt: "Dr. Jan Duffy, REALTOR® | Berkshire Hathaway HomeServices Nevada Properties",
      width: 512,
      height: 512,
    },
  },
  hero: {
    lasVegasSkyline: legacy.lasVegasSkyline,
    communityAerial: legacy.communityAerial,
    newHomeExterior: legacy.newHomeExterior,
    mesaCommunity: mesaGeneratedHeroes.community,
    mesaNewBuild: mesaGeneratedHeroes.newBuild,
    mesaLuxury: mesaGeneratedHeroes.luxury,
  },
  property: {
    featuredHome: mesaGeneratedHeroes.luxury,
    poolHome: mesaGeneratedHeroes.poolLifestyle,
    estateHome: mesaGeneratedHeroes.sellers,
  },
  brand: {
    buyerConsult: mesaGeneratedHeroes.buyers,
    sellerMarketing: mesaGeneratedHeroes.sellers,
    localExpertise: mesaGeneratedHeroes.skyeVista,
  },
} as const;

/** Non-Mesa domains — legacy rotation until per-domain heroes exist. */
export const siteHeroRotations: SiteImageAsset[] = [
  cloudflareImages.hero.lasVegasSkyline,
  cloudflareImages.hero.communityAerial,
  cloudflareImages.hero.newHomeExterior,
];

/** Mesa at Skyeview — hyperlocal paths for galleries. */
export const mesaCloudflareImagePaths = {
  community: mesaGeneratedHeroes.community.src,
  skyeCanyon: mesaGeneratedHeroes.skyeVista.src,
  newHome: mesaGeneratedHeroes.newBuild.src,
  interior: mesaGeneratedHeroes.interior.src,
} as const;

/**
 * Inner-page hero banners — longest `prefix` match wins (see getPageBannerImage).
 * Order does not matter; specificity is by string length.
 */
export const pageBannerByPrefix: { prefix: string; image: SiteImageAsset }[] = [
  { prefix: "/area/89166/map", image: mesaGeneratedHeroes.skyeVista },
  { prefix: "/area/89166-homes", image: mesaGeneratedHeroes.neighborhood },
  { prefix: "/area/89166", image: mesaGeneratedHeroes.neighborhood },
  { prefix: "/mesa-at-skyeview/amenities", image: mesaGeneratedHeroes.amenities },
  { prefix: "/mesa-at-skyeview/floor-plans", image: mesaGeneratedHeroes.interior },
  { prefix: "/mesa-at-skyeview/new-construction", image: mesaGeneratedHeroes.newBuild },
  { prefix: "/mesa-at-skyeview/buyer-representation", image: mesaGeneratedHeroes.buyers },
  { prefix: "/mesa-at-skyeview/sell-your-home", image: mesaGeneratedHeroes.sellers },
  { prefix: "/mesa-at-skyeview", image: mesaGeneratedHeroes.community },
  { prefix: "/neighborhoods/mesa-at-skyeview", image: mesaGeneratedHeroes.community },
  { prefix: "/neighborhoods/skye-canyon", image: mesaGeneratedHeroes.skyeVista },
  { prefix: "/neighborhoods", image: mesaGeneratedHeroes.neighborhood },
  { prefix: "/new-construction", image: mesaGeneratedHeroes.newBuild },
  { prefix: "/luxury-homes", image: mesaGeneratedHeroes.luxury },
  { prefix: "/buyers", image: mesaGeneratedHeroes.buyers },
  { prefix: "/sellers", image: mesaGeneratedHeroes.sellers },
  { prefix: "/55-plus-communities", image: mesaGeneratedHeroes.amenities },
  { prefix: "/home-valuation", image: mesaGeneratedHeroes.sellers },
  { prefix: "/listings", image: mesaGeneratedHeroes.newBuild },
  { prefix: "/investment-properties", image: mesaGeneratedHeroes.luxury },
  { prefix: "/relocation", image: mesaGeneratedHeroes.buyers },
  { prefix: "/market", image: mesaGeneratedHeroes.neighborhood },
  { prefix: "/services", image: mesaGeneratedHeroes.community },
  { prefix: "/google-business", image: cloudflareImages.agent.drJanHeadshot },
  { prefix: "/why-berkshire", image: mesaGeneratedHeroes.skyeVista },
  { prefix: "/faq", image: mesaGeneratedHeroes.interior },
  { prefix: "/about", image: mesaGeneratedHeroes.community },
  { prefix: "/contact", image: mesaGeneratedHeroes.buyers },
  { prefix: "/security-policy", image: legacy.lasVegasSkyline },
];

export function getPageBannerImage(pathname: string): SiteImageAsset | null {
  if (pathname === "/" || pathname.startsWith("/api")) return null;

  const sorted = [...pageBannerByPrefix].sort((a, b) => b.prefix.length - a.prefix.length);
  const match = sorted.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(prefix));

  return match?.image ?? mesaGeneratedHeroes.flagship;
}
