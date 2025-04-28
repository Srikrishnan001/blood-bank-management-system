import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Request.css';
import ThankYouRequest from './ThankYouRequest';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
const Request = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState(null);
 
  const validationSchema = Yup.object().shape({
    requesterFirstName: Yup.string().required('First Name is required'),
    requesterLastName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    age: Yup.number().min(18, 'Minimum age is 18').max(60, 'Maximum age is 60').required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone Number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    requiredUnits: Yup.number().min(1, 'Minimum unit is 1').max(1, 'Maximum units are 1').required('Units is required'),
    bloodBankId: Yup.string().required('Blood Bank ID is required'),
  });
 
  const formik = useFormik({
    initialValues: {
      requesterFirstName: '',
      requesterLastName: '',
      address: '',
      bloodGroup: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      requiredUnits: '',
      bloodBankId: ''
    },
    validationSchema,
    onSubmit: (values) => {
      handleValidateOtp(values);
    },
  });
 
  const handleSendOtp = () => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/send-otp', { username: formik.values.requesterFirstName, phoneNumber: formik.values.phone })
      .then(response => {
        toast.success('OTP sent successfully!', {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch(error => {
        toast.error('Failed to send OTP. Please try again.', {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
  };
 
  const handleValidateOtp = (values) => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/validate-otp', { username: values.requesterFirstName,otpNumber: otp })
    .then(response => {
      if (response.data === "OTP is valid!") {
          handleSubmit(values);
      } else {
          toast.error('Invalid OTP. Please try again.', {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
      }
  })
  .catch(error => {
      toast.error('An error occurred. Please try again.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
  });
};

const handleSendSms = () => {
  axios.post('http://localhost:1234/api/v1/bbms/otp/send-sms', {
    phoneNumber: formik.values.phone,
    message:"Thank you for your request! Your blood donation request has been successfully submitted. Our team will contact you shortly with further details. Best regards LifeSource Blood Management Ltd"
  })
};
 
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:1234/api/v1/bbms/requester/request', {
        ...values,
        bloodbank: { bloodBankId: values.bloodBankId },
      });
      handleSendSms();
      setSuccess('request initiated Successfully!');
      toast.success('Request initiated Successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error('Error While Requesting. Please try again!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
 
  return (
    <div>
        <marquee behavior="scroll" direction="left" scrollamount="8">Please enter the required information!!</marquee>
      <div className="formm-container">
        {success && <ThankYouRequest />} {/* Display ThankYou component upon successful form submission */}
        {!success && (
          <form onSubmit={formik.handleSubmit} className="donor-form">
            <h1 className='hee'>Requester Form</h1>
             <br/>
            <div className="formm-group">
              <div className="field">
                <label htmlFor="requesterFirstName">First Name:<span className='hee'>*</span></label>
                <input
                  type="text"
                  id="requesterFirstName"
                  name="requesterFirstName"
                  value={formik.values.requesterFirstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your first name"
                  className="formm-control"
                />
                {formik.touched.requesterFirstName && formik.errors.requesterFirstName ? (
                  <div className="error-message">{formik.errors.requesterFirstName}</div>
                ) : null}
              </div><br/>
            
              <div className="field">
                <label htmlFor="requesterLastName">Last Name:<span className='hee'>*</span></label>
                <input
                  type="text"
                  id="requesterLastName"
                  name="requesterLastName"
                  value={formik.values.requesterLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your last name"
                  className="formm-control"
                />
                {formik.touched.requesterLastName && formik.errors.requesterLastName ? (
                  <div className="error-message">{formik.errors.requesterLastName}</div>
                ) : null}
              </div>
            </div><br/>
            <div className="formm-group">
              <div className="field">
                <label htmlFor="address">Address:<span className='hee'>*</span></label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your address"
                  className="formm-control"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="error-message">{formik.errors.address}</div>
                ) : null}
              </div><br/>
           
              <div className="field">
                <label htmlFor="bloodGroup">Blood Group:<span className='hee'>*</span></label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formik.values.bloodGroup}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="formm-control"
                >
                  <option value="" disabled>
                  -NA-
                  </option>
                  <option value="A+ve">A+ve</option>
                  <option value="A-ve">A-ve</option>
                  <option value="B+ve">B+ve</option>
                  <option value="B-ve">B-ve</option>
                  <option value="AB+ve">AB+ve</option>
                  <option value="AB-ve">AB-ve</option>
                  <option value="O+ve">O+ve</option>
                  <option value="O-ve">O-ve</option>
                </select>
                {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
                  <div className="error-message">{formik.errors.bloodGroup}</div>
                ) : null}
              </div>
            </div><br/>
            <div className="formm-group">
              <div className="field">
                <label htmlFor="age">Age:<span className='hee'>*</span></label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formik.values.age}
                  min="18"
                  max="60"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your age"
                  className="formm-control"
                />
                {formik.touched.age && formik.errors.age ? (
                  <div className="error-message">{formik.errors.age}</div>
                ) : null}
              </div><br/>
            
              <div className="field">
                <label htmlFor="gender">Gender:<span className='hee'>*</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="formm-control"
                >
                  <option value="" disabled>-NA-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="error-message">{formik.errors.gender}</div>
                ) : null}
              </div>
            </div><br/>
            <div className="formm-group">
              <div className="field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                  className="formm-control"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-message">
                  {formik.errors.email}</div>) : null}
                  <div/>
              </div><br/>
              
              <div className="field">
                <label htmlFor="phone">Phone Number:<span className='hee'>*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  className="formm-control"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error-message">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div><br/>
            <div className="formm-group">
              <div className="field">
                <label htmlFor="requiredUnits">Required Units:<span className='hee'>*</span></label>
                <input
                  type="number"
                  id="requiredUnits"
                  name="requiredUnits"
                  value={formik.values.requiredUnits}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter units (1)"
                  className="formm-control"
                />
                {formik.touched.requiredUnits && formik.errors.requiredUnits ? (
                  <div className="error-message">{formik.errors.requiredUnits}</div>
                ) : null}
             
              </div><br/>
             
              <div className="field">
                <label htmlFor="bloodBankId">Blood Bank ID:<span className='hee'>*</span></label>
                <input
                  type="text"
                  id="bloodBankId"
                  name="bloodBankId"
                  value={formik.values.bloodBankId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Blood Bank ID"
                  className="formm-control"
                />
                {formik.touched.bloodBankId && formik.errors.bloodBankId ? (
                  <div className="error-message">{formik.errors.bloodBankId}</div>
                ) : null}
              </div>
              </div>
              <br />
            
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              required
            /> 
            <button className='button' type="button" onClick={handleSendOtp}>Send OTP</button> <br /><br/>
            <button type="submit"className='button'>Submit</button>
          </form>
        )}
        
      </div>
      <br/><br/>
      <ToastContainer />
    </div>
  );
};
 
export default Request;

















