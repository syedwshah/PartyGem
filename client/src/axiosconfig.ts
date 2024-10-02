import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  // You can add other default configurations here
});

// Request interceptor to add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or retrieve from secure storage
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration or other errors
    if (error.response.status === 401) {
      // Optionally logout the user or refresh the token
    }
    return Promise.reject(error);
  }
);

export default instance;
