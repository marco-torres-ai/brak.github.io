import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <span className="logo-text">BRAK</span>
      <div className="lightning-wrapper">
        <svg className="lightning-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="bolt-path" pathLength="100" d="M13.5 2L5 13H12L10.5 22L19 11H12L13.5 2Z" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="miter"/>
        </svg>
      </div>
    </div>
  );
};

export default Logo;
