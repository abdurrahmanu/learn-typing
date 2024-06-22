<template>
    <div class="font-mono text-2xl font-bold hover:text-green-500" :class="[class]">&gt;</div>
</template>

<script setup>
const props = defineProps({
    class: String
})
</script>
