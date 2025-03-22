import axios from 'axios';

// Use environment variable or fallback to localhost:5003
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token in requests
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

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 responses (unauthorized)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.get('/auth/logout')
};

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  setCredentials: (credentials: any) => api.post('/profile/credentials', credentials),
  getAnalytics: () => api.get('/profile/analytics')
};

// Content API
export const contentAPI = {
  getUserContent: (limit = 10) => api.get(`/content?limit=${limit}`),
  scheduleContent: (contentData: any) => api.post('/content/schedule', contentData),
  getScheduledContent: () => api.get('/content/schedule'),
  updateScheduledContent: (id: string, contentData: any) => api.put(`/content/schedule/${id}`, contentData),
  deleteScheduledContent: (id: string) => api.delete(`/content/schedule/${id}`)
};

// Trends API
export const trendsAPI = {
  getTrends: () => api.get('/trends')
};

export default api;