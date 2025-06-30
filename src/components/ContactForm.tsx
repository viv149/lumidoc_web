"use client";
import React from 'react'
import { toast } from 'react-toastify';

export default function ContactForm() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(response.ok){
                toast.success(data.message);
                setFormData({ name: '', email: '', message: '' });
            }else{
                toast.error(data.error);
            }
        }catch(error){
            console.log("Error__",error);
            console.error('Error:', error);
        }
    }


    return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <h4 className="mb-3 text-primary">Send us a message</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name='name' 
                                        id="name" 
                                        value={formData.name} 
                                        onChange={handleChange}
                                        placeholder="Enter your name" 
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name='email' 
                                        id="email" 
                                        value={formData.email} 
                                        onChange={handleChange}
                                        placeholder="Enter your email" 
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label fw-semibold">Your Message</label>
                                    <textarea 
                                        className="form-control" 
                                        id="message" 
                                        name='message' 
                                        value={formData.message} 
                                        onChange={handleChange}
                                        placeholder="Enter your message" 
                                        required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}
