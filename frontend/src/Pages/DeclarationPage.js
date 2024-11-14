import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeclarationPage.css';
import Navbar from '../Components/Navbar';
import toast from "react-hot-toast";
const DeclarationPage = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();

    const handleAgreeChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAgreed) {
            toast.success("CONGRATULATIONS, you insurance policy has been successfully issued. Please check your email to get acknowledgment of Submission of applicaiton")
            navigate('/');
        } else {
            toast.error("Please agree to the terms and conditions to proceed.");
        }
    };

    return (
        <div className="declaration-container">
            <Navbar/>
            <h1 className="declaration-title">Declaration</h1>

            <section className="policy-section">
                <h2>Insurance Company Policies</h2>
                <ul>
                    <li>Policy 1: All claims must be submitted within 30 days of the incident.</li>
                    <li>Policy 2: Premiums must be paid on time to avoid policy cancellation.</li>
                    <li>Policy 3: The insured must provide accurate information during policy application.</li>
                    <li>Policy 4: In case of policy termination, a written notice is required.</li>
                    <li>Policy 5: The company holds the right to amend the policies with prior notification.</li>
                </ul>
            </section>

            <form onSubmit={handleSubmit} className="declaration-form">
                <label className="agreement-label">
                    <input 
                        type="checkbox" 
                        checked={isAgreed} 
                        onChange={handleAgreeChange}
                    />
                    I agree to the terms and conditions of the insurance policy.
                </label>
                
                <button type="submit" className="submit-button">
                    Proceed
                </button>
            </form>
        </div>
    );
};

export default DeclarationPage;
