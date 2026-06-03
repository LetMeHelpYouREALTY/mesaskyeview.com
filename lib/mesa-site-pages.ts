/** Mesa at Skyeview marketing routes — internal linking (see gsc-sitemap-paths for URLs). */

import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

const c = mesaAtSkyeviewCommunity;

export type MesaExploreLink = {
  href: string;
  title: string;
  description: string;
};

export const MESA_EXPLORE_PAGES: MesaExploreLink[] = [
  {
    href: "/neighborhoods/mesa-at-skyeview",
    title: "Mesa at Skyeview community",
    description: "One-story new homes, NAP, map, and Skye Canyon context in 89166.",
  },
  {
    href: "/mesa-at-skyeview/new-construction-homes",
    title: "New construction homes",
    description: "Quick move-ins and to-be-built homes—register your agent before the model home visit.",
  },
  {
    href: "/mesa-at-skyeview/floor-plans",
    title: "Floor plans & sizes",
    description: `${c.sqftRange} sq ft, ${c.bedroomRange} bedrooms—current inventory from Dr. Jan.`,
  },
  {
    href: "/mesa-at-skyeview/amenities",
    title: "Amenities & lifestyle",
    description: "Community pool, fitness, and Skye Canyon master-plan recreation.",
  },
  {
    href: "/mesa-at-skyeview/buyer-representation",
    title: "Buyer representation",
    description: "Free advocacy on new construction and MLS resale in Mesa at Skyeview.",
  },
  {
    href: "/mesa-at-skyeview/sell-your-home",
    title: "Sell in 89166",
    description: "Pricing, staging, and marketing for Skye Canyon resales.",
  },
  {
    href: "/area/89166-homes",
    title: "ZIP 89166 homes",
    description: "Search and local expertise for Skye Canyon and Mesa at Skyeview.",
  },
];
