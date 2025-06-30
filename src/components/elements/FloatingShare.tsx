'use client'

import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaTelegramPlane, FaLink, FaTimes, FaShareAlt } from "react-icons/fa";

interface FloatingShareProps {
    title: string;
    description?: string;
    url: string;
    image?: string;
}

const FloatingShare: React.FC<FloatingShareProps> = ({ title, description, url, image }) => {
    const [isOpen, setIsOpen] = useState(false);

    const socialPlatforms = [
        {
            name: 'Facebook',
            icon: <FaFacebookF />,
            color: '#1877f2',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
        },
        {
            name: 'Twitter',
            icon: <FaTwitter />,
            color: '#000000',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp />,
            color: '#25d366',
            url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
        },
        {
            name: 'Telegram',
            icon: <FaTelegramPlane />,
            color: '#0088cc',
            url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
    ];

    const handleShare = (platformUrl: string) => {
        window.open(platformUrl, '_blank');
        setIsOpen(false);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            // You could add a toast notification here
            setIsOpen(false);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };

    return (
        <div className="floating-share">
            {/* Social Share Buttons */}
            {isOpen && (
                <div className="floating-share-buttons">
                    {socialPlatforms.map((platform, index) => (
                        <button
                            key={platform.name}
                            onClick={() => handleShare(platform.url)}
                            className="floating-share-btn"
                            style={{
                                backgroundColor: platform.color,
                                animationDelay: `${index * 0.1}s`,
                            }}
                            title={`Share on ${platform.name}`}
                        >
                            {platform.icon}
                        </button>
                    ))}
                    <button
                        onClick={copyToClipboard}
                        className="floating-share-btn"
                        style={{
                            backgroundColor: '#6c757d',
                            animationDelay: '0.4s',
                        }}
                        title="Copy Link"
                    >
                        <FaLink />
                    </button>
                </div>
            )}

            {/* Main Share Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="floating-share-main"
                title="Share this article"
            >
                {isOpen ? <FaTimes /> : <FaShareAlt />}
            </button>
        </div>
    );
};

export default FloatingShare;