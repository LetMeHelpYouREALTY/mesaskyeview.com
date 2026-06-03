import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { DR_JAN_REALSCOUT_SEARCH_URL } from "@/lib/realscout-config";

export const metadata: Metadata = {
  title: "Search Homes | Dr. Jan Duffy",
  description: "Browse live MLS listings with Dr. Jan Duffy on RealScout.",
  robots: { index: false, follow: true },
};

/** Legacy placeholder URLs redirect to live RealScout search. */
export default function ListingDetailRedirect() {
  redirect(DR_JAN_REALSCOUT_SEARCH_URL);
}
