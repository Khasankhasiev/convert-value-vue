<template>
    <select
        v-model="selectedValue"
        class="custom-dropdown"
        @change="updateValue"
    >
        <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
        >
            {{ currency }}
        </option>
    </select>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    modelValue: String,
    currencies: {
        type: Array,
        required: true,
    },
});

const selectedValue = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

function updateValue() {
    emit('update:modelValue', selectedValue.value);
}
</script>

<style scoped>
.custom-dropdown {
    cursor: pointer;
    padding: 10px;
    border-radius: 6px;
}
</style>
