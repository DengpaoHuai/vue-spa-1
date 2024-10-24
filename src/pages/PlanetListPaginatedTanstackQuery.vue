<script setup lang="ts">
import { getData } from '@/services/planet.service';
import type { PlanetResponse } from '@/types/planet';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const page = ref(1)
const { data, isLoading } = useQuery<PlanetResponse>({
    queryKey: ['planets', page],
    queryFn: async () => getData(page.value),
    staleTime: 2500,
    refetchOnWindowFocus: false
})

</script>

<template>
    <p v-if="isLoading"> isLoading</p>
    <div v-for="planet in data?.results" :key="planet.url">
        <p>{{ planet.name }}</p>
    </div>
    <button :disabled="!data?.previous" @click="page--">précédent</button>
    <button :disabled="!data?.next" @click="page++">suivant</button>
</template>
