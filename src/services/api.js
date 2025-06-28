import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add a request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle common errors like 401, 403, 500, etc.
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // You can add more error handling based on status codes
    }
    return Promise.reject(error);
  }
);

// Example API functions
const apiService = {
  // User related endpoints
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getUser: () => api.get('/user/profile'),
  
  // Resume related endpoints
  getResumes: () => api.get('/resumes'),
  getResumeById: (id) => api.get(`/resumes/${id}`),
  createResume: (resumeData) => api.post('/resumes', resumeData),
  updateResume: (id, resumeData) => api.put(`/resumes/${id}`, resumeData),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
  
  // Any other endpoints you need to interact with
  getTemplates: () => api.get('/templates'),
  generateResume: (data) => api.post('/generate', data),
};

export default apiService; 