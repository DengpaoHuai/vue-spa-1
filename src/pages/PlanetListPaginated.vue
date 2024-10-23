<script setup lang="ts">
import type { PlanetResponse } from '@/types/planet';
import { onMounted, ref } from 'vue';

const planets = ref<PlanetResponse>({
    count: 0,
    next: null,
    previous: null,
    results: []
})

const getData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    planets.value = data;
}


onMounted(() => {
    getData('https://swapi.dev/api/planets');
})

</script>

<template>
    <div v-for="planet in planets.results">
        <p>{{ planet.name }}</p>
    </div>
    <button :disabled="!planets.previous" @click="getData(planets.previous!)">précédent</button>
    <button :disabled="!planets.next" @click="getData(planets.next!)">suivant</button>
</template>
