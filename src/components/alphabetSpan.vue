<template>
    <div class="relative inline font-mono whitespace-pre-wrap w-fit">
        <span :class="[equalStyle, unEqualStyle, currentIndexStyle, mainStyle]" class="text-sm transition-all duration-[30ms]">{{ alphabet }}</span>
    </div>
</template>

<script setup>
import { defineProps, watchEffect, computed } from 'vue';
import {storeToRefs} from 'pinia'
import {typingStore} from '../store/typingStore'

const store = typingStore()
const { correctCount, wrongCount, playerLastInput , playerInputLength} = storeToRefs(store)
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean
})

const equal = computed(() => {
    return playerLastInput.value === props.alphabet && playerInputLength.value - 1 === props.index && playerLastInput.length > 0
})

const unequal = computed(() => {
    return playerLastInput.value !== props.alphabet && playerInputLength.value - 1 === props.index && playerLastInput.value.length > 0
})

const equalStyle = computed(() => {
    return equal.value ? 'text-green-500' : ''
})

const unEqualStyle = computed(() => {
    return  unequal.value ? 'text-red-500' : ''
})

const currentIndexStyle = computed(() => {
    return  props.currentIndex ? 'bg-zinc-700 py-[1px] rounded-md text-white animate-pulse transition-all duration-200' : ''
})

const mainStyle = computed(() => {
    return !props.currentIndex && props.index > playerInputLength.value ? 'text-slate-400' : ''
})

watchEffect(() => {
    if (equal.value) correctCount.value++
    if (unequal.value) wrongCount.value++
})
</script>
