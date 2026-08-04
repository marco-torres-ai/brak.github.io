import React, { useState, useEffect } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`toast ${isVisible ? 'show' : ''} toast-${type}`}>
      <div className="toast-icon">
        {type === 'cart' ? (
          <ShoppingBag size={16} strokeWidth={2} />
        ) : (
          <Check size={16} strokeWidth={2.5} />
        )}
      </div>
      <span className="toast-message">{message}</span>
      <div className="toast-progress"></div>
    </div>
  );
};

export default Toast;
