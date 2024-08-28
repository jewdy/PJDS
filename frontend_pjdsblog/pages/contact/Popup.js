import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Popup = ({ message, onClose, duration = 3000 }) => { // Add a duration prop with a default value of 3000ms (3 seconds)
  useEffect(() => {
    // Automatically close the popup after the specified duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onClose, duration]);

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
