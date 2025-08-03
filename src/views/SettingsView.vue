<template>
    <div class="bg-inherit">
        <SettingsUI />
    </div>
</template>

<script setup>
import useWatchers from '../composables/useWatchers';
import { settingsStore } from '../store/settingsStore';
import { storeToRefs } from 'pinia';
import SettingsUI from '../components/SettingsUI.vue';

const settingstore = settingsStore()
const { settingsToUpdate} = storeToRefs(settingstore)

useWatchers({settingsToUpdate})
</script>