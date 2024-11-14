import React, { useState } from 'react';
import axios from 'axios';
import './DocumentUpload.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"

const DocumentUpload = () => {
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file || !documentType) {
      alert("Please select the document to be uploaded");
      setMessage("Select the document to upload");
      return;
    }

    const formData = new FormData(); // Corrected to FormData
    formData.append("DocumentType", documentType); // Fixed variable name case
    formData.append("Document", file);

    try {
    const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/api/customers/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`     
         } // This line specifies the content type of the request
         
      });
      toast.success("document uploaded successfully");
      setMessage("The documents are uploaded successfully");
      navigate("/additional-document");
    } catch (error) {
      toast.error("Unable to upload the documents, Reupload them")
      setMessage("Error occurred while uploading the document, Please reUpload the document again");
      
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Corrected to access the selected file
  };

  return (

    <div>
       <Navbar />
       <h2 className='heading'>Please Upload The Documents Here</h2>
        <div className="document-upload-container">
      <form onSubmit={submitHandler}>
        <label>
          Document Type:
          <select 
            value={documentType} 
            onChange={(e) => setDocumentType(e.target.value)} 
            className="document-type-select" // Added class name
          >
            <option value="">Select</option>
            <option value="ID-card">ID-card</option>
            <option value="Address-Proof">Address Proof</option>
          </select>
        </label>
        <br />
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="file-input" // Added class name
        /> 
        <br />
        <button type="submit" className="submit-button">Submit</button> {/* Added class name */}
        {message && <p className={`message ${message.includes("Error") ? 'error' : 'success'}`}>{message}</p>} {/* Message display */}
      </form>
    </div>
    </div>
    
  );
};

export default DocumentUpload;
