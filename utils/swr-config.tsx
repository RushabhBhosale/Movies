"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";

export function SwrProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        dedupingInterval: 10000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
