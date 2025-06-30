"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Logo & Description */}
                    <div className="footer-logo">
                        <Image src="/assets/img/logo-green.png" alt="Lumidoc Logo" width={300} height={70} />
                        <p>Providing high-quality medical & lab equipment with advanced technology.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h5>Quick Links</h5>
                        <ul>
                            <li><Link href="/main/home">Home</Link></li>
                            <li><Link href="/main/about">About</Link></li>
                            <li><Link href="/main/blog">Blog</Link></li>
                            <li><Link href="/main/contact">Contact</Link></li>
                            <li><Link href="/main/product">Products</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="footer-social">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

                {/* Copyright & Privacy Policy */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Lumidoc. All Rights Reserved.</p>
                    <div className="">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
