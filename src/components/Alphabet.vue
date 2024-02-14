<template>
    <div class="relative inline font-mono whitespace-pre-wrap w-fit">
        <span :class="[equalStyle, currentIndexStyle, mainStyle]" class="transition-all duration-[30ms]">{{ alphabet }}</span>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const store = mainStore()
const { playerInputLength} = storeToRefs(store)
const emit = defineEmits(['equal', 'unequal'])
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equality: Boolean,
})

// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))

const equalStyle = computed(() => {
    return props.equality ? 'text-green-500' : 'text-red-500'
})

const currentIndexStyle = computed(() => {
    return  props.currentIndex ? 'bg-zinc-700 text-white py-[1px] rounded-md animate-pulse transition-all duration-200' : ''
})

const mainStyle = computed(() => {
    return !props.currentIndex && props.index > playerInputLength.value ? 'text-slate-400' : ''
})
</script>
