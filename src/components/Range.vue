<template>
    <div class="py-1 h-2">
        <CompletionRange v-if="isBlindMode" />
        <CompletionRangeWithErrors v-else />
    </div>
</template>

<script setup>
const settingstore = settingsStore()
const {isBlindMode} = storeToRefs(settingstore)
</script>