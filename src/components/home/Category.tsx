"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Category = () => {



    return (
        <section id='categorySection' className='section'>
            <div className="container">
                <h4 className="title">Our Product Categories</h4>
                <p className='text-declaration text-muted'>Explore Our Range of Medical & Lab Instruments.</p>
                
                <div className="category-grid">
                {
                    category.map((data, index) => (
                        <div key={`category-${index}`} className="cat-card">
                            <div className="left-side">
                                <h5 className="cat-title mb-3">{data.name}</h5>
                                <p className="cat-description">{data.description}</p>
                                <Link href={data.link} className='cat-link'>Explore Products</Link>
                            </div>
                            <div className="right-side">
                                <div className="img-cover">
                                    <Image
                                        src={data.image}
                                        alt={data.name}
                                        width={100}
                                        height={100}
                                        className='cat-img'
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </section>
    );
}

export default Category;


const category = [
    {
        id: 1,
        name: "Auto Clave",
        image: "/assets/img/category/cat-5.png",
        description: "High-pressure steam sterilization for medical instruments.",
        link: "/main/product"
    },
    {
        id: 2,
        name: "Hospital Bed Furniture",
        image: "/assets/img/category/cat-2.jpg",
        description: "Ergonomic & adjustable hospital beds for patient comfort.",
        link: "/main/product"
    },
    {
        id: 3,
        name: "OT Lights",
        image: "/assets/img/category/cat-3.png",
        description: "Advanced surgical lighting for precision and clarity.",
        link: "/main/product"
    },
    {
        id: 4,
        name: "Electro Surgical Equipment",
        image: "/assets/img/category/cat-4.png",
        description: "High-performance tools for surgical procedures.",
        link: "/main/product"
    }
];
