<template>
    <div v-if="showConnectionStrength && toggle" class="text-sm text-center text-white bg-orange-700 py-2 relative">{{ connectionStrength }}<div @click="toggle = false" class="absolute right-0 top-[50%] translate-y-[-50%] pr-3 hover:text-black font-bold font-mono">X</div></div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import { connectStore } from '../store/connectStore';
import { storeToRefs } from 'pinia';

const connect = connectStore()
const {hasInternetConnection, connectionStrength, showConnectionStrength} = storeToRefs(connect)

const toggle = ref(false)

onMounted(() => {
    toggle.value = showConnectionStrength.value
    if (!navigator.onLine) {
        showConnectionStrength.value = true
        toggle.value = showConnectionStrength.value
        connectionStrength.value  = 'No internet connection'
    }
    watch(hasInternetConnection, newVal => !newVal ? connectionStrength.value = 'No internet connection' : '')
    watch(showConnectionStrength, newVal => toggle.value = newVal )
})

</script>