<template>
  <div class="page-wrapper" :style="{ backgroundImage: 'url(' + require('@/assets/sik.jpg') + ')' }">
    <div class="overlay">
      <div class="container mx-auto px-4 py-8">
        <div class="header">
          <h1 class="text-3xl font-bold text-center mb-2">🛍️ Gestion des Produits</h1>
          <p class="text-center text-gray-600 mb-8">Interface intuitive pour gérer votre catalogue de produits</p>
        </div>

        <!-- Bouton Ajouter -->
        <div class="flex justify-end mb-6">
          <button
            @click="toggleForm"
            class="add-button"
          >
            <span v-if="!showForm">➕ Ajouter un produit</span>
            <span v-else>❌ Annuler</span>
          </button>
        </div>

        <!-- Formulaire d'ajout/mise à jour -->
        <transition name="fade">
          <div v-if="showForm" class="card mb-8 p-6">
            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="col-span-1">
                <label class="block mb-2 font-medium">Nom</label>
                <input v-model="form.name" type="text" required class="input" placeholder="Nom du produit" />
              </div>

              <div class="col-span-1">
                <label class="block mb-2 font-medium">Prix (€)</label>
                <input v-model="form.price" type="number" step="0.01" min="0" required class="input" placeholder="0.00" />
              </div>

              <div class="col-span-1">
                <label class="block mb-2 font-medium">Catégorie</label>
                <select v-model="form.category" required class="input">
                  <option disabled value="">Sélectionnez une catégorie</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="col-span-1">
                <label class="block mb-2 font-medium">Image</label>
                <input type="file" @change="handleImageUpload" class="input" accept="image/*" />
                <div v-if="form.imagePreview" class="mt-2">
                  <img :src="form.imagePreview" alt="Aperçu" class="h-24 object-contain rounded border" />
                </div>
              </div>

              <div class="col-span-2">
                <label class="block mb-2 font-medium">Description</label>
                <textarea v-model="form.description" rows="3" class="input" placeholder="Décrivez le produit..."></textarea>
              </div>

              <div class="col-span-2 flex justify-end space-x-3">
                <button type="button" @click="resetForm" class="btn btn-secondary">
                  Annuler
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ form.id ? 'Mettre à jour' : 'Ajouter' }}
                </button>
              </div>
            </form>
          </div>
        </transition>

        <!-- Tableau des produits -->
        <div class="card">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="th-cell">Image</th>
                  <th class="th-cell">Nom</th>
                  <th class="th-cell">Description</th>
                  <th class="th-cell">Prix (€)</th>
                  <th class="th-cell">Catégorie</th>
                  <th class="th-cell text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="produit in produits" :key="produit.id" class="hover:bg-gray-50 transition">
                  <td class="td-cell">
                    <img
                      v-if="produit.imageUrl"
                      :src="getImageUrl(produit.imageUrl)"
                      alt="image"
                      class="h-16 w-16 object-cover rounded border"
                    />
                    <span v-else class="text-gray-400 text-xs italic">Aucune</span>
                  </td>
                  <td class="td-cell font-medium text-gray-800">{{ produit.name }}</td>
                  <td class="td-cell text-gray-600">{{ produit.description }}</td>
                  <td class="td-cell font-semibold">{{ produit.price }} €</td>
                  <td class="td-cell">
                    <span :class="getCategoryClass(produit.category)">{{ produit.category }}</span>
                  </td>
                  <td class="td-cell text-center">
                    <div class="flex justify-center space-x-3">
                      <button @click="editProduit(produit)" class="btn-icon edit">✏️</button>
                      <button @click="deleteProduit(produit.id)" class="btn-icon delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.overlay {
  min-height: 100vh;

}

.header h1 {
  background: linear-gradient(135deg, #3498db, #8e44ad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card {
  background-color: #d3d1d1;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-left: auto;
  margin-right: auto;
  max-width: 665px; /* largeur maximale */
}


.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.15);
}

