"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import StatecraftTA from "@/components/StatecraftTA";

export default function GlobalChrome() {
  const pathname = usePathname();

  // The new Higher Ed hub page (`/higher-ed`) owns its own Navbar/Footer.
  if (pathname === "/higher-ed") return null;

  return (
    <>
      <Navbar />
      <StatecraftTA />
    </>
  );
}


