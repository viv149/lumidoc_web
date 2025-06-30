import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
    return (
        <section id="about" className="section bg-light">
            <div className="container">
                {/* Section Title */}
                <div className="text-center mb-5">
                    <h4 className="title text-dark">About</h4>
                    <p className="text-declaration text-muted">Precision | Innovation | Reliability</p>
                </div>

                <div className="row align-items-center">
                    {/* Text Content */}
                    <div className="col-md-6">
                        <h4 className="text-primary-custom">Lumidoc Solutions</h4>
                        <p className="text-secondary">
                            At <strong>Lumidoc Solutions</strong>, we provide high-quality 
                            <span className="text-primary-custom fw-semibold"> medical and laboratory instruments </span> 
                            to support hospitals, research labs, and healthcare institutions. Our commitment to  <span className="text-primary-custom fw-semibold">precision, 
                            innovation, and reliability </span>ensures that professionals get the best tools for their work.
                        </p>
                        <p className="text-secondary">
                        Our goal is to bridge the gap between technology and healthcare by delivering solutions that enhance 
                        medical care, laboratory efficiency, and patient comfort.
                        </p>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-center">
                                <span className="check-icon">&#10004;</span>
                                <p className="mb-0 ms-2">High-Quality & Reliable Instruments</p>
                            </li>
                            <li className="d-flex align-items-center">
                                <span className="check-icon">&#10004;</span>
                                <p className="mb-0 ms-2">Cutting-Edge Medical Technology</p>
                            </li>
                            <li className="d-flex align-items-center">
                                <span className="check-icon">&#10004;</span>
                                <p className="mb-0 ms-2">Dedicated Customer Support</p>
                            </li>
                        </ul>
                        <Link href="/main/about" className="lm-btn lm-btn-green">Learn More</Link>
                    </div>

                    {/* Image Section */}
                    <div className="col-md-6 text-center">
                        <div className="about-image">
                            <Image 
                                src="/assets/img/about-us.jpg" 
                                alt="About Lumidoc Solutions" 
                                width={500} 
                                height={350} 
                                className="img-fluid rounded shadow"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
