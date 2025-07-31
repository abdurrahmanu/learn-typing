<template>
    <div 
    v-if="index" 
    class="cursor-style" 
    :class="[cursorStyle, cursorTransition]"></div>
</template>

<script setup>
import { typingStateStore } from '../store/typingStateStore'
import { customizeStore } from '../store/customizeStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const typingstatestore = typingStateStore()
const {backspaceIsPressed, focus} = storeToRefs(typingstatestore)

const customizestore = customizeStore()
const { cursorType } = storeToRefs(customizestore)

const props = defineProps({
    index: Boolean
})

const cursorStyle = computed(() => {
    return {
        'border-blue-700 border-[1px]': focus.value && cursorType.value === 'border',
        'border-blue-700 border-l-[2px]': focus.value && cursorType.value === 'cursor',
        'border-blue-700 border-b-[2px]': focus.value && cursorType.value === 'underline'
    }
})

const cursorTransition = computed(() => {
    return props.index && !backspaceIsPressed.value ? 'smooth-cursor-forward' : 'smooth-cursor-backward'
})
</script>

<style scoped>
.cursor-style {
    @apply inline-block h-[calc(100%_-_5px)] absolute left-0 bottom-0 right-0
}
</style>