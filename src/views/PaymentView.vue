<template>
  <div class="payment">
    <h2>Paiement pour : {{ nom }}</h2>
    <p>Prix : {{ prix }} €</p>

    <div v-if="nom && prix" class="payment-options">
      <h3>Choisir le moyen de paiement</h3>
      <button @click="payerMobile">Payer avec mobile</button>
      <button @click="payerBanque">Payer par carte bancaire</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nom = ref('')
const prix = ref(0)

onMounted(() => {
  const item = JSON.parse(localStorage.getItem('pendingPurchase'))
  console.log('Données du produit en attente:', item)  // Affiche les données récupérées

  if (item && item.nom && item.prix) {
    nom.value = item.nom  // Récupère 'nom' et 'prix'
    prix.value = item.prix
  } else {
    // Redirection sécurisée si aucun item en attente
    alert('Aucun produit en attente de paiement.')
    router.push('/')
  }
})


function payerMobile() {
  alert(`Paiement mobile effectué pour ${nom.value} à ${prix.value} € !`)
  localStorage.removeItem('pendingPurchase')
  router.push('/')
}

function payerBanque() {
  alert(`Paiement bancaire effectué pour ${nom.value} à ${prix.value} € !`)
  localStorage.removeItem('pendingPurchase')
  router.push('/')
}
</script>

<style scoped>
.payment {
  padding: 20px;
  text-align: center;
}

.payment-options {
  margin-top: 20px;
}

button {
  padding: 0.8rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2563eb;
}
</style>
