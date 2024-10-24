<script setup lang="ts">
import useQuery from '@/composables/useQuery';
import { deleteCarById, getCars as getCarsService } from '@/services/cars.service';
import { useCarStore } from '@/stores/carStore';
import type { Car } from '@/types/cars';
import { watch } from 'vue';

const { data, loading, error } = useQuery<Car[]>(getCarsService)
//const { getCars } = storeToRefs(useCarStore())
const { setAllCars, deleteCar } = useCarStore()

watch(data, (newData) => {
    setAllCars(newData!)
})

const deleteItem = async (id: string) => {
    await deleteCarById(id)
    deleteCar(id)
}



</script>

<template>
    <RouterLink to="/cars/create">Créer une voiture</RouterLink>
    <p v-if="loading">loading...</p>
    <p v-if="error">error : {{ error }}</p>
    <div v-if="getCars">
        <div v-for="(car) in getCars" :key="car._id">
            <p>{{ car.model }}</p>
            <button @click="deleteItem(car._id)">
                delete car
            </button>
        </div>
    </div>
</template>
