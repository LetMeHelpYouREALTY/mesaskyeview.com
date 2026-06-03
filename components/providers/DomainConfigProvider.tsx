"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { DomainConfig } from "@/lib/domain-config";

const DomainConfigContext = createContext<DomainConfig | null>(null);

export function DomainConfigProvider({
  config,
  children,
}: {
  config: DomainConfig;
  children: ReactNode;
}) {
  return (
    <DomainConfigContext.Provider value={config}>{children}</DomainConfigContext.Provider>
  );
}

export function useDomainConfig(): DomainConfig | null {
  return useContext(DomainConfigContext);
}
