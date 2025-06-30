
import React from 'react'
import AboutHeroSection from '../../../components/about/AboutHeroSection'
import Overview from '../../../components/about/Overview'
import History from '../../../components/about/History'
import TestimonialSection from '../../../components/home/TestimonialSection'
import AboutContactSection from '../../../components/about/AboutContactSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About Page | Lumidoc Solutions",
    description: "Learn more about Lumidoc Solutions, our mission, vision, and the team behind our innovative digital solutions.",
    openGraph: {
        title: 'About Page | Lumidoc Solutions',
        description: 'Learn more about Lumidoc Solutions, our mission, vision, and the team behind our innovative digital solutions.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/main/about`,
        type: 'website',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`,
                width: 1200,
                height: 630,
                alt: 'About Page | Lumidoc Solutions',
            },
        ],
    },
    twitter: {
        title: 'About Page | Lumidoc',
        description: 'Learn more about Lumidoc Solutions, our mission, vision, and the team behind our innovative digital solutions.',
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`],
    },
};

export default function page() {
    return (
        <React.Fragment>
            <div className="about-page">
                <AboutHeroSection/>

                <Overview/>

                <History/>


                <TestimonialSection/>

                <AboutContactSection/>
            </div>
        </React.Fragment>
    )
}
