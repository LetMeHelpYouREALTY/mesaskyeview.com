import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { mesaCommunityFaqs, mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import MesaPageShell from "@/components/mesaskyeview/MesaPageShell";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `New Construction at ${c.name} | Skye Canyon`,
    description: `${c.stories} new homes ${c.sqftRange} sq ft at ${c.name} (${c.zip}). Buyer representation with Dr. Jan Duffy—register before your model visit.`,
    pathname: "/mesa-at-skyeview/new-construction-homes",
    keywords: [
      `${c.name} new homes`,
      "Skye Canyon new construction",
      "one story new homes Las Vegas",
    ],
  });
}

export default function MesaNewConstructionPage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: c.name, href: "/neighborhoods/mesa-at-skyeview" },
        { name: "New construction" },
      ]}
      title={`New construction homes at ${c.name}`}
      intro={`${c.stories} ${c.homeType.toLowerCase()} homes with ${c.bedroomRange} bedrooms and approximately ${c.sqftRange} sq ft in ${c.masterPlan}.`}
      faqSchema={mesaFaqsToSchema(mesaCommunityFaqs)}
    >
      <p>
        Inventory includes quick move-in homes and to-be-built plans. Public listings often show
        pricing from the {c.priceFromPublicListings} range—contact Dr. Jan for current availability,
        incentives, and resale alternatives in {c.zip}.
      </p>
      <p>
        <Link
          href="/mesa-at-skyeview/buyer-representation"
          className="text-blue-600 font-semibold"
        >
          Why register a buyer agent first →
        </Link>
        {" · "}
        <Link href="/mesa-at-skyeview/floor-plans" className="text-blue-600 font-semibold">
          Floor plans & sizes →
        </Link>
        {" · "}
        <Link href="/new-construction" className="text-blue-600 font-semibold">
          Las Vegas new construction overview →
        </Link>
      </p>
    </MesaPageShell>
  );
}
