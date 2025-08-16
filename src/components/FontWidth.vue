<template>
    <div ref="el" class="w-fit opacity-0 fixed bottom-0 right-0" :style="{'font-size': fontSize + 'px'}">A</div>
</template>

<script setup>
const el = ref(null)

const {fontSize, charWidth} = storeToRefs(settingsStore())

onMounted(() => {
    let width = getComputedStyle(el.value).width
    charWidth.value = +(+width.slice(0, -2)).toFixed(0)
})

onUpdated(() => {
    let width = getComputedStyle(el.value).width
    charWidth.value = +(+width.slice(0, -2)).toFixed(0)
})
</script>