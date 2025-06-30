import React from 'react';
import { Metadata } from 'next';
import prisma from '../../../../lib/prisma';
import { notFound } from 'next/navigation';
import BlogSidebar from '../../../../components/blog/BlogSidebar';
import SocialShare from '../../../../components/elements/SocialShare';
import FloatingShare from '../../../../components/elements/FloatingShare';
import { FaUser, FaCalendar, FaShare, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.description || blog.content.substring(0, 160),
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.description || blog.content.substring(0, 160),
      images: [blog.image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get the current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/main/blog/${slug}`;

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Back Button */}
            <div className="mb-4">
              <Link href="/main/blog" className="text-green fw-semibold d-inline-flex align-items-center gap-2 text-decoration-none">
                &#8592; Back to Blog
              </Link>
            </div>
            <article className="blog-post">
              {/* Header */}
              <header className="mb-4">
                <h1 className="display-5 fw-bold text-dark mb-3">{blog.title}</h1>
                
                {/* Meta Information */}
                <div className="blog-meta d-flex align-items-center mb-4">
                  <div className="author-info me-4">
                    <FaUser className="text-green me-2" />
                    <span className="text-muted">By <strong>Lumidoc Team</strong></span>
                  </div>
                  <div className="publish-date">
                    <FaCalendar className="text-green me-2" />
                    <span className="text-muted">{formatDate(typeof blog.created_at === 'string' ? blog.created_at : blog.created_at.toISOString())}</span>
                  </div>
                </div>

                {/* Featured Image */}
                {blog.image && (
                  <div className="blog-featured-image mb-4">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="img-fluid rounded shadow"
                      style={{ 
                        width: '100%', 
                        maxHeight: '500px', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                )}
              </header>

              {/* Description */}
              {blog.description && (
                <div className="blog-description mb-4">
                  <div className="lead text-muted fst-italic">
                    <p className="mb-0">{blog.description}</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="blog-content">
                <div 
                  className="blog-text"
                  style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8',
                    color: '#333'
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.content }} 
                />
              </div>

              

              {/* Footer */}
              <footer className="blog-footer mt-5 pt-4 border-top">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="blog-tags">
                    <span className="text-dark me-2">#Medical Equipment</span>
                    <span className="text-dark me-2">#Healthcare</span>
                    <span className="text-dark">#Technology</span>
                  </div>
                  <div className="blog-share">
                    <span className="text-muted me-2">Share:</span>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      className="text-decoration-none me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF className="text-green" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                      className="text-decoration-none me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="text-info" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blog.title)}`}
                      className="text-decoration-none me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn className="text-green" />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${blog.title}\n${blog.description || ''}\n${currentUrl}\n${blog.image || ''}`)}`}
                      className="text-decoration-none me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="text-success" />
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`${blog.description || ''}\n${currentUrl}\n${blog.image || ''}`)}`}
                      className="text-decoration-none"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEnvelope className="text-success" />
                    </a>
                  </div>
                </div>
              </footer>
            </article>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>

      
    </>
  );
}