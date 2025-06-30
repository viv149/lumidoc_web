import React from 'react';
import BlogPage from '../../../components/blog/BlogPage';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Blog Page | Lumidoc Solutions",
    description: "Explore the latest news, updates, and insights from Lumidoc Solutions. Stay informed with our blog articles.",
    openGraph: {
        title: 'Blog Page | Lumidoc Solutions',
        description: 'Explore the latest news, updates, and insights from Lumidoc Solutions. Stay informed with our blog articles.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/main/blog`,
        type: 'website',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Blog Page | Lumidoc Solutions',
            },
        ],
    },
    twitter: {
        title: 'Blog Page | Lumidoc',
        description: 'Explore the latest news, updates, and insights from Lumidoc Solutions. Stay informed with our blog articles.',
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`],
    },
};


const Page = () => {
    return (
        <React.Fragment>
            <BlogPage/>
        </React.Fragment>
    );
}

export default Page;
