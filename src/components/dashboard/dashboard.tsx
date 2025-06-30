"use client"
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from './card';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { fetchEnquiries } from '../../redux/slice/quotationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import Link from 'next/link';



const Dashboard =  () => {
    const dispatch = useDispatch<AppDispatch>();
    const { enquiries, loading } = useSelector((state: RootState) => state.quotation);

    useEffect(() => {
        dispatch(fetchEnquiries());
    }, [dispatch]);


    const [apiData, setApiData] = useState(null);
    // Sample data (Replace with API fetch)
    const stats = [
        { title: 'Users', count: apiData?.totalUsers, link: '/admin/users' },
        { title: 'Products', count: apiData?.totalProducts, link: '/admin/products/view-product' },
        { title: 'Quotation Request', count: apiData?.totalProductEnquiries, link: '/admin/quotation-request' },
        { title: 'Contact Messages', count: apiData?.totalContactMessages, link: '/admin/contact-messages' },
    ];

    useEffect(() => {
        const token =  getCookie('token');
        const fetchDashboard = async () => {
            try{
                const response = await fetch('/api/dashboard',{
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                
                if (response.status) {
                    const data = await response.json();
                    setApiData(data.data);
                } else {
                    toast.error("User not found"); // Redirect on error
                }
            }catch(error){
                console.error("Error fetching dashboard:", error);
            }
        }
        fetchDashboard();
    }, []);


    return (
        <div>
             {/* Stats Overview */}
            <div className="row mb-4">
                {stats.map((stat, index) => (
                <div key={index} className="col-md-3">
                   <Card title={stat.title} count={stat.count} link={stat.link} icon=""/>
                </div>
                ))}
            </div>
            {/* Graph Section */}
            <div className="card shadow-sm p-4">
                <h5 className="mb-3">Latest Product Quotations</h5>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="list-group">
                        {enquiries.slice(0, 5).map((item: any) => (
                            <li key={item.id} className="list-group-item">
                                <Link href="/admin/quotation-request"><strong>{item.name}</strong></Link>  - {item.phone} <br />
                                <small>{item.message}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
