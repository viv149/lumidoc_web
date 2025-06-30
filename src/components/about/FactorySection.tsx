import Image from 'next/image'
import React from 'react'

export default function FactorySection() {
    return (
        <section className="team-factory">
            <div className="container">
                <h2>Meet Our Team & Explore Our Factory</h2>
                <div className="team-images">
                    <Image src="/assets/img/about/team.png" alt="Our Team" width={350} height={250} />
                    <Image src="/assets/img/about/factory.jpg" alt="Factory" width={350} height={250} />
                </div>
            </div>
      </section>
    )
}
