"use client";
import React, { useState } from "react";

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState("description");
    return (
        <div className="product-tabs">
            <div className="tabs">
                <button className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>Description</button>
                <button className={activeTab === "features" ? "active" : ""} onClick={() => setActiveTab("features")}>Features</button>
                <button className={activeTab === "specifications" ? "active" : ""} onClick={() => setActiveTab("specifications")}>Specifications</button>
            </div>

            <div className="tab-content">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "features" && (
                    <ul>
                        { JSON.parse(product?.features).map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                )}
                {activeTab === "specifications" && product.specifications && (
                    <ul>
                        {JSON.parse(product.specifications).map((value, index) => (
                            <li key={index} className="text-capitalize">{value}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;