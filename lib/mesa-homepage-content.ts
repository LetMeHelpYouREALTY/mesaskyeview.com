import type { FAQ } from "@/components/sections/FAQSection";
import type { Review } from "@/components/sections/ReviewsSection";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

const c = mesaAtSkyeviewCommunity;

export const mesaHomepageFaqsUi: FAQ[] = [
  {
    question: `Where is ${c.name} and how do I tour?`,
    answer: `${c.name} is in ${c.masterPlan} at ${c.salesOfficeAddress}. Register Dr. Jan Duffy before your first model visit—call (702) 500-1942.`,
  },
  {
    question: "Do I need a REALTOR® for new construction in 89166?",
    answer:
      "Yes. Builder sales teams represent the builder. Dr. Jan provides buyer representation on qualifying new homes at Mesa at Skyeview and other Skye Canyon builders.",
  },
  {
    question: "Can Dr. Jan help with resale homes in Skye Canyon?",
    answer:
      "Yes—MLS search, showings, and offers for resale homes in ZIP 89166, including Mesa at Skyeview and neighboring Skye Canyon villages.",
  },
];

export const mesaHomepageReviews: Review[] = [
  {
    id: 1,
    name: "Skye Canyon Buyer",
    location: `ZIP ${c.zip}`,
    rating: 5,
    text: "Dr. Jan walked us through Mesa at Skyeview plans and negotiated upgrades on our new build. Having our own agent at the model home made a huge difference.",
    date: "2025-11-15",
  },
  {
    id: 2,
    name: "Northwest LV Seller",
    location: "Skye Canyon, NV",
    rating: 5,
    text: "She priced our Skye Canyon resale using real 89166 comps and had multiple showings the first weekend. Hyperlocal knowledge—not a generic valley pitch.",
    date: "2025-10-22",
  },
  {
    id: 3,
    name: "Relocated Family",
    location: "Mesa at Skyeview",
    rating: 5,
    text: "We relocated for work and wanted one-story new construction. Dr. Jan focused the search on Skye Canyon only and kept the process simple.",
    date: "2025-09-08",
  },
];
