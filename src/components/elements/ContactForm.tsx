"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface FormInputs {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {

                toast.success( result.message || "Your inquiry has been submitted successfully!");
                reset();
            } else {
                toast.error(result.message || "Submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            toast.error( error.response.message || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })}
                    placeholder="Enter your email"
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit phone number"
                        }
                    })}
                    placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    {...register("message", { required: "Message is required" })}
                    placeholder="Enter your message"
                ></textarea>
                {errors.message && <span className="error">{errors.message.message}</span>}
            </div>

            <button type="submit" className="lm-btn lm-btn-green">Submit Inquiry</button>
        </form>
    );
};

export default ContactForm;
