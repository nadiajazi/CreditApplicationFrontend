import axios from 'axios';

const API_BASE_URL = 'http://localhost:8882'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token:String) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
