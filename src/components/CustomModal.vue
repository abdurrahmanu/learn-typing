<template>
    <div 
    @click.self="closeModal" 
    v-if="toggleCustomModal" 
    class="overlay">
        <CustomChars :class="[appTheme]" v-if="settings['test-type'] === 'characters'"/>
        <CustomTest :class="[appTheme]" v-if="settings['test-type'] === 'custom'" />
        <CustomQuotes :class="[appTheme]" v-if="settings['test-type'] === 'quotes'" />
        <CustomWords :class="[appTheme]" v-if="settings['test-type'] === 'words'" />
    </div>
</template>

<script setup>
const settingstore = settingsStore()
const {toggleCustomModal, pauseTyping, settings} = storeToRefs(settingstore)

const themestore = themeStore()
const { appTheme } = storeToRefs(themestore)

const closeModal = () => {
    toggleCustomModal.value = false
    pauseTyping.value = false
}
</script>

<style scoped>
.overlay {
    @apply fixed top-[-50px] bottom-0 left-0 right-0 bg-[hsla(0,0%,6%,0.8)] flex z-[4] items-center justify-center
}
</style>