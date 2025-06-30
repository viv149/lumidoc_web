import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

type Params = Promise<{ id: string }>

// Update category
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json({ data: category, message: "Category updated successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// Delete category
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}