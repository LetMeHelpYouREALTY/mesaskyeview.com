"use client";

import CloudflareHeroBackground from "@/components/shared/CloudflareHeroBackground";
import { mesaHeroPhotos } from "@/lib/mesaskyeview-photos";

type MesaskyeviewHeroBackgroundProps = {
  className?: string;
  overlayClassName?: string;
};

export default function MesaskyeviewHeroBackground(props: MesaskyeviewHeroBackgroundProps) {
  return (
    <CloudflareHeroBackground
      images={mesaHeroPhotos}
      imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
      staticMobileLcp
      {...props}
    />
  );
}
