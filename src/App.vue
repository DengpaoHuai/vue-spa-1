<script setup lang="ts">
import { useRoute } from 'vue-router';
import useError from './composables/useError';

const error = useError()

const route = useRoute()

console.log(route)

</script>

<template>
  <div v-if="error.errors">
    <p>
      {{ error.errors }}
    </p>
  </div>
  <component :is="route.meta.layout ?? 'DefaultLayout'">
    <RouterView></RouterView>
  </component>

</template>
