"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaClock, FaTags } from "react-icons/fa";

interface Blog {
    id: string;
    title: string;
    slug: string;
    image: string;
    description?: string;
    created_at: string;
    tags?: string[];
}

const BlogSidebar = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

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
                    const allBlogs = result.data || [];
                    // Get latest 5 blogs
                    const latestBlogs = allBlogs
                        .sort((a: Blog, b: Blog) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 5);
                    setBlogs(latestBlogs);
                    setFilteredBlogs(latestBlogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredBlogs(filtered);
        }
    }, [searchTerm, blogs]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Sample tags - you can make this dynamic based on your blog data
    const popularTags = [
        'Medical Equipment',
        'Healthcare',
        'Technology',
        'Research',
        'Innovation',
        'Patient Care',
        'Diagnostics',
        'Treatment'
    ];

    return (
        <div className="blog-sidebar">
            {/* Search Section */}
            <div className="search-section mb-4">
                <h5 className="text-dark mb-3">
                    <FaSearch className="text-green me-2" />
                    Search Blog
                </h5>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search articles..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" type="button">
                        <FaSearch />
                    </button>
                </div>
            </div>

            {/* Latest Blogs Section */}
            <div className="latest-blogs-section mb-4">
                <h5 className="text-dark mb-3">
                    <FaClock className="text-green me-2" />
                    Latest Articles
                </h5>
                
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border spinner-border-sm text-green" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center text-muted">
                        <p className="mb-0">No articles found</p>
                    </div>
                ) : (
                    <div className="latest-blogs-list">
                        {filteredBlogs.map((blog) => (
                            <div className="recent-blog-item mb-3 p-3 border rounded" key={blog.id}>
                                <div className="d-flex">
                                    <div className="blog-thumbnail me-3">
                                        <Image 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            width={80} 
                                            height={60} 
                                            className="rounded"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="blog-info flex-grow-1">
                                        <Link 
                                            href={`/main/blog/${blog.slug}`}
                                            className="text-decoration-none"
                                        >
                                            <h6 className="blog-title mb-1 text-dark hover-primary">
                                                {blog.title}
                                            </h6>
                                        </Link>
                                        <small className="text-muted">
                                            <FaClock className="me-1" />
                                            {formatDate(blog.created_at)}
                                        </small>
                                        {blog.description && (
                                            <p className="blog-excerpt mb-0 mt-1 text-muted small">
                                                {blog.description.substring(0, 60)}...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Popular Tags Section */}
            <div className="tags-section mb-4">
                <h5 className="text-dark mb-3">
                    <FaTags className="text-green me-2" />
                    Popular Tags
                </h5>
                <div className="tags-list d-flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                        <Link 
                            href={`/main/blog?tag=${encodeURIComponent(tag)}`}
                            key={index}
                            className="text-decoration-none"
                        >
                            <span className="text-dark">
                                #{tag}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;