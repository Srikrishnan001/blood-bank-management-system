import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/GetAllDonors.css';
 
const GetAllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchDonors = async () => {
      try {
const response = await axios.get('http://localhost:1234/api/v1/bbms/donor/alldonors');
        console.log('Response data:', response.data); // Log the response data
        setDonors(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
 
    fetchDonors();
  }, []);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div>
       <br/><br/>
      <h2>All Donors</h2><br/>
      {donors.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Blood Group</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Donated Units</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Blood Bank ID</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(donor => (
              <tr key={donor.donarId}>
                <td>{donor.donarId}</td>
                <td>{donor.donarFirstName}</td>
                <td>{donor.donarLastName}</td>
                <td>{donor.address}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.age}</td>
                <td>{donor.gender}</td>
                <td>{donor.donatedUnits}</td>
                <td>{donor.phone}</td>
                <td>{donor.email}</td>
                <td>{donor.bloodbank.bloodBankId ? donor.bloodbank.bloodBankId : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
 
export default GetAllDonors;