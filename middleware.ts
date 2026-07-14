// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const nextUrl = req.nextUrl;

  const isKdsRoute = nextUrl.pathname.startsWith("/kds");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = nextUrl.pathname.startsWith("/login");

  // If user is accessing login, and is logged in, redirect to respective screen
  if (isLoginRoute) {
    if (isLoggedIn) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      } else {
        return NextResponse.redirect(new URL("/kds", nextUrl));
      }
    }
    return NextResponse.next();
  }

  // If trying to access protected routes without session, redirect to login
  if (isKdsRoute || isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Role-based protection: KITCHEN role cannot access admin dashboard
    if (isAdminRoute && role !== "ADMIN") {
      // Redirect unauthorized KITCHEN staff to /kds dashboard
      return NextResponse.redirect(new URL("/kds", nextUrl));
    }
  }

  return NextResponse.next();
});

// Configure middleware matcher to only target admin, kds, and login routes
export const config = {
  matcher: ["/admin/:path*", "/kds/:path*", "/login"],
};
