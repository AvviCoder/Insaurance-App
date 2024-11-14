import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional CSS file for styling
import Logo from "../assets/Logo2.jpg"

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">
        <a href='/'>
        <img src={Logo} className='logo'></img></a>
      </h2>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/userDashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
