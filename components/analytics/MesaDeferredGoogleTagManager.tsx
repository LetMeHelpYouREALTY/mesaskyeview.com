"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

type MesaDeferredGoogleTagManagerProps = {
  gtmId: string;
};

/**
 * Loads GTM after first scroll/interaction or idle timeout — keeps GTM off the LCP path on mesaskyeview.
 * sendGTMEvent() still queues to dataLayer before init.
 */
export default function MesaDeferredGoogleTagManager({ gtmId }: MesaDeferredGoogleTagManagerProps) {
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
    window.addEventListener("pointerdown", activate, { once: true, passive: true });
    window.addEventListener("keydown", activate, { once: true, passive: true });

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(activate, { timeout: 10000 })
        : window.setTimeout(activate, 10000);

    return () => {
      window.removeEventListener("scroll", activate);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
      if (typeof window.cancelIdleCallback === "function" && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  if (!ready) return null;

  return <GoogleTagManager gtmId={gtmId} />;
}
