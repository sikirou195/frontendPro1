<template>
    <header class="header-bar">
      <div class="container">
        <div class="logo">
          👗 <span>Boutique Mode</span>
        </div>
  
        <!-- Menu desktop -->
        <nav class="nav-links">
     <router-link to="/">Accueil</router-link>
        <router-link to="/login">🔐 Connexion</router-link>
        <router-link to="/users" >🔐 Liste utilisteurs</router-link>
        <router-link to="/products" >📝 Liste produits</router-link>
        <router-link to="/payments" >📦 Liste payements</router-link>
        <router-link to="/orders" >📬 Liste commandes</router-link>
        </nav>
  
        <!-- Burger icon mobile -->
        <div class="burger" @click="toggleMenu">
          ☰
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/" @click="closeMenu">Accueil</router-link>
        <router-link to="/login" @click="closeMenu">🔐 Connexion</router-link>
        <router-link to="/users" @click="closeMenu">🔐 Liste utilisteurs</router-link>
        <router-link to="/products" @click="closeMenu">📝 Liste produits</router-link>
        <router-link to="/payments" @click="closeMenu">📦 Liste payements</router-link>
        <router-link to="/orders" @click="closeMenu">📬 Liste commandes</router-link>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderBar1',
    data() {
      return {
        menuOpen: false
      }
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      closeMenu() {
        this.menuOpen = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .header-bar {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    padding: 15px 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  
  .logo span {
    margin-left: 8px;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }
  
  .nav-links a:hover {
    opacity: 0.8;
  }
  
  .burger {
    display: none;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  /* Menu mobile */
  .mobile-menu {
    display: flex;
    flex-direction: column;
    background-color: #2575fc;
    padding: 10px 20px;
  }
  
  .mobile-menu a {
    color: white;
    padding: 10px 0;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .mobile-menu a:last-child {
    border-bottom: none;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    .burger {
      display: block;
    }
  }
  </style>
  