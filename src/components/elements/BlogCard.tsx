import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaShareAlt } from "react-icons/fa";

interface BlogCardProps {
  article: {
    id: string;
    title: string;
    image: string;
    description: string;
    link: string;
    tag?: string;
    date?: string;
    readTime?: string;
    author?: string;
  };
}

function getInitials(name: string) {
  if (!name) return "AU";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  const [showShare, setShowShare] = useState(false);
  // Mock/fallbacks for missing fields
  const tag = article.tag || "Digital Transformation";
  const date = article.date || "December 15, 2024";
  const readTime = article.readTime || "6 min read";
  const author = article.author || "Mike Davis";
  const initials = getInitials(author);
  const url = typeof window !== 'undefined' ? window.location.origin + article.link : article.link;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url,
      });
    } else {
      setShowShare(true);
      setTimeout(() => setShowShare(false), 2000);
    }
  };

  return (
    <div className="blog-card-new rounded-4 shadow-sm bg-white h-100 d-flex flex-column">
      <div className="blog-card-img-wrapper rounded-top-4 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={400}
          height={180}
          className="w-100 object-fit-cover"
          style={{ minHeight: 180, maxHeight: 180 }}
        />
      </div>
      <div className="blog-card-body flex-grow-1 d-flex flex-column p-4">
        {/* Tag, Date, Read Time */}
        <div className="d-flex align-items-center mb-2 gap-2 flex-wrap">
          <span className="badge bg-green text-white fw-semibold px-3 py-2 rounded-pill small">
            {tag}
          </span>
          <span className="text-muted small">{date}</span>
          <span className="text-muted small">{readTime}</span>
        </div>
        {/* Title */}
        <h5 className="fw-bold text-dark mb-2 blog-card-title-small">{article.title}</h5>
        {/* Description */}
        <p className="text-muted mb-3 flex-grow-1 blog-card-desc-small">{article.description}</p>
        {/* Author and Read More */}
        <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
          <div className="d-flex align-items-center gap-2">
            <span className="rounded-circle bg-green text-white d-inline-flex align-items-center justify-content-center" style={{ width: 32, height: 32, fontWeight: 600, fontSize: 14 }}>
              {initials}
            </span>
            <span className="text-muted small fw-semibold">{author}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Link href={article.link} className="text-green fw-semibold d-flex align-items-center gap-1 text-decoration-none small">
              Read More <FaArrowRight />
            </Link>
            <button className="btn btn-sm btn-light rounded-circle border-0 ms-1" title="Share" onClick={handleShare}>
              <FaShareAlt className="text-white" />
            </button>
            {showShare && (
              <span className="ms-2 text-success small">Link copied!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
