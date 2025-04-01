import React from 'react';
import { FaHome, FaHeart, FaSmile, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Css/ThankYou.css';
 
const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1 className="thank-you-heading">Thank You for Donating!</h1>
        <p className="thank-you-text">
          Your contribution towards blood donation makes a significant impact on saving lives.
          By donating blood, you're spreading hope, happiness, and health.
        </p>
        <div className="thank-you-icons">
          <FaHeart className="icon large-icon" />
          <FaSmile className="icon large-icon" />
          <FaStar className="icon large-icon" />
        </div>
        <Link to="/" className="btn btn-primary">
          <FaHome /> Go Back
        </Link>
      </div>
    </div>
  );
};
 
export default ThankYou;