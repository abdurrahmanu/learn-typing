<template>
    <div v-if="!isOnline && toggle" class="text-sm text-center text-white bg-orange-700 py-2 relative">No internet connection<div @click="toggle = false" class="absolute right-0 top-[50%] translate-y-[-50%] pr-3 hover:text-black font-bold font-mono">X</div></div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import { connectStore } from '../store/connectStore';
import { storeToRefs } from 'pinia';

const connect = connectStore()
const {isOnline} = storeToRefs(connect)

const toggle = ref(false)

onMounted(() => {
    toggle.value = !isOnline.value

    watch(isOnline, newVal => {
        newVal ? toggle.value = false : toggle.value = true
    })
})
</script>