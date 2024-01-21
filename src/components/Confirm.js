import React from 'react';
import '../styles/Confirm.css';

const Confirm = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="confirm">
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