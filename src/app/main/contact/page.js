import React from 'react';
import ContactSection from '../../../components/home/ContactSection';

export const metadata = {
    title: "Contact | Lumidoc Solutions",
    description: "Get in touch with Lumidoc for inquiries, support, and collaborations. We are here to help you with your digital solutions.",
    openGraph: {
        title: 'Contact Page | Lumidoc Solutions',
        description: 'Get in touch with Lumidoc for inquiries, support, and collaborations. We are here to help you with your digital solutions.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/main/contact`,
        type: 'website',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Contact Page | Lumidoc Solutions',
            },
        ],
    },
    twitter: {
        title: 'Contact Page | Lumidoc',
        description: 'Get in touch with Lumidoc for inquiries, support, and collaborations. We are here to help you with your digital solutions.',
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`],
    },
};

export default function page() {
    return (
        <React.Fragment>
            <ContactSection/>
        </React.Fragment>
    )
}
