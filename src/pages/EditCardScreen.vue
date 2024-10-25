<script setup lang="ts">
import useMutationCar, { carQueryOptions } from '@/queries/useCarQueries';
import type { Car } from '@/types/cars';
import { useQuery } from '@tanstack/vue-query';
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const params = defineProps<{
    id: string
}>()

const { data: cars } = useQuery(carQueryOptions)
const { updateCar: { mutate, error } } = useMutationCar(() => {
    router.push('/cars')
})

const formData = reactive({
    brand: "",
    model: "",
    year: 0
})

watch(cars, (newCar) => {
    const car = newCar?.find((car: Car) => car._id === params.id)
    formData.brand = car?.brand ?? ""
    formData.model = car?.model ?? ""
    formData.year = car?.year ?? 0
}, { immediate: true })


const updateCar = async () => {
    console.log('update car')
    mutate({
        id: params.id,
        car: formData
    })

}

</script>

<template>
    <div>
        <h1>Udapte car</h1>
        <form @submit.prevent="updateCar">
            <label for="brand">Brand</label>
            <input id="brand" name="brand" v-model="formData.brand" type="text" required>
            <label for="model">Model</label>
            <input id="model" v-model="formData.model" type="text" required>
            <label for="year">Year</label>
            <input id="year" v-model="formData.year" type="number" required>
            <button type="submit">Create</button>
            <p v-if="error">{{ error.message }}</p>
        </form>
    </div>
</template>