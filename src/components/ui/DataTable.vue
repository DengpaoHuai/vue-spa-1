<script setup lang="ts">
import { defineProps } from 'vue';

type Column = {
    key: string;
    label: string;
}

type Row = {
    [key: string]: unknown;
}

const props = defineProps<{
    data: Row[];
    columns: Column[];
}>();
</script>

<template>
    <table class="data-table">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">
                    <slot name="header"></slot>
                </th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</template>



<style scoped>
.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th,
.data-table td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}

.data-table th {
    background-color: #f5f5f5;
}
</style>