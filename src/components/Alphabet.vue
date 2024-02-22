<template>
    <div class="relative inline font-mono whitespace-pre-wrap w-[1px]">
        <span :class="[equalStyle, currentIndexStyle, mainStyle]" class="transition-all duration-[10ms]">{{ alphabet }}</span>
    </div>
</template>

<script setup>
import { defineProps, computed, watchEffect } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const store = mainStore()
const { playerInputLength, correctCount} = storeToRefs(store)
const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equality: Boolean,
})

const equalStyle = computed(() => {
    return props.equality ? 'text-green-300' : 'text-red-500'
})

const currentIndexStyle = computed(() => {
    return  props.currentIndex ? 'bg-zinc-700 text-white py-[2px] rounded-full animate-pulse' : ''
})

const mainStyle = computed(() => {
    return !props.currentIndex && props.index > playerInputLength.value ? 'text-slate-400' : ''
})
</script>
