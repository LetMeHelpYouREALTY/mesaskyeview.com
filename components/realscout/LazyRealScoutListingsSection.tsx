"use client";

import { useCallback, type ReactNode } from "react";
import LazyWhenVisible from "@/components/shared/LazyWhenVisible";
import { loadRealScoutScript } from "@/lib/load-realscout-script";

type LazyRealScoutListingsSectionProps = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
};

/** Defers RealScout script + listings block until near viewport (mesaskyeview perf). */
export default function LazyRealScoutListingsSection({
  children,
  rootMargin = "250px 0px",
  minHeight = "420px",
}: LazyRealScoutListingsSectionProps) {
  const onVisible = useCallback(() => {
    void loadRealScoutScript();
  }, []);

  return (
    <LazyWhenVisible minHeight={minHeight} rootMargin={rootMargin} onVisible={onVisible}>
      {children}
    </LazyWhenVisible>
  );
}
