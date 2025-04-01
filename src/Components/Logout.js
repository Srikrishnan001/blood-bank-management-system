import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;
 
const Logout = ({ onLogout }) => {
    const navigate = useNavigate();
    const successToastId = "logout-success";
    const errorToastId = "logout-error";
 
    useEffect(() => {
        const logout = async () => {
            try {
                // Make an API call to logout the user
                const response =await axios.post('http://localhost:1234/api/v1/bbms/admin/logout');
                 
               
if (response.status === 200) {

    toast.success('Logged out successful!', {
      toastId: successToastId,
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     
      });
      setTimeout(() => {
        navigate('/');
        onLogout();
    }, 1000);
    
    
        } else {
            //alert('Logout failed');
            toast.error('Logout failed.', {
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
  //alert('Logout failed');
  toast.error('Logout failed.', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
 
  });
}
        };
 
        logout();
    }, [navigate, onLogout]);

    
 
    return (<div><ToastContainer /></div>) 
};
 
export default Logout;