"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../elements/ProductCard";

interface Product {
    id: string;
    name: string;
    image: string;
    description?: string;
    smallDesc?: string;
    slug: string;
}

const NewArrivals = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    // Get latest 2 products
                    const latestProducts = result.data?.slice(0, 2) || [];
                    setProducts(latestProducts);
                } else {
                    console.error("Failed to load products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <h4 className="title">New Arrivals</h4>
                    <p className="text-declaration text-muted">
                        Check out our latest medical products.
                    </p>
                    <div className="text-center">
                        <div className="spinner-border text-green" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <h4 className="title">New Arrivals</h4>
                <p className="text-declaration text-muted">
                    Check out our latest medical products.
                </p>

                {products.length === 0 ? (
                    <div className="text-center">
                        <p className="text-muted">No products available at the moment.</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    image: product.image,
                                    description: product.description || product.smallDesc || "",
                                }} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
