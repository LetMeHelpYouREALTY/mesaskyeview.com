/**
 * AI-generated hero photography for mesaskyeview.com (WebP in /public/Image).
 * Visual direction informed by Skye Canyon new-home marketing and professional
 * exterior real estate photography best practices (golden hour, desert modern, MLS clarity).
 */

import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

type HeroAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const c = mesaAtSkyeviewCommunity;

export const mesaGeneratedHeroes = {
  community: {
    src: "/Image/hero_mesa_community.webp",
    alt: `Stunning desert contemporary home at ${c.name} in ${c.masterPlan}, Las Vegas NV ${c.zip}`,
    width: 1920,
    height: 1080,
  },
  newBuild: {
    src: "/Image/hero_mesa_new_build.webp",
    alt: `Brand-new single-family home exterior in Skye Canyon ${c.zip} — new construction`,
    width: 1920,
    height: 1080,
  },
  luxury: {
    src: "/Image/hero_mesa_luxury.webp",
    alt: `Luxury desert modern home with pool near ${c.masterPlan}, Las Vegas`,
    width: 1920,
    height: 1080,
  },
  buyers: {
    src: "/Image/hero_buyers_welcome.webp",
    alt: `Welcoming modern home exterior at dusk — buyer representation in ${c.zip}`,
    width: 1920,
    height: 1080,
  },
  sellers: {
    src: "/Image/hero_sellers_twilight.webp",
    alt: `Immaculate home at twilight — sell your home in Skye Canyon ${c.zip}`,
    width: 1920,
    height: 1080,
  },
  neighborhood: {
    src: "/Image/hero_neighborhood_street.webp",
    alt: `Master-planned community streetscape in northwest Las Vegas near ${c.name}`,
    width: 1920,
    height: 1080,
  },
  poolLifestyle: {
    src: "/Image/hero_pool_lifestyle.webp",
    alt: `Resort-style backyard pool and patio at a Las Vegas desert home`,
    width: 1920,
    height: 1080,
  },
  skyeVista: {
    src: "/Image/hero_skye_mountains.webp",
    alt: `${c.masterPlan} homes with Spring Mountains vista — Las Vegas NV ${c.zip}`,
    width: 1920,
    height: 1080,
  },
  amenities: {
    src: "/Image/hero_amenities_club.webp",
    alt: `Community pool and clubhouse amenities near ${c.name} in Skye Canyon`,
    width: 1920,
    height: 1080,
  },
  interior: {
    src: "/Image/hero_interior_greatroom.webp",
    alt: `Bright open living space in a new ${c.stories.toLowerCase()} home at ${c.name}`,
    width: 1920,
    height: 1080,
  },
} as const satisfies Record<string, HeroAsset>;

/** Homepage hero rotation for mesaskyeview.com */
export const mesaHomeHeroRotation: HeroAsset[] = [
  mesaGeneratedHeroes.community,
  mesaGeneratedHeroes.skyeVista,
  mesaGeneratedHeroes.newBuild,
  mesaGeneratedHeroes.luxury,
];
