import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/dashboard") && !req.cookies.has("admin-tkn")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  } else if (
    (pathname.startsWith("/transaction") ||
      pathname.startsWith("/my-event") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/profile")) &&
    !req.cookies.has("user-tkn")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  } else if (
    pathname.startsWith("/sign-in") &&
    (req.cookies.has("admin-tkn") || req.cookies.has("user-tkn"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
