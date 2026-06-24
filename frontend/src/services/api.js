/**
 * Cliente HTTP basado en Axios para comunicarse con el backend.
 * Configura la URL base de la API y un interceptor que adjunta
 * automáticamente el token JWT en cada request protegido.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
