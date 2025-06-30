import Link from 'next/link'
import React from 'react'
import ContactForm from '../elements/ContactForm'
import Image from 'next/image'

export default function AboutContactSection() {
    return (
        <section className="contact-cta">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="contact-image">
                            <Image 
                                src="/assets/img/about/Contact.png" 
                                alt="Get in Touch with Lumidoc"
                                width={500} 
                                height={400} 
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <h2>Get in Touch</h2>
                        <p>Have a question? Reach out to us today!</p>
                        <ContactForm />
                        <Link href="https://wa.me/yourwhatsappnumber" className="whatsapp-btn">Chat on WhatsApp</Link>
                    </div>
                </div>
            </div>
      </section>
    )
}
