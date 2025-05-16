<template>
             
  <div class="container" > 
    <h1>Gestion des Utilisateurs</h1>
    <button class="btn-add" @click="showForm = true">Ajouter un utilisateur</button>

    <!-- Formulaire (modale simple) -->
    <div v-if="showForm" class="modal">
      <form @submit.prevent="submitForm">
        <h2>{{ form.id ? "Modifier l'utilisateur" : "Ajouter un utilisateur" }}</h2>
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Mot de passe" required />
        <div class="btn-group">
          <button type="submit">Enregistrer</button>
          <button type="button" @click="resetForm">Annuler</button>
        </div>
      </form>
    </div>

    <!-- Tableau des utilisateurs -->
    <table>
      <thead>
        <tr>
          <th>ID</th>   
          <th>Email</th>
          <th>Date de creaction</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
          <td>
            <button @click="editUser(user)">✏️</button>
            <button @click="deleteUser(user.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const showForm = ref(false)

const form = ref({
  id: null,
  email: '',
  password: ''
})

const loadUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/user')
    users.value = res.data
  } catch (error) {
    console.error('Erreur de chargement des utilisateurs', error)
  }
}

const submitForm = async () => {
  try {
    if (form.value.id) {
      await axios.put(`http://localhost:3000/user/${form.value.id}`, form.value)
    } else {
      await axios.post('http://localhost:3000/user', form.value)
    }
    resetForm()
    await loadUsers()
  } catch (error) {
    console.error("Erreur d'ajout/mise à jour", error)
  }
}

const editUser = (user) => {
  form.value = { ...user }
  showForm.value = true
}

const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/user/${id}`)
    await loadUsers()
  } catch (error) {
    console.error('Erreur lors de la suppression', error)
  }
}

const resetForm = () => {
  form.value = { id: null, email: '', password: '' }
  showForm.value = false
}

onMounted(loadUsers)
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.modal {
  background-color: #f9f9f9;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
}

.modal input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
}
</style>
