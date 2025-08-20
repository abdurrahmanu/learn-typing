<template>
    <div>
        <p>{{ testLines }}</p>
        <input 
        name="range" 
        type="range" 
        step="1"
        min="1"
        :max="mobile ? 3 : 15"
        class="range-style" 
        v-model="testLines"/>
    </div>
</template>

<script setup>
const mobile = isMobile()

const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const { testLines } = storeToRefs(settingstore)

watch(testLines, newVal => {
     emit('emitUpdate', newVal)
})
</script>