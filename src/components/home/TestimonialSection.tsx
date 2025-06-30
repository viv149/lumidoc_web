"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TestimonialCard from "../elements/TestimonialCard";

const TestimonialSection = () => {
    return (
        <section id="testimonials" className="section">
            <div className="container">
                <h4 className="title">What Our Clients Say</h4>
                <p className="text-declaration text-muted">Trusted by hospitals, clinics, and research institutions.</p>

                {/* Testimonials Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 2 }, // Show 2 testimonials on tablets
                        1024: { slidesPerView: 3 }, // Show 3 testimonials on desktops
                    }}
                    className="testimonial-slider"
                >
                    {testimonials.map((review) => (
                        <SwiperSlide key={review.id}>
                            <TestimonialCard review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Partnered Institutions */}
                <h5 className="sub-title mt-5">Our Partners</h5>
                <div className="partners-grid">
                    {partners.map((partner) => (
                        <div key={partner.id} className="partner-logo">
                            <Image src={partner.logo} alt={partner.name} width={120} height={60} unoptimized />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;

// Testimonial Data
const testimonials = [
    {
        id: 1,
        name: "Dr. Anjali Sharma",
        position: "Chief Surgeon, MedCare Hospital",
        review: "Lumidoc products are reliable and have significantly improved our operation efficiency.",
        image: "/assets/img/testimonials/testimonials-2.jpg",
    },
    {
        id: 2,
        name: "Dr. Rajesh Mehta",
        position: "Director, Apex Research Institute",
        review: "Their advanced technology solutions have enhanced our research capabilities.",
        image: "/assets/img/testimonials/testimonials-5.jpg",
    },
    {
        id: 3,
        name: "Dr. Kavita Das",
        position: "Head of Procurement, City Hospital",
        review: "Excellent quality and outstanding customer service!",
        image: "/assets/img/testimonials/testimonials-3.jpg",
    },
];

// Partnered Institutions
const partners = [
    { id: 1, name: "Apollo Hospitals", logo: "/assets/img/partners/apollo.jpg" },
    { id: 2, name: "Fortis Healthcare", logo: "/assets/img/partners/fortis.png" },
    { id: 3, name: "AIIMS", logo: "/assets/img/partners/aiims.jpg" },
    { id: 4, name: "Max Healthcare", logo: "/assets/img/partners/max.png" },
];
