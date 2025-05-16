<template>
  <div class="order-list">
    <h1>Liste des Commandes</h1>
    <div v-if="orders.length === 0" class="empty">Aucune commande trouvée</div>
    <div class="orders-grid">
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card"
      >
        <header class="card-header">
          <h3>Commande #{{ order.id }}</h3>
          <span :class="['status-badge', order.status.toLowerCase()]">
            {{ order.status }}
          </span>
        </header>
        <div class="card-body">
          <p><strong>Produit :</strong> {{ order.product.name }}</p>
          <p><strong>Quantité :</strong> {{ order.quantity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderListView',
  data() {
    return {
      orders: []
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get('http://localhost:3000/orders');
        this.orders = res.data;
      } catch (error) {
        console.error('Erreur lors du chargement des commandes', error);
      }
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.order-list {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.order-list h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.empty {
  text-align: center;
  color: #777;
  font-size: 1.1rem;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.order-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  background-color: #f7f7f7;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #222;
}

.card-body {
  padding: 1rem;
  color: #555;
  flex-grow: 1;
}

.card-body p {
  margin: 0.5rem 0;
}

/* Badges de statut */
.status-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: capitalize;
  color: #fff;
}

.status-badge.pending   { background-color: #f0ad4e; }
.status-badge.shipped   { background-color: #5bc0de; }
.status-badge.delivered { background-color: #5cb85c; }
.status-badge.cancelled { background-color: #d9534f; }
</style>
