// ContactPage.tsx
"use client";
import React from "react";
import Link from "next/link";
import ContactForm from "../elements/ContactForm";

const ContactPage = () => {
    return (
        <div className="container my-5">
        <h2 className="text-center text-green mb-4">Contact Us</h2>
        <div className="row">
            <div className="col-md-6">
            <ContactForm/>
            </div>
            <div className="col-md-6">
            <h5>Office Location</h5>
            <p>123 Medical Street, Agra, India</p>
            <h5>Working Hours</h5>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat: 10:00 AM - 4:00 PM</p>
            <h5>Contact Us</h5>
            <p>Phone: +91 9876543210</p>
            <Link href="https://wa.me/919876543210" className="btn btn-success me-2">Chat on WhatsApp</Link>
            <a href="tel:+919876543210" className="btn btn-outline-dark">Call Us</a>
            </div>
        </div>
        </div>
    );
};

export default ContactPage;