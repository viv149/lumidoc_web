"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ViewCategory from './ViewCategory';

interface SingleCategory {
    id: string;
    name: string;
}

const AddCategory = () => {
    const [categories, setCategories] = useState<SingleCategory[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<{ name: string }>();

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            const result = await response.json();
            if (response.ok) {
                setCategories(result.data);
            } else {
                toast.error(result.error || "Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit = async (data: { name: string }) => {
        try {
            let response;
            
            if (editMode && editCategoryId !== null) {
                console.log("CategroruID", editCategoryId, data);
                response = await fetch(`/api/categories/${editCategoryId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                console.log("EditRes: ", response);
            } else {
                response = await fetch("/api/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            }

            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || (editMode ? "Category updated" : "Category added"));
                reset();
                setEditMode(false);
                setEditCategoryId(null);
                fetchCategories();
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            console.error("Failed to submit category", error);
            toast.error("Failed to submit");
        }
    };

    const handleEdit = (category: SingleCategory) => {
        setEditMode(true);
        setEditCategoryId(category.id);
        setValue("name", category.name);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        console.log("dleelid",id);
        try {
            const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || "Category deleted");
                fetchCategories();
            } else {
                toast.error(result.error || "Failed to delete category");
            }
        } catch (error) {
            console.error("Failed to delete category", error);
            toast.error("Failed to delete");
        }
    };

    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">{editMode ? "Edit Category" : "Add Category"}</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                {editMode ? "Update Category" : "Add Category"}
                                </button>
                                {editMode && (
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mt-2"
                                    onClick={() => {
                                    reset();
                                    setEditMode(false);
                                    setEditCategoryId(null);
                                    }}
                                >
                                    Cancel Edit
                                </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-8">
                <ViewCategory category={categories} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </div>
  );
};

export default AddCategory;
