// Popup.js
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    // Automatically close the popup after 3 second
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
<div className="popup">
      <div className="popup-content">
        <FaCheckCircle className="popup-icon" />
        <p className="popup-message">{message}</p>
      </div>
    </div>
  );
};

export default Popup;
