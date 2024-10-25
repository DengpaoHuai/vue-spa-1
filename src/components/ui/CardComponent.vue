<script setup lang="ts">
defineProps<{
    title: string,
}>()

const demo = "demo value"

</script>

<template>
    <div>
        <h1>
            {{ title }}
        </h1>
        <slot></slot>
        <div class="footer">
            <slot name="footer" :demo="demo"></slot>
        </div>
    </div>

</template>

<style scoped>
.footer {
    background-color: #f1f1f1;
    color: black;
}
</style>