<script setup lang="ts">
import { useRoute } from 'vue-router';


const route = useRoute()
console.log(route)

const params = defineProps<{
    id: string
}>()

console.log(params)

</script>

<template>
    <p>ok</p>
</template>