import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { mesaSellerFaqs, mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import MesaPageShell from "@/components/mesaskyeview/MesaPageShell";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `Sell Your Home in ${c.zip} | ${c.name} & Skye Canyon`,
    description: `List and sell in Skye Canyon ${c.zip} with Dr. Jan Duffy—pricing, staging, and MLS marketing for ${c.name} and resale villages.`,
    pathname: "/mesa-at-skyeview/sell-your-home",
    keywords: [
      `sell home ${c.zip}`,
      `${c.name} listing agent`,
      "Skye Canyon seller REALTOR",
    ],
  });
}

export default function MesaSellYourHomePage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: c.name, href: "/neighborhoods/mesa-at-skyeview" },
        { name: "Sell your home" },
      ]}
      title={`Sell your home in ${c.zip}`}
      intro={`Hyperlocal comps, Skye Canyon buyer demand, and Berkshire Hathaway HomeServices marketing for ${c.name} and neighboring villages.`}
      faqSchema={mesaFaqsToSchema(mesaSellerFaqs)}
    >
      <ul>
        <li>
          <strong>Pricing strategy</strong> using recent 89166 closings and active competition.
        </li>
        <li>
          <strong>Pre-list prep</strong>—staging guidance and upgrade ROI for resale in Skye Canyon.
        </li>
        <li>
          <strong>MLS & digital exposure</strong> through BHHS Nevada Properties and Dr. Jan&apos;s
          buyer network.
        </li>
        <li>
          <strong>Offer negotiation</strong> from list to close, including appraisal and inspection
          items.
        </li>
      </ul>
      <p>
        <Link href="/home-valuation" className="text-blue-600 font-semibold">
          Request a free home valuation →
        </Link>
        {" · "}
        <Link href="/sellers" className="text-blue-600 font-semibold">
          General seller services →
        </Link>
      </p>
    </MesaPageShell>
  );
}
