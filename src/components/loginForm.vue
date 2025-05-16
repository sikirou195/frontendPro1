<!-- src/components/LoginForm.vue -->
<template>
    <div class="login-form-container">
        <h2>Login</h2>
        <form @submit.prevent="submitLogin" class="login-form">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
            </div>

            <button type="submit">Login</button> 
            <i><router-link to="/signup" class="login">🔐 Creer un compte</router-link></i>
            <div v-if="errorMessage" class="error-message">
                <p>{{ errorMessage }}</p>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function submitLogin() {
  errorMsg.value = '';
  try {
    await auth.login(email.value, password.value);
    // redirection, toast, etc.
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Erreur de connexion';
  }
}
</script>

<style scoped>
.login-form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
    font-size: 14px;
}
.login{
  margin-left: 70px;
  margin-bottom:20px;
}
</style>