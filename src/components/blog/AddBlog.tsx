"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { slugify } from '../../utils/slugify';

interface BlogFormValues {
    title: string;
    slug: string;
    image: string;
    content: string;
    description?: string;
    seoTitle?: string;
    seoDescription?: string;
}

const AddBlog = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<BlogFormValues>();

    // Watch title to auto-generate slug
    const title = watch("title");
    
    // Auto-generate slug when title changes
    useEffect(() => {
        if (title) {
            const slug = slugify(title);
            setValue("slug", slug);
        }
    }, [title, setValue]);

    const onSubmit = async (data: BlogFormValues) => {
        const formData = new FormData();
        const imageFile = (data.image as unknown as FileList)[0];

        // Split features and specifications by line break into arrays

        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("content", data.content);
        formData.append("description", data.description || "");
        formData.append("seoTitle", data.seoTitle || "");
        formData.append("seoDescription", data.seoDescription || "");
        formData.append("image", imageFile);

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                body: formData,
            });
    
            if (res.ok) {
                const result = await res.json();
                console.log("Success:", result);
                toast.success("blog added successfully!");
                reset();
            } else {
                console.error("Upload failed");
                toast.error("Upload Failed!");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            toast.error(err);
        }
       
    };



    return (
        <React.Fragment>
            <Link href="/admin/blogs" className='btn btn-secondary btn-sm mb-2'>View Blogs</Link>
            <div className='container mt-4'>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    
                                    {/* blog Name */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Blog Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("title", { required: "Blog title is required" })}
                                        />
                                        {errors.title && <small className="text-danger">{errors.title.message}</small>}
                                    </div>

                                    {/* Slug */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Slug <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("slug", { required: "Slug is required" })}
                                            disabled
                                            placeholder="Auto-generated from blog title"
                                        />
                                        {errors.slug && <small className="text-danger">{errors.slug.message}</small>}
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            {...register("description")}
                                            placeholder="Enter blog description"
                                        ></textarea>
                                        {errors.description && <small className="text-danger">{errors.description.message}</small>}
                                    </div>

                                    {/* blog Image */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Blog Image <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            {...register("image", { required: "Blog Image is required" })}
                                        />
                                        {errors.image && <small className="text-danger">{errors.image.message}</small>}
                                    </div>

                                    {/* Content */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Content <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={5}
                                            {...register("content", { required: "Content is required" })}
                                            placeholder="Enter blog content"
                                        ></textarea>
                                        {errors.content && <small className="text-danger">{errors.content.message}</small>}
                                    </div>

                                    {/* SEO Title */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            SEO Title <span className="text-muted">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("seoTitle")}
                                            placeholder="Enter SEO title"
                                        />
                                    </div>

                                    {/* SEO Description */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            SEO Description <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={2}
                                            {...register("seoDescription")}
                                            placeholder="Enter SEO description"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100">Add blog</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddBlog;
