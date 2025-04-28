// BackgroundVideo.js
import React from 'react';
import '../Css/BackgroundVideo.css'; 
 
const BackgroundVideo = () => {
    return (
        <div className="video-background-container">
            <video autoPlay loop muted className="video-background">
                <source src="/ten.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
            <h2>This application is developed to connect donors and people who need blood </h2>
      <h3>Benefits of Donating Blood</h3>
      <p>Donating blood is beneficial in many ways. It helps save lives, improves cardiovascular health, and can even enhance mental well-being.</p>
                <h1>Welcome to My Website</h1>
            </div>
        </div>
    );
};
 
export default BackgroundVideo;