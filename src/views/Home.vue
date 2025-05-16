<template>
  <div class="home">
    <HeaderBar />
    <!-- Hero Section -->
    <section class="hero">
      <div class="overlay">
        <div class="hero-content">
          <h1>Bienvenue dans notre Boutique Mode</h1>
          <p> Clique sur chaque panier pour découvrir nos collections exclusives !</p>
          
        </div>
      </div>
    </section>

    <!-- Grid of Links -->
   <!-- Grid of Links -->
   <section class="categories">
      <div v-for="category in categories" :key="category.name" class="card" @click="goToPage(category.route)">
        <img :src="category.image" :alt="category.name" />
        <h2> 🛒{{ category.name }}</h2>
      </div>
    </section>
    <!-- Footer -->
    <FooterBar />
  </div>
</template>

<script>
import lunetteImage from '@/assets/lunette7.jpeg';
import chapeauImage from '@/assets/chap6.jpeg';
import chaussureImage from '@/assets/image5.jpeg';
import sacImage from '@/assets/sac5.jpeg';
import jeanImage from '@/assets/jean6.jpeg';
import ceintureImage from '@/assets/ceinture2.jpeg';
import costumeImage from '@/assets/image18.jpeg';
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from '@/components/FooterBar.vue';
export default {
  name: 'HomeViews',
  components: {
    HeaderBar ,
    FooterBar
  },
  
  data() {
    return {
      categories: [
        { name: 'Lunette', route: '/lunette', image: lunetteImage },
        { name: 'Chapeau', route: '/chapeau', image: chapeauImage },
        { name: 'Chaussure', route: '/chaussure', image: chaussureImage },
        { name: 'Sac', route: '/sac', image: sacImage },
        { name: 'Jean', route: '/jean', image: jeanImage },
        { name: 'Ceinture', route: '/ceinture', image: ceintureImage },
        { name: 'Costume', route: '/costume', image: costumeImage }
      ]
    };
  },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    }
  }
};
</script>


<style scoped>
.home {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.header {
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  color: white;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.header .container {
  max-width: 800px;
  margin: 0 auto;
}

.header h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2em;
  opacity: 0.9;
}

.main-content {
  padding: 40px 20px;
  text-align: center;
}
.home {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

/* Hero with background image */
.hero {
  background-image: url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  color: #fff;
}

.hero-content h1 {
  font-size: 3em;
  margin-bottom: 0.3em;
  font-weight: bold;
}

.hero-content p {
  font-size: 1.4em;
  opacity: 0.9;
}

/* Categories Grid */
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.card h2 {
  padding: 15px 0;
  font-size: 1.2em;
  background-color: #f8f8f8;
  margin: 0;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px;
  background: #222;
  color: #fff;
}
</style>
