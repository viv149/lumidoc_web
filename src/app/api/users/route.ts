import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function POST(req:Request) {
    try {
        // Handle JSON parsing errors
        let requestBody;
        try {
            requestBody = await req.json();
        } catch (error) {
            return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
        }

        const { name, email, password, role = "USER" } = requestBody;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }


        // Create new user
        const newUser = await prisma.user.create({
            data: { name, email, password, role },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}



export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany({
            where: { role: "USER"},
            select: { id: true, email: true, name: true, role: true }, // Avoid sending passwords
        });
        return NextResponse.json({ "message": "Fetch user data successfully!", "data": users});
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
  