<template>
    <div v-show="!testCompleted && completionLevel">
        <div :class="theme === 'dark' ? 'bg-white' : 'bg-black'" :style="{'width': completionLevel + '%'}" class="h-1"></div>
    </div>
</template>

<script setup>
const typingstatestore = typingStore()
const {completionLevel, testCompleted} = storeToRefs(typingstatestore)

const themestore = themeStore()
const {theme} = storeToRefs(themestore)
</script>