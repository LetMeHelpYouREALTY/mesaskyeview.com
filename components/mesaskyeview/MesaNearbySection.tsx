"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import LazyWhenVisible from "@/components/shared/LazyWhenVisible";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import type { AmenityCategoryId } from "@/lib/mesa-amenity-map-config";

const MesaAmenityMapClient = dynamic(
  () => import("@/components/mesaskyeview/MesaAmenityMapClient"),
  { ssr: false }
);

type MesaNearbySectionProps = {
  /** compact = homepage teaser; full = embedded on amenity pages */
  variant?: "compact" | "full";
  initialCategory?: AmenityCategoryId;
  className?: string;
};

export default function MesaNearbySection({
  variant = "compact",
  initialCategory,
  className = "",
}: MesaNearbySectionProps) {
  const c = mesaAtSkyeviewCommunity;
  const isCompact = variant === "compact";

  return (
    <section
      className={`py-16 md:py-20 bg-slate-50 ${className}`}
      aria-labelledby="mesa-nearby-section-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
              {isCompact ? "What's nearby" : "Interactive map"}
            </p>
            <h2
              id="mesa-nearby-section-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              {isCompact ? `Life near ${c.name}` : `Nearby amenities in ${c.name}, Las Vegas`}
            </h2>
            <p className="text-lg text-slate-600 aeo-lead-answer max-w-3xl mx-auto">
              {isCompact
                ? `Explore grocery, parks, healthcare, dining, and schools around Skye Canyon (${c.zip})—then open the full amenity guide for drive times and FAQs.`
                : `Filter restaurants, parks, grocery, healthcare, and more within a few miles of ${c.street}.`}
            </p>
            {isCompact && (
              <Link
                href="/nearby-amenities"
                className="inline-block mt-6 text-blue-600 font-semibold hover:underline"
              >
                Full nearby amenities guide →
              </Link>
            )}
          </div>

          <LazyWhenVisible minHeight="480px" rootMargin="240px 0px">
            <MesaAmenityMapClient
              hideStaticList={isCompact}
              initialCategory={initialCategory}
            />
          </LazyWhenVisible>

          {isCompact && (
            <p className="text-center mt-8 text-sm text-slate-600">
              <Link href="/nearby-amenities" className="font-semibold text-blue-600 hover:underline">
                See all categories, commute notes, and buyer FAQs
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
