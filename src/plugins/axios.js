// src/plugins/axios.js



import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // ou ton URL d'API NestJS
});

// Ajoute un intercepteur pour ajouter le token dans les requêtes protégées
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
