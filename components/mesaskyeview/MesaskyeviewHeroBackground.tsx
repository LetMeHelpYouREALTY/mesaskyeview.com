"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mesaHeroPhotos } from "@/lib/mesaskyeview-photos";

type MesaskyeviewHeroBackgroundProps = {
  className?: string;
  overlayClassName?: string;
};

/** Rotating hyperlocal hero backgrounds for Mesa at Skyeview pages. */
export default function MesaskyeviewHeroBackground({
  className = "absolute inset-0",
  overlayClassName = "absolute inset-0 bg-slate-900/60",
}: MesaskyeviewHeroBackgroundProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || mesaHeroPhotos.length < 2) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % mesaHeroPhotos.length);
    }, 6000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div className={className} aria-hidden>
      {mesaHeroPhotos.map((photo, i) => (
        <div
          key={photo.src}
          className={`absolute inset-0 ${
            prefersReducedMotion ? "" : "transition-opacity duration-1000"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={photo.src}
            alt=""
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
