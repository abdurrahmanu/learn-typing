<template>
    <div class="relative inline font-mono whitespace-pre-wrap w-fit">
        <span :class="[equalStyle, unEqualStyle, currentIndexStyle, mainStyle]" class="text-sm transition-all duration-[30ms]">{{ alphabet }}</span>
    </div>
</template>

<script setup>
import { defineProps, watchEffect, computed } from 'vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const store = mainStore()
const { correctCount, wrongCount, playerLastInput , playerInputLength} = storeToRefs(store)
const props = defineProps({
    alphabet: String,
    index: Number,
    currentIndex: Boolean,
    equal: Boolean,
    unequal: Boolean
})

const equalStyle = computed(() => {
    return props.equal ? 'text-green-500' : ''
})

const unEqualStyle = computed(() => {
    return  props.unequal ? 'text-red-500' : ''
})

const currentIndexStyle = computed(() => {
    return  props.currentIndex ? 'bg-zinc-700 text-white py-[1px] rounded-md animate-pulse transition-all duration-200' : ''
})

const mainStyle = computed(() => {
    return !props.currentIndex && props.index > playerInputLength.value ? 'text-slate-400' : ''
})

watchEffect(() => {
    if (props.equal) correctCount.value++
    if (props.unequal) wrongCount.value++
})
</script>
