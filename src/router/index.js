import { createRouter, createWebHistory } from 'vue-router';

// Import avec chemins relatifs (depuis src/router vers src/views)
import HomeView             from '../views/Home.vue';
import LoginView            from '../views/LoginView.vue';
import SignupView           from '../views/SignupView.vue';
import DashboardView        from '../views/DashboardView.vue';
import UserListView         from '../views/UserListView.vue';
import ProductListView      from '../views/ProductListView.vue';
import OrderListView        from '../views/OrderListView.vue';
import PaymentListView      from '../views/PaymentListView.vue';
import JeanView         from '../views/JeanView.vue';
import LunetteView      from '../views/LunetteView.vue';
import ChaussureView    from '../views/ChaussureView.vue';
import SacView          from '../views/SacView.vue';
import ChapeauView      from '../views/ChapeauView.vue';
import CostumeView      from '../views/CostumeView.vue';
import CeintureView      from '../views/CeintureView.vue';
import ConnexionView      from '../views/ConnexionView.vue';
import PaymentView from '@/views/PaymentView.vue'
import AproposView from '@/views/AproposView.vue'
import ContactView from '@/views/ContactView.vue'
// Vérification du token
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
// Déclaration des routes
const routes = [
  { path: '/',        name: 'Home',      component: HomeView },
  { path: '/login',   name: 'Login',     component: LoginView },
  { path: '/signup',  name: 'Signup',    component: SignupView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: UserListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrderListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: PaymentListView,
    meta: { requiresAuth: true }
  },
  { path: '/contact',       name: 'Contact',       component: ContactView, },
  { path: '/apropos',       name: 'Apropos',       component: AproposView, },
  { path: '/jean',       name: 'Jean',       component: JeanView,       },
  { path: '/lunette',    name: 'Lunette',    component: LunetteView,    },
  { path: '/chaussure',  name: 'Chaussure',  component: ChaussureView,   },
  { path: '/sac',        name: 'Sac',        component: SacView,         },
  { path: '/chapeau',    name: 'Chapeau',    component: ChapeauView,    },
  { path: '/costume',    name: 'Costume',    component: CostumeView,     },
  { path: '/ceinture',       name: 'Ceinture',       component: CeintureView,       },
  { path: '/connexion',   name: 'Connexion',     component: ConnexionView },
  { path: '/payment', name: 'payment', component: PaymentView },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global pour les routes privées
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
