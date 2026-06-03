import { MESA_HOME_BRAND, mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

type PathLead = {
  headline: string;
  subhead: string;
  serviceFocus: string;
};

const defaultLead: PathLead = {
  headline: `Realtor services at ${mesaAtSkyeviewCommunity.name}`,
  subhead: `${MESA_HOME_BRAND} — buyer and seller representation in Skye Canyon (89166), backed by Dr. Jan Duffy and Berkshire Hathaway HomeServices Nevada Properties.`,
  serviceFocus: "buying and selling",
};

const pathLeads: { pattern: RegExp; lead: PathLead }[] = [
  {
    pattern: /^\/$/,
    lead: {
      headline: `${mesaAtSkyeviewCommunity.name} homes & realtor services`,
      subhead:
        "Search quick move-ins and to-be-built homes, compare floor plans, and work with a Skye Canyon specialist—free buyer representation on new construction.",
      serviceFocus: "Mesa at Skyeview home search",
    },
  },
  {
    pattern: /^\/buyers/,
    lead: {
      headline: "Buy a home at Mesa at Skyeview",
      subhead:
        "From first showing through closing—offers, inspections, and builder registration handled with your interests first.",
      serviceFocus: "home buying",
    },
  },
  {
    pattern: /^\/sellers/,
    lead: {
      headline: "Sell in Mesa at Skyeview & Skye Canyon",
      subhead:
        "Pricing, prep, and marketing tuned to 89166 buyers relocating to northwest Las Vegas.",
      serviceFocus: "home selling",
    },
  },
  {
    pattern: /^\/new-construction/,
    lead: {
      headline: "New homes at Mesa at Skyeview",
      subhead:
        "Register Dr. Jan before your first model visit—free advocacy on contracts, upgrades, and incentives at Skye Canyon.",
      serviceFocus: "new construction buyer representation",
    },
  },
  {
    pattern: /^\/neighborhoods\/skye-canyon/,
    lead: {
      headline: "Skye Canyon & Mesa at Skyeview guide",
      subhead:
        "Master-planned amenities, schools, and villages—including one-story homes at Mesa at Skyeview on Vanhoy Creek.",
      serviceFocus: "Skye Canyon neighborhood expertise",
    },
  },
  {
    pattern: /^\/neighborhoods/,
    lead: {
      headline: "Las Vegas neighborhoods—with a Mesa at Skyeview focus",
      subhead:
        "Compare areas across the valley; Dr. Jan helps you decide if Skye Canyon fits your lifestyle and budget.",
      serviceFocus: "neighborhood consulting",
    },
  },
  {
    pattern: /^\/home-valuation/,
    lead: {
      headline: "What is your Mesa at Skyeview home worth?",
      subhead: "Free valuation using Skye Canyon MLS activity and recent closings near Vanhoy Creek.",
      serviceFocus: "seller pricing",
    },
  },
  {
    pattern: /^\/contact/,
    lead: {
      headline: "Talk with your Mesa at Skyeview REALTOR®",
      subhead: "Call, email, or schedule a consultation for tours, listings, or listing prep in 89166.",
      serviceFocus: "consultation",
    },
  },
  {
    pattern: /^\/faq/,
    lead: {
      headline: "Mesa at Skyeview & Skye Canyon FAQs",
      subhead: "Buying, selling, new construction registration, and working with Dr. Jan Duffy.",
      serviceFocus: "questions answered",
    },
  },
  {
    pattern: /^\/luxury-homes|^\/buyers\/luxury/,
    lead: {
      headline: "Luxury & move-up options near Skye Canyon",
      subhead:
        "Mesa at Skyeview offers attainable new construction; Dr. Jan also guides move-up and luxury buyers across the northwest valley.",
      serviceFocus: "luxury and move-up representation",
    },
  },
  {
    pattern: /^\/55-plus/,
    lead: {
      headline: "55+ living near Skye Canyon",
      subhead:
        "Active adult communities across Las Vegas—with honest guidance if Mesa at Skyeview or Skye Canyon fits your plans.",
      serviceFocus: "55+ buyer consulting",
    },
  },
  {
    pattern: /^\/relocation|^\/buyers\/california/,
    lead: {
      headline: "Relocate to Mesa at Skyeview",
      subhead: "Remote tours, lender partners, and Skye Canyon orientation for out-of-state buyers.",
      serviceFocus: "relocation",
    },
  },
  {
    pattern: /^\/investment/,
    lead: {
      headline: "Skye Canyon investment perspective",
      subhead: "Rental demand and resale trends around Mesa at Skyeview and northwest Las Vegas.",
      serviceFocus: "investment consulting",
    },
  },
  {
    pattern: /^\/market-/,
    lead: {
      headline: "Mesa at Skyeview market insight",
      subhead: "Local context for Skye Canyon new construction and resale activity—ask for current MLS detail.",
      serviceFocus: "market analysis",
    },
  },
];

export function getMesaskyeviewPathLead(pathname: string): PathLead {
  const path = pathname.split("?")[0] || "/";
  for (const { pattern, lead } of pathLeads) {
    if (pattern.test(path)) return lead;
  }
  return defaultLead;
}
