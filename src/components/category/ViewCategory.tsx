"use client"

import React from 'react';

interface SingleCategory {
    id: string;
    name: string;
}

const ViewCategory = ({ 
    category, 
    onEdit, 
    onDelete
} : {
    category: SingleCategory[];
    onEdit: (category: SingleCategory) => void;
    onDelete: (id: string) => void;
}) => {
    
    return (
        <div className='card'>
            <div className="card-body">
            {category === null ? (
                <p className="text-center text-muted">Loading user data...</p>
            ) : category.length === 0 ? (
                <p className="text-center text-danger">No users found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.map((data, index) => (
                                <tr key={`category-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{data.name}</td>
                                    <td>
                                        <button onClick={() => onEdit(data)} className="btn btn-primary btn-sm me-3">Edit</button>
                                        <button  onClick={() => onDelete(data.id)} className="btn btn-danger btn-sm ">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
                
            </div>
        </div>
    );
}

export default ViewCategory;
