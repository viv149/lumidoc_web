import React from 'react';
import HeroSection from '../../../components/home/HeroSection';
import Category from '../../../components/home/Category';
import AboutSection from '../../../components/home/AboutSection';
import FeaturedProducts from '../../../components/home/FeatureProducts';
import WhyChoose from '../../../components/home/WhyChoose';
import TestimonialSection from '../../../components/home/TestimonialSection';
import OfferSection from '../../../components/home/OfferSection';
import BlogSection from '../../../components/home/BlogSection';
import ContactSection from '../../../components/home/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home | Lumidoc Solutions",
    description: "Welcome to Lumidoc, your trusted partner in digital solutions. Explore our range of products and services.",
    openGraph: {
        title: 'Home Page | Lumidoc Solutions',
        description: 'Welcome to Lumidoc, your trusted partner in digital solutions. Explore our range of products and services.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/main/home`,
        type: 'website',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Home Page | Lumidoc Solutions',
            },
        ],
    },
    twitter: {
        title: 'Home Page | Lumidoc',
        description: 'Welcome to Lumidoc, your trusted partner in digital solutions. Explore our range of products and services.',
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`],
    },
};



const Page = () => {
    return (
        <React.Fragment>
            <HeroSection/>
            <Category/>
            <AboutSection/>
            <FeaturedProducts/>
            <WhyChoose/>
            <TestimonialSection/>
            <OfferSection/>
            <BlogSection/>
            <ContactSection/>
        </React.Fragment>
    );
}

export default Page;
