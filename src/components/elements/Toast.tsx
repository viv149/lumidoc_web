"use client";
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getToastClass = () => {
        switch (type) {
            case 'success':
                return 'bg-success text-white';
            case 'error':
                return 'bg-danger text-white';
            case 'info':
                return 'bg-info text-white';
            default:
                return 'bg-primary text-white';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'bi-check-circle';
            case 'error':
                return 'bi-x-circle';
            case 'info':
                return 'bi-info-circle';
            default:
                return 'bi-info-circle';
        }
    };

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
            <div className={`toast show ${getToastClass()}`} role="alert">
                <div className="toast-header">
                    <i className={`bi ${getIcon()} me-2`}></i>
                    <strong className="me-auto">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </strong>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Toast; 