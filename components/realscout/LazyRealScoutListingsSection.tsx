"use client";

import { useCallback, type ReactNode } from "react";
import LazyWhenVisible from "@/components/shared/LazyWhenVisible";
import { loadRealScoutScript } from "@/lib/load-realscout-script";

type LazyRealScoutListingsSectionProps = {
  children: ReactNode;
};

/** Defers RealScout script + listings block until near viewport (mesaskyeview perf). */
export default function LazyRealScoutListingsSection({
  children,
}: LazyRealScoutListingsSectionProps) {
  const onVisible = useCallback(() => {
    void loadRealScoutScript();
  }, []);

  return (
    <LazyWhenVisible minHeight="420px" rootMargin="250px 0px" onVisible={onVisible}>
      {children}
    </LazyWhenVisible>
  );
}
