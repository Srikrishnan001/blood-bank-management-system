// import React from 'react';
 
// const GetAllBloodBanks = () => {
//     return (
//         <div>
//             <h2>Get All Blood Banks</h2>
//             {/* Your content here */}
//         </div>
//     );
// };
 
// export default GetAllBloodBanks;
 
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/GetAllBloodBanks.css';
 
const GetAllBloodBanks = () => {
    const [bloodBanks, setBloodBanks] = useState([]);
 
    useEffect(() => {
        const fetchBloodBanks = async () => {
            try {
const response = await axios.get('http://localhost:1234/api/v1/bbms/bloodbank/allbloodbanks');
                setBloodBanks(response.data);
            } catch (error) {
                console.error('Error fetching blood banks:', error);
            }
        };
 
        fetchBloodBanks();
    }, []);
 
    return (
        <div>
            <br/><br/>
            <h2>All Blood Banks</h2>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>City</th>
                        <th>Zip Code</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {bloodBanks.map(bloodBank => (
                        <tr key={bloodBank.bloodBankId}>
                            <td>{bloodBank.bloodBankId}</td>
                            <td>{bloodBank.bloodBankName}</td>
                            <td>{bloodBank.location}</td>
                            <td>{bloodBank.city}</td>
                            <td>{bloodBank.zipcode}</td>
                            <td>{bloodBank.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
};
 
export default GetAllBloodBanks;