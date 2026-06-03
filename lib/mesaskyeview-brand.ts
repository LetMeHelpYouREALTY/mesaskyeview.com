import type { DomainConfig } from "@/lib/domain-config";

/** Official site name for mesaskyeview.com */
export const MESA_SITE_BRAND = "Mesa at Skyeview | Homes by Dr. Jan Duffy";

/** Replaces on-site references to the builder sales brand */
export const MESA_HOME_BRAND = "Homes by Dr. Jan Duffy";

/** PostalAddress fields for JSON-LD — must match visible NAP on mesaskyeview.com. */
export function getMesaCommunityPostalAddress() {
  const c = mesaAtSkyeviewCommunity;
  return {
    streetAddress: c.street,
    addressLocality: c.city,
    addressRegion: c.state,
    postalCode: c.zip,
    addressCountry: "US",
  };
}

export function isMesaskyeviewDomain(config: DomainConfig): boolean {
  const d = config.domain.replace(/^www\./, "").toLowerCase();
  return d === "mesaskyeview.com";
}

/** Community facts (public builder/community listings; verify before publishing stats) */
export const mesaAtSkyeviewCommunity = {
  name: "Mesa at Skyeview",
  masterPlan: "Skye Canyon",
  city: "Las Vegas",
  state: "NV",
  zip: "89166",
  street: "8544 Vanhoy Creek Street",
  salesOfficeAddress: "8544 Vanhoy Creek Street, Las Vegas, NV 89166",
  mapsQuery: "8544+Vanhoy+Creek+Street+Las+Vegas+NV+89166",
  /** WGS84 — Mesa at Skyeview community pin */
  latitude: 36.31558648812897,
  longitude: -115.32930209279098,
  homeType: "Single-family",
  stories: "One-story",
  sqftRange: "1,635–1,816",
  bedroomRange: "2–3",
  priceFromPublicListings: "mid-$400s",
  amenities: [
    "Community pool and splash pad",
    "Fitness center and sports courts",
    "Skye Center and Skye Fitness (master plan)",
    "Trails, parks, and outdoor recreation near Kyle Canyon",
  ],
  schoolsNote:
    "Clark County schools serving the area include Kenneth Divich Elementary, Edmundo Escobedo Sr. Middle School, and Arbor View High School (attendance zones vary—confirm with CCSD).",
};

export const mesaRealtorServices = [
  {
    title: "Buyer representation",
    description:
      "Tour Mesa at Skyeview quick move-ins and to-be-built homes, compare plans, and register with Dr. Jan before your first model visit so you keep free advocacy.",
  },
  {
    title: "New construction advocacy",
    description:
      "Contract review, upgrade negotiations, and timeline oversight for Skye Canyon new homes—your agent works for you, not the builder.",
  },
  {
    title: "Resale listings in Skye Canyon",
    description:
      "MLS search, pricing guidance, and offer strategy for resale homes in Mesa at Skyeview and neighboring Skye Canyon villages.",
  },
  {
    title: "Sell your Skye Canyon home",
    description:
      "Staging, pricing, and marketing for sellers in 89166 with hyperlocal comps and Skye Canyon buyer demand insight.",
  },
  {
    title: "Relocation to Northwest Las Vegas",
    description:
      "Neighborhood tours, lender introductions, and remote closing support for buyers moving into Skye Canyon.",
  },
  {
    title: "Free home valuation",
    description:
      "No-obligation pricing for Mesa at Skyeview and Skye Canyon resales using current MLS activity.",
  },
] as const;

export function localizeTitleForMesa(title: string): string {
  if (title.includes(MESA_SITE_BRAND)) return title;
  let t = title
    .replace(/Century Communities/gi, MESA_HOME_BRAND)
    .replace(/Berkshire Hathaway HomeServices/gi, MESA_HOME_BRAND)
    .replace(/HeyBerkshire/gi, MESA_HOME_BRAND);
  if (!/Mesa at Skyeview/i.test(t)) {
    t = t.replace(/\bLas Vegas\b/gi, "Mesa at Skyeview");
  }
  return `${t} | ${MESA_SITE_BRAND}`;
}

export function localizeDescriptionForMesa(description: string, config: DomainConfig): string {
  return description
    .replace(/Century Communities/gi, MESA_HOME_BRAND)
    .replace(/homes@heyberkshire\.com/gi, config.contactEmail ?? "DrDuffySells@MesaSkyeview.com")
    .replace(
      /Berkshire Hathaway HomeServices Nevada Properties/gi,
      `${MESA_HOME_BRAND} with Dr. Jan Duffy, REALTOR® | BHHS Nevada Properties`
    );
}
