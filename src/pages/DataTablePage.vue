<script setup lang="ts">
import { ref } from 'vue';
const people = ref([
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
]);

// Définition des colonnes
const columns = ref([
    { key: 'name', label: 'Nom' },
    { key: 'age', label: 'Âge' },
]);
</script>

<template>
    <div>
        <DataTable :data="people" :columns="columns">
            <template #header="{ column }">
                <span class="custom-header">{{ column.label }}</span>
            </template>
            <template #cell-name="{ value }">
                {{ value }}
            </template>
            <template #cell-age="{ value }">
                {{ value }} ans
            </template>
        </DataTable>
    </div>
</template>


<style scoped>
.custom-header {
    font-weight: bold;
    color: #333;
}
</style>