<script setup lang="ts">
import swapi from '@/lib/swapi';

const response = await swapi.get('planets');

</script>

<template>
    <div v-for="planet in response.data.results" :key="planet.url">
        <p>{{ planet.name }}</p>
    </div>
</template>
