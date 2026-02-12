import axios from 'axios'
import rollbar from '../rollbar'

const api = axios.create({
  baseURL: '/api/v1',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  (error) => {
    rollbar.error('API Error', error, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
    })
    return Promise.reject(error)
  },
)

export default api
