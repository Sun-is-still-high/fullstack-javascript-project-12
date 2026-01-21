import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const fetchInitialData = async () => {
  const response = await api.get('/data');
  return response.data;
};

export const sendMessage = async (message) => {
  const response = await api.post('/messages', message);
  return response.data;
};

export default api;
