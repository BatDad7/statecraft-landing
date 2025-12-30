import React from "react";
import { headers } from "next/headers";
import { classifyHost } from "@/lib/routing";
import GlobalChromeClient from "@/components/layout/GlobalChromeClient";

export default function GlobalChrome({ children }: { children: React.ReactNode }) {
  const host = headers().get("host") || "";
  const forcedDomain = classifyHost(host);

  return (
    <GlobalChromeClient forcedDomain={forcedDomain}>
      {children}
    </GlobalChromeClient>
  );
}
