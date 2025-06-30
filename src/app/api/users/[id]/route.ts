import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

type Params = Promise<{ id: string }>

// Delete category
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = await params;
        
        // First, check if the user exists and has role USER
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user || user.role !== "USER") {
            return NextResponse.json({ error: "User not found or not deletable" }, { status: 403 });
        }

        await prisma.user.delete({
            where: { id },
        });
  
        return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}