import React, { useState } from 'react';
import axios from 'axios';
import '../Css/AddDonor.css';
import ThankYou from './ThankYou';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 
const AddDonor = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
 
  const formik = useFormik({
    initialValues: {
      donarFirstName: '',
      donarLastName: '',
      address: '',
      bloodGroup: '',
      age: '',
      gender: '',
      donatedUnits: '',
      phone: '',
      email: '',
      bloodBankId: '',
    },
    validationSchema: Yup.object({
      donarFirstName: Yup.string().required('First Name is required'),
      donarLastName: Yup.string().required('Last Name is required'),
      address: Yup.string().required('Address is required'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      age: Yup.number()
        .required('Age is required')
        .min(18, 'Age must be at least 18')
        .max(60, 'Age must be at most 60'),
      gender: Yup.string().required('Gender is required'),
      donatedUnits: Yup.number()
        .required('Donated Units is required')
        .min(1, 'Donated Units must be at least 1')
        .max(3, 'Donated Units must be at most 3'),
      phone: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      bloodBankId: Yup.string().required('Blood Bank ID is required'),
    }),
    onSubmit: (values) => {
      handleValidateOtp(values);
    },
  });

  const handleSendSms = () => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/send-sms', {
      phoneNumber: formik.values.phone,
      message:"Thank you so much for your generous donation! Your support means a lot to us. Your Contribution is making a real difference, and we are incredebly grateful for your help. Best regards LifeSource Blood Management Ltd"
    })
  };
 
  const handleSendOtp = () => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/send-otp', {
      username: formik.values.donarFirstName,
      phoneNumber: formik.values.phone,
    })
      .then(response => {
        toast.success('OTP sent successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(error => {
        toast.error('Failed to send OTP. Please try again.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
 
  const handleValidateOtp = (values) => {
    axios.post('http://localhost:1234/api/v1/bbms/otp/validate-otp', { username: values.donarFirstName, otpNumber: otp })
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
 
  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:1234/api/v1/bbms/donor/donate', {
        ...values,
        bloodbank: { bloodBankId: values.bloodBankId },
      });
      handleSendSms();
      setSuccess('Donor added successfully!');
      toast.success('Donor added successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(null);
    } catch (err) {
      setError('Error adding donor. Please try again.');
      toast.error('Error adding donor. Please try again!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSuccess(false);
    }
  };
 
  return (
    <div>
        <marquee behavior="scroll" direction="left" scrollamount="8">Please enter the required information!!</marquee>
      <div className="formm-container">
        {error && <p className="error-message">{error}</p>}
        {success && <ThankYou />}
        {!success && (
          <form onSubmit={formik.handleSubmit} className="donor-form">
            <fieldset><h1 className='hee'>Donor Form</h1></fieldset>
            <br/>
            <div className="formm-group">
              <div className="field">
                <label htmlFor="donarFirstName">First Name:<span className='hee'>*</span></label>
                <input
                  type="text"
                  id="donarFirstName"
                  name="donarFirstName"
                  value={formik.values.donarFirstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your first name"
                  className="formm-control"
                />
                {formik.touched.donarFirstName && formik.errors.donarFirstName ? (
                  <div className="error-message">{formik.errors.donarFirstName}</div>
                ) : null}
              </div><br/>
              <div className="field">
                <label htmlFor="donarLastName">Last Name:<span className='hee'>*</span></label>
                <input
                  type="text"
                  id="donarLastName"
                  name="donarLastName"
                  value={formik.values.donarLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your last name"
                  className="formm-control"
                />
                {formik.touched.donarLastName && formik.errors.donarLastName ? (
                  <div className="error-message">{formik.errors.donarLastName}</div>
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
                  className="formm-control">
                  <option value="" disabled>-NA-</option>
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
                <label htmlFor="email">Email:<span className='hee'>*</span></label>
                <input
                  type="text"
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
                  {formik.errors.email}</div>
 
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="phone">Phone Number:<span className='hee'>*</span></label>
                <input
                  type="text"
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
                <label htmlFor="donatedUnits">Donated Units:
                <span className='hee'>*</span></label>
                <input
                  type="number"
                  id="donatedUnits"
                  name="donatedUnits"
                  value={formik.values.donatedUnits}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter units (1-3)"
                  className="formm-control"
                />
                {formik.touched.donatedUnits && formik.errors.donatedUnits ? (
                  <div className="error-message">{formik.errors.donatedUnits}</div>
                ) : null}
              </div><br/>
              <div className="field">
                <label htmlFor="bloodBankId">Blood Bank ID:<span className='hee'>*</span></label>
                <input
                  type="text"
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
            </div><br/>
           
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              required
            />
             <button className='button' type="button" onClick={handleSendOtp}>Send OTP</button><br/><br/>
            <button className='button' type="submit">Submit</button>
          </form>
        )}
      </div>
      <br/><br/>
      <ToastContainer />
    </div>
  );
};
 
export default AddDonor;

