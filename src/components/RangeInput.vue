<template>
    <div class="w-full max-w-[400px] m-auto h-fit">
        <input :value="completionLevel" class="appearance-none w-[80%] mx-auto inline-block bg-sky-400 rounded-md h-[2px] relative" type="range">
        <span class="px-3 font-mono text-xs">{{ Math.round(completionLevel) }}%</span>
    </div> 
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { typingStore } from '../store/typingStore';


const store = typingStore()
const {completionLevel} = storeToRefs(store)
</script>