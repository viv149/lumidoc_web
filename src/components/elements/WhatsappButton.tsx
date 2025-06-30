import Link from 'next/link';
import React from 'react';

const WhatsappButton = ({mobile, buttonStyle}) => {
    return (
        <Link href={`https://wa.me/${mobile}`} target='_blank' className={`btn ${buttonStyle}`}>
            Chat on WhatsApp
        </Link>
    );
}

export default WhatsappButton;
