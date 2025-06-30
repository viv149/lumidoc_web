import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";



// GET all products & POST a new product
export async function GET() {
    const products = await prisma.product.findMany();
    const category = await prisma.category.findMany();
    return NextResponse.json({
        status: 200, 
        data: {
            category: category,
            products: products 
        },
    });
}
  
export async function POST(req: NextRequest) {
    try{
        const formData = await req.formData();

        const file: File | null = formData.get("image") as File;
        const productName = formData.get("productName") as string;
        const slug = formData.get("slug") as string;
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

        const newProduct = await prisma.product.create({
            data: {
                categoryId,
                name: productName,
                slug, // Temporarily commented out until Prisma client is regenerated
                model,
                price,
                smallDesc,
                description,
                features,
                specifications,
                seoTitle,
                seoDescription,
                image: imagePath,
            },
        });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "Product created successfully!",
            data: newProduct,
        });
    }catch(error: any){
        console.error("Image Upload Error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to upload image and create product",
            error: error.message,
        }, { status: 500 });
    }
}
  