import React, { useState } from 'react';
import adminService from '../Services/adminService';
 
const AdminRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.registerAdmin(formData);
      alert('Admin registered successfully');
    } catch (error) {
      alert('Error registering admin');
    }
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};
 
export default AdminRegister;