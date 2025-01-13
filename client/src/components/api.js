import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

const api = {
  getStatuses: () => axios.get(`${API_BASE_URL}/statuses`),
  addStatus: (name) => axios.post(`${API_BASE_URL}/statuses`, { name }),
  deleteStatus: (name) => axios.delete(`${API_BASE_URL}/statuses/${name}`),

  getTransitions: () => axios.get(`${API_BASE_URL}/transitions`),
  addTransition: (name, from, to) => 
    axios.post(`${API_BASE_URL}/transitions`, { name, from, to }),
  deleteTransition: (name) => axios.delete(`${API_BASE_URL}/transitions/${name}`),

  resetConfig: () => axios.post(`${API_BASE_URL}/reset`),
  
};

export default api;
