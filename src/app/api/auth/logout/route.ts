import { deleteCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        // Create a response object
        const response = NextResponse.json({ message: "Logout successful" });

        // Remove the token cookie
        deleteCookie("token", { req, res: response, path: "/admin/login" });
        deleteCookie("user", { req, res: response, path: "/admin/login" });

        return response;
    } catch (error) {
        console.error("Logout Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}