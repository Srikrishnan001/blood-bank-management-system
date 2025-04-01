import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/AvailableBloodGroup.css';
 
const AvailableBloodGroup = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
 
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/v1/bbms/bloodgroup/availablebloodgroup');
        setBloodGroups(response.data);
      } catch (error) {
        console.error('Error fetching blood groups:', error);
      }
    };
 
    fetchData();
 
    // Cleanup function to cancel the fetch request if the component unmounts
    return () => {
      // Cleanup code here if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount
 
  return (
    <div>
       <br/><br/>
      <h2 >Available Blood Groups</h2>
      <table>
        <thead>
          <tr>
            <th>Blood Group Type</th>
            <th>Units</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {bloodGroups.map((bloodGroup) => (
            <tr key={bloodGroup.bloodGroupId}>
              <td>{bloodGroup.bloodGroupType}</td>
              <td>{bloodGroup.unit}</td>
              {/* Add more table cells for additional data */}
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
    </div>
  );
};
 
export default AvailableBloodGroup;