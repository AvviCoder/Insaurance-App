import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.interceptors.request.use(  // HERE'S THE AXIOS INTERCEPTOR USED FOR MAKING THE ROUTES MORE PROTECTED
  (config) => {
      const token = localStorage.getItem('token');  // Get token from localStorage
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;  // Add Authorization header
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);  // Handle error
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

