import axios from 'axios';

let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Ensure the baseUrl ends with /api
if (!baseUrl.endsWith('/api')) {
  baseUrl = baseUrl.endsWith('/') ? `${baseUrl}api` : `${baseUrl}/api`;
}

const API = axios.create({
  baseURL: baseUrl,
});

// Add a request interceptor to include the token in every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
