import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // Pass through Next internals + APIs + static files
  const PUBLIC_FILE = /\.(.*)$/;
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    PUBLIC_FILE.test(url.pathname)
  ) {
    return NextResponse.next();
  }

  // Treat gov.* as the Higher Ed domain
  const isGovDomain =
    host.includes("gov.statecraftsims.com") || host.includes("gov.statecraftsim.com");

  if (isGovDomain) {
    // Rewrite root to /higher-ed
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/higher-ed", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
