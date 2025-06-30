import Image from 'next/image'
import React from 'react'

export default async function ProductSection() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/products`);
    
    console.log('product Response:',response);
    console.log("THis is product section");
    return (
        <section id="products" className="py-5 text-center">
            <div className="container">
                <h2 className="fw-bold">Our Products</h2>
                <div className="row mt-4">
                {
                    products.map(product => (
                        <div className="col-md-4" key={product.id}>
                            <div className="card shadow">
                                <Image 
                                    src={product.image} 
                                    className="card-img-top" 
                                    width={300}
                                    height={400}
                                    alt={product.name} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }                    
                </div>
            </div>
        </section>
    )
}


const products = [
    {
        id: 1,
        name: "Lab Microscopes",
        description: "High-precision microscopes for medical and research labs.",   
        image: "/assets/img/product1.png"  
    },
    {
        id: 2,
        name: "Hospital Beds",
        description: "Ergonomic and adjustable beds for patient comfort.",
        image: "/assets/img/product2.png"

    },
    {
        id: 3,
        name: "Surgical Instruments",
        description: "Precision surgical tools for various medical procedures.",
        image: "/assets/img/product3.png"
    }
]