import React, { useState } from 'react';
import "./AdditionalDocUpload.css";
import axios from "axios";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const AdditionalDocUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const changeFileHandler = (e) => {
        setSelectedFile(e.target.files[0]); // Correctly access the file using 'files' property
    };
    
    const submitHandler = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append('Document', selectedFile);

            const res = await axios.post("http://localhost:4000/api/customers/upload", formData, {
                headers: { "content-type": "multipart/form-data" }
            });
            toast.success("Additional document is successfully uploaded");
            navigate("/DeclarationPage")

        } catch (error) {
            toast.error("Error occurred, Re-Upload the document");
        }
    }

    return (
        <div className="upload-container">
            <Navbar />
            <h1 className="upload-title">Upload your additional Required Document...</h1>
            <form onSubmit={submitHandler} className="upload-form">
                <label className="upload-label">
                    Upload your PAN card:
                    <input
                        type='file'
                        className="upload-input"
                        placeholder='Browse file from machine'
                        onChange={changeFileHandler}
                    />
                </label>
                <button type='submit' className="upload-button">
                    Upload
                </button>
            </form>
        </div>
    )
}

export default AdditionalDocUpload;
