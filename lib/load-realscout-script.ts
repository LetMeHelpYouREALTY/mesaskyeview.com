import { REALSCOUT_WEB_COMPONENTS_SCRIPT } from "@/lib/realscout-config";

let loadPromise: Promise<void> | null = null;

/** Load RealScout UMD once (client-only). Used on mesaskyeview after user action or scroll. */
export function loadRealScoutScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${REALSCOUT_WEB_COMPONENTS_SCRIPT}"]`
    );

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("RealScout script failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = REALSCOUT_WEB_COMPONENTS_SCRIPT;
    script.type = "module";
    script.async = true;
    script.dataset.loaded = "false";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("RealScout script failed"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
