import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";



export async function GET(){
    try{
        const contactMessage =  await prisma.contactMessage.findMany({
            orderBy: { created_at: 'desc' }
        });

        return NextResponse.json({ 
            success: true, 
            data: contactMessage, 
            message: "Contact message fetch successfully!", 
            status: 200 
        });
    } catch(error){
        return NextResponse.json(
            { success: false, message: "Failed to fetch contact messages" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, message } = await req.json();
    
        // Basic validation
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }
    
        const newMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        });
    
        return NextResponse.json(
            { success: true, message: "Message sent successfully", data: newMessage },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to submit contact message" },
            { status: 500 }
        );
    }
}
  