import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "../../../lib/prisma";

export async function GET(){
    try {
        const blog = await prisma.blog.findMany();
  
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }
  
        return NextResponse.json({
          success: true,
          status: 200,
          data: blog,
          message: "Fetch blog successfully!"
        });
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
  
        const file: File | null = formData.get("image") as unknown as File;
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const content = formData.get("content") as string;
        const description = formData.get("description") as string;
        const seoTitle = formData.get("seoTitle") as string;
        const seoDescription = formData.get("seoDescription") as string;
        
        let imagePath = "";
        
        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = uuidv4() + "_" + file.name;
            const filePath = path.join(process.cwd(), "public", "uploads/blog", filename);
            
            await writeFile(filePath, buffer);
            imagePath = "/uploads/blog/" + filename;
        }
        const createBlog = await prisma.blog.create({
            data: {
                title,
                slug,
                content,
                description,
                seoTitle,
                seoDescription,
                ...(imagePath && { image: imagePath }),
            },
        });
        
        return NextResponse.json({
            success: true,
            message: "Blog create successfully",
            data: createBlog,
        });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create blog" },
            { status: 500 }
        );
    }
}