import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:1234/api/v1/bbms/requester/allrequesters');
        
        let approvedRequests;
        let rejectedRequests;
   
        try {
          approvedRequests = JSON.parse(localStorage.getItem('approvedRequests')) || [];
        } catch (e) {
          approvedRequests = [];
        }
   
        try {
          rejectedRequests = JSON.parse(localStorage.getItem('rejectedRequests')) || [];
        } catch (e) {
          rejectedRequests = [];
        }
   
        // Ensure both are arrays
        if (!Array.isArray(approvedRequests)) {
          approvedRequests = [];
        }
        if (!Array.isArray(rejectedRequests)) {
          rejectedRequests = [];
        }
        
        const pendingRequests = response.data.filter(request => {
          const isApproved = approvedRequests.some(approved => approved.requesterId === request.requesterId);
          const isRejected = rejectedRequests.some(rejected => rejected.requesterId === request.requesterId);
          return !isApproved && !isRejected;
        });
   
        setRequests(pendingRequests);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
   
    fetchRequests();
  }, []);
 
  const handleAccept = async (id, bloodGroupType, requiredUnits) => {
    try {
const bloodBankResponse = await axios.get(`http://localhost:1234/api/v1/bbms/bloodgroup/bloodGroup/${bloodGroupType}`);
      const availableUnits = bloodBankResponse.data.unit;
      const bloodBankBloodGroup = bloodBankResponse.data.bloodGroupType;
 
      if (bloodBankBloodGroup !== bloodGroupType) {
        toast.error(`Blood group ${bloodGroupType} currently unavailable.`);
        return;
      }
 
      if (availableUnits < requiredUnits) {
        toast.error(`Insufficient units of blood group ${bloodGroupType} in the blood bank.`);
        return;
      }
 
await axios.put(`http://localhost:1234/api/v1/bbms/admin/status/approve/${id}`);
      toast.success('Request approved successfully.');
 
      const updatedRequests = requests.filter(request => request.requesterId !== id);
      setRequests(updatedRequests);
 
      const approvedRequests = JSON.parse(localStorage.getItem('approvedRequests')) || [];
      const approvedRequest = { ...requests.find(request => request.requesterId === id), status: 'Approved' };
      localStorage.setItem('approvedRequests', JSON.stringify([...approvedRequests, approvedRequest]));
 
    } catch (err) {
      console.error('Error approving request:', err);
      toast.error('An error occurred while approving the request.');
    }
  };
 
  const handleReject = async (id) => {
    try {
await axios.put(`http://localhost:1234/api/v1/bbms/admin/status/reject/${id}`);
toast.info('Request rejected.');
 
      const updatedRequests = requests.filter(request => request.requesterId !== id);
      setRequests(updatedRequests);
 
      const rejectedRequests = JSON.parse(localStorage.getItem('rejectedRequests')) || [];
      const rejectedRequest = { ...requests.find(request => request.requesterId === id), status: 'Rejected' };
      localStorage.setItem('rejectedRequests', JSON.stringify([...rejectedRequests, rejectedRequest]));
 
    } catch (err) {
      console.error('Error rejecting request:', err);
      toast.error('An error occurred while rejecting the request.');
    }
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div className="requests-container" >
      <h1>All Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Blood Group</th>
              <th>Requested Units</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.requesterId}>
                <td>{request.requesterId}</td>
                <td>{request.requesterFirstName}</td>
                <td>{request.requesterLastName}</td>
                <td>{request.address}</td>
                <td>{request.bloodGroup}</td>
                <td>{request.requiredUnits}</td>
                {/* <td>{request.status}</td> */}
                <td>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'green' }}
                      onClick={() => handleAccept(request.requesterId, request.bloodGroup, request.requiredUnits)}
                      disabled={request.status === 'Approved' || request.status === 'Rejected'}
                    >
                      <FaCheck />
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'red' }}
                      onClick={() => handleReject(request.requesterId)}
                      disabled={request.status === 'Approved' || request.status === 'Rejected'}
                    >
                      <FaTimes />
                      Reject
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}<br/><br/><br/><br/><br/><br/>
      <ToastContainer />
    </div>
  );
};
 
export default ViewRequests;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';
 
// const ViewRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
// const response = await axios.get('http://localhost:1234/api/v1/bbms/requester/allrequesters');
//         let approvedRequests = JSON.parse(localStorage.getItem('approvedRequests')) || [];
//         let rejectedRequests = JSON.parse(localStorage.getItem('rejectedRequests')) || [];
//         if (!Array.isArray(approvedRequests)) approvedRequests = [];
//         if (!Array.isArray(rejectedRequests)) rejectedRequests = [];
 
