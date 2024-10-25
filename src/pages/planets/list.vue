<script setup lang="ts">
import PlanetListView from '@/features/planet/components/PlanetListView.vue';
import PlanetSkeleton from '@/features/planet/components/PlanetSkeleton.vue';
import { Suspense } from 'vue';


</script>

<template>
    <Suspense>
        <template #default>
            <PlanetListView></PlanetListView>
        </template>

        <template #fallback>
            <PlanetSkeleton></PlanetSkeleton>
        </template>
    </Suspense>
</template>