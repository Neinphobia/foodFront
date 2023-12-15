// components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, message, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      // Close the modal only if the backdrop is clicked (not the content)
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={handleBackdropClick}>
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
