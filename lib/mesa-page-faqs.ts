import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

export type MesaFaq = { question: string; answer: string };

export function mesaFaqsToSchema(faqs: MesaFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

const c = mesaAtSkyeviewCommunity;

export const mesaCommunityFaqs: MesaFaq[] = [
  {
    question: `Where is ${c.name} located?`,
    answer: `${c.name} is in ${c.masterPlan}, Las Vegas, NV ${c.zip}. The community address is ${c.salesOfficeAddress}. Dr. Jan Duffy provides buyer and seller representation—call (702) 500-1942.`,
  },
  {
    question: `What types of homes are available at ${c.name}?`,
    answer: `${c.name} offers ${c.homeType}, ${c.stories} homes with approximately ${c.sqftRange} sq ft and ${c.bedroomRange} bedrooms. Public listings often show pricing from the ${c.priceFromPublicListings} range—contact Dr. Jan for current MLS and builder inventory.`,
  },
  {
    question: "Do I need a REALTOR® for new construction at Mesa at Skyeview?",
    answer: "Yes—builder sales teams represent the builder. Dr. Jan Duffy provides free buyer representation on qualifying new construction purchases so your contract, upgrades, and timeline are protected.",
  },
];

export const mesaBuyerFaqs: MesaFaq[] = [
  {
    question: "Should I register Dr. Jan before visiting the Mesa at Skyeview model?",
    answer: "Register Dr. Jan Duffy before your first model-home visit so builder records show your agent. That preserves free buyer representation and advocacy on upgrades and contract terms.",
  },
  {
    question: "Can Dr. Jan help with resale homes in ZIP 89166?",
    answer: "Yes. Dr. Jan runs MLS searches, showings, and offer strategy for resale homes in Skye Canyon and Mesa at Skyeview, in addition to new construction.",
  },
];

export const mesaSellerFaqs: MesaFaq[] = [
  {
    question: "How does Dr. Jan price a home in Skye Canyon?",
    answer: "Pricing uses recent MLS closings in 89166, competing Skye Canyon inventory, and your home's plan, upgrades, and condition. Request a free valuation at /home-valuation or call (702) 500-1942.",
  },
];

export const mesaZipFaqs: MesaFaq[] = [
  {
    question: "What communities are in Las Vegas ZIP 89166?",
    answer: "89166 is anchored by the Skye Canyon master plan, including Mesa at Skyeview and other Skye Canyon villages. Dr. Jan Duffy focuses on buyer and seller services for Mesa at Skyeview and surrounding Skye Canyon resales.",
  },
];

/** Homepage AEO — Skye Canyon / 89166 only (no valley-wide dilution). */
export const mesaHomepageFaqs: MesaFaq[] = [
  ...mesaCommunityFaqs.slice(0, 2),
  mesaBuyerFaqs[0],
  mesaZipFaqs[0],
];
