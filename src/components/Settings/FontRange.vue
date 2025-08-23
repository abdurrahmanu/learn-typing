<template>
    <div class="space-y-3">
        <input
        name="range"
        type="range"
        step="1"
        :min="minFontSize"
        :max="maxFontSize"
        class="range-style"
        v-model="range"/>
        <p class="px-2 leading-none" :style="{'font-size': settings.fontsize + 'px', 'height': maxFontSize + 10 + 'px'}">{{ +font }}px</p>
    </div>
</template>

<script setup>
const emit = defineEmits(['emitUpdate'])

const settingstore = settingsStore()
const {fontSize, minFontSize, maxFontSize, range, settings} = storeToRefs(settingstore)

const font = computed(() => settings.value.fontsize)

watch(range, (newVal) => {
    let font = +newVal
    emit('emitUpdate', font)
})
</script>
