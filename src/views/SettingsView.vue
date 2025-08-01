<template>
    <SettingsUI />
</template>

<script setup>
import useWatchers from '../composables/useWatchers';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';
import SettingsUI from '../components/SettingsUI.vue';

const customizestore = customizeStore()
const { settingsToUpdate} = storeToRefs(customizestore)

useWatchers({settingsToUpdate})
</script>