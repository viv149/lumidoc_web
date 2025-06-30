"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {

    return (
    <div className="product-card bg-white">
        <div className="product-image">
            <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="product-img"
                unoptimized
            />
        </div>
        <div className="product-info">
            <h5 className="product-title text-green">{product.name}</h5>
            <p className="product-description">{product.description}</p>
            <div className="product-buttons">
                <Link href={`/main/product/${product.id}`} className="lm-btn lm-btn-green">
                    View Details
                </Link>
                <Link
                    href={`https://wa.me/919997872017?text=I'm interested in ${product.name}`}
                    target="_blank"
                    className="lm-btn lm-btn-white"
                >
                    Enquire Now
                </Link>
            </div>
        </div>
    </div>
    );
};

export default ProductCard;
