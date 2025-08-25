import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile","reset-password"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get("accessToken")?.value;

  console.log("cookie from middleware:", cookie);

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
