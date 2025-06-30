"use client"
import React, { useState } from "react";
import ProductSmallCard from "../elements/ProductSmallCard";


// const products = [
//     {
//         id: "1",
//         category: "Lab Equipment",
//         name: "Multi Parameter Monitor",
//         image: "/assets/img/products/prod-1.png",
//         description: "Real-time monitoring of vital signs for accurate diagnosis.",
//         link: "/main/product/multi-parameter-monitor",
//     },
//     {
//         id: "2",
//         category: "Hospital Equipment",
//         name: "Semi Fowler Bed (SS Panel)",
//         image: "/assets/img/products/prod-2.jpg",
//         description: "Durable stainless steel bed with adjustable backrest for patient comfort.",
//         link: "/main/product/semi-fowler-bed-ss-panel",
//     },
//     {
//         id: "3",
//         category: "Surgical Equipment",
//         name: "Surgical OT Light",
//         image: "/assets/img/products/prod-3.jpg",
//         description: "High-intensity shadow-free lighting for surgical procedures.",
//         link: "/main/product/surgical-ot-light",
//     },
//     {
//         id: "4",
//         category: "Hospital Equipement",
//         name: "Cooker Type Autoclave Single/Double Wall",
//         image: "/assets/img/products/prod-4.jpg",
//         description: "Reliable steam sterilization for medical and laboratory instruments.",
//         link: "/main/product/cooker-type-autoclave-single",
//     }
// ];


export default function ProductListing({ category, products }) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Filter products based on category selection
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter((product) => product.categoryId === selectedCategory);

    return (
        <div className="container my-5">
            <h2 className="section-title text-center mb-4">Our Medical & Lab Equipment</h2>

            <div className="row">
                {/* Sidebar Filters */}
                <div className="col-md-3">
                    <div className="filter-box p-3 mb-4">
                        <h5 className="mb-3">Filter by Category</h5>
                        <select
                            className="form-select"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >   
                            <option value="All">All Categories</option>
                        {
                            category.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))
                        }
                            {/* <option value="Lab Equipment">Lab Equipment</option>
                            <option value="Surgical Equipment">Surgical Equipment</option>
                            <option value="Electro Medical">Electro Medical</option> */}
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="col-md-9">
                    <div className="row">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="col-md-4 mb-4">
                                <ProductSmallCard product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
