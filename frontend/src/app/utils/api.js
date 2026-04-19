import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Don't show toast for 401s on initial load (optional, but good for UX)
    if (error.response?.status !== 401) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
