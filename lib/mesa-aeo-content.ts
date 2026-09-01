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
  ".aeo-lead-answer",
  "#how-to-tour-mesa",
] as const;

/** Visible HowTo + JSON-LD — keep these strings in sync with MesaHowToTour. */
export const mesaHowToTour = {
  heading: "How do I tour Mesa at Skyeview homes?",
  lead: `Register Dr. Jan Duffy as your buyer agent before the first model visit, then tour at ${c.salesOfficeAddress} in ${c.masterPlan} (ZIP ${c.zip}).`,
  steps: [
    {
      name: "Call or book a showing",
      text: "Call (702) 500-1942 or use the contact page to schedule. Tell Dr. Jan which Mesa at Skyeview plans you want to see.",
    },
    {
      name: "Register your agent first",
      text: "Have Dr. Jan Duffy registered with the builder before you walk into the model so you keep buyer representation on the contract.",
    },
    {
      name: "Tour the community",
      text: `Meet at ${c.salesOfficeAddress} to walk ${c.stories.toLowerCase()} plans (about ${c.sqftRange} sq ft, ${c.bedroomRange} bedrooms).`,
    },
  ],
} as const;
