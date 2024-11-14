import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Navbar from '../Components/Navbar';
import homeCartoon from '../assets/HomeCartoon.png'; // Import the cartoon image

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to Automated Insurance Policy <br/> Onboarding System</h1>
        <div className="home-links">
          {/* <Link to="/register" className="btn">Register</Link> */}
          <Link to="/login" className="btn">Login</Link>
        </div>

        {/* Floating cartoon and dialogue */}

        <a href='/register'><img src={homeCartoon} alt="cartoon" className="cartoon" /></a>
        <div className="dialogue-box">NEW USER? <br/> LET'S REGISTER! <br/>CLICK ON ME</div>
      </div>
    </div>
  );
};

export default HomePage;
