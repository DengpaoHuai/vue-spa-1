<script setup lang="ts">
import useError from './composables/useError';

const error = useError()
</script>

<template>
  <div v-if="error.errors">
    <p>
      {{ error.errors }}
    </p>
  </div>
  <RouterView></RouterView>
</template>
