import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { mesaZipFaqs, mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import { MESA_EXPLORE_PAGES } from "@/lib/mesa-site-pages";
import MesaPageShell from "@/components/mesaskyeview/MesaPageShell";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `Homes for Sale in ${c.zip} | Skye Canyon & ${c.name}`,
    description: `Search and local expertise for ZIP ${c.zip}—${c.name}, Skye Canyon resales, and new construction with Dr. Jan Duffy.`,
    pathname: "/area/89166-homes",
    keywords: [
      `${c.zip} homes for sale`,
      "Skye Canyon ZIP 89166",
      `${c.name} 89166`,
    ],
  });
}

export default function Zip89166HomesPage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: `ZIP ${c.zip}` },
      ]}
      title={`Homes for sale in ZIP ${c.zip}`}
      intro={`Northwest Las Vegas hub for ${c.masterPlan}—including ${c.name} new construction and resale villages across Skye Canyon.`}
      faqSchema={mesaFaqsToSchema(mesaZipFaqs)}
    >
      <p>
        Use the MLS search on this site or contact Dr. Jan for curated lists by plan size, lot,
        and village. Hyperlocal guides:
      </p>
      <ul>
        {MESA_EXPLORE_PAGES.map((page) => (
          <li key={page.href}>
            <Link href={page.href} className="text-blue-600 font-semibold">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/listings" className="text-blue-600 font-semibold">
          Browse all listings →
        </Link>
      </p>
    </MesaPageShell>
  );
}
