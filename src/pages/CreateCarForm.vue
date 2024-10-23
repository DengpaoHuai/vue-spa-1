<script setup lang="ts">
import { postCar } from '@/services/cars.service';
import { reactive } from 'vue';


const formData = reactive({
    brand: "",
    model: "",
    year: 0
})

const createCar = () => {
    console.log(formData)
    postCar(formData).then(() => {
        //gérer la redirection
    })
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
            <button type="submit">Create</button>
        </form>
    </div>
</template>