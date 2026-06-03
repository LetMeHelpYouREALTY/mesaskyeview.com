import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

const BASE = "/images/neighborhoods/mesa-at-skyeview";

export type MesaPhoto = {
  src: string;
  alt: string;
  caption: string;
  category: "community" | "interior" | "lifestyle" | "location";
  width: number;
  height: number;
};

/** Hyperlocal imagery for Mesa at Skyeview / Skye Canyon (89166). */
export const mesaHyperlocalPhotos: MesaPhoto[] = [
  {
    src: `${BASE}/hero-community.jpg`,
    alt: `New construction neighborhood at ${mesaAtSkyeviewCommunity.name} in ${mesaAtSkyeviewCommunity.masterPlan}, Las Vegas NV ${mesaAtSkyeviewCommunity.zip}`,
    caption: `${mesaAtSkyeviewCommunity.name} — one-story new homes in Skye Canyon`,
    category: "community",
    width: 1920,
    height: 1080,
  },
  {
    src: `${BASE}/hero-skye-canyon.jpg`,
    alt: `Skye Canyon master-planned community near Kyle Canyon and the Spring Mountains, Las Vegas NV ${mesaAtSkyeviewCommunity.zip}`,
    caption: "Skye Canyon — Northwest Las Vegas living",
    category: "location",
    width: 1920,
    height: 1080,
  },
  {
    src: `${BASE}/hero-new-home.jpg`,
    alt: `Exterior of a new home at ${mesaAtSkyeviewCommunity.name}, ${mesaAtSkyeviewCommunity.sqftRange} sq ft plans`,
    caption: "Quick move-in and to-be-built homes — register your agent before your first visit",
    category: "community",
    width: 1920,
    height: 1080,
  },
  {
    src: `${BASE}/model-interior-living.jpg`,
    alt: `Open living area in a ${mesaAtSkyeviewCommunity.name} model home — ${mesaAtSkyeviewCommunity.stories} plans ${mesaAtSkyeviewCommunity.sqftRange} sq ft`,
    caption: "Modern open layouts with smart-home features",
    category: "interior",
    width: 1600,
    height: 1067,
  },
];

export const mesaHeroPhotos = mesaHyperlocalPhotos.filter(
  (p) => p.category === "community" || p.category === "location"
);

export const mesaGalleryPhotos = mesaHyperlocalPhotos;
