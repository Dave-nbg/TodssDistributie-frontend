<script setup>
import { ref, onMounted, computed } from "vue";
import LocationService from "../services/LocationService.js";
import OrderService from "../services/OrderService.js";
import Order from './Order.vue';

const orderService = new OrderService();
const locationService = new LocationService();

const orders = ref([]);
const pendingOrders = computed(() => orders.value.filter(order => order.status === 'PENDING'));
const preparingOrders = computed(() => orders.value.filter(order => order.status === 'PREPARING'));

const locations = ref([]);

onMounted(async () => {
    orders.value = await orderService.getOrdersForLocation(18);
    locations.value = await locationService.getLocations();
});

async function loadOrdersForLocation() {
    const locationDropdown = document.querySelector("#location-dropdown");
    const locationId = locations.value.filter(location => location.name === locationDropdown.value)[0].id;

    orders.value = await orderService.getOrdersForLocation(locationId); 
}
</script>

<template>
    <nav class="h-14 bg-slate-400">
        <form class="flex flex-col justify-center ml-2">
            <label for="location-dropdown" class="font-semibold">Locatie</label>
            <select id="location-dropdown" class="w-28" @change="loadOrdersForLocation">
                <option v-for="location in locations">{{ location.name }}</option>
            </select>
        </form>
    </nav>

    <main class="flex">
        <div class="w-2/4 border-r-2 border-black">
            <div class="ml-3 text-xl font-semibold">
                <h1>Nog te bereiden:</h1>
            </div>

            <div class="flex flex-wrap">
                <Order v-on:refresh="loadOrdersForLocation" v-for="order in pendingOrders" :order="order"></Order>
            </div>
        </div>
        <div class="w-2/4">
            <div class="ml-3 text-xl font-semibold">
                <h1>Aan het bereiden:</h1>
            </div>

            <div class="flex flex-wrap">
                <Order v-on:refresh="loadOrdersForLocation" v-for="order in preparingOrders" :order="order"></Order>
            </div>
        </div>
    </main>
</template>