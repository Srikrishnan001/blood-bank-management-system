import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Css/AddBloodBank.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const AddBloodBank = () => {
    const formik = useFormik({
        initialValues: {
            bloodBankName: '',
            location: '',
            city: '',
            zipcode: '',
            state: '',
        },
        validationSchema: Yup.object({
            bloodBankName: Yup.string().required('Blood Bank Name is required'),
            location: Yup.string().required('Locality is required'),
            city: Yup.string().required('City is required'),
            zipcode: Yup.string()
                .matches(/^[0-9]{6}$/, 'Zip Code must be exactly 6 digits')
                .required('Zip Code is required'),
            state: Yup.string().required('State is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
const response = await axios.post('http://localhost:1234/api/v1/bbms/bloodbank/', values);
                if (response.status === 201) {
                    toast.success('Success', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    // Clear form fields after successful submission
                    resetForm();
                } else {
                    throw new Error('Unexpected response status: ' + response.status);
                }
            } catch (error) {
                console.error('Error adding blood bank:', error);
                toast.error('Error adding blood bank', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        },
    });
 
    return (
        <div className="form-container">
            <h2>Add Blood Bank</h2>
            <marquee behavior="scroll" direction="left" scrollamount="8">Please fill the required information!!</marquee>
         
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Blood Bank Name:<span className='hee'>*</span></label>
                    <input
                        type="text"
                        name="bloodBankName"
                        value={formik.values.bloodBankName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter Blood Bank Name'
                        required
                    />
                    {formik.touched.bloodBankName && formik.errors.bloodBankName ? (
                        <div className="error">{formik.errors.bloodBankName}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Locality:<span className='hee'>*</span></label>
                    <input
                        type="text"
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter Locality/Area'
                        required
                    />
                    {formik.touched.location && formik.errors.location ? (
                        <div className="error">{formik.errors.location}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>City:<span className='hee'>*</span></label>
                    <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter City'
                        required
                    />
                    {formik.touched.city && formik.errors.city ? (
                    <div className="error">
                        {formik.errors.city}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Zip Code:<span className='hee'>*</span></label>
                    <input
                        type="text"
                        name="zipcode"
                        value={formik.values.zipcode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter Zip Code'
                        required
                    />
                    {formik.touched.zipcode && formik.errors.zipcode ? (
                        <div className="error">{formik.errors.zipcode}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>State:<span className='hee'>*</span></label>
                    <input
                        type="text"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Enter State'
                        required
                    />
                    {formik.touched.state && formik.errors.state ? (
                        <div className="error">{formik.errors.state}</div>
                    ) : null}
                </div>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};
 
export default AddBloodBank;