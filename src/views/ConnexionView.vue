<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value
    });

    // Stocker le token (ou flag) dans localStorage
    localStorage.setItem('token', response.data.access_token);

    // Rediriger vers paiement si un achat était en attente
    const pending = localStorage.getItem('pendingPurchase');
    if (pending) {
      router.push('/payment');
    } else {
      router.push('/'); // Sinon retour à l'accueil
    }
  } catch (error) {
    errorMessage.value = 'Email ou mot de passe invalide';
    console.error('Erreur de connexion:', error.response?.data || error);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
