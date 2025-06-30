"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogCard from "../elements/BlogCard";

interface Blog {
    id: string;
    title: string;
    slug: string;
    image: string;
    description?: string;
    content: string;
    created_at: string;
}

const BlogSection = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
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
                    // Get latest 3 blogs
                    const latestBlogs = result.data?.slice(0, 3) || [];
                    setBlogs(latestBlogs);
                } else {
                    console.error("Failed to load blogs");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
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

    if (loading) {
        return (
            <section id="blogSection" className="section">
                <div className="container">
                    <h4 className="title">Knowledge Hub</h4>
                    <p className="text-declaration text-muted">Latest insights on medical technologies & best practices.</p>
                    <div className="text-center">
                        <div className="spinner-border text-green" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="blogSection" className="section">
            <div className="container">
                <h4 className="title">Knowledge Hub</h4>
                <p className="text-declaration text-muted">Latest insights on medical technologies & best practices.</p>

                {transformedBlogs.length === 0 ? (
                    <div className="text-center">
                        <p className="text-muted">No blogs available at the moment.</p>
                    </div>
                ) : (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            768: { slidesPerView: 2 }, // Show 2 articles on tablets
                            1024: { slidesPerView: 3 }, // Show 3 articles on desktops
                        }}
                        className="blog-slider"
                    >
                        {transformedBlogs.map((article) => (
                            <SwiperSlide key={article.id}>
                                <BlogCard article={article} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
