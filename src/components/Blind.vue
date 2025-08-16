<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="settings['blind-mode']" :id="mobile && 'focus'" class="w-5" />
            <openEye v-else :id="!mobile && 'focus'" class="w-5" />
        </div>
    </div>
</template>

<script setup>
const mobile = isMobile()

const bool = ref(false)
const settingstore = settingsStore()
const {settings} = storeToRefs(settingstore)
const {updateSingleSetting} = settingstore

const customize = () => {
    bool.value = !bool.value
    updateSingleSetting('blind-mode', bool.value)
}
</script>
