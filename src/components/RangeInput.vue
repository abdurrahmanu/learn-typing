<template>
    <div class="flex items-center w-full m-auto h-fit">
        <input :value="completionLevel" :class="[theme === 'neutral' ? 'bg-green-400' : 'bg-black']" class="appearance-none w-[90%] mx-auto inline-block rounded-md h-[1px] relative" disabled type="range">
        <span class="px-3 font-mono text-xs w-[10%]">{{ Math.round(completionLevel) }}%</span>
    </div> 
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {completionLevel, theme} = storeToRefs(store)
</script>