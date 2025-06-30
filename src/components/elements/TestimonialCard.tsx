import React from "react";
import Image from "next/image";

const TestimonialCard = ({ review }: { review: { name: string; position: string; review: string; image: string } }) => {
    return (
        <div className="testimonial-card">
            <div className="testimonial-content">
                <p className="testimonial-text">&quot;{review.review}&quot;</p>
            </div>
            <div className="testimonial-author">
                <Image src={review.image} alt={review.name} width={50} height={50} className="author-img" unoptimized />
                <div>
                    <h5 className="author-name">{review.name}</h5>
                    <p className="author-position">{review.position}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
