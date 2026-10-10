import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Return 410 Gone for retired Shopify commerce URLs and known spam paths.
 * Path redirects live in vercel.json; /collections/all is redirected there and
 * must not be caught by the collections 410 rule.
 */
function isGone(pathname: string): boolean {
  const path = pathname.toLowerCase();

  if (path === "/cart" || path === "/checkout") return true;
  if (path === "/collections" || path.startsWith("/collections/")) {
    // Explicit redirect in vercel.json
    if (path === "/collections/all") return false;
    return true;
  }
  if (path === "/products" || path.startsWith("/products/")) return true;
  if (path === "/account" || path.startsWith("/account/")) return true;

  // Spam / injected junk — 410 + disavow elsewhere
  if (path.includes("kissanime")) return true;
  if (/\.(php)$/i.test(path)) return true;
  if (path.startsWith("/404.html")) return true;

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isGone(pathname)) return NextResponse.next();

  return new NextResponse("Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/collections",
    "/collections/:path*",
    "/products",
    "/products/:path*",
    "/account",
    "/account/:path*",
    "/404.html",
    // Catch *.php / kissanime / other spam paths without running on static assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|ico|woff2?)$).*)",
  ],
};
