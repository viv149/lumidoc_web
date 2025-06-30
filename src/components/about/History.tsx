import Image from 'next/image'
import React from 'react'

export default function History() {
    return (
        <section className="company-history">
            <div className="container">
               
                <h2>Our Journey in the Medical Industry</h2>
                <div className="history-content">
                    <p>
                    Founded in 2010, Lumidoc has been at the forefront of medical technology, providing
                    hospitals and research institutions with reliable equipment. Our commitment to quality
                    and innovation has made us a trusted brand worldwide.
                    </p>
                    <Image src="/assets/img/about/history.png" alt="Company History" width={600} height={350} className="history-img" />
                </div>
            </div>
      </section>
    )
}
