import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const [messages, setMessages] = useState("");

  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/customers/register", formData);
      setMessages(response.data.messages || "Registration successful!");
      toast.success("Registration is done successfully");
    
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      setMessages(errorMsg);
      toast.error("Failed to register the user");
    }
  };

  return (
    <div className="page-container">
     
      <Navbar />
      <h1 className="heading">Welcome To The Registration Page</h1>
      <div className="form-container">
        
        <form onSubmit={submitHandler} className="form">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your Name"
            value={formData.name}
            onChange={changeHandler}
            className="input"
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email ID"
            value={formData.email}
            onChange={changeHandler}
            className="input"
          />
          <label className="label">Contact</label>
          <input
            type="text"
            name="phone"
            required
            placeholder="Enter your contact number"
            value={formData.phone}
            onChange={changeHandler}
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={changeHandler}
            className="input"
          />
          <button type="submit" className="button">Register</button>
        </form>
        <div className="login-link">
          <p>Already Registered? <a href="/login">Directly Login</a></p>
        </div>
        {messages && <p className="message">{messages}</p>}
      </div>
    </div>
  );
};

export default Register;
