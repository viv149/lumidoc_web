"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { slugify } from '../../utils/slugify';


interface Category {
    id: string;
    name: string;
}

interface ProductFormValues {
    categoryId: string;
    productName: string;
    slug: string;
    image: string,
    model: string;
    price: number;
    smallDesc: string;
    description?: string;
    features?: string;
    specifications?: string;
    seoTitle?: string;
    seoDescription?: string;
}

const AddProducts = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<ProductFormValues>();

    // Watch product name to auto-generate slug
    const productName = watch("productName");
    
    // Auto-generate slug when product name changes
    useEffect(() => {
        if (productName) {
            const slug = slugify(productName);
            setValue("slug", slug);
        }
    }, [productName, setValue]);

    const onSubmit = async (data: ProductFormValues) => {
        const formData = new FormData();
        const imageFile = (data.image as unknown as FileList)[0];

        // Split features and specifications by line break into arrays
        const featuresArray = data.features?.split('\n').map(item => item.trim()).filter(item => item) || [];
        const specificationsArray = data.specifications?.split('\n').map(item => item.trim()).filter(item => item) || [];

        formData.append("categoryId", data.categoryId);
        formData.append("productName", data.productName);
        formData.append("slug", data.slug);
        formData.append("model", data.model);
        formData.append("price", data.price.toString());
        formData.append("smallDesc", data.smallDesc);
        formData.append("description", data.description || "");
        // Convert arrays into JSON string before sending
        formData.append("features", JSON.stringify(featuresArray));
        formData.append("specifications", JSON.stringify(specificationsArray));
        
        formData.append("seoTitle", data.seoTitle || "");
        formData.append("seoDescription", data.seoDescription || "");
        formData.append("image", imageFile);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });
    
            if (res.ok) {
                const result = await res.json();
                console.log("Success:", result);
                toast.success("Product added successfully!");
                reset();
            } else {
                console.error("Upload failed");
                toast.error("Upload Failed!");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            toast.error(err);
        }
       
    };

     // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const res = await fetch('/api/products');
            const json = await res.json();
            setCategories(json.data.category || []);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
        };

        fetchCategories();
    }, []);


    return (
        <React.Fragment>
            <Link href="/admin/products/view-product" className='btn btn-secondary btn-sm mb-2'>View Product</Link>
            <div className='container mt-4'>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Category ID */}
                                    <div className="mb-3">
                                        <label htmlFor='categoryId' className="form-label">
                                            Category <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            id='categoryId'
                                            className="form-control"
                                            {...register("categoryId", { required: "Category is required" })}
                                        >
                                            <option value="">Choose...</option>
                                            { categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}
                                    </div>
                                    
                                    {/* Product Image */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Product Image <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            {...register("image", { required: "Product Image is required" })}
                                        />
                                        {errors.image && <small className="text-danger">{errors.image.message}</small>}
                                    </div>

                                    {/* Product Name */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Product Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("productName", { required: "Product Name is required" })}
                                        />
                                        {errors.productName && <small className="text-danger">{errors.productName.message}</small>}
                                    </div>

                                    {/* Slug */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Slug <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("slug", { required: "Slug is required" })}
                                            disabled
                                            placeholder="Auto-generated from product name"
                                        />
                                        {errors.slug && <small className="text-danger">{errors.slug.message}</small>}
                                    </div>

                                    {/* Model */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Model <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("model", { required: "Model is required" })}
                                        />
                                        {errors.model && <small className="text-danger">{errors.model.message}</small>}
                                    </div>

                                    {/* Price */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Price <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            {...register("price", { required: "Price is required" })}
                                        />
                                        {errors.price && <small className="text-danger">{errors.price.message}</small>}
                                    </div>

                                    {/* Small Description */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Small Description <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("smallDesc", { required: "Small Description is required" })}
                                        />
                                        {errors.smallDesc && <small className="text-danger">{errors.smallDesc.message}</small>}
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Description <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            {...register("description")}
                                            placeholder="Enter detailed description"
                                        ></textarea>
                                        {errors.description && <small className="text-danger">{errors.description.message}</small>}
                                    </div>

                                    {/* Features */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Features <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            {...register("features")}
                                            placeholder="Enter product features (one per line)"
                                        ></textarea>
                                        {errors.features && <small className="text-danger">{errors.features.message}</small>}
                                    </div>

                                    {/* Specifications */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Specifications <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            {...register("specifications")}
                                            placeholder="Enter product specifications (one per line)"
                                        ></textarea>
                                        {errors.specifications && <small className="text-danger">{errors.specifications.message}</small>}
                                    </div>

                                    {/* SEO Title */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            SEO Title <span className="text-muted">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("seoTitle")}
                                            placeholder="Enter SEO title"
                                        />
                                        {errors.seoTitle && <small className="text-danger">{errors.seoTitle.message}</small>}
                                    </div>

                                    {/* SEO Description */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            SEO Description <span className="text-muted">(Optional)</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows={2}
                                            {...register("seoDescription")}
                                            placeholder="Enter SEO description"
                                        ></textarea>
                                        {errors.seoDescription && <small className="text-danger">{errors.seoDescription.message}</small>}
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddProducts;
