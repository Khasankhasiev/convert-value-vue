<template>
    <div class="home">
        <div class="container">
            <h1 class="home-header">
                Курсы валют относительно {{ baseCurrency }}
            </h1>
            <div v-if="loading" class="loading">Ожидайте...</div>
            <ul v-else class="home-list">
                <li v-for="(rate, currency) in filteredRates" :key="currency">
                    1 {{ currency }} = {{ rate.toFixed(2) }} {{ baseCurrency }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import CurrencyService from '@/services/CurrencyService';

const props = defineProps(['baseCurrency']);

const loading = ref(true);
const filteredRates = ref({});

const targetCurrencies = ['USD', 'EUR', 'RUB'];

async function fetchExchangeRates() {
    try {
        loading.value = true;

        const rates = await CurrencyService.getFilteredExchangeRates(
            props.baseCurrency,
            targetCurrencies
        );

        filteredRates.value = rates;

        loading.value = false;
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
        loading.value = false;
    }
}

onMounted(fetchExchangeRates);

watchEffect(() => {
    fetchExchangeRates();
});
</script>

<style scoped>
.container {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
}

.home-header {
    text-align: center;
    margin-bottom: 50px;
}

.home-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 24px;
}

.home-list li {
    list-style: none;
}

.loading {
    font-size: 1.5rem;
    color: #555;
    text-align: center;
    margin-top: 20px;
}
</style>
