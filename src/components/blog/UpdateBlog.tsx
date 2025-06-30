'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { slugify } from '../../utils/slugify';

interface Blog {
    id: string;
    title: string;
    slug: string;
    image: string;
    content: string;
    description?: string;
    seoTitle?: string;
    seoDescription?: string;
}

interface Props {
    blog: Blog;
}

const UpdateBlogForm = ({ blog }: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Blog>({
        defaultValues: blog,
    });

    // Watch title to auto-generate slug
    const title = watch("title");
    
    // Auto-generate slug when title changes
    useEffect(() => {
        if (title) {
            const slug = slugify(title);
            setValue("slug", slug);
        }
    }, [title, setValue]);

    const onSubmit = async (data: Blog) => {
        const formData = new FormData();
        const imageFile = (data.image as unknown as FileList)?.[0];

        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('description', data.description || '');
        formData.append('seoTitle', data.seoTitle || '');
        formData.append('seoDescription', data.seoDescription || '');

        if (imageFile) {
        formData.append('image', imageFile);
        }

        setLoading(true);
        try {
        const res = await fetch(`/api/blogs/${blog.slug}`, {
            method: 'PATCH',
            body: formData,
        });

        const result = await res.json();
        if (result.success) {
            toast.success(result.message);
            router.push('/admin/blogs');
        } else {
            toast.error(result.message || 'Failed to update blog');
        }
        } catch (error: any) {
        console.error('Update failed:', error);
        toast.error(error.message || 'Something went wrong');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">Update Blog</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Title */}
                            <div className="mb-3">
                            <label className="form-label">
                                Blog Title <span className="text-danger">*</span>
                            </label>
                            <input className="form-control" {...register('title', { required: 'Title is required' })} />
                            {errors.title && <small className="text-danger">{errors.title.message}</small>}
                            </div>

                            {/* Slug */}
                            <div className="mb-3">
                            <label className="form-label">
                                Slug <span className="text-danger">*</span>
                            </label>
                            <input 
                                className="form-control" 
                                {...register('slug', { required: 'Slug is required' })} 
                                placeholder="Auto-generated from blog title"
                                disabled
                            />
                            {errors.slug && <small className="text-danger">{errors.slug.message}</small>}
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                            <label className="form-label">
                                Description <span className="text-muted">(Optional)</span>
                            </label>
                            <textarea
                                rows={3}
                                className="form-control"
                                {...register('description')}
                                placeholder="Enter blog description"
                            ></textarea>
                            {errors.description && <small className="text-danger">{errors.description.message}</small>}
                            </div>

                            {/* Image */}
                            <div className="mb-3">
                            <label className="form-label">
                                Blog Image <span className="text-muted">(Optional)</span>
                            </label>
                            <input type="file" className="form-control" {...register('image')} />
                            </div>
                            <div className="mb-3 text-center">
                            <Image src={blog?.image} alt={blog?.title} width={150} height={100} />
                            </div>

                            {/* Content */}
                            <div className="mb-3">
                            <label className="form-label">
                                Content <span className="text-danger">*</span>
                            </label>
                            <textarea
                                rows={5}
                                className="form-control"
                                {...register('content', { required: 'Content is required' })}
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
                                    className="form-control" 
                                    {...register('seoTitle')} 
                                    placeholder="Enter SEO title"
                                />
                            </div>

                            {/* SEO Description */}
                            <div className="mb-3">
                                <label className="form-label">
                                    SEO Description <span className="text-muted">(Optional)</span>
                                </label>
                                <textarea
                                    rows={2}
                                    className="form-control"
                                    {...register('seoDescription')}
                                    placeholder="Enter SEO description"
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <button type="submit" className="btn btn-success me-3" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Blog'}
                            </button>
                            <Link href="/admin/blogs" className="btn btn-outline-dark">Cancel</Link>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlogForm;
