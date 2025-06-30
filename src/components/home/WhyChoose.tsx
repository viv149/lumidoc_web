"use client";
import React from "react";
import FeatureCard from "../elements/FeaturesCard";
import { FaIndustry, FaCheckCircle, FaMicrochip, FaHeadset } from "react-icons/fa";

const WhyChoose = () => {
    return (
        <section id="whyChoose" className="section bg-light">
            <div className="container">
                <h4 className="title">Why Choose Lumidoc?</h4>
                <p className="text-declaration text-muted">We deliver excellence with industry-leading standards.</p>

                <div className="features-grid">
                    {features.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;

// Feature Data
const features = [
    {
        id: 1,
        title: "Industry Expertise",
        icon: <FaIndustry />,
        description: "Years of experience in medical equipment innovation.",
    },
    {
        id: 2,
        title: "High-Quality Standards",
        icon: <FaCheckCircle />,
        description: "Strict quality control for reliable and safe products.",
    },
    {
        id: 3,
        title: "Advanced Technology",
        icon: <FaMicrochip />,
        description: "Cutting-edge solutions to enhance healthcare efficiency.",
    },
    {
        id: 4,
        title: "Reliable Customer Support",
        icon: <FaHeadset />,
        description: "24/7 assistance for seamless product experience.",
    },
];
