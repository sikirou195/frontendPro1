<template>
    <div class="container">
      <h1 class="title">Liste des Commandes</h1>
      <table>
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.userId }}</td>
            <td>{{ order.productId }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ new Date(order.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from '@/plugins/axios'
  
  export default {
    name: 'OrderView',
    data() {
      return {
        orders: [],
      }
    },
    async created() {
      const response = await axios.get('/orders')
      this.orders = response.data
    },
  }
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .title {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead {
    background-color: #f0f0f0;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>
  