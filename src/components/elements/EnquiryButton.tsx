import React from 'react';

const EnquiryButton = ({buttonStyle, modalId}) => {
    return (
        <button className={`btn ${buttonStyle} me-2`} data-bs-toggle="modal" data-bs-target={`#${modalId}`} >
            Get Quotation
        </button>
    );
}

export default EnquiryButton;
