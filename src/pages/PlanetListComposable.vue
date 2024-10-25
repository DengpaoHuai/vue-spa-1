<script setup lang="ts">
import useFetch from '@/composables/useFetch';
import type { PlanetResponse } from '@/types/planet';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const { data, loading, error } = useFetch<PlanetResponse>('https://swapi.dev/api/planets')

const router = useRouter()

const listener = (e) => {
    console.log(e)
}

onMounted(() => {
    document.addEventListener('scroll', listener)
})

onUnmounted(() => {
    console.log('event')
    document.removeEventListener('scroll', listener)
})

</script>

<template>
    <div style="height : 200vh;">
        <a href="/demo">demo</a>
        <RouterLink to="/demo">Vers la page démo</RouterLink>
        <button @click="router.push('/demo')">push</button>
        <p v-if="loading">loading...</p>
        <p v-if="error">error : {{ error }}</p>
        <div v-if="data">
            <div v-for="(planet) in data.results" :key="planet.url">
                <p>{{ planet.name }}</p>
            </div>
        </div>
    </div>


</template>
