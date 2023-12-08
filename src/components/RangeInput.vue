<template>
    <div class="w-full max-w-[400px] m-auto h-fit absolute top-[100%] py-3">
        <input :value="range" class="appearance-none w-[80%] mx-auto inline-block bg-sky-400 rounded-md h-[2px] relative" type="range">
        <span class="font-mono text-xs px-3">{{ Math.round(range) }}%</span>
    </div> 
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    range: Number,
})
</script>