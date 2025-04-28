import React from 'react';
import { FaHome, FaHandHoldingHeart, FaHandsHelping, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Css/ThankYouRequest.css';
 
const ThankYouRequest = () => {
  return (
    <div className="thank-you-request-container">
      <div className="thank-you-request-content">
        <h1 className="thank-you-request-heading">Thank You for Your Request!</h1>
        <p className="thank-you-request-text">
          We appreciate your effort in reaching out.
          By making this request, you are taking a crucial step towards ensuring that the needed blood is available
          to save lives.
        </p>
        <div className="thank-you-request-icons">
          <FaHandHoldingHeart className="icon large-icon" />
          <FaHandsHelping className="icon large-icon" />
          <FaHeartbeat className="icon large-icon" />
        </div>
        <Link to="/" className="btn btn-primary">
          <FaHome /> Go Back
        </Link>
      </div>
    </div>
  );
};
 
export default ThankYouRequest;