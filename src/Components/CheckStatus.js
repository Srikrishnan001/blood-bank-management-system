import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/ViewRequests.css';

const CheckStatus = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:1234/api/v1/bbms/requesterrequest/allrequesterrequest');
            const filteredRequests = response.data.filter(request => request.requester.phone === phoneNumber);

            if (filteredRequests.length === 0) {
                toast.error('Invalid mobile number', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                });
            } else {
                setRequests(filteredRequests);
                toast.success('Success', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                handleSMS(filteredRequests);
            }
        } catch (err) {
            setError(err.message);
            toast.error('An error occurred. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSMS = async (requests) => {
        const message = requests.map(request => (
            `Requester: ${request.requester.requesterFirstName} ${request.requester.requesterLastName}, ` +
            `Blood Group: ${request.requester.bloodGroup}, ` +
            `Requested Units: ${request.requester.requiredUnits}, ` +
            `Status: ${request.status}, ` +
            `Date: ${request.date}, ` +
            `Blood Bank: ${request.bloodbank.bloodBankName}, ` +
            `City: ${request.bloodbank.city}, ` +
            `Zip Code: ${request.bloodbank.zipcode}, ` +
            `State: ${request.bloodbank.state}`
        )).join('\n');

        try {
        await axios.post('http://localhost:1234/api/v1/bbms/otp/send-sms', {
                phoneNumber,
                message
            });
            
        } catch (err) {
            toast.error('Failed to send SMS. Please try again.', {
                position: "top-right",
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
            <marquee behavior="scroll" direction="left" scrollamount="8">Please enter the required information!!</marquee>
            <div className="formm-container">
                <h1 className='hee'>Check Status</h1>
                <br/>
                <div className='formm-group'>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile Number: <span className='hee'>*</span></label>
                            <input
                                type="text"
                                id="mobileNumber"
                                placeholder='Enter the mobile number'
                                maxLength={10}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <br/>
                        <button type="submit" className='button' disabled={loading}>Submit</button>
                    </form>
                    <div/>
                </div>
            </div>
            <br/><br/>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {requests.length > 0 &&
                <table className="status-table">
                    <thead>
                        <tr>
                            <th>Requester First Name</th>
                            <th>Requester Last Name</th>
                            <th>Blood Group</th>
                            <th>Requested Units</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Blood Bank Name</th>
                            <th>Blood Bank City</th>
                            <th>Blood Bank Zip Code</th>
                            <th>Blood Bank State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.requesterRequestId}>
                                <td>{request.requester.requesterFirstName}</td>
                                <td>{request.requester.requesterLastName}</td>
                                <td>{request.requester.bloodGroup}</td>
                                <td>{request.requester.requiredUnits}</td>
                                <td>{request.status}</td>
                                <td>{request.date}</td>
                                <td>{request.bloodbank.bloodBankName}</td>
                                <td>{request.bloodbank.city}</td>
                                <td>{request.bloodbank.zipcode}</td>
                                <td>{request.bloodbank.state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <ToastContainer />
            <br/> <br/> <br/>
        </div>
    );
};

export default CheckStatus;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../Css/ViewRequests.css';
 
// const CheckStatus = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
 
//     try {
// const response = await axios.get('http://localhost:1234/api/v1/bbms/requesterrequest/allrequesterrequest');
//       const filteredRequests = response.data.filter(request => request.requester.phone === mobileNumber);
     
//       if (filteredRequests.length === 0) {
//         toast.error('Invalid mobile number', {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
       
//         });
//       } else {
//         toast.success('Success', {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
       
//         });
//       }
     
//       setRequests(filteredRequests);
//     } catch (err) {
//       setError(err.message);
//       toast.error('An error occurred. Please try again.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//   <div >
//             <marquee behavior="scroll" direction="left" scrollamount="8">Please enter the required information!!</marquee>

//     <div className="formm-container">
//     <h1 className='hee'>Check Status</h1>
//     <br/>
//       <div className='formm-group'>
     
//       <br/>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="mobileNumber">Mobile Number:<span className='hee'>*</span></label>
//           <input
//             type="text"
//             id="mobileNumber"
//             placeholder='Enter the mobile number'
//             maxLength={10}
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             required
//           />
//         </div>
        
//         <br/>
       
//         <button type="submit" className='button' disabled={loading}>Submit</button>
//       </form>
//       <div/></div>
//       </div><br/><br/>
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       {requests.length > 0 && (
//         <table className="status-table">
//           <thead>
//             <tr>
//               <th>Requester First Name</th>
//               <th>Requester Last Name</th>
//               <th>Blood Group</th>
//               <th>Requested Units</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Blood Bank Name</th>
//               <th>Blood Bank City</th>
//               <th>Blood Bank Zip Code</th>
//               <th>Blood Bank State</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map(request => (
//               <tr key={request.requesterRequestId}>
//                 <td>{request.requester.requesterFirstName}</td>
//                 <td>{request.requester.requesterLastName}</td>
//                 <td>{request.requester.bloodGroup}</td>
//                 <td>{request.requester.requiredUnits}</td>
//                 <td>{request.status}</td>
//                 <td>{request.date}</td>
//                 <td>{request.bloodbank.bloodBankName}</td>
//                 <td>{request.bloodbank.city}</td>
//                 <td>{request.bloodbank.zipcode}</td>
//                 <td>{request.bloodbank.state}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
       
//       )}
//       <ToastContainer />
//       <br/> <br/> <br/>
//     </div>
//   );
// };
 
// export default CheckStatus;