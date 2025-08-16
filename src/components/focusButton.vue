<template>
    <p id="focus" v-if="shouldFocus">Click test or press any key to focus</p>
</template>

<script setup>
const typingstatestore = typingStore()
const {refocus, focus} = storeToRefs(typingstatestore)

const shouldFocus = computed(() => {
    return (isTouchScreenDevice() && !focus.value) || refocus.value
})
</script>