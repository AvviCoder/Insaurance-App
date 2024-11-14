import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';  // Import the CSS file
import Navbar from '../Components/Navbar';
import toast, {Toaster} from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/customers/login", { email, password });
            localStorage.setItem("token", response.data.token);
            toast.success("User loggedin successfully")
            navigate("/userDashboard");
        } catch (error) {
            toast.error("User is not able to login")
            console.error("Unable to send the request", error.response.data);
        }
    };

    return (

        <div className="page-container">
            <Toaster/>
            <Navbar/>
            <h1 className='heading'>Welcome to the Login Page !</h1>
            <div className="form-container">
                <form onSubmit={submitHandler} className="form">
                    <label className="label">Email</label>
                    <input
                        type='email'
                        required
                        value={email}
                        placeholder='Enter your registered email'
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    <label className="label">Password</label>
                    <input
                        type='password'
                        required
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                    <button type='submit' className="button">Login</button>
                </form>
                <div>
                    <p>Not yet Registered..? <a href='/register'>Get Registered</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
