<template>
    <CustomModal />
    <!-- <Animate /> -->
    <!-- <CapsLockToast 
    top 
    :toggle="toggleCapsToast" 
    :text="capsText" /> -->
</template>

<script setup>
const capsText = 'CapsLock is on, you cannot use it while it is disabled, enable in settings.'

const settingstore = settingsStore()
const { toggleCapsToast } = storeToRefs(settingstore)
</script>