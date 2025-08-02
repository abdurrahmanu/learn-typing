<template>
    <div 
    @click.self="closeModal" 
    v-if="toggleCustomModal" 
    class="overlay">
        <CustomChars v-if="settings['test-type'] === 'characters'"/>
        <CustomTest v-if="settings['test-type'] === 'custom'" />
        <CustomQuotes v-if="settings['test-type'] === 'quotes'" />
        <CustomWords v-if="settings['test-type'] === 'words'" />
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import { settingsStore } from '../store/settingsStore';
import { useRoute } from 'vue-router';
import CustomChars from './CustomChars.vue';
import CustomTest from './CustomTest.vue';
import CustomQuotes from './CustomQuotes.vue'
import CustomWords from './CustomWords.vue'

const settingstore = settingsStore()
const {toggleCustomModal, pauseTyping, settings} = storeToRefs(settingstore)

const closeModal = () => {
    toggleCustomModal.value = false
    pauseTyping.value = false
}
</script>

<style scoped>
.overlay {
    @apply fixed top-[-100px] bottom-0 left-0 right-0 bg-[hsla(0,0%,6%,0.8)] text-xs z-[4] flex items-center justify-center
}
</style>