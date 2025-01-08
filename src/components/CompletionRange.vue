<template>
    <div v-show="!hasCompletedSession && completionLevel" class="w-full max-w-[700px] absolute top-[100%] left-[50%] translate-x-[-50%]">
        <div :style="{'width': completionLevel + '%'}" class="absolute h-[2px] top-0 bottom-0 left-0 bg-green-500"></div>
    </div>
</template>

<script setup>
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const store = mainStore()
const { completionLevel, hasCompletedSession} = storeToRefs(store)
</script>