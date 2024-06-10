import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isDashboard = path.startsWith("/dashboard");
  const authToken = request.cookies.get("token");

  const isAdminDashboard = path.startsWith("/admin/dashboard");
  const adminauthToken = request.cookies.get("admintoken");
  if (isDashboard) {
    if (authToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
  if (isAdminDashboard) {
    if (adminauthToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard", "/dashboard/:path*", "/admin/:path*"],
};