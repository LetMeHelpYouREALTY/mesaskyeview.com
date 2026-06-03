import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { mesaBuyerFaqs, mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import MesaPageShell from "@/components/mesaskyeview/MesaPageShell";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `Buyer Representation at ${c.name} | Dr. Jan Duffy`,
    description: `Free buyer advocacy for ${c.name} new construction and 89166 MLS resales. Register Dr. Jan before your model visit. (702) 500-1942.`,
    pathname: "/mesa-at-skyeview/buyer-representation",
    keywords: [
      `${c.name} buyer agent`,
      "new construction buyer representation Las Vegas",
      "Skye Canyon buyer REALTOR",
    ],
  });
}

export default function MesaBuyerRepresentationPage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: c.name, href: "/neighborhoods/mesa-at-skyeview" },
        { name: "Buyer representation" },
      ]}
      title={`Buyer representation at ${c.name}`}
      intro="Builder sales teams work for the builder. Dr. Jan Duffy works for you—on new construction and resale homes in Skye Canyon."
      faqSchema={mesaFaqsToSchema(mesaBuyerFaqs)}
    >
      <ol>
        <li>
          <strong>Register before you tour.</strong> Contact Dr. Jan before your first model-home
          visit so your representation is documented.
        </li>
        <li>
          <strong>Compare plans and inventory.</strong> Review quick move-ins, to-be-built homes,
          and competing Skye Canyon resales with MLS data—not just builder marketing.
        </li>
        <li>
          <strong>Contract & upgrade advocacy.</strong> Dr. Jan reviews purchase agreements,
          negotiates upgrades where possible, and tracks build timelines.
        </li>
        <li>
          <strong>Close with confidence.</strong> Inspections, lender coordination, and closing
          support through Berkshire Hathaway HomeServices Nevada Properties.
        </li>
      </ol>
      <p>
        <Link href="/mesa-at-skyeview/new-construction-homes" className="text-blue-600 font-semibold">
          New construction at Mesa at Skyeview →
        </Link>
        {" · "}
        <Link href="/listings" className="text-blue-600 font-semibold">
          Search MLS listings →
        </Link>
      </p>
    </MesaPageShell>
  );
}
