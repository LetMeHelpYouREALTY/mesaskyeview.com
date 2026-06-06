"use client";

import { useEffect, useState, type ReactNode } from "react";

type MesaScrollDeferredListingsProps = {
  children: ReactNode;
  /** Placeholder height while waiting for scroll (CLS guard). */
  minHeight?: string;
};

/** Mount children only after the user scrolls — keeps RealScout off the LCP path. */
export default function MesaScrollDeferredListings({
  children,
  minHeight = "420px",
}: MesaScrollDeferredListingsProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function activate() {
      setReady(true);
    }

    if (window.scrollY > 0) {
      activate();
      return;
    }

    window.addEventListener("scroll", activate, { once: true, passive: true });
    return () => window.removeEventListener("scroll", activate);
  }, []);

  if (!ready) {
    return <div aria-hidden style={{ minHeight }} />;
  }

  return <>{children}</>;
}
