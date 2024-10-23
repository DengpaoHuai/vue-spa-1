<script setup lang="ts">
defineProps<{
    title: string,
    footer: string
}>()


</script>

<template>
    <div>
        <h1>
            {{ title }}
        </h1>
        <slot></slot>
        <p>
            {{ footer }}
        </p>
    </div>

</template>