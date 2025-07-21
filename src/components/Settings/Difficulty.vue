<template>
<div :class="[appTheme, theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-4 pl-5 space-y-1">
        <p class="text-[13px] font-bold">DIFFICULTY</p>        
        <div class="flex flex-wrap gap-x-2 gap-y-[6px] font-[400] items-center">
            <div @click="difficulty = 'beginner'" class="cursor-pointer flex px-3 py-1 ring-[1px] rounded-l-md hover:ring-black" :class="[difficulty === 'beginner' ? 'bg-[#44b0d3] ring-transparent text-black font-bold' : 'ring-[#44b0d3]']">
                <p class="w-fit">Beginner</p>
            </div>
            <div @click="difficulty = 'amateur'" class="cursor-pointer flex px-3 py-1 ring-[1px] hover:ring-black" :class="[difficulty === 'amateur' ? 'bg-[#ffa07a] ring-transparent text-black font-bold' : 'ring-[#ffa07a]']">
                <p class="w-fit">Amateur</p>
            </div>
            <div @click="difficulty = 'expert'" class="cursor-pointer flex px-3 py-1 ring-[1px] rounded-r-md hover:ring-black" :class="[difficulty === 'expert' ? 'ring-transparent bg-[#4d5f43] text-black font-bold' : 'ring-[#2e4053]']">
                <p class="w-fit">Expert</p>
            </div>
            <div :class="[appTheme,]" class="flex gap-[2px] text-[13px] rounded-md text-black font-bold p-[1px]">
                <div class="px-2 py-1 rounded-l-md" :class="[appTheme]">Accuracy: {{ result.accuracy }}</div>
                <div class="px-2 py-1" :class="[appTheme]">WPM: {{ result.wpm }}</div>
                <div class="px-2 py-1 rounded-r-md" :class="[appTheme]">Error percentage {{ result.errorPercentage }}</div>
            </div>
    </div>
    </div>
</template>

<script setup>
import {watch, ref, computed} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme, appTheme} = theme_

const customizestore = customizeStore()
const { difficulty, settingsToUpdate } = storeToRefs(customizestore)

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
        settingsToUpdate.value.push({
        name: Object.keys({difficulty})[0],
        value: difficulty
    })
})
</script>