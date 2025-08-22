<template>
    <SettingsUI />
</template>

<script setup>
const settingstore = settingsStore()
const { settingsToUpdate} = storeToRefs(settingstore)

useWatcher({settingsToUpdate})
</script>
