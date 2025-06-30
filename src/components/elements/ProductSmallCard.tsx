import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const ProductSmallCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div className="card product-card shadow-sm">
        {/* Product Image */}
        <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="card-img-top"
            unoptimized
        />

        {/* Product Info */}
        <div className="card-body p-0">
            <h5 className="card-title text-green">{product.name}</h5>
            <p className="card-text text-muted">{product.description}</p>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
                <Link href={`/main/product/${product.id}`} className="btn btn-outline-dark btn-sm">
                    View Details
                </Link>
                <Link
                    href={`https://wa.me/919997872017?text=I'm interested in ${product.name}`}
                    className="btn btn-success btn-sm"
                    target="_blank"
                >
                    Enquire Now
                </Link>
            </div>
        </div>
    </div>
  );
};

export default ProductSmallCard;
