import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";



export async function GET() {
    const products = await prisma.websiteSettings.findMany();
    return NextResponse.json(products);
}
  
export async function POST(req: NextRequest) {
    const data = await req.json();
    const newProduct = await prisma.websiteSettings.create({ data });
    return NextResponse.json(newProduct, { status: 201 });
}