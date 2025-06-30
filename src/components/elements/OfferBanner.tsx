"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const OfferBanner = () => {
    return (
        <section className="offer-banner">
            <div className="container">
                <div className="offer-content">
                    {/* Left Side - Text Content */}
                    <div className="offer-text">
                        <h2>🔥 Limited Time Offer!</h2>
                        <p>
                            Purchase a <strong>Multi Parameter Monitor</strong> & get 
                            <span className=""> 20% OFF </span> on  
                            <strong> Surgical OT Lights</strong>! 🏥
                        </p>
                        <div className="offer-buttons">
                            <Link href="/products/multi-parameter-monitor" className="lm-btn lm-btn-green">
                                Grab the Deal
                            </Link>
                            <Link href="#contactSection" className="lm-btn lm-btn-white">
                                Enquire Now
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Product Image */}
                    <div className="offer-image">
                        <Image 
                            src="/assets/img/offer-banner.png" 
                            alt="Special Offer" 
                            width={450} 
                            height={280} 
                            className="floating-img"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferBanner;
