<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import type { PlanetResponse } from '@/types/planet';

const { data, loading, error } = useFetch<PlanetResponse>('https://swapi.dev/api/planets')

</script>

<template>
    <p v-if="loading">loading...</p>
    <p v-if="error">error : {{ error }}</p>
    <div v-if="data">
        <div v-for="(planet) in data.results" :key="planet.url">
            <p>{{ planet.name }}</p>
        </div>
    </div>

</template>
