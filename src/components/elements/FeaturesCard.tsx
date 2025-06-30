import React, { JSX } from "react";

const FeatureCard = ({ feature }: { feature: { title: string; icon: JSX.Element; description: string } }) => {
    return (
        <div className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h5 className="feature-title">{feature.title}</h5>
            <p className="feature-description">{feature.description}</p>
        </div>
    );
};

export default FeatureCard;
