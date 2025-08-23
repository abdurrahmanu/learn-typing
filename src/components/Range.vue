<template>
    <div class="py-1 h-2">
        <CompletionRange v-if="isBlindMode && focus" />
        <CompletionRangeWithErrors v-if="!isBlindMode && focus" />
    </div>
</template>

<script setup>
const settingstore = settingsStore()
const {isBlindMode} = storeToRefs(settingstore)

const typingstore = typingStore();
const { focus } = storeToRefs(typingstore);

</script>
