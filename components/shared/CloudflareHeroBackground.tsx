"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SiteImageAsset } from "@/lib/site-images";

type CloudflareHeroBackgroundProps = {
  images: SiteImageAsset[];
  className?: string;
  overlayClassName?: string;
};

/** Rotating hero backgrounds from Cloudflare /Image assets. */
export default function CloudflareHeroBackground({
  images,
  className = "absolute inset-0",
  overlayClassName = "absolute inset-0 bg-slate-900/60",
}: CloudflareHeroBackgroundProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(id);
  }, [prefersReducedMotion, images.length]);

  if (images.length === 0) return null;

  return (
    <div className={className} aria-hidden>
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
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className={overlayClassName} />
    </div>
  );
}
