// BlogPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../elements/BlogCard";
import BlogSidebar from "./BlogSidebar";

interface Blog {
    id: string;
    title: string;
    slug: string;
    image: string;
    description?: string;
    content: string;
    created_at: string;
    seoTitle?: string;
    seoDescription?: string;
}

const BLOGS_PER_PAGE = 6;

const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blogs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setBlogs(result.data || []);
                } else {
                    setError("Failed to load blogs");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Transform blog data for BlogCard component
    const transformedBlogs = blogs.map((blog, i) => ({
        id: blog.id,
        title: blog.title,
        image: blog.image,
        description: blog.description || blog.content.substring(0, 150) + "...",
        link: `/main/blog/${blog.slug}`,
        tag: i % 2 === 0 ? "Digital Transformation" : "Cloud Computing",
        date: i % 2 === 0 ? "December 15, 2024" : "December 10, 2024",
        readTime: i % 2 === 0 ? "6 min read" : "7 min read",
        author: i % 2 === 0 ? "Mike Davis" : "Emily Chen",
    }));

    // Pagination logic
    const totalPages = Math.ceil(transformedBlogs.length / BLOGS_PER_PAGE);
    const paginatedBlogs = transformedBlogs.slice((page - 1) * BLOGS_PER_PAGE, page * BLOGS_PER_PAGE);

    if (loading) {
        return (
            <div className="container my-5">
                <div className="text-center">
                    <div className="spinner-border text-green" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading blogs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="text-green text-center mb-4">Knowledge Hub</h2>
            {blogs.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted">No blogs available at the moment.</p>
                </div>
            ) : (
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="row">
                            {paginatedBlogs.map((blog, index) => (
                                <div className="col-md-6 mb-4" key={blog.id}>
                                    <BlogCard article={blog} />
                                </div>
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <nav className="d-flex justify-content-center mt-4">
                                <ul className="pagination">
                                    <li className={`page-item${page === 1 ? " disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>&laquo;</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i} className={`page-item${page === i + 1 ? " active" : ""}`}>
                                            <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item${page === totalPages ? " disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages}>&raquo;</button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        <BlogSidebar/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPage;
