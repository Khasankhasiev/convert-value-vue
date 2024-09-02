<template>
    <div id="app">
        <Header
            @update:baseCurrency="updateBaseCurrency"
            :baseCurrency="baseCurrency"
        />
        <router-view :baseCurrency="baseCurrency"></router-view>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';

const baseCurrency = ref('RUB');

function updateBaseCurrency(newCurrency) {
    baseCurrency.value = newCurrency;
}
</script>

<style scoped>
#app {
    font-family: 'Montserrat', sans-serif;
}
</style>
