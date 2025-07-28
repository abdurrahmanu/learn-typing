<template>
    <div class="h-[1px]">
        <CompletionRange v-if="isBlindMode" />
        <CompletionRangeWithErrors v-else />
    </div>
</template>

<script setup>
import CompletionRange from '../components/CompletionRange.vue';
import CompletionRangeWithErrors from '../components/CompletionRangeWithErrors.vue';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';

const customize = customizeStore()
const {isBlindMode} = storeToRefs(customize)
</script>