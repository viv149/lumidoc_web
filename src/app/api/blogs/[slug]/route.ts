import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

type Params = Promise<{ slug: string }>

// Get single blog by slug
export async function GET(req: NextRequest, { params } : { params: Params}){
    try {
        const { slug } = await params;
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug,
            }
        });

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
            { success: false, message: "Failed to fetch blog details" },
            { status: 500 }
        );
    }
}

// Update a blog by slug
export async function PATCH(req: NextRequest, { params } : { params: Params}) {
    try {
        const { slug } = await params;
        const formData = await req.formData();

        const file: File | null = formData.get("image") as unknown as File;
        const title = formData.get("title") as string;
        const newSlug = formData.get("slug") as string;
        const content = formData.get("content") as string;
        const description = formData.get("description") as string;
        const seoTitle = formData.get("seoTitle") as string;
        const seoDescription = formData.get("seoDescription") as string;

        let imagePath = "";

        if (file && file.size > 0) {
            if (process.env.NODE_ENV === 'production') {
                const blob = await put(file.name, file, {
                    access: 'public',
                });
                imagePath = blob.url;
            } else {
                // Use local filesystem in development
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = uuidv4() + "_" + file.name;
                const filePath = path.join(process.cwd(), "public", "uploads/blog", filename);

                await writeFile(filePath, buffer);
                imagePath = "/uploads/blog/" + filename;
            }
        }

        const updatedBlog = await prisma.blog.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                content,
                description,
                seoTitle,
                seoDescription,
                ...(imagePath && { image: imagePath }),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update blog" },
            { status: 500 }
        );
    }
}

// Delete a blog by slug
export async function DELETE(req: NextRequest, { params } : { params : Params}) {
    try {
        const { slug } = await params;
        await prisma.blog.delete({
            where: { slug },
        });

        return NextResponse.json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("DELETE error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete blog" },
            { status: 500 }
        );
    }
} 