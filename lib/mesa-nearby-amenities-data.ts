/**
 * Curated nearby places for Mesa at Skyeview — static HTML, map fallback, and ItemList schema.
 * Each entry includes a primary-source URL used to verify name and address.
 */

import type { AmenityCategoryId } from "@/lib/mesa-amenity-map-config";
import { agentInfo } from "@/lib/site-config";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

export type VerifiedNearbyPlace = {
  name: string;
  /** Omit from JSON-LD when street address is not verified on sourceUrl */
  address?: string;
  sourceUrl: string;
  category: AmenityCategoryId;
  schemaType:
    | "Place"
    | "Restaurant"
    | "CafeOrCoffeeShop"
    | "GroceryStore"
    | "Park"
    | "Hospital"
    | "Pharmacy"
    | "Store"
    | "GolfCourse"
    | "ExerciseGym"
    | "School";
  note?: string;
};

export const MESA_VERIFIED_NEARBY_PLACES: VerifiedNearbyPlace[] = [
  {
    name: mesaAtSkyeviewCommunity.name,
    address: mesaAtSkyeviewCommunity.salesOfficeAddress,
    sourceUrl: "https://www.centurycommunities.com/find-your-new-home/nevada/las-vegas-metro/las-vegas/skye-canyon/mesa-at-skyeview",
    category: "parks",
    schemaType: "Place",
    note: "Community sales center and tour address",
  },
  {
    name: "Skye Canyon Park",
    address: "10111 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    sourceUrl: "https://skyecanyon.com/amenities/parks/",
    category: "parks",
    schemaType: "Park",
    note: "15-acre master-plan park with trails, sports courts, and splash pad (Skye Canyon)",
  },
  {
    name: "Skye Center",
    address: "10111 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    sourceUrl: "https://skyecanyon.com/amenities/parks/",
    category: "fitness",
    schemaType: "Place",
    note: "Skye Canyon community hub (resident access for some amenities)",
  },
  {
    name: "Skye Fitness",
    address: "10111 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    sourceUrl: "https://skyecanyon.com/amenities/parks/",
    category: "fitness",
    schemaType: "ExerciseGym",
    note: "Resident fitness club and pool at Skye Canyon Park",
  },
  {
    name: "Smith's Marketplace",
    address: "9710 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    sourceUrl:
      "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/smiths-marketplace/706/00367",
    category: "grocery",
    schemaType: "GroceryStore",
    note: "Skye Canyon Marketplace grocery anchor (Smith's Food and Drug store locator)",
  },
  {
    name: "Starbucks",
    address: "9710 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    sourceUrl: "https://skyecanyon.com/amenities/shopping/",
    category: "cafes",
    schemaType: "CafeOrCoffeeShop",
    note: "Listed at Skye Canyon Marketplace on skyecanyon.com",
  },
  {
    name: "Skye Canyon Marketplace",
    address: "9710 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    sourceUrl: "https://skyecanyon.com/amenities/shopping/",
    category: "shopping",
    schemaType: "Store",
    note: "Retail and dining center anchored by Smith's Marketplace",
  },
  {
    name: "Centennial Hills Hospital Medical Center",
    address: "6900 N Durango Dr, Las Vegas, NV 89149",
    sourceUrl: "https://www.centennialhillshospital.com/about",
    category: "healthcare",
    schemaType: "Hospital",
    note: "Valley Health System acute care hospital in northwest Las Vegas",
  },
  {
    name: "Dignity Health – St. Rose Dominican Centennial Campus",
    address: "6675 N Durango Dr, Las Vegas, NV 89149",
    sourceUrl: "https://strosenh.org/locations/centennial/",
    category: "healthcare",
    schemaType: "Hospital",
    note: "24/7 neighborhood hospital on North Durango Dr.",
  },
  {
    name: "Kenneth Divich Elementary School",
    address: "9851 Donald Nelson Ave, Las Vegas, NV 89149",
    sourceUrl: "https://www.divichelementary.org/about-us1/contact/contact-us",
    category: "schools",
    schemaType: "School",
    note: "Clark County School District — confirm attendance zone for your address",
  },
  {
    name: "Arbor View High School",
    address: "7500 Whispering Sands Dr, Las Vegas, NV 89131",
    sourceUrl: "https://www.arborviewhs.org/apps/contact/",
    category: "schools",
    schemaType: "School",
    note: "Clark County high school in northwest Las Vegas — confirm your zone with CCSD",
  },
  {
    name: "TPC Las Vegas",
    address: "9851 Canyon Run Dr, Las Vegas, NV 89144",
    sourceUrl: "https://tpc.com/lasvegas/",
    category: "golf",
    schemaType: "GolfCourse",
    note: "Public PGA TOUR golf course in Summerlin — typical weekend drive from Skye Canyon",
  },
];

