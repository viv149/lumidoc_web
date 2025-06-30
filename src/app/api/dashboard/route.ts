import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";



export async function GET(req: NextRequest) {
    try{
        const user = await prisma.user.count({
            where: { role: "USER"},
        });
        const userCount = user;
        const productCount = await prisma.product.count();
        const enquiryCount = await prisma.productEnquiry.count();
        const contactMessageCount = await prisma.contactMessage.count();

        return NextResponse.json({
            status: 200,
            data: {
                totalUsers: userCount,
                totalProducts: productCount,
                totalProductEnquiries: enquiryCount,
                totalContactMessages: contactMessageCount,
            },
        })
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
