/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnquiries } from '../../redux/slice/quotationSlice';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


interface Product {
    id: string;
    name: string;
    image: string;
}

  
interface Enquiries {
    id: string;
    productId: string;
    model: string;
    name: string;
    email: string;
    contact: string;
    message: string;
    product: {
        name,
        image
    };
}


const ProductEnquiry = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { enquiries, loading, error } = useSelector((state: RootState) => state.quotation);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiries | null>(null);


    const handleViewClick = async (enquiry: Enquiries) => {
        try {
            setSelectedEnquiry(enquiry);
            const modalEl = document.getElementById('enquiryModal');
            if (modalEl) {
                const modal = new (window as any).bootstrap.Modal(modalEl);
                modal.show();
            }
        } catch (error) {
            console.error('Failed to fetch product:', error);
            toast.error("Product details not found!");
        }
    }
    
    
    useEffect(() => {
        dispatch(fetchEnquiries())
    },[]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
    
        try {
            const res = await fetch(`/api/enquiry/${id}`, {
                method: 'DELETE',
            });
    
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Failed to delete enquiry');
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong");
        }
    };

    

    return (
        <div className='container mt-5'>
            <div className="row ">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            {enquiries === null ? (
                                <p className="text-center text-muted">Loading enquiry data...</p>
                            ) : enquiries.length === 0 ? (
                                <p className="text-center text-danger">No enquiry found.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Model</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enquiries.map((data, index) => (
                                                <tr key={`users-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img 
                                                            src={data?.product?.image} 
                                                            alt={data.name} 
                                                            className="rounded p-1 me-3" 
                                                            width={50}
                                                            height={50}
                                                        /> 
                                                        {data?.product.name}
                                                    </td>
                                                    <td>{data?.model}</td>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.email}</td>
                                                    <td>{data && data?.contact ? data?.contact : 'NA'}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => handleViewClick(data)}
                                                        >
                                                            View
                                                        </button>

                                                        <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(data?.id)} 
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="modal fade"
                        id="enquiryModal"
                        tabIndex={-1}
                        aria-labelledby="enquiryModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="enquiryModalLabel">Enquiry Detail</h5>
                                <button type="button" className="btn-close btn-close-black" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedEnquiry ? (
                                <>
                                    <div className="row">
                                        <div className="col-md-4 text-center mb-3">
                                            <img 
                                                src={selectedEnquiry.product?.image} 
                                                alt={selectedEnquiry.product?.name} 
                                                className="img-fluid rounded" 
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <p><strong>Product:</strong> {selectedEnquiry?.product?.name}</p>
                                            <p><strong>Model:</strong> {selectedEnquiry?.model}</p>
                                            <hr />
                                            <p className='text-start'><strong>Name:</strong> {selectedEnquiry.name}</p>
                                            <p className='text-start'><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`} className="text-decoration-underline">{selectedEnquiry.email}</a></p>
                                            <p className='text-start'><strong>Contact:</strong> <a href={`tel:${selectedEnquiry.contact}`} className="text-decoration-underline">{selectedEnquiry.contact}</a></p>
                                            <p className='text-start'><strong>Message:</strong> </p>
                                            <p className="enquiry-message">{selectedEnquiry.message}</p>
                                        </div>
                                    </div>
                                </>
                                ) : (
                                <p>Loading...</p>
                                )}
                            </div>
                            </div>
                        </div>
                        </div>

                </div>
            </div>
        </div>
    );
}

export default ProductEnquiry;

