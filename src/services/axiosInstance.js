// src/utils/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Note le slash final
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Intercepteur de requête pour ajouter le token JWT dans l'en-tête Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    // Récupérez le token depuis le localStorage (ou autre mécanisme de stockage)
    const token = localStorage.getItem('access_token');
    console.log('token', token);
    if (token) {
      // Ajoutez le token dans l'en-tête Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
