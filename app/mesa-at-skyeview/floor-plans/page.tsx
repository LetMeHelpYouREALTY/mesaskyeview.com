import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import MesaPageShell from "@/components/mesaskyeview/MesaPageShell";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `${c.name} Floor Plans | ${c.sqftRange} Sq Ft Homes`,
    description: `${c.bedroomRange} bedroom, ${c.stories.toLowerCase()} plans ${c.sqftRange} sq ft at ${c.name}. Current inventory from Dr. Jan Duffy—(702) 500-1942.`,
    pathname: "/mesa-at-skyeview/floor-plans",
    keywords: [
      `${c.name} floor plans`,
      "one story floor plans Skye Canyon",
      `${c.sqftRange} sq ft homes Las Vegas`,
    ],
  });
}

export default function MesaFloorPlansPage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: c.name, href: "/neighborhoods/mesa-at-skyeview" },
        { name: "Floor plans" },
      ]}
      title={`Floor plans at ${c.name}`}
      intro={`${c.homeType}, ${c.stories.toLowerCase()} designs with ${c.bedroomRange} bedrooms and roughly ${c.sqftRange} square feet—plan names and availability change with builder releases.`}
    >
      <p>
        Dr. Jan tracks current quick move-ins, elevation options, and lot premiums so you compare
        true cost—not just base price. Plan count and names vary; call or message for today&apos;s
        sheet and MLS resale alternatives in the same size range.
      </p>
      <ul>
        <li>
          <strong>Bedrooms:</strong> {c.bedroomRange}
        </li>
        <li>
          <strong>Approx. size:</strong> {c.sqftRange} sq ft
        </li>
        <li>
          <strong>Style:</strong> {c.stories}, {c.homeType}
        </li>
        <li>
          <strong>ZIP:</strong> {c.zip}
        </li>
      </ul>
      <p>
        <Link
          href="/mesa-at-skyeview/new-construction-homes"
          className="text-blue-600 font-semibold"
        >
          New construction guide →
        </Link>
        {" · "}
        <Link href="/listings" className="text-blue-600 font-semibold">
          Search available homes →
        </Link>
      </p>
    </MesaPageShell>
  );
}
