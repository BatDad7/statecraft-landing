import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // 1. Skip middleware for static files, APIs, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.') // Skip files with extensions (e.g. robots.txt, favicon.ico)
  ) {
    return NextResponse.next();
  }

  // 2. Handle "gov.statecraftsims.com" -> Rewrite Homepage to Higher Ed
  // We also check for a "gov-landing" subdomain for testing environments if needed
  if (hostname.startsWith('gov.') || hostname === 'gov.statecraftsims.com') {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/higher-ed/gov', request.url));
    }
  }

  // 3. Handle "apgov.statecraftsims.com" -> Default behavior (serves /)
  // No action needed as app/page.tsx is already at root

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

