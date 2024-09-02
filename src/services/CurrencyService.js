import axios from 'axios';

const API_URL = 'https://status.neuralgeneration.com/api/currency';

export default {
    async getExchangeRates(baseCurrency) {
        const response = await axios.get(`${API_URL}?base=${baseCurrency}`);
        return response.data;
    },
    async getFilteredExchangeRates(baseCurrency, targetCurrencies) {
        const rates = await this.getExchangeRates(baseCurrency);
        const filteredRates = {};

        targetCurrencies.forEach(target => {
            const key = `${target.toLowerCase()}-${baseCurrency.toLowerCase()}`;
            if (rates[key] !== undefined) {
                filteredRates[target] = rates[key];
            }
        });

        return filteredRates;
    },
    async getExchangeRate(fromCurrency, toCurrency) {
        const rates = await this.getExchangeRates(fromCurrency);
        const key = `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`;
        return rates[key] || 1;
    },
};
