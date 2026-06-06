"use client";

import { type ReactNode } from "react";
import MesaScrollDeferredListings from "@/components/performance/MesaScrollDeferredListings";
import LazyRealScoutListingsSection from "@/components/realscout/LazyRealScoutListingsSection";

type MesaDeferredListingsBlockProps = {
  children: ReactNode;
};

/** mesaskyeview: scroll-gated RealScout listings (no prefetch margin). */
export default function MesaDeferredListingsBlock({ children }: MesaDeferredListingsBlockProps) {
  return (
    <MesaScrollDeferredListings>
      <LazyRealScoutListingsSection rootMargin="0px 0px">
        {children}
      </LazyRealScoutListingsSection>
    </MesaScrollDeferredListings>
  );
}
