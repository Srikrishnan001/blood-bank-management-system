import React, { useState } from 'react';
import axios from 'axios';

const OtpForm = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpValid, setIsOtpValid] = useState(false);

  const handleSendOtp = () => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/send-otp', { username, phoneNumber })
      .then(response => {
        alert('OTP sent successfully!');
      })
      .catch(error => {
        alert('Failed to send OTP. Please try again.');
      });
  };

  const handleValidateOtp = () => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/validate-otp', { username, otp })
      .then(response => {
        setIsOtpValid(true);
        alert('OTP is valid!');
      })
      .catch(error => {
        setIsOtpValid(false);
        alert('Invalid OTP. Please try again.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpValid) {
      // Your logic to store data
      // This could involve making an HTTP POST request to store data
      // Example:
      // axios.post('/api/store-data', { username, phoneNumber, otp })
      //   .then(response => {
      //     alert('Data stored successfully!');
      //   })
      //   .catch(error => {
      //     alert('Failed to store data. Please try again.');
      //   });
    } else {
      alert('Please enter a valid OTP.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleValidateOtp}>
            Validate OTP
          </button>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;