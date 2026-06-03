import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

const c = mesaAtSkyeviewCommunity;

/** Declarative facts for AEO / speakable — numbers from public community listings; verify with Jan before changing. */
export const mesaExtractableFacts: string[] = [
  `${c.name} is a single-family new-construction community in ${c.masterPlan}, Las Vegas, NV ${c.zip}.`,
  `Homes are ${c.stories} plans with about ${c.sqftRange} square feet and ${c.bedroomRange} bedrooms.`,
  `Public listings often show pricing from the ${c.priceFromPublicListings} range—ask Dr. Jan Duffy for current MLS and builder pricing.`,
  `The community address is ${c.salesOfficeAddress}.`,
  `Dr. Jan Duffy, REALTOR® (Nevada license S.0197614.LLC), represents buyers and sellers through Berkshire Hathaway HomeServices Nevada Properties.`,
];

export const MESA_SPEAKABLE_CSS_SELECTORS = [
  "#mesa-extractable-facts",
  "main h1",
] as const;
