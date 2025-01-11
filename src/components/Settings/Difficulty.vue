<template>
<div :class="[appTheme, theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-4 pl-5 space-y-1">
        <p class="text-[13px] font-bold">DIFFICULTY</p>        
        <div class="flex flex-wrap gap-x-1 gap-y-[6px] font-[400] items-center">
            <div @click="difficulty = 'beginner'" class="flex px-3 py-1 border rounded-md hover:border-black" :class="[difficulty === 'beginner' ? 'bg-[#44b0d3] border-transparent text-black font-bold' : 'border-[#44b0d3]']">
                <p class="w-fit">Beginner</p>
            </div>
            <div @click="difficulty = 'amateur'" class="flex px-3 py-1 border rounded-md hover:border-black" :class="[difficulty === 'amateur' ? 'bg-[#ffa07a] border-transparent text-black font-bold' : 'border-[#ffa07a]']">
                <p class="w-fit">Amateur</p>
            </div>
            <div @click="difficulty = 'expert'" class="flex px-3 py-1 border rounded-md hover:border-black" :class="[difficulty === 'expert' ? 'border-transparent bg-[#4d5f43] text-black font-bold' : 'border-[#2e4053]']">
                <p class="w-fit">Expert</p>
            </div>
            <div :class="[bg]" class="flex gap-[2px] text-[13px] rounded-md text-black font-bold p-[2px]">
                <div class="px-1 py-1 rounded-md" :class="[appTheme]">Accuracy: {{ result.accuracy }}</div>
                <div class="px-1 py-1 rounded-md" :class="[appTheme]">WPM: {{ result.wpm }}</div>
                <div class="px-1 py-1 rounded-md" :class="[appTheme]">Error percentage {{ result.errorPercentage }}</div>
            </div>
    </div>
    </div>
</template>

<script setup>
import {watch, ref, computed} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import { updateDB } from '../../composables/updateDB';

const theme_ = themeStore()
const {theme, appTheme} = theme_

const store = customizeStore()
const { difficulty } = storeToRefs(store)

const bg = computed(() => {
    return difficulty.value === 'beginner' ? 'bg-[#44b0d3]' : difficulty.value === 'amateur' ? 'bg-[#ffa07a]' : 'bg-[#4d5f43]'
})

const result = computed(() => {
    return {        
        accuracy: difficulty.value === 'beginner' ? '70%' : difficulty.value === 'amateur' ? '80%' : '95%',
        wpm: difficulty.value === 'beginner' ? '50' : difficulty.value === 'amateur' ? '65' : '85',
        errorPercentage: difficulty.value === 'beginner' ? '30%' : difficulty.value === 'amateur' ? '20%' : '10%',
    }
})

watch(difficulty, (newVal) => {
    let difficulty = newVal
    updateDB(Object.keys({difficulty})[0], difficulty)
})
</script>