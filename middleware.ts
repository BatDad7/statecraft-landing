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

  // Treat gov.* as the Higher Ed domain, but explicitly exclude apgov.*
  // because "apgov.statecraftsims.com" contains "gov.statecraftsims.com".
  const isGovDomain =
    (host.includes("gov.statecraftsims.com") || host.includes("gov.statecraftsim.com")) &&
    !host.includes("apgov");

  if (isGovDomain) {
    // Rewrite root to the Higher Ed hub (the "new" page)
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/higher-ed", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
