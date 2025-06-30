"use client";
import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import ContactForm from "../elements/ContactForm";

const ContactSection = () => {
    return (
        <section id="contactSection" className="section">
            <div className="container">
                <h4 className="title">Contact Us</h4>
                <p className="text-declaration text-muted">We&apos;re here to assist you. Reach out to us anytime!</p>

                {/* Contact Form */}
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h5 className="contact-heading">Request a Callback</h5>
                        <p>Fill out the form and our team will contact you shortly.</p>

                        <div className="contact-details">
                            <Link href="tel:+919997872017" className="contact-link">
                                <FaPhoneAlt /> +91 9997872017
                            </Link>
                            <Link href="https://wa.me/9997872017" target="_blank" className="contact-link">
                                <FaWhatsapp /> Chat on WhatsApp
                            </Link>
                        </div>
                    </div>

                    <ContactForm />
                </div>
            </div>

            {/* Sticky WhatsApp Button */}
            <Link href="https://wa.me/919997872017" target="_blank" className="whatsapp-sticky">
                <FaWhatsapp />
            </Link>
        </section>
    );
};

export default ContactSection;
