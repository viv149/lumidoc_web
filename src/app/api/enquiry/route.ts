import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const bcrypt = require("bcrypt");


export async function GET() {
    try {
        const productEnquiries = await prisma.productEnquiry.findMany({
            include: {
            product: true,
            },
        });
  
        return NextResponse.json({
            status: 200,
            data: productEnquiries,
        });
    } catch (error) {
        console.error("🔥 Prisma Error:", JSON.stringify(error, null, 2)); // Add this for better insight
        return NextResponse.json(
            { message: "Failed to fetch product enquiries", error },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { productId, model, name, email, contact, message } = await req.json();
    
        const enquiry = await prisma.productEnquiry.create({
            data: {
                productId,
                model,
                name,
                email,
                contact,
                message,
            },
        });
        
        // 2. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        const hashedPassword = await bcrypt.hash("password", 10);
        // 3. If not, create user
        if (!existingUser) {
            await prisma.user.create({
            data: {
                role: 'USER',
                name,
                email,
                password: hashedPassword
            },
            });
        }

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Your enquiry sent successfully, they will contact you shortly!",
            data: enquiry,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
            success: false,
            message: "Failed to create enquiry",
            error: error.message,
            },
            { status: 500 }
        );
    }
  }
  
  