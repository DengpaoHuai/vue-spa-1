<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardComponent from './components/ui/CardComponent.vue';
import type { Planet } from './types/planet';

const planets = ref<Planet[]>([])

onMounted(() => {
  fetch('https://swapi.dev/api/planets').then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    planets.value = data.results
  });
})

</script>

<template>
  <div v-for="planet in planets">
    <p>{{ planet.name }}</p>
  </div>
  <button>précédent</button>
  <button>suivant</button>
</template>
