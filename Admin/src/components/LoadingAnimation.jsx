import React from 'react';
import yajveerLogo from "../assets/yajveer-logo.jpg";
import '../CSS/LoadingAnimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="logo-animation">
        <img 
          src={yajveerLogo} 
          alt="Yajveer Logo" 
          className="loading-logo"
        />
      </div>
    </div>
  );
};

export default LoadingAnimation; 