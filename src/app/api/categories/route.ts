// app/api/categories/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


// Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// Create new category
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const category = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json({ data: category, message: "Category created successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
