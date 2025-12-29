"use client";

import { usePathname } from "next/navigation";

export default function GlobalBackground() {
  const pathname = usePathname();

  // The new Higher Ed hub page (`/higher-ed`) wants a cleaner dark look.
  if (pathname === "/higher-ed") return null;

  return <div className="fixed inset-0 tactical-grid pointer-events-none -z-10" />;
}


