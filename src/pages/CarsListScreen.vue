<script setup lang="ts">
import useMutationCar, { carQueryOptions } from '@/queries/useCarQueries';
import { useQuery } from '@tanstack/vue-query';

const { data: cars, isLoading, error } = useQuery(carQueryOptions)

const { deleteCar: { mutate } } = useMutationCar()

</script>

<template>
    <RouterLink to="/cars/create">Créer une voiture</RouterLink>
    <p v-if="isLoading">loading...</p>
    <p v-if="error?.message">error : {{ error.message }}</p>
    <div v-if="cars">
        <div v-for="(car) in cars" :key="car._id">
            <p>{{ car.model }}</p>
            <button @click="mutate(car._id)">
                delete car
            </button>
            <RouterLink :to="'cars/edit/' + car._id">Edit</RouterLink>
        </div>
    </div>
</template>
