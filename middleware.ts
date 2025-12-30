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
    // IMPORTANT: Use rewrite so the browser URL stays on gov.statecraftsims.com/
    // while serving the Higher Ed content.
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
