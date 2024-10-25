<script setup lang="ts">
import { inject } from 'vue';

defineProps<{
    label: string
}>()

defineEmits<{
    click: [string]
}>()

const theme = inject('theme')

</script>

<template>
    <button :class="`button-${theme}`" @click="$emit('click', 'supp')">{{ label }}</button>
</template>

<style scoped>
button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

.button-light {
    background-color: #f1f1f1;
    color: black;
}

.button-dark {
    background-color: #333;
    color: white;
}
</style>