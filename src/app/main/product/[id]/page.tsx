import React from 'react';
import ProductDetailPage from '../../../../components/product/ProductDetail';
import type { Metadata } from 'next';

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

const products = [
    {
        id: "1",
        slug: "multi-parameter-monitor",
        image: "/assets/img/products/prod-1.png"
    },
    {
        id: "2",
        slug: "semi-fowler-bed-ss-panel",
        image: "/assets/img/products/prod-2.jpg"
    },
    {
        id: "3",
        slug: "surgical-ot-light",
        image: "/assets/img/products/prod-3.jpg"
    },
    {
        id: "4",
        slug: "cooker-type-autoclave-single",
        image: "/assets/img/products/prod-4.jpg"
    }
];

async function getProductDetail(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/products/${id}`, {
        next: { revalidate: 10 } // Always get fresh data
    });
    if (!res.ok) {
        throw new Error('Failed to fetch product details');
    }
    const data = await res.json();
    return data.data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    let product: any = null;
    try {
        const response = await getProductDetail(id);
        product = response?.product; // Assuming your API returns { success, data }
    } catch (error) {
        console.error('Metadata fetch error:', error);
    }

    const imageUrl = product?.image 
        ? `${process.env.NEXT_PUBLIC_LOCAL_URL}${product.image}` 
        : `${process.env.NEXT_PUBLIC_LOCAL_URL}/assets/img/logo.png`;

    return {
        title: `Product Detail | ${product?.name} | Lumidoc Solutions`,
        description: `Explore detailed information about ${product?.name} at Lumidoc Solutions.`,
        openGraph: {
            title: `Product Detail | ${product?.name} | Lumidoc Solutions`,
            description: `Explore detailed information about ${product?.name} at Lumidoc Solutions.`,
            url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/main/product/${product?.name}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Product Detail | ${product?.name} | Lumidoc Solutions`,
                },
            ],
        },
        twitter: {
            title: `Product Detail | ${product?.name} | Lumidoc`,
            description: `Explore detailed information about ${product?.name} at Lumidoc Solutions.`,
            images: [imageUrl],
        },
    };
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const response = await getProductDetail(id);
    return (
        <React.Fragment>
            <ProductDetailPage category={response?.category?.name} product={response?.product} />
        </React.Fragment>
    );
}

export default Page;
