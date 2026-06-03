"use client";

import CloudflareHeroBackground from "@/components/shared/CloudflareHeroBackground";
import { mesaHeroPhotos } from "@/lib/mesaskyeview-photos";

type MesaskyeviewHeroBackgroundProps = {
  className?: string;
  overlayClassName?: string;
};

export default function MesaskyeviewHeroBackground(props: MesaskyeviewHeroBackgroundProps) {
  return <CloudflareHeroBackground images={mesaHeroPhotos} {...props} />;
}
