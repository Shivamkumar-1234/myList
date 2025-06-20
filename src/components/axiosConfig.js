import axios from 'axios';

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
  // Don't add cache-control headers as they cause CORS issues
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error.response?.status === 401) {
    // Redirect to home only if not already on auth-related pages
    if (!window.location.pathname.includes('/auth')) {
      window.location.href = '/home';
    }
  }
  return Promise.reject(error);
});

export default instance;