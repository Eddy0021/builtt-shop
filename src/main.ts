// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';
import router from './router';
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css'


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
