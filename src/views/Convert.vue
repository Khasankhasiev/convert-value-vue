<template>
    <div class="container">
        <h1 class="converter-header">Конвертация валют</h1>
        <div class="converter">
            <div class="row">
                <CurrencyDropdown
                    v-model="currencyFrom"
                    :currencies="currencies"
                />
                <input
                    type="number"
                    v-model.number="amountFrom"
                    @input="convertCurrency"
                />
            </div>

            <div class="row">
                <CurrencyDropdown
                    v-model="currencyTo"
                    :currencies="currencies"
                />
                <input
                    type="number"
                    v-model.number="amountTo"
                    @input="reverseConvertCurrency"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import CurrencyDropdown from '@/components/CurrencyDropdown.vue';
import CurrencyService from '@/services/CurrencyService';

const currencies = ['USD', 'EUR', 'RUB'];

const currencyFrom = ref('RUB');
const currencyTo = ref('USD');
const amountFrom = ref(1);
const amountTo = ref(0);
const exchangeRate = ref(1);

async function convertCurrency() {
    exchangeRate.value = await CurrencyService.getExchangeRate(
        currencyFrom.value,
        currencyTo.value
    );
    amountTo.value = (amountFrom.value * exchangeRate.value).toFixed(2);
}

async function reverseConvertCurrency() {
    exchangeRate.value = await CurrencyService.getExchangeRate(
        currencyTo.value,
        currencyFrom.value
    );
    amountFrom.value = (amountTo.value * exchangeRate.value).toFixed(2);
}

watchEffect(() => {
    convertCurrency();
});
</script>

<style scoped>
.container {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
}

.converter-header {
    text-align: center;
    margin-bottom: 50px;
}
.converter {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

input,
select {
    font-size: 22px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid rgb(56, 54, 54);
}

.row {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
