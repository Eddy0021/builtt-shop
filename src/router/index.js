import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/LoginPage.vue';
import Home from '../views/HomePage.vue';
import Cart from '../views/CartPage.vue';

const routes = [
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/',
    name: "Home",
    component: Home
  },
  {
    path: '/my-cart',
    name: "Cart",
    component: Cart
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
