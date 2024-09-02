<template>
    <header class="header">
        <div class="container">
            <nav class="header-nav">
                <router-link to="/">Главная</router-link>
                <router-link to="/convert">Конвертация</router-link>
                <CurrencyDropdown
                    v-model="baseCurrency"
                    :currencies="currencies"
                    @update:modelValue="updateBaseCurrency"
                />
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import CurrencyDropdown from '@/components/CurrencyDropdown.vue';

const currencies = ['USD', 'EUR', 'RUB'];
const baseCurrency = ref('RUB');

const emit = defineEmits(['update:baseCurrency']);

function updateBaseCurrency(newCurrency) {
    baseCurrency.value = newCurrency;
    emit('update:baseCurrency', newCurrency);
}
</script>

<style scoped>
.header {
    border-bottom: 1px;
    box-shadow: 0px 1px 0px 0px rgba(17, 17, 17, 0.1);
}

.container {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;

    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;

    padding: 25px;
}

.header-nav {
    display: flex;
    gap: 50px;
    align-items: center;
}

/* .header-select {
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
} */

a {
    text-decoration: none;
    color: black;
}
</style>
