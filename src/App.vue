<script setup lang="ts">
import { useRoute } from 'vue-router';
import useError from './composables/useError';
import { provide, ref } from 'vue';

const error = useError()
const theme = ref<'light' | "dark">('light')
const route = useRoute()
provide('theme', theme)
console.log(route)

</script>

<template>
  <div v-if="error.errors">
    <p>
      {{ error.errors }}
    </p>
  </div>
  <button @click="theme = theme === 'light' ? 'dark' : 'light'">switch theme</button>
  <component :is="route.meta.layout ?? 'DefaultLayout'">
    <RouterView></RouterView>
  </component>

</template>
