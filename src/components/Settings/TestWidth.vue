<template>
    <div>
        <input
        name="range"
        type="range"
        step="1"
        min="20"
        :max="100"
        class="range-style"
        v-model="testWidth"/>
        <p class="px-2">{{ testWidth }} characters</p>
    </div>
</template>

<script setup>
const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const { testWidth } = storeToRefs(settingstore)

watch(testWidth, newVal => {
     emit('emitUpdate', newVal)
})
</script>
