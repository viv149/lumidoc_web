import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany({
            where: { role: "USER"},
            select: { id: true, email: true, name: true, role: true }, // Avoid sending passwords
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received Data:", body);

        // Extract email and password correctly
        const { email, password } = body.data || body;  // Support both cases

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, password: true, role: true },
        });

        console.log("User Found:", user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json({ error: "Access denied. Only admins can log in." }, { status: 403 });
        }

        console.log("Generating JWT Token...");
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "24h" }
        );

        console.log("Login Successful!");
        return NextResponse.json({
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}



