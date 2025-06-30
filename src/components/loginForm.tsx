"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({data, role: "ADMIN"}),
            });

            const result = await response.json();
            
            if (response.ok) {
                // Store JWT token in localStorage or cookies
                setCookie("token", result.token);
                setCookie("user", result);
                toast.success("Login Successful!");
                router.push("/admin/dashboard");
            } else {
                console.log("result eeerr",result.error)
                toast.error(result.error);
            }
        } catch (error) {
            console.log("Error :",error );
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm-12 col-md-4 offset-md-4 col-lg-4 offset-lg-4">
                    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
                        <div className="card shadow-lg p-4" style={{ width: "400px" }}>
                            <div className="text-center mb-3">
                                <Image src="/assets/img/logo.png" alt="Lumidoc Logo" width={250} height={50} />
                                <h4 className="mt-2 text-green">Admin Panel Login</h4>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                    type="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                                </div>

                                <button type="submit" className="btn btn-success w-100">Login</button>
                            </form>
                             {/* Login Credentials Display */}
                             <div className="alert alert-info mt-3 text-center">
                                <strong>Test Credentials:</strong> <br />
                                <span className="d-block">User: <strong>admin@example.com</strong></span>
                                <span className="d-block">Password: <strong>admin123</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

