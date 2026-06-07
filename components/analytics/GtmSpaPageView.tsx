"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Pushes page_view to dataLayer on App Router client navigations.
 * Initial load is handled by the GA4 Configuration tag when GTM loads.
 */
export default function GtmSpaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView(pagePath);
  }, [pathname, searchParams]);

  return null;
}
