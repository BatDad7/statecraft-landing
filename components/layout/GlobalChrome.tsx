"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import StatecraftTA from "@/components/StatecraftTA";

export default function GlobalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHigherEd = pathname?.startsWith("/higher-ed");

  return (
    <>
      {!isHigherEd && (
        <div className="fixed inset-0 tactical-grid pointer-events-none -z-10" />
      )}
      {isHigherEd && <div className="fixed inset-0 bg-white -z-10" />}

      <Navbar />
      <main>{children}</main>
      {!isHigherEd && <StatecraftTA />}
    </>
  );
}
