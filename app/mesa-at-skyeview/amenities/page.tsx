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
    title: `${c.name} Amenities | Skye Canyon Lifestyle`,
    description: `Pools, fitness, trails, and Skye Canyon master-plan amenities near ${c.name} in ${c.zip}. Tour with Dr. Jan Duffy.`,
    pathname: "/mesa-at-skyeview/amenities",
    keywords: [
      `${c.name} amenities`,
      "Skye Canyon pool fitness",
      "Skye Center Las Vegas",
    ],
  });
}

export default function MesaAmenitiesPage() {
  const c = mesaAtSkyeviewCommunity;

  return (
    <MesaPageShell
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: c.name, href: "/neighborhoods/mesa-at-skyeview" },
        { name: "Amenities" },
      ]}
      title={`Amenities & lifestyle at ${c.name}`}
      intro={`Resort-style recreation at the community and across the ${c.masterPlan} master plan—minutes from trails toward Kyle Canyon and the Spring Mountains.`}
      showGallery
    >
      <h2>At {c.name}</h2>
      <ul>
        {c.amenities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Skye Canyon master plan</h2>
      <p>
        Skye Center and Skye Fitness anchor the master plan with pools, fitness, sports courts, and
        event space. Miles of trails and parks connect villages across northwest Las Vegas—ideal for
        families and outdoor-focused buyers relocating to 89166.
      </p>
      <p>
        <Link href="/neighborhoods/skye-canyon" className="text-blue-600 font-semibold">
          Full Skye Canyon neighborhood guide →
        </Link>
      </p>
    </MesaPageShell>
  );
}
