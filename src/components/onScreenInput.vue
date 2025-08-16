<template>
    <input 
    class="max-w-[1px] default z-[-1] opacity-0 max-h-[1px] absolute"
    ref="inputEl"
    type="text">
</template>

<script setup>
const typingstatestore = typingStore()
const {inputEl} = storeToRefs(typingstatestore)
</script>
