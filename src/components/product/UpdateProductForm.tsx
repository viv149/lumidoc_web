'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { slugify } from '../../utils/slugify';

interface Category {
    id: string;
    name: string;
}

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  model: string;
  smallDesc: string;
  description?: string;
  features?: string;
  specifications?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface Props {
  product: Product;
}

const UpdateProductForm = ({ product }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Product>({
        defaultValues: {
        ...product,
        features: Array.isArray(product.features) ? product.features.join('\n') : product.features,
        specifications: Array.isArray(product.specifications) ? product.specifications.join('\n') : product.specifications,
        },
    });
    
    // Watch product name to auto-generate slug
    const productName = watch("name");
    
    // Auto-generate slug when product name changes
    useEffect(() => {
        if (productName) {
            const slug = slugify(productName);
            setValue("slug", slug);
        }
    }, [productName, setValue]);

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

    useEffect(() => {
        if (categories.length > 0 && product.categoryId) {
            setValue('categoryId', product.categoryId);
        
            try {
                const features = typeof product.features === 'string' ? JSON.parse(product.features) : product.features;
                const specifications = typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications;
        
                setValue('features', Array.isArray(features) ? features.join('\n') : features);
                setValue('specifications', Array.isArray(specifications) ? specifications.join('\n') : specifications);
            } catch (error) {
                console.error('Error parsing features/specifications', error);
            }
        }
    }, [categories, product, setValue]);
      

    console.log('Features', product.features);

    const onSubmit = async (data: Product) => {
        const formData = new FormData();
        const imageFile = (data.image as unknown as FileList)[0];
        
        // Split features and specifications by line break into arrays
        const featuresArray = data.features?.split('\n').map(item => item.trim()).filter(item => item) || [];
        const specificationsArray = data.specifications?.split('\n').map(item => item.trim()).filter(item => item) || [];

        formData.append("categoryId", data.categoryId);
        formData.append("name", data.name);
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

        setLoading(true);
        try {
            const res = await fetch(`/api/products/${product.id}`, {
                method: 'PATCH',
                body: formData,
            });

            const result = await res.json();
            if(result.success){
                router.push('/admin/products/view-product');
                toast.success(result.message);
            }else{
                console.error("Error", result);
                toast.error(result.message);
            }
        } catch (err) {
            console.error('Update failed:', err);
            toast.error(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className='card-title'>Update Product</h4>
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
                                        Product Image <span className="text-muted">(Optional)</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        {...register("image")}
                                    />
                                </div>
                                
                                <div className="mb-3"
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '5px',
                                        backgroundColor: "#ccc",
                                        border: '8px solid #f5f2f2',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                    />
                                </div>

                                {/* Product Name */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Product Name <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        className="form-control" 
                                        {...register('name', { required: "Product name is required" })} 
                                    />
                                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                </div>

                                {/* Slug */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Slug <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        className="form-control" 
                                        {...register('slug', { required: "Slug is required" })} 
                                        placeholder="Auto-generated from product name"
                                        disabled
                                    />
                                    {errors.slug && <small className="text-danger">{errors.slug.message}</small>}
                                </div>
                                
                                {/* Model */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Model <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        className="form-control" 
                                        {...register('model', { required: "Model is required" })} 
                                    />
                                    {errors.model && <small className="text-danger">{errors.model.message}</small>}
                                </div>

                                {/* Price */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Price <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        className="form-control" 
                                        {...register('price', { required: "Price is required" })} 
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

                                <button type="submit" className="btn btn-success me-3" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Product'}
                                </button>
                                <Link href="/admin/products/view-product" className='btn btn-outline-dark'>Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductForm;
