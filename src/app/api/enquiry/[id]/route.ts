import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

type Params = Promise<{ id: string }>

// Delete category
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
      const { id } = await params;
  
      await prisma.productEnquiry.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Enquiry deleted successfully!" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
    }
}