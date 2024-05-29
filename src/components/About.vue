<template>
    <div v-if="!aboutPage" @click="" class="fixed flex items-center justify-center w-5 h-5 p-1 font-mono border-2 rounded-full left-3 bottom-[14px] border-slate-900">i</div>
</template>

<script setup>
import {computed, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const main = mainStore()
const { svgFill, aboutPage } = storeToRefs(main)

watch(aboutPage, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            
        }, 1000);
    }
})
</script>