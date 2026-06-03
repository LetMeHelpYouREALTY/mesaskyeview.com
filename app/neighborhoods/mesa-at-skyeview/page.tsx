import Link from "next/link";
import type { Metadata } from "next";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { createPageMetadata } from "@/lib/page-metadata";
import {
  mesaAtSkyeviewCommunity,
  mesaRealtorServices,
  MESA_SITE_BRAND,
} from "@/lib/mesaskyeview-brand";
import { MESA_EXPLORE_PAGES } from "@/lib/mesa-site-pages";
import { mesaCommunityFaqs, mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import MesaPageShell from "@/components/mesaskyeview/MesaPageShell";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  const c = mesaAtSkyeviewCommunity;
  return createPageMetadata(config, {
    title: `${c.name} Homes | Skye Canyon ${c.zip} | Dr. Jan Duffy`,
    description: `Realtor services for ${c.name} in ${c.masterPlan} (${c.zip})—${c.homeType} homes, ${c.sqftRange} sq ft, buyer & seller representation. Call (702) 500-1942.`,
    pathname: "/neighborhoods/mesa-at-skyeview",
    keywords: [
      `${c.name} homes for sale`,
      `${c.name} Las Vegas`,
      `Skye Canyon ${c.zip}`,
      "Homes by Dr. Jan Duffy",
      "new construction Skye Canyon",
    ],
  });
}

export default function MesaAtSkyeviewCommunityPage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Neighborhoods", href: "/neighborhoods" },
        { name: c.name },
      ]}
      title={`${c.name} | ${MESA_SITE_BRAND}`}
      intro={`One-story new homes in ${c.masterPlan}, ${c.city} ${c.zip}. Dr. Jan Duffy represents buyers and sellers at the community sales office on ${c.street}.`}
      faqSchema={mesaFaqsToSchema(mesaCommunityFaqs)}
      showGallery
      showMap
    >
      <p>
        {c.name} is a {c.homeType.toLowerCase()}, {c.stories.toLowerCase()} community in northwest
        Las Vegas with homes typically {c.sqftRange} sq ft and {c.bedroomRange} bedrooms. Public
        builder and listing sites often reference pricing from the {c.priceFromPublicListings} range—
        ask Dr. Jan for today&apos;s quick move-ins, to-be-built homes, and MLS resales.
      </p>

      <h2>Community amenities</h2>
      <ul>
        {c.amenities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        <Link href="/mesa-at-skyeview/amenities" className="text-blue-600 font-semibold">
          See amenities & lifestyle guide →
        </Link>
      </p>

      <h2>Schools</h2>
      <p>{c.schoolsNote}</p>

      <h2>Realtor services at {c.name}</h2>
      <ul>
        {mesaRealtorServices.map((s) => (
          <li key={s.title}>
            <strong>{s.title}</strong> — {s.description}
          </li>
        ))}
      </ul>

      <h2>More Mesa at Skyeview guides</h2>
      <ul>
        {MESA_EXPLORE_PAGES.filter((p) => p.href !== "/neighborhoods/mesa-at-skyeview").map(
          (page) => (
            <li key={page.href}>
              <Link href={page.href} className="text-blue-600 font-semibold">
                {page.title}
              </Link>
              — {page.description}
            </li>
          )
        )}
      </ul>

      <p>
        Also explore{" "}
        <Link href="/neighborhoods/skye-canyon" className="text-blue-600 font-semibold">
          Skye Canyon overview
        </Link>{" "}
        and{" "}
        <Link href="/area/89166-homes" className="text-blue-600 font-semibold">
          ZIP {c.zip} homes
        </Link>
        .
      </p>
    </MesaPageShell>
  );
}