.add-button {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(46, 204, 113, 0.2);
}

.add-button:hover {
  background: linear-gradient(135deg, #27ae60, #219653);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(46, 204, 113, 0.3);
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e1e5eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2980b9, #2471a3);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(52, 152, 219, 0.3);
}

.btn-secondary {
  background-color: #e9ecef;
  color: #6c757d;
}

.btn-secondary:hover {
  background-color: #dee2e6;
  color: #495057;
}

.th-cell {
 
  background-color: #cacbcc;
  color: #495057;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
 
}

.td-cell {
  
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
  vertical-align: middle;
 
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.btn-icon.edit {
  color: #3498db;
}

.btn-icon.delete {
  color: #e74c3c;
}

.btn-icon.edit:hover {
  color: #2980b9;
  transform: scale(1.2);
}

.btn-icon.delete:hover {
  color: #c0392b;
  transform: scale(1.2);
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-electronics {
  background-color: #e3f2fd;
  color: #1565c0;
}

.badge-clothing {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.badge-food {
  background-color: #fff8e1;
  color: #ff8f00;
}

.badge-other {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>



<script>
export default {
  data() {
    return {
      produits: [],
      showForm: false,
      categories: ['CHAUSSURE', 'LUNETTE', 'CHAPEAU', 'CEINTURE', 'COSTUME', 'SAC'],
      baseUrl: 'http://localhost:3000',
      imageBaseUrl: '/uploads/',
      form: {
        id: null,
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        imagePreview: '',
        imageUrl: '',
      }
    };
  },

  mounted() {
    this.fetchProduits();
  },

  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },

    async fetchProduits() {
      try {
        const res = await fetch(`${this.baseUrl}/products`);
        const data = await res.json();
        this.produits = data;
      } catch (err) {
        console.error('Erreur chargement produits:', err);
      }
    },

    handleImageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        this.form.image = file;
        this.form.imagePreview = URL.createObjectURL(file);
      }
    },

    getImageUrl(image) {
      if (!image) return '';
      if (image.startsWith('http') || image.startsWith('data:')) return image;
      return `${this.baseUrl}${this.imageBaseUrl}${image}`;
    },

    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('description', this.form.description || '');
        formData.append('price', this.form.price);
        formData.append('category', this.form.category);
        if (this.form.image) formData.append('image', this.form.image);

        const method = this.form.id ? 'PUT' : 'POST';
        const url = this.form.id
          ? `${this.baseUrl}/products/${this.form.id}`
          : `${this.baseUrl}/products`;

        const response = await fetch(url, {
          method,
          body: formData
        });

        if (!response.ok) throw new Error('Erreur serveur');

        await this.fetchProduits();
        this.toggleForm();
      } catch (err) {
        console.error('Erreur soumission:', err);
        alert('Une erreur est survenue.');
      }
    },

    editProduit(produit) {
      this.form = {
        id: produit.id,
        name: produit.name,
        description: produit.description,
        price: produit.price,
        category: produit.category,
        image: null,
        imagePreview: this.getImageUrl(produit.imageUrl),
        imageUrl: produit.imageUrl
      };
      this.showForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async deleteProduit(id) {
      if (!confirm('Supprimer ce produit ?')) return;
      try {
        const res = await fetch(`${this.baseUrl}/products/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erreur suppression');
        await this.fetchProduits();
      } catch (err) {
        console.error(err);
        alert('Suppression échouée.');
      }
    },

    resetForm() {
      this.form = {
        id: null,
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        imagePreview: '',
        imageUrl: '',
      };
    },

    getCategoryClass(category) {
      switch (category) {
        case 'CHAUSSURE':
          return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'LUNETTE':
          return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'CHAPEAU':
          return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'CEINTURE':
          return 'bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'COSTUME':
          return 'bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-semibold';
        case 'SAC':
          return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold';
        default:
          return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold';
      }
    }
  }
};
</script>


