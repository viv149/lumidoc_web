'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

  
interface Message {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

export default function ContactMessage() {
    const [message, setMessage ] = useState<Message[]>(null);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    
    
    const fetchMessage = async () => {
        try{
            const response = await fetch('/api/contact', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
                
            if(response.ok){
                const resData = await response.json();
                setMessage(resData.data);
            }else{
                toast.error("Contact message not found!");
            }
        
        } catch(error){
            console.error("Error fetching contact message:", error);
            toast.error("Somthing error!");
        }
    }

    useEffect(() => {
        fetchMessage();
    },[]);

    const handleViewClick = async (message: Message) => {
        try {
            setSelectedMessage(message);
            const modalEl = document.getElementById('enquiryModal');
            if (modalEl) {
                const modal = new (window as any).bootstrap.Modal(modalEl);
                modal.show();
            }
        } catch (error) {
            console.error('Failed to fetch contact message:', error);
            toast.error("Contact message not found!");
        }
    }

    const handleDelete = async (id: string) => {
            if (!confirm("Are you sure you want to delete this contact message?")) return;
        
            try {
                const res = await fetch(`/api/contact/${id}`, {
                    method: 'DELETE',
                });
        
                const data = await res.json();
                console.log(data);
                if (res.ok) {
                    toast.success(data.message);
                    fetchMessage(); // Refresh list
                } else {
                    toast.error(data.message || 'Failed to delete contact message');
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Something went wrong");
            }
    };
    
    return (
        <React.Fragment>
            <div className='container mt-5'>
                <div className="row ">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                {message === null ? (
                                    <p className="text-center text-muted">Loading messages data...</p>
                                ) : message.length === 0 ? (
                                    <p className="text-center text-danger">No enquiry found.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Contact</th>
                                                    <th>Message</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {message.map((data, index) => (
                                                    <tr key={`users-${index}`}>
                                                        <td>{index + 1}</td>
                                                        <td>{data?.name}</td>
                                                        <td>{data?.email}</td>
                                                        <td>{data && data?.phone ? data?.phone : 'NA'}</td>
                                                        <td>{data?.message.slice(0, 50)}....</td>
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
                                    <h5 className="modal-title" id="enquiryModalLabel">Contact Message</h5>
                                    <button type="button" className="btn-close btn-close-black" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {selectedMessage ? (
                                    <>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className='text-start'><strong>Name:</strong> {selectedMessage.name}</p>
                                                <p className='text-start'><strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`} className="text-decoration-underline">{selectedMessage.email}</a></p>
                                                <p className='text-start'><strong>Contact:</strong> <a href={`tel:${selectedMessage.phone}`} className="text-decoration-underline">{selectedMessage.phone}</a></p>
                                                <p className='text-start'><strong>Message:</strong> </p>
                                                <p className="enquiry-message">{selectedMessage.message}</p>
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
        </React.Fragment>
    )
}
