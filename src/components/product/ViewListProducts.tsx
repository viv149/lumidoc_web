"use client"
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';




interface Product {
    id: string;
    categoryId: string;
    name: string;
    image: string;
    model: string;
    smallDesc: string;
    description: string;
    features: string;
    specifications: string;
    seoTitle: string;
    seoDescription: string;
}

const ViewListProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                const prodData = await response.json();
                setProducts(prodData.data.products || []);
            } else {
                toast.error("Failed to load products");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    


    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        console.log("dleelid",id);
        try {
            const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || "Product deleted");
                fetchProducts();
            } else {
                toast.error(result.error || "Failed to delete product");
            }
        } catch (error) {
            console.error("Failed to delete product", error);
            toast.error("Failed to delete");
        }
    };

    return (
        <React.Fragment>
            <Link href="/admin/products/add-product" className='btn btn-primary btn-sm mb-2'>Add Product</Link>
            <div className='container mt-3'>
                <div className="row ">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                            {loading ? (
                                <p className="text-center text-muted">Loading products data...</p>
                            ) : products.length === 0 ? (
                                <p className="text-center text-danger">No products found.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Model</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Image
                                                        src={product?.image}
                                                        alt={product.name}
                                                        width={80}
                                                        height={80}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.model}</td>
                                                <td>
                                                    <Link href={`/admin/products/update/${product.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                                                    <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ViewListProducts;
