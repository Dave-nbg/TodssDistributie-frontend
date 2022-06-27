<script setup>
import DistrubutionPage from './components/DistrubutionPage.vue';
import LoginPage from './components/LoginPage.vue';

import { ref } from "vue";

let loggedIn = ref(false)

function login() {
    loggedIn.value = true;
}
</script>

<template>
    <login-page v-if="!loggedIn" v-on:logged-in="login"></login-page>
    <distrubution-page v-else></distrubution-page>
</template>