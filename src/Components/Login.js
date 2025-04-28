import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/AddDonor.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;
 
const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const response = await axios.post('http://localhost:1234/api/v1/bbms/admin/login', credentials);
      if (response.status === 200) {
        
        toast.success('Logged in successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
       
        });
        setTimeout(() => {
          navigate('/admin-control');
          onLogin();
      }, 1500);
            } else {
                //alert('Login failed');
                toast.error('Invalid Credentials.', {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
               
                });
            }
      }
     catch (error) {
      // alert('Login failed');
      toast.error('Invalid Credentials.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     
      });
    }
  };
 
  return (
    <div>
      <marquee behavior="scroll" direction="left" scrollamount="8">Accessible only for Admin!!</marquee>
    <div className="formm-container">
      <h1 className="hee">SignIn</h1><br/>
 
    <form onSubmit={handleSubmit}><label>Username:<span className='hee'>*</span></label>
      <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
      <br/><br/>
      <label>Password:<span className='hee'>*</span></label>
      <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
      <br/><br/><br/>
      <button type="submit" className='button'>Login</button>
    </form>
    <ToastContainer/>
    </div><br/><br/><br/>
    </div>
  );
};
 
export default Login;