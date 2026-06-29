// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = pathname.split("/")[1] || "en";

  const userToken = request.cookies.has("UserToken");
  const refreshToken = request.cookies.has("RefreshToken");

  /* ==================================================
     USER ROUTES (locale aware)
  ================================================== */

  const publicUserRoutes = [
    `/${locale}/auth/login`,
    `/${locale}/auth/register`,
    `/${locale}/auth/forget-password`,
    `/${locale}/auth/verify-otp`,
    `/${locale}/auth/reset-password`,
  ];

  const isUserPath = pathname.startsWith(`/${locale}/user`);
  const isPublicUserRoute = publicUserRoutes.includes(pathname);

  // Protect all user pages - check for either access token OR refresh token
  if (isUserPath && !isPublicUserRoute && !userToken && !refreshToken) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  // Prevent logged-in user from auth pages
  if (isPublicUserRoute && (userToken || refreshToken)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  /* ==================================================
     i18n
  ================================================== */

  const response = intlMiddleware(request);
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
