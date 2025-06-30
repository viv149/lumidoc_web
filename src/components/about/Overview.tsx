"use client"
import Image from 'next/image'
import React from 'react'

export default function Overview() {
    return (
        <section className="about-overview">
            <div className="container">
                <h2>Our Mission, Vision & Values</h2>
                <div className="overview-grid">
                    <div className="overview-card">
                        <Image src="/assets/img/icons/mission.png" alt="Mission" width={60} height={60} unoptimized/>
                        <h3>Our Mission</h3>
                        <p>To provide high-quality medical solutions that improve healthcare efficiency.</p>
                    </div>
                    <div className="overview-card">
                        <Image src="/assets/img/icons/vission.png" alt="Vision" width={60} height={60} unoptimized/>
                        <h3>Our Vision</h3>
                        <p>To be the most trusted name in medical and laboratory equipment.</p>
                    </div>
                    <div className="overview-card">
                        <Image src="/assets/img/icons/values.png" alt="Values" width={60} height={60} unoptimized/>
                        <h3>Our Values</h3>
                        <p>Quality, Innovation, and Customer Satisfaction are at our core.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
