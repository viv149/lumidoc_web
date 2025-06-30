"use client";
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaEnvelope, FaLink, FaCheck, FaShareAlt } from "react-icons/fa";

interface SocialShareProps {
    title: string;
    description?: string;
    url: string;
    image?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, description, url, image }) => {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareText = `${title}\n${description ? description + '\n' : ''}${url}`;
    const shareData = {
        title: title,
        text: description || title,
        url: url,
    };

    const socialPlatforms = [
        {
            name: 'Facebook',
            icon: <FaFacebookF />,
            color: '#1877f2',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
        },
        {
            name: 'Twitter',
            icon: <FaTwitter />,
            color: '#000000',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedinIn />,
            color: '#0077b5',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`,
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp />,
            color: '#25d366',
            url: `https://wa.me/?text=${encodeURIComponent(shareText + (image ? '\n' + image : ''))}`,
        },
        {
            name: 'Telegram',
            icon: <FaTelegramPlane />,
            color: '#0088cc',
            url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
        },
        {
            name: 'Email',
            icon: <FaEnvelope />,
            color: '#ea4335',
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + (image ? '\n' + image : ''))}`,
        },
    ];

    const handleShare = async (platformUrl: string, platformName: string) => {
        try {
            if (platformName === 'Email') {
                window.open(platformUrl, '_blank');
            } else {
                window.open(platformUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    ...shareData
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };

    return (
        <div className="social-share-container">
            {/* Main Share Button */}
            <div className="d-flex align-items-center gap-2">
                <button
                    onClick={handleNativeShare}
                    className="lm-btn lm-btn-green btn-sm d-flex align-items-center gap-2"
                >
                    <FaShareAlt />
                    Share Article
                </button>

                {/* Copy Link Button */}
                <button
                    onClick={copyToClipboard}
                    className={`lm-btn lm-btn-outline-secondary btn-sm d-flex align-items-center gap-2 ${
                        copied ? 'btn-success' : ''
                    }`}
                >
                    {copied ? <FaCheck /> : <FaLink />}
                    {copied ? 'Copied!' : 'Copy Link'}
                </button>
            </div>

            {/* Social Media Buttons */}
            {showShareMenu && (
                <div className="social-share-menu mt-3 p-3 border rounded bg-light">
                    <h6 className="mb-3 text-dark">
                        <FaShareAlt className="text-green me-2" />
                        Share on Social Media
                    </h6>
                    <div className="social-buttons d-flex flex-wrap gap-2">
                        {socialPlatforms.map((platform) => (
                            <button
                                key={platform.name}
                                onClick={() => handleShare(platform.url, platform.name)}
                                className="lm-btn lm-btn-sm d-flex align-items-center gap-2"
                                style={{
                                    backgroundColor: platform.color,
                                    borderColor: platform.color,
                                    color: 'white',
                                    minWidth: '120px',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '0.8';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                {platform.icon}
                                {platform.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Share Icons */}
            <div className="quick-share mt-3">
                <div className="d-flex gap-2">
                    {socialPlatforms.slice(0, 4).map((platform) => (
                        <button
                            key={platform.name}
                            onClick={() => handleShare(platform.url, platform.name)}
                            className="btn btn-outline-success btn-sm rounded-circle"
                            style={{ width: '40px', height: '40px' }}
                            title={`Share on ${platform.name}`}
                        >
                            {platform.icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialShare; 