import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";

type Params = Promise<{ id: string }>

// Get single product 
export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = await params;

        const product = await prisma.product.findUnique({
            where: {
                id: id,
            }
        });

        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: product.categoryId,
            }
        });

        return NextResponse.json({
            success: true,
            status: 200,
            data: {
                category: category,
                product: product,
            },
        });
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch product details" },
            { status: 500 }
        );
    }
}


// Update a product by ID
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = await params;
        const formData = await req.formData();

        const file: File | null = formData.get("image") as unknown as File;
        const productName = formData.get("name") as string;
        const categoryId = formData.get("categoryId") as string;
        const model = formData.get("model") as string;
        const price = parseInt(formData.get("price") as string, 10);
        const smallDesc = formData.get("smallDesc") as string;
        const description = formData.get("description") as string;
        const features = formData.get("features") as string;
        const specifications = formData.get("specifications") as string;
        const seoTitle = formData.get("seoTitle") as string;
        const seoDescription = formData.get("seoDescription") as string;

        let imagePath = "";

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = uuidv4() + "_" + file.name;
            const filePath = path.join(process.cwd(), "public", "uploads/products", filename);

            await writeFile(filePath, buffer);
            imagePath = "/uploads/products/" + filename;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                categoryId,
                name: productName,
                model,
                price,
                smallDesc,
                description,
                features,
                specifications,
                seoTitle,
                seoDescription,
                ...(imagePath && { image: imagePath }),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update product" },
            { status: 500 }
        );
    }
}

  
// Delete a product by ID
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id },
        });
    
        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { error: false, message: "Failed to delete product" },
            { status: 500 }
        );
    }
}