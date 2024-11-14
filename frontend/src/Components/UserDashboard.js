import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';  // Import the CSS file
import Navbar from './Navbar';
// import Cartoonleft from "../assets/CartoonLeft.png"
import toast from "react-hot-toast"
const UserDashboard = () => {
  const [kycStatus, setKycStatus] = useState('');
  const navigate = useNavigate(); // Hook to programmatically redirect

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:4000/api/kyc/kycstatus", {
          headers: { 
            Authorization: `Bearer ${token}` ,}
        });
        setKycStatus(response.data.status);

        // Redirect if the status is 'Rejected'
        if (response.data.status === 'Rejected') {
          toast.error("Your KYC has been rejected. Please re-upload your documents.");
          navigate('/Document-Upload'); // Redirect to document upload form
        }
      } catch (error) {
        // console.error("Unable to fetch the current status of KYC application of the user");
        // alert("Unable to fetch the current status");
      }
    };

    fetchStatus();
  }, [navigate]); // Add navigate as a dependency

  return (

    <div>
          <Navbar/>
          <h2 className="dashboard-heading">Welcome to the User Dashboard</h2>
          <div className="dashboard-container">
    
      {/* Display current KYC status */}
      <p className={kycStatus === 'Rejected' ? 'rejected-status' : kycStatus === 'accepted' ? 'accepted-status' : ''}>
        The current KYC status: {kycStatus || "No Docs uploaded"}
      </p>

      {/* Show Upload Document link if the KYC is not rejected */}
      {kycStatus !== 'Rejected' && (
        <a href="/Document-Upload" className="document-link">Upload the initial documents</a>
      )}

      {/* Show the additional upload link if the KYC status is accepted */}
      {kycStatus === "accepted" && (
        <div className="additional-doc-container">
          <p>Your initial KYC documents are accepted. Please move forward to upload the additional documents.</p>
          <a href="additional-document" className="document-link">Click here to move ahead and upload the additional document</a>
        </div>
      )}
{/* <img src={Cartoonleft} alt="cartoon" className="cartoon" />
<div className="dialogue-box">LET'S REGISTER! <br/>CLICK ON ME</div> */}
    </div>
    </div>

  );
};

export default UserDashboard;
