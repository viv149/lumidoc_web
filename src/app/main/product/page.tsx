import React from 'react';
import ProductListing from '../../../components/product/ProductListing';
import { Metadata } from 'next';

export const dynamic = "force-dynamic";
export const revalidate = 10;

async function getProductDetail() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/products`, {
        next: { 'revalidate': 10 }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch product details');
    }
    const data = await res.json();
    return data.data;
}

export const metadata: Metadata = {
    title: 'Product Page | Lumidoc Solutions',
    description: 'Explore our products with detailed specifications and features.',
    openGraph: {
        title: 'Product Page | Lumidoc Solutions',
        description: 'Explore our products with detailed specifications and features.',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/main/product`,
        type: 'website',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Product Page | Lumidoc',
            },
        ],
    },
    twitter: {
        title: 'Product Page | Lumidoc',
        description: 'Explore our products with detailed specifications and features.',
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/logo.png`],
    },
};

const Page = async() => {
    const response = await getProductDetail();

    console.log("Products:", response);

    return (
        <React.Fragment>
            <ProductListing products={response.products} category={response.category}/>
        </React.Fragment>
    );
}

export default Page;
