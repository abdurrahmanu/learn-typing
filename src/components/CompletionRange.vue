<template>
    <div v-show="!hasCompletedSession && completionLevel" :class="[isTouchScreenDevice() ? '' : 'border-b-[2px] border-white']" class="w-full max-w-[700px] absolute top-[100%] left-[50%] translate-x-[-50%]">
        <div :style="{'width': completionLevel + '%'}" :class="[isTouchScreenDevice() ? 'h-[5px]' : 'h-[3px]']" class="absolute top-0 bottom-0 left-0 bg-green-500"></div>
    </div>
</template>

<script setup>
import { mainStore } from '../store/mainStore';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { storeToRefs } from 'pinia';

const store = mainStore()
const { completionLevel, hasCompletedSession} = storeToRefs(store)
</script>