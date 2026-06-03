import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { mesaHomeHeroRotation } from "@/lib/mesa-hero-images";
import { mesaCloudflareImagePaths } from "@/lib/site-images";

export type MesaPhoto = {
  src: string;
  alt: string;
  caption: string;
  category: "community" | "interior" | "lifestyle" | "location";
  width: number;
  height: number;
};

/** Hyperlocal Mesa imagery — Cloudflare /Image/* (no duplicate stock files). */
export const mesaHyperlocalPhotos: MesaPhoto[] = [
  {
    src: mesaCloudflareImagePaths.community,
    alt: `New construction neighborhood at ${mesaAtSkyeviewCommunity.name} in ${mesaAtSkyeviewCommunity.masterPlan}, Las Vegas NV ${mesaAtSkyeviewCommunity.zip}`,
    caption: `${mesaAtSkyeviewCommunity.name} — one-story new homes in Skye Canyon`,
    category: "community",
    width: 1920,
    height: 1080,
  },
  {
    src: mesaCloudflareImagePaths.skyeCanyon,
    alt: `Skye Canyon master-planned community near Kyle Canyon and the Spring Mountains, Las Vegas NV ${mesaAtSkyeviewCommunity.zip}`,
    caption: "Skye Canyon — Northwest Las Vegas living",
    category: "location",
    width: 1920,
    height: 1080,
  },
  {
    src: mesaCloudflareImagePaths.newHome,
    alt: `Exterior of a new home at ${mesaAtSkyeviewCommunity.name}, ${mesaAtSkyeviewCommunity.sqftRange} sq ft plans`,
    caption: "Quick move-in and to-be-built homes — register your agent before your first visit",
    category: "community",
    width: 1920,
    height: 1080,
  },
  {
    src: mesaCloudflareImagePaths.interior,
    alt: `Las Vegas home at ${mesaAtSkyeviewCommunity.name} — ${mesaAtSkyeviewCommunity.stories} plans ${mesaAtSkyeviewCommunity.sqftRange} sq ft`,
    caption: "Move-in ready and new-build homes in Skye Canyon",
    category: "interior",
    width: 1200,
    height: 800,
  },
];

/** Full-quality homepage hero rotation (AI-generated exteriors). */
export const mesaHeroPhotos = mesaHomeHeroRotation.map((img) => ({
  src: img.src,
  alt: img.alt,
  caption: img.alt,
  category: "community" as const,
  width: img.width,
  height: img.height,
}));

export const mesaGalleryPhotos = mesaHyperlocalPhotos;
