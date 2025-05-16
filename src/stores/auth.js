// src/stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),

  actions: {
    // appel d'authentification
    async login(email, password) {
      try {
        const res = await axios.post('http://localhost:3000/auth/login', {
          email,
          password,
        });
  
        // Vérification que le token est bien présent dans la réponse
        if (res.data && res.data.accessToken) {
          this.token = res.data.accessToken;
          localStorage.setItem('token', this.token);
          
          // Redirection vers le dashboard uniquement si login réussi
          router.push('/dashboard');
          console.log('Succès', res.data);
        } else {
          throw new Error('Token non fourni dans la réponse');
        }
      }catch (error) {
        console.error('Erreur de connexion:', error.response?.data || error.message);
      }
    },
  
    logout() {
      this.token = '';
      localStorage.removeItem('token');
    },
  }  
});
