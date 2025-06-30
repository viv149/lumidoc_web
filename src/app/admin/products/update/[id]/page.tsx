import { notFound } from 'next/navigation';
import React from 'react';
import UpdateProductForm from '../../../../../components/product/UpdateProductForm';

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/products/${id}`, {
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        return notFound(); // Correct usage
    }

    const data = await res.json();
    const product = data.data?.product;

    return (
        <React.Fragment>
            <UpdateProductForm product={product} />
        </React.Fragment>
    );
};

export default Page;
