"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ProductInput{
    id: string,
    productId: string,
    model: string,
    name: string,
    email: string,
    contact: string,
    message: string
}


const ProductInquiryModal = ({ product }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProductInput>();

    const onSubmit = async (data) => {
        try {
            const formData = {
                productId: product.id,
                model: product.model,
                name: data.name,
                email: data.email,
                contact: data.contact,
                message: data.message,
            };

            const response = await fetch("/api/enquiry", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            const resData = await response.json();

            if (response.ok) {
                toast.success(resData.message || "Inquiry submitted successfully!");
                reset();
                document.getElementById("inquiryModalCloseBtn")?.click();
            } else {
                toast.error(resData.message || "Failed to submit inquiry.");
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            toast.error( error.response.message || "Failed to submit inquiry. Please try again.");
        }
    };

    return (
        <div className="modal fade" id="inquiryModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Inquire About {product.name}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-start">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">Contact Number</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    className="form-control"
                                    {...register("contact", { required: "Contact number is required" })}
                                />
                                {errors.contact && <small className="text-danger">{errors.contact.message}</small>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    className="form-control"
                                    rows={5}
                                    {...register("message", { required: "Message is required" })}
                                ></textarea>
                                {errors.message && <small className="text-danger">{errors.message.message}</small>}
                            </div>
                            <div className="w-100 text-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-success"  
                                    data-bs-dismiss="modal"
                                    aria-label="Close"  
                                    disabled={isSubmitting}
                                    id="inquiryModalCloseBtn"
                                >
                                    {isSubmitting ? "Sending..." : "Send Request"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      
    );
};

export default ProductInquiryModal;