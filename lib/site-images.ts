/**
 * Cloudflare-cached site imagery under /Image/* (see cloudflare-pages.json).
 * Realtor-appropriate only: Las Vegas homes, Skye Canyon exteriors, Dr. Jan headshot.
 * Do not use legacy files: mission.webp, services.webp, story.png, house.jpeg, person*.jpeg/jpg.
 */

export type SiteImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const cloudflareImages = {
  agent: {
    drJanHeadshot: {
      src: "/Image/agent1.png",
      alt: "Dr. Jan Duffy on the phone, REALTOR® | Berkshire Hathaway HomeServices Nevada Properties",
      width: 512,
      height: 512,
    },
  },
  hero: {
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
      alt: "Two-story Las Vegas area home with landscaped backyard and pool",
      width: 1920,
      height: 1080,
    },
  },
  /** Listing-style property photos (all real home exteriors). */
  property: {
    featuredHome: {
      src: "/Image/hero_bg_1.jpg",
      alt: "Luxury modern home for sale in Summerlin, Las Vegas",
      width: 1920,
      height: 1080,
    },
    poolHome: {
      src: "/Image/hero_bg_2.jpg",
      alt: "Spacious family home with pool in Henderson, Nevada",
      width: 1920,
      height: 1080,
    },
    estateHome: {
      src: "/Image/hero_bg_3.jpg",
      alt: "Elegant estate-style home in the Las Vegas Valley",
      width: 1920,
      height: 1080,
    },
  },
  /** Section accents — home photography only (no corporate/AI stock). */
  brand: {
    buyerConsult: {
      src: "/Image/hero_bg_2.jpg",
      alt: "Las Vegas homebuyers touring a property with their REALTOR®",
      width: 1920,
      height: 1080,
    },
    sellerMarketing: {
      src: "/Image/hero_bg_1.jpg",
      alt: "Professionally presented Las Vegas home ready for market",
      width: 1920,
      height: 1080,
    },
    localExpertise: {
      src: "/Image/hero_bg_3.jpg",
      alt: "Skye Canyon and Northwest Las Vegas homes — local market expertise",
      width: 1920,
      height: 1080,
    },
  },
} as const;

/** Rotating homepage heroes (Cloudflare /Image). */
export const siteHeroRotations: SiteImageAsset[] = [
  cloudflareImages.hero.lasVegasSkyline,
  cloudflareImages.hero.communityAerial,
  cloudflareImages.hero.newHomeExterior,
];

/** Mesa at Skyeview — hyperlocal alt text applied in mesaskyeview-photos. */
export const mesaCloudflareImagePaths = {
  community: cloudflareImages.hero.lasVegasSkyline.src,
  skyeCanyon: cloudflareImages.hero.communityAerial.src,
  newHome: cloudflareImages.hero.newHomeExterior.src,
  interior: cloudflareImages.property.featuredHome.src,
} as const;

/** Inner-page banner image by route prefix (first match wins). */
export const pageBannerByPrefix: { prefix: string; image: SiteImageAsset }[] = [
  { prefix: "/about", image: cloudflareImages.hero.lasVegasSkyline },
  { prefix: "/contact", image: cloudflareImages.hero.communityAerial },
  { prefix: "/new-construction", image: cloudflareImages.hero.newHomeExterior },
  { prefix: "/neighborhoods", image: cloudflareImages.hero.communityAerial },
  { prefix: "/buyers", image: cloudflareImages.brand.buyerConsult },
  { prefix: "/sellers", image: cloudflareImages.brand.sellerMarketing },
  { prefix: "/luxury-homes", image: cloudflareImages.property.featuredHome },
  { prefix: "/listings", image: cloudflareImages.property.poolHome },
  { prefix: "/home-valuation", image: cloudflareImages.property.estateHome },
  { prefix: "/market", image: cloudflareImages.hero.communityAerial },
  { prefix: "/55-plus", image: cloudflareImages.hero.newHomeExterior },
  { prefix: "/investment", image: cloudflareImages.hero.lasVegasSkyline },
  { prefix: "/relocation", image: cloudflareImages.brand.buyerConsult },
  { prefix: "/services", image: cloudflareImages.brand.sellerMarketing },
  { prefix: "/google-business", image: cloudflareImages.agent.drJanHeadshot },
  { prefix: "/why-berkshire", image: cloudflareImages.brand.localExpertise },
  { prefix: "/faq", image: cloudflareImages.hero.newHomeExterior },
];

export function getPageBannerImage(pathname: string): SiteImageAsset | null {
  if (pathname === "/" || pathname.startsWith("/api")) return null;
  const match = pageBannerByPrefix.find(({ prefix }) => pathname.startsWith(prefix));
  return match?.image ?? cloudflareImages.hero.lasVegasSkyline;
}
