<script setup lang="ts">
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import CardComponent from '@/components/ui/CardComponent.vue';
import CustomInput from '@/components/ui/CustomInput.vue';
import useFetch from '@/composables/useFetch';
import type { PlanetResponse } from '@/types/planet';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const { data, loading, error } = useFetch<PlanetResponse>('https://swapi.dev/api/planets')

const router = useRouter()

const schema = z.object({
    name: z.string().min(1, "").max(255),
    rotation_period: z.string(),
    orbital_period: z.string(),
    diameter: z.string(),
    climate: z.string(),
    gravity: z.string(),
    terrain: z.string(),
    surface_water: z.string(),
    population: z.string(),
    residents: z.array(z.string()),
    films: z.array(z.string()),
    created: z.string(),
    edited: z.string(),
    url: z.string(),
})

type Planet = z.infer<typeof schema>

const demo = ref('demo')

</script>

<template>
    <div style="height : 200vh;">
        <CardComponent title="demo">
            <template #default>
                <p>contenu</p>
            </template>
            <template #footer="{ demo }">
                <p>footer {{ demo }}</p>
            </template>
        </CardComponent>

        <CustomInput v-model="demo"></CustomInput>
        <button @click="console.log(demo)"></button>
        <ButtonComponent variant="filled" @click="(ici) => console.log(ici)" label="mon bouton"></ButtonComponent>
        <a href="/cars">cars</a>
        <RouterLink to="/cars">cars</RouterLink>
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
