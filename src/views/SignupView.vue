<template>
  <div class="form-container">
    <h2>{{ user.id ? 'Modifier' : 'Créer' }} un Utilisateur</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="user.email" required />
      </div>
      <div class="form-group" v-if="!user.id">
        <label>Mot de passe</label>
        <input type="password" v-model="user.password" required />
      </div>
      <button type="submit">{{ user.id ? 'Mettre à jour' : 'Créer' }}</button>
    <i><router-link to="/login" class="login">🔐 Se connecter</router-link></i>
    </form>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  name: 'UserForm',
  props: ['userData'],
  data() {
    return {
      user: this.userData || {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async submitForm() {
      if (this.user.id) {
        await axios.put(`/user/${this.user.id}`, this.user)
      } else {
        await axios.post('/user', this.user)
      }
      this.$emit('refresh')
    },
  },
}
</script>

<style scoped>
.form-container {
  background: #fff;
  padding: 20px;
  border: 1px solid #eee;
  max-width: 400px;
  margin: 20px auto;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 4px;
}
button {
  background: #3b82f6;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.login{
  margin-left: 70px;
}
</style>
