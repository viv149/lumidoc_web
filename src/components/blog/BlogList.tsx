"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';




interface Blogs {
    id: string,
    title: string,
    slug: string,
    image: string,
    content: string;
    seoTitle: string;
    seoDescription: string;
}

const BlogList = () => {
    const [blogData, setBlogData] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchBlog = async () => {
        try {
            const response = await fetch("/api/blogs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                const resData = await response.json();
                setBlogData(resData.data || []);
            } else {
                toast.error("Failed to load blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);
    


    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        console.log("delete slug", slug);
        try {
            const response = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || "blog deleted");
                fetchBlog();
            } else {
                toast.error(result.error || "Failed to delete blog");
            }
        } catch (error) {
            console.error("Failed to delete blog", error);
            toast.error("Failed to delete");
        }
    };

    return (
        <React.Fragment>
            <Link href="/admin/blogs/add-blog" className='btn btn-primary btn-sm mb-2'>Add Blog</Link>
            <div className='container mt-3'>
                <div className="row ">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                            {loading ? (
                                <p className="text-center text-muted">Loading blogs data...</p>
                            ) : blogData.length === 0 ? (
                                <p className="text-center text-danger">No blogs found.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Blog Tilte</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {blogData.map((blog, index) => (
                                            <tr key={blog.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Image
                                                        src={blog?.image}
                                                        alt={blog.title}
                                                        width={80}
                                                        height={80}
                                                    />
                                                </td>
                                                <td>{blog.title}</td>
                                                <td>
                                                    <Link href={`/admin/blogs/${blog.slug}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                                    <button onClick={() => handleDelete(blog.slug)} className="btn btn-danger btn-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BlogList;
