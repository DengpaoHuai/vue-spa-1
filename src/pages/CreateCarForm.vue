<script setup lang="ts">
import useMutationCar from '@/queries/useCarQueries';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const { createCar: { mutate, isPending, error } } = useMutationCar(() => {
    router.push('/cars')
})

const formData = reactive({
    brand: "",
    model: "",
    year: 0
})

const createCar = async () => {
    console.log(formData)
    mutate(formData)
}

</script>


<template>
    <div>
        <h1>Create a new car</h1>
        <form @submit.prevent="createCar">
            <label for="brand">Brand</label>
            <input id="brand" name="brand" v-model="formData.brand" type="text" required>
            <label for="model">Model</label>
            <input id="model" v-model="formData.model" type="text" required>
            <label for="year">Year</label>
            <input id="year" v-model="formData.year" type="number" required>
            <button type="submit" :disabled="isPending">Create</button>
            <p v-if="error">{{ error.message }}</p>
        </form>
    </div>
</template>