export type MesaNearbyFaq = { question: string; answer: string };

const c = mesaAtSkyeviewCommunity;

export const MESA_NEARBY_AMENITIES_FAQS: MesaNearbyFaq[] = [
  {
    question: `What grocery stores are near ${c.name}?`,
    answer: `Smith's Marketplace at 9710 W Skye Canyon Park Dr (89166) anchors Skye Canyon Marketplace with a full grocery, pharmacy, and gas — about a 5-minute drive from ${c.name} under typical northwest Las Vegas traffic.`,
  },
  {
    question: `How far is ${c.name} from the Las Vegas Strip?`,
    answer: `${c.name} in Skye Canyon is roughly 25–35 minutes by car to central Strip resorts depending on time of day and route — approximate drive time via US-95 and I-15.`,
  },
  {
    question: `Are there hospitals near ${c.name}?`,
    answer: `Yes — Centennial Hills Hospital (6900 N Durango Dr) and Dignity Health St. Rose Centennial Campus (6675 N Durango Dr) are major northwest valley hospitals within approximately 15–20 minutes of Skye Canyon.`,
  },
  {
    question: `Where do Skye Canyon residents work out and swim?`,
    answer: `Skye Fitness and Skye Canyon Park at 10111 W Skye Canyon Park Dr include a resident gym, junior Olympic pool, splash pad, and sports courts — plus ${c.name} has its own community pool and fitness amenities.`,
  },
  {
    question: `What schools serve ${c.name}?`,
    answer: `Clark County School District zones vary by address; nearby schools often include Kenneth Divich Elementary, Edmundo Escobedo Sr. Middle School, and Arbor View High School — confirm your exact zone with CCSD before you buy.`,
  },
  {
    question: `How far is Harry Reid International Airport from Skye Canyon?`,
    answer: `Harry Reid International Airport is approximately 30–40 minutes from ${c.name} in typical traffic — mostly via US-95 and I-215 or I-15 depending on your route (approximate).`,
  },
  {
    question: `Is there dining inside Skye Canyon?`,
    answer: `Skye Canyon Marketplace includes restaurants such as Cafe Rio, Omelette Cafe, and Skye Tavern alongside Smith's — see skyecanyon.com for the current tenant list.`,
  },
  {
    question: `Who helps buyers compare ${c.name} to other Skye Canyon villages?`,
    answer: `Dr. Jan Duffy represents buyers and sellers at ${c.name} and across 89166 — call ${agentInfo.phoneFormatted} or schedule a tour at /contact.`,
  },
];

export const MESA_NEARBY_COMMUTE_NOTES = [
  {
    destination: "Las Vegas Strip (central resorts)",
    note: "Approximate 25–35 minutes via US-95 and I-15 in typical daytime traffic.",
  },
  {
    destination: "Harry Reid International Airport (LAS)",
    note: "Approximate 30–40 minutes via US-95 and I-215/I-15 depending on route.",
  },
  {
    destination: "Downtown Summerlin",
    note: "Approximate 20–30 minutes south on US-95 to Summerlin Parkway area.",
  },
  {
    destination: "Downtown Las Vegas (Fremont Street)",
    note: "Approximate 30–40 minutes via US-95 and I-15.",
  },
] as const;

export function verifiedPlacesForCategory(category: AmenityCategoryId): VerifiedNearbyPlace[] {
  return MESA_VERIFIED_NEARBY_PLACES.filter((p) => p.category === category);
}
