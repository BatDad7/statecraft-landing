"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import StatecraftTA from "@/components/StatecraftTA";
import { classifyHost, type DomainTarget } from "@/lib/routing";

export default function GlobalChromeClient({
  children,
  forcedDomain = "other",
}: {
  children: React.ReactNode;
  forcedDomain?: DomainTarget;
}) {
  const pathname = usePathname();
  const windowDomain =
    typeof window !== "undefined" ? classifyHost(window.location.host) : "other";
  const domain = forcedDomain !== "other" ? forcedDomain : windowDomain;

  const isHigherEd = pathname?.startsWith("/higher-ed") || domain === "gov";

  return (
    <>
      {!isHigherEd && (
        <div className="fixed inset-0 tactical-grid pointer-events-none -z-10" />
      )}
      {isHigherEd && <div className="fixed inset-0 bg-white -z-10" />}

      <Navbar forcedDomain={domain} />
      <main>{children}</main>
      {!isHigherEd && <StatecraftTA />}
    </>
  );
}


