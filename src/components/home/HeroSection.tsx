import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
    return (
        <section className="py-3 text-center text-white d-flex align-items-center" >
            <div className="container">
                <div className="banner">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h3 className="display-4 fw-bold">Premium Medical & Lab Instruments</h3>
                            <p className="lead">Providing high-quality healthcare solutions for hospitals and labs.</p>
                            <Link href="#categorySection" className="lm-btn lm-btn-white mt-3">Explore our products</Link>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="hero-img">
                                <Image
                                    src="/assets/img/ot-light.png"
                                    width={181}
                                    height={100}
                                    alt="hero image"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
