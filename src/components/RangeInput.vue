<template>
    <div class="w-full m-auto h-fit flex items-center">
        <input :value="completionLevel" class="appearance-none w-[90%] mx-auto inline-block bg-green-400 rounded-md h-[1px] relative" disabled type="range">
        <span class="px-3 font-mono text-xs w-[10%]">{{ Math.round(completionLevel) }}%</span>
    </div> 
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {completionLevel} = storeToRefs(store)
</script>