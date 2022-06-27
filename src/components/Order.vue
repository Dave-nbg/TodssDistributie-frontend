<script setup>
import { defineProps } from "vue";
import OrderService from "../services/OrderService.js";

const orderService = new OrderService();

const props = defineProps({
    order: Object
});
const emit = defineEmits(["refresh"]);


async function prepareOrder() {
    await orderService.setOrderStatus(props.order.id, "PREPARING");
    emit("refresh");
}

async function pendOrder() {
    await orderService.setOrderStatus(props.order.id, "PENDING");
    emit("refresh");
}

async function finishOrder() {
    await orderService.setOrderStatus(props.order.id, "DONE");
    emit("refresh");
    //new Audio('/scream.mp3').play();
}

async function deleteOrder() {
    await orderService.deleteOrder(props.order.id);    
    emit("refresh")
}
</script>

<template>
    <div class="w-40 ml-3 mt-5">
        <div class="flex justify-between">
            <span>Tafel 1</span>
            <button @click="pendOrder" v-if="props.order.status === 'PREPARING'" class="bg-violet-400 hover:bg-violet-500">Terug zetten</button>
        </div>

        <div class="flex flex-col border-2 border-black">
            <ul>
                <li v-for="orderItem in props.order.orderItems" class="underline">{{ orderItem.amount }}x {{ orderItem.dishName }}</li>
            </ul>

            <button @click="prepareOrder" v-if="props.order.status === 'PENDING'" class="mt-1 grow bg-slate-400 hover:bg-slate-500">
                Word bereid
            </button>
            <button @click="finishOrder" v-if="props.order.status === 'PREPARING'" class="mt-1 grow bg-slate-400 hover:bg-slate-500">
                Klaar
            </button>
            <button @click="deleteOrder" v-if="props.order.status === 'DONE'" class="mt-1 grow bg-slate-400 hover:bg-slate-500">
                Verwijder
            </button>
        </div>
    </div>
</template>