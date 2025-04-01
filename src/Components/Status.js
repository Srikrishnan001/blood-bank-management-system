import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ViewRequests.css';
 
const Status = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
const response = await axios.get('http://localhost:1234/api/v1/bbms/requesterrequest/allrequesterrequest');
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
 
    fetchRequests();
  }, []);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div className="status-container">
      <h1>All Requests</h1>
      {requests.length === 0 ? (
        <p>No Requests found.</p>
      ) : (
        <table className="status-table">
          <thead>
            <tr>
              <th>Requester First Name</th>
              <th>Requester Last Name</th>
              <th>Mobile Number</th>
              <th>Requested Blood Group</th>
              <th>Requested Units</th>
              <th>Current Status</th>
              <th>Blood Bank Name</th>
              <th>Blood Bank City</th>
              <th>Blood Bank Zip Code</th>
              <th>Blood Bank State</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.requester.requesterId}>
                <td>{request.requester.requesterFirstName}</td>
                <td>{request.requester.requesterLastName}</td>
                <td>{request.requester.phone}</td>
                <td>{request.requester.bloodGroup}</td>
                <td>{request.requester.requiredUnits}</td>
                <td>{request.status}</td>
                <td>{request.bloodbank.bloodBankName}</td>
                <td>{request.bloodbank.city}</td>
                <td>{request.bloodbank.zipcode}</td>
                <td>{request.bloodbank.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
 
export default Status;