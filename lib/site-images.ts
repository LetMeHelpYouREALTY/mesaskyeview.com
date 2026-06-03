/**
 * Cloudflare-cached site imagery under /Image/* (see cloudflare-pages.json).
 * Single source of truth — do not duplicate into /images/ unless optimizing copies.
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
      alt: "Las Vegas and Skye Canyon area homes at sunset",
      width: 1920,
      height: 1080,
    },
    communityAerial: {
      src: "/Image/hero_bg_2.jpg",
      alt: "Master-planned community in Northwest Las Vegas",
      width: 1920,
      height: 1080,
    },
    newHomeExterior: {
      src: "/Image/hero_bg_3.jpg",
      alt: "New construction home exterior in Las Vegas",
      width: 1920,
      height: 1080,
    },
  },
  property: {
    featuredHome: {
      src: "/Image/house.jpeg",
      alt: "Las Vegas single-family home for sale",
      width: 1200,
      height: 800,
    },
  },
  brand: {
    mission: {
      src: "/Image/mission.webp",
      alt: "Dr. Jan Duffy real estate mission — client-first service in Las Vegas",
      width: 1200,
      height: 800,
    },
    services: {
      src: "/Image/services.webp",
      alt: "Home buying and selling services in Las Vegas and Henderson",
      width: 1200,
      height: 800,
    },
    story: {
      src: "/Image/story.png",
      alt: "Dr. Jan Duffy — Las Vegas real estate experience since 2008",
      width: 1200,
      height: 800,
    },
  },
  testimonials: {
    client1: {
      src: "/Image/person1.jpeg",
      alt: "Las Vegas homebuyer testimonial",
      width: 200,
      height: 200,
    },
    client2: {
      src: "/Image/person_2-min.jpg",
      alt: "Henderson homebuyer testimonial",
      width: 200,
      height: 200,
    },
    client3: {
      src: "/Image/person_4-min.jpg",
      alt: "Summerlin homebuyer testimonial",
      width: 200,
      height: 200,
    },
  },
} as const;

/** Rotating homepage heroes (Cloudflare /Image). */
export const siteHeroRotations: SiteImageAsset[] = [
  cloudflareImages.hero.lasVegasSkyline,
  cloudflareImages.hero.communityAerial,
  cloudflareImages.hero.newHomeExterior,
];

/** Mesa at Skyeview — same Cloudflare assets, hyperlocal alt text applied in mesaskyeview-photos. */
export const mesaCloudflareImagePaths = {
  community: cloudflareImages.hero.lasVegasSkyline.src,
  skyeCanyon: cloudflareImages.hero.communityAerial.src,
  newHome: cloudflareImages.hero.newHomeExterior.src,
  interior: cloudflareImages.property.featuredHome.src,
} as const;

/** Inner-page banner image by route prefix (first match wins). */
export const pageBannerByPrefix: { prefix: string; image: SiteImageAsset }[] = [
  { prefix: "/about", image: cloudflareImages.brand.story },
  { prefix: "/contact", image: cloudflareImages.brand.mission },
  { prefix: "/new-construction", image: cloudflareImages.hero.newHomeExterior },
  { prefix: "/neighborhoods", image: cloudflareImages.hero.communityAerial },
  { prefix: "/buyers", image: cloudflareImages.brand.services },
  { prefix: "/sellers", image: cloudflareImages.property.featuredHome },
  { prefix: "/luxury-homes", image: cloudflareImages.hero.lasVegasSkyline },
  { prefix: "/listings", image: cloudflareImages.property.featuredHome },
  { prefix: "/home-valuation", image: cloudflareImages.property.featuredHome },
  { prefix: "/market", image: cloudflareImages.hero.communityAerial },
  { prefix: "/55-plus", image: cloudflareImages.hero.newHomeExterior },
  { prefix: "/investment", image: cloudflareImages.hero.lasVegasSkyline },
  { prefix: "/relocation", image: cloudflareImages.brand.mission },
  { prefix: "/services", image: cloudflareImages.brand.services },
  { prefix: "/google-business", image: cloudflareImages.agent.drJanHeadshot },
  { prefix: "/why-berkshire", image: cloudflareImages.brand.story },
  { prefix: "/faq", image: cloudflareImages.brand.services },
];

export function getPageBannerImage(pathname: string): SiteImageAsset | null {
  if (pathname === "/" || pathname.startsWith("/api")) return null;
  const match = pageBannerByPrefix.find(({ prefix }) => pathname.startsWith(prefix));
  return match?.image ?? cloudflareImages.hero.lasVegasSkyline;
}
