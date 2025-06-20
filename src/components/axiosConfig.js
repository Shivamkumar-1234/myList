// src/axiosConfig.js
import axios from 'axios';

// Set default configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

// Optional: Add request interceptors
axios.interceptors.request.use(config => {
  // You can modify requests here if needed
  return config;
});

// Optional: Add response interceptors
axios.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axios;