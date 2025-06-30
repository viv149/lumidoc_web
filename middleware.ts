import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // Get the token from cookies

    // Define protected routes
    const protectedRoutes = ["/admin/dashboard", "/admin/settings"];

    // Redirect if trying to access protected routes without a token
    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // Protect all routes under /admin/
};
