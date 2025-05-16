<!-- src/views/ChaussureView.vue -->
<template>
    <div class="chaussure-page">
      <h1 class="title">Catalogue des Sacs</h1>
  
      <div v-if="!isAuthenticated" class="alert">
        <p>🔒 Vous devez être connecté pour commander.</p>
        <RouterLink to="/login" class="login-link">Se connecter</RouterLink>
      </div>
  
      <div class="chaussure-list">
        <div
          v-for="(chaussure, index) in chaussures"
          :key="index"
          class="chaussure-card"
        >
          <img :src="chaussure.image" :alt="chaussure.nom" class="chaussure-image" />
          <h2 class="chaussure-name">{{ chaussure.nom }}</h2>
          <p class="chaussure-prix">{{ chaussure.prix }} €</p>
          <button @click="acheter(chaussure)" class="buy-button">Acheter</button>
        </div>
      </div>
    </div>
    <footer>Copy right| OTOROU Sikirou</footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth'
  
  // Importe tes images locales
  import image1 from '@/assets/sac11.jpeg';
  import image2 from '@/assets/sac2.jpeg';
  import image3 from '@/assets/sac3.jpeg';
  import image4 from '@/assets/sac4.jpeg';
  import image5 from '@/assets/sac5.jpeg';
  import image6 from '@/assets/sac6.jpeg';
  import image7 from '@/assets/sac7.jpeg';
  import image8 from '@/assets/sac8.jpeg';
  import image9 from '@/assets/sac9.jpeg';
  import image10 from '@/assets/sac10.jpeg';
  const authStore = useAuthStore()
  const isAuthenticated = ref(!! authStore.value);
  
  const chaussures = ref([
    {
      nom: 'Nike Air Max',
      prix: 120,
      image: image1,
    },
    {
      nom: 'Adidas Ultra Boost',
      prix: 150,
      image: image2,
    },
    {
      nom: 'Puma RS-X',
      prix: 100,
      image: image3,
    },
    {
      nom: 'Reebok Classic',
      prix: 110,
      image: image4,
    },
    {
      nom: 'New Balance 990',
      prix: 140,
      image: image5,
    },
    {
      nom: 'Vans Old Skool',
      prix: 90,
      image: image6,
    },
  
    {
      nom: 'Nike Air Max',
      prix: 120,
      image: image7,
    },
    {
      nom: 'Adidas Ultra Boost',
      prix: 150,
      image: image8,
    },
    {
      nom: 'Puma RS-X',
      prix: 100,
      image: image9,
    },
    {
      nom: 'Reebok Classic',
      prix: 110,
      image: image10,
    },
  
  ]);
  
  function acheter(chaussure) {
    alert(`Merci pour votre achat de ${chaussure.nom} à ${chaussure.prix} € !`);
  }
  </script>
  
  
  <style scoped>
  .chaussure-page {
    padding: 3rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
    min-height: 100vh;
    border-radius: 1rem;
    animation: fadeIn 2s ease-in-out;
    animation: slideIn 2s forwards;
  }
  
  .title {
    text-align: center;
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 2.5rem;
    color: #1f2937;
    letter-spacing: -0.5px;
  }
  
  .alert {
    background-color: #fde68a;
    border: 1px solid #f59e0b;
    padding: 1rem 2rem;
    text-align: center;
    margin-bottom: 2rem;
    border-radius: 0.75rem;
    font-weight: 500;
    color: #92400e;
    font-size: 1.1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
  
  .login-link {
    display: inline-block;
    margin-top: 1rem;
    background-color: #3b82f6;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 0.75rem;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }
  
  .login-link:hover {
    background-color: #2563eb;
  }
  
  .chaussure-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
  }
  
  .chaussure-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem 1rem;
    text-align: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeIn 2s ease-in-out;
    animation: slideIn 2s 0.5s forwards;
  }
  
  .chaussure-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
  }
  
  .chaussure-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    margin-bottom: 1rem;
    border-radius: 0.75rem;
    animation: fadeIn 2s ease-in-out;
  }
  
  .chaussure-name {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #374151;
    animation: fadeIn 2s ease-in-out;
  }
  
  .chaussure-prix {
    font-size: 1.2rem;
    font-weight: 600;
    color: #10b981;
    margin-bottom: 1rem;
    animation: fadeIn 2s ease-in-out;
  }
  
  .btn-acheter {
    background-color: #22c55e;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-acheter:hover {
    background-color: #16a34a;
  }
  @keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
  </style>

  