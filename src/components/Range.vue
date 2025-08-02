<template>
    <div class="py-2 h-2">
        <CompletionRange v-if="isBlindMode" />
        <CompletionRangeWithErrors v-else />
    </div>
</template>

<script setup>
import CompletionRange from '../components/CompletionRange.vue';
import CompletionRangeWithErrors from '../components/CompletionRangeWithErrors.vue';
import { settingsStore } from '../store/settingsStore';
import { storeToRefs } from 'pinia';

const customize = settingsStore()
const {isBlindMode} = storeToRefs(customize)
</script>