import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getGovRewritePath } from "@/lib/routing";

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

  const rewritePath = getGovRewritePath(host, url.pathname);
  if (rewritePath) {
    // IMPORTANT: Redirect (not rewrite) so the browser URL becomes /higher-ed.
    // This prevents hydration flicker where the server renders Higher Ed but the
    // client sees pathname "/" and flips the navbar theme.
    return NextResponse.redirect(new URL(rewritePath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