//         const pendingRequests = response.data.filter(request => {
//           const isApproved = approvedRequests.some(approved => approved.requesterId === request.requesterId);
//           const isRejected = rejectedRequests.some(rejected => rejected.requesterId === request.requesterId);
//           return !isApproved && !isRejected;
//         });
 
//         setRequests(pendingRequests);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
 
//     fetchRequests();
//   }, []);
 
//   const sendSMS = async (phoneNumber, message) => {
//     try {
//       await axios.post('http://localhost:1234/api/v1/bbms/otp/send-sms', { phoneNumber, message });
//       toast.success('SMS sent successfully.');
//     } catch (err) {
//       //toast.error('Failed to send SMS.');
//     }
//   };
 
//   const handleAccept = async (id, bloodGroupType, requiredUnits, phoneNumber) => {
//     try {
// const bloodBankResponse = await axios.get(`http://localhost:1234/api/v1/bbms/bloodgroup/bloodGroup/${bloodGroupType}`);
//       const availableUnits = bloodBankResponse.data.unit;
//       const bloodBankBloodGroup = bloodBankResponse.data.bloodGroupType;
 
//       if (bloodBankBloodGroup !== bloodGroupType) {
//         toast.error(`Blood group ${bloodGroupType} currently unavailable.`);
//         return;
//       }
 
//       if (availableUnits < requiredUnits) {
//         toast.error(`Insufficient units of blood group ${bloodGroupType} in the blood bank.`);
//         return;
//       }
 
//       await axios.put(`http://localhost:1234/api/v1/bbms/admin/status/approve/${id}`);
//       toast.success('Request approved successfully.');
 
//       const updatedRequests = requests.filter(request => request.requesterId !== id);
//       setRequests(updatedRequests);
 
//       const approvedRequests = JSON.parse(localStorage.getItem('approvedRequests')) || [];
//       const approvedRequest = { ...requests.find(request => request.requesterId === id), status: 'Approved' };
//       localStorage.setItem('approvedRequests', JSON.stringify([...approvedRequests, approvedRequest]));
 
//       // Send SMS
//       const message = `Your request with ID: ${id} for Blood Group ${bloodGroupType} has been approved. Please collect your blood units in respective BloodBank`;
//       sendSMS(phoneNumber, message);
//     } catch (err) {
//       console.error('Error approving request:', err);
//       toast.error('An error occurred while approving the request.');
//     }
//   };
 
//   const handleReject = async (id, phoneNumber) => {
//     try {
//     await axios.put(`http://localhost:1234/api/v1/bbms/admin/status/reject/${id}`);
//     toast.info('Request rejected.');
 
//       const updatedRequests = requests.filter(request => request.requesterId !== id);
//       setRequests(updatedRequests);
 
//       const rejectedRequests = JSON.parse(localStorage.getItem('rejectedRequests')) || [];
//       const rejectedRequest = { ...requests.find(request => request.requesterId === id), status: 'Rejected' };
//       localStorage.setItem('rejectedRequests', JSON.stringify([...rejectedRequests, rejectedRequest]));
 
//       // Send SMS
//       const message = `Your request with ID: ${id} has been rejected due to inavailability. We regret for this inconvenience!`;
//       sendSMS(phoneNumber, message);
//     } catch (err) {
//       console.error('Error rejecting request:', err);
//       toast.error('An error occurred while rejecting the request.');
//     }
//   };
 
//   if (loading) {
//     return <div>Loading...</div>;
//   }
 
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
 
//   return (
//     <div className="requests-container">
//       <h1>All Requests</h1>
//       {requests.length === 0 ? (
//         <p>No pending requests found.</p>
//       ) : (
//         <table className="requests-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Address</th>
//               <th>Blood Group</th>
//               <th>Requested Units</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map(request => (
//               <tr key={request.requesterId}>
//                 <td>{request.requesterId}</td>
//                 <td>{request.requesterFirstName}</td>
//                 <td>{request.requesterLastName}</td>
//                 <td>{request.address}</td>
//                 <td>{request.bloodGroup}</td>
//                 <td>{request.requiredUnits}</td>
//                 <td>
//                   <Stack direction="row" spacing={1}>
//                     <Button
//                       variant="contained"
//                       style={{ backgroundColor: 'green' }}
//                       onClick={() => handleAccept(request.requesterId, request.bloodGroup, request.requiredUnits, request.phoneNumber)}
//                       disabled={request.status === 'Approved' || request.status === 'Rejected'}
//                     >
//                       <FaCheck />
//                       Approve
//                     </Button>
//                     <Button
//                       variant="contained"
//                       style={{ backgroundColor: 'red' }}
//                       onClick={() => handleReject(request.requesterId, request.phoneNumber)}
//                       disabled={request.status === 'Approved' || request.status === 'Rejected'}
//                     >
//                       <FaTimes />
//                       Reject
//                     </Button>
//                   </Stack>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };
 
// export default ViewRequests;

