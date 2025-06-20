import axios from 'axios';

// Create a new axios instance instead of modifying the default
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
instance.interceptors.request.use(config => {
  // You can add auth tokens here if needed
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    // Handle unauthorized errors
    window.location.href = '/home'; // Or your login route
  }
  return Promise.reject(error);
});

export default instance;