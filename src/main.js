import { createApp } from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from "vue-router";
import './main.css';

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [ ],
})

const app = createApp(App);
app.use(router);
app.mount('#app');