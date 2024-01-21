import React, { useRef, useEffect } from 'react';
import '../styles/Confirm.css';

const Confirm = ({ message, onCancel, onConfirm }) => {

    const confirmRef = useRef(null);

    const handleClickOutside = (event) => {
        if (confirmRef.current === event.target) {
            onCancel();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="confirm" ref={confirmRef}>
            <div className="confirm-content">
                <div className="confirm-cross" onClick={onCancel}></div>
                <div className="exclamation-mark"></div>
                <p className='confirm-text'>{message}</p>
                <div className="confirm-buttons">
                    <div className='btn-type1' onClick={onCancel}>Cancel</div>
                    <div className='btn-type2' onClick={onConfirm}>Exit</div>
                </div>
            </div>
        </div>
    );
};

export default Confirm;