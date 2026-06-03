"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SiteImageAsset } from "@/lib/site-images";

type CloudflareHeroBackgroundProps = {
  images: SiteImageAsset[];
  className?: string;
  overlayClassName?: string;
  /** Responsive sizes — avoids mobile requesting full 4K widths. */
  imageSizes?: string;
  /** Render a single priority LCP image on mobile (CSS md:hidden / md:block split). */
  staticMobileLcp?: boolean;
};

/** Rotating hero backgrounds from Cloudflare /Image assets. */
export default function CloudflareHeroBackground({
  images,
  className = "absolute inset-0",
  overlayClassName = "absolute inset-0 bg-slate-900/60",
  imageSizes = "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px",
  staticMobileLcp = false,
}: CloudflareHeroBackgroundProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return;

    const mq = window.matchMedia("(max-width: 767px)");
    if (staticMobileLcp && mq.matches) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(id);
  }, [prefersReducedMotion, images.length, staticMobileLcp]);

  if (images.length === 0) return null;

  const primary = images[0];

  return (
    <div className={className} aria-hidden>
      {staticMobileLcp ? (
        <div className="absolute inset-0 md:hidden">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            fetchPriority="high"
          />
        </div>
      ) : null}

      <div
        className={
          staticMobileLcp ? "absolute inset-0 hidden md:block" : "absolute inset-0"
        }
      >
        {images.map((photo, i) => (
          <div
            key={photo.src}
            className={`absolute inset-0 ${
              prefersReducedMotion ? "" : "transition-opacity duration-1000"
            } ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={imageSizes}
              className="object-cover"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? undefined : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className={overlayClassName} />
    </div>
  );
}
