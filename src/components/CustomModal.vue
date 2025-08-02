<template>
    <div 
    @click.self="closeModal" 
    v-if="toggleCustomModal && route.name === 'home'" 
    class="overlay">
        <CustomChars v-if="settings['test-type'] === 'characters'"/>
        <CustomTest v-else />
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import { settingsStore } from '../store/settingsStore';
import { useRoute } from 'vue-router';
import CustomChars from './CustomChars.vue';
import CustomTest from './CustomTest.vue';

const route = useRoute()

const settingstore = settingsStore()
const {toggleCustomModal, pauseTyping, settings} = storeToRefs(settingstore)

const closeModal = () => {
    toggleCustomModal.value = false
    pauseTyping.value = false
}
</script>

<style scoped>
.overlay {
    @apply fixed top-[-100px] bottom-0 left-0 right-0 bg-[hsla(0,0%,6%,0.8)] text-xs z-[3] flex items-center justify-center
}
</style>