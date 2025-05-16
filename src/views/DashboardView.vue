<template>
  <HearderBar1 />
  <div class="dashboard">
    <h1>Tableau de Bord</h1>
    <div class="cards">
      <div class="card users">
        <h2>Utilisateurs</h2>
        <p>{{ stats.users }}</p>
      </div>
      <div class="card products">
        <h2>Produits</h2>
        <p>{{ stats.products }}</p>
      </div>
      <div class="card orders">
        <h2>Commandes</h2>
        <p>{{ stats.orders }}</p>
      </div>
      <div class="card payments">
        <h2>Paiements</h2>
        <p>{{ stats.payments }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HearderBar1 from '@/components/HearderBar1.vue';
export default {
  name: 'DashboardViews',
  components: {
    HearderBar1 ,
    
  },
  data() {
    return {
      stats: {
        user: 0,
        product: 0,
        order: 0,
        payment: 0,
      },
    };
  },
  async mounted() {
    try {
      const [usersRes, productsRes, ordersRes, paymentsRes] = await Promise.all([
        axios.get('http://localhost:3000/user'),
        axios.get('http://localhost:3000/product'),
        axios.get('http://localhost:3000/order'),
        axios.get('http://localhost:3000/payment'),
      ]);
      this.stats.users = usersRes.data.length;
      this.stats.products = productsRes.data.length;
      this.stats.orders = ordersRes.data.length;
      this.stats.payments = paymentsRes.data.length;
    } catch (error) {
      console.error('Erreur chargement dashboard', error);
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.card p {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #2c3e50;
}

.card.users { background-color: #e3f2fd; }
.card.products { background-color: #fce4ec; }
.card.orders { background-color: #e8f5e9; }
.card.payments { background-color: #fff3e0; }
</style>
