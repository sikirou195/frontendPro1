<template>
  <div class="payment-list">
    <h1>Liste des Paiements</h1>
    <div v-if="payments.length === 0" class="empty">Aucun paiement trouvé</div>
    <div class="payments-grid">
      <div
        v-for="payment in payments"
        :key="payment.id"
        class="payment-card"
      >
        <header class="card-header">
          <h3>Paiement #{{ payment.id }}</h3>
          <span :class="['status-badge', payment.status.toLowerCase()]">
            {{ payment.status }}
          </span>
        </header>
        <div class="card-body">
          <p><strong>Montant :</strong> {{ payment.amount }} €</p>
          <p><strong>Date :</strong> {{ new Date(payment.createdAt).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PaymentListView',
  data() {
    return {
      payments: []
    };
  },
  methods: {
    async fetchPayments() {
      try {
        const res = await axios.get('http://localhost:3000/payments');
        this.payments = res.data;
      } catch (error) {
        console.error('Erreur lors du chargement des paiements', error);
      }
    }
  },
  mounted() {
    this.fetchPayments();
  }
};
</script>

<style scoped>
.payment-list {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.payment-list h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.empty {
  text-align: center;
  color: #777;
  font-size: 1.1rem;
}

.payments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.payment-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.payment-card:hover {
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
.status-badge.completed { background-color: #5cb85c; }
.status-badge.failed    { background-color: #d9534f; }
.status-badge.refunded  { background-color: #5bc0de; }
</style>
