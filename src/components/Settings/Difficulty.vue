<template>
<div :class="[appTheme, theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-4 pl-5 space-y-1">
        <p class="text-xs font-medium">DIFFICULTY</p>        
        <div class="flex flex-wrap gap-x-2 gap-y-1 font-[400] items-center">
            <div @click="difficulty = 'beginner'" class="flex px-3 py-1 border rounded-md" :class="[difficulty === 'beginner' ? 'bg-teal-700 border-transparent text-white' : 'border-slate-500']">
                <p class="w-fit">Beginner</p>
            </div>
            <div @click="difficulty = 'amateur'" class="flex px-3 py-1 border rounded-md" :class="[difficulty === 'amateur' ? 'bg-green-500 border-transparent text-white' : 'border-slate-500']">
                <p class="w-fit">Amateur</p>
            </div>
            <div @click="difficulty = 'expert'" class="flex px-3 py-1 border rounded-md" :class="[difficulty === 'expert' ? 'border-transparent bg-amber-700 text-white' : 'border-slate-500']">
                <p class=" w-fit pulse">Expert</p>
            </div>
            <div class="flex gap-2 text-xs text-slate-300">
                <div class="px-2 py-1 rounded-md bg-neutral-700">Accuracy: {{ result.accuracy }}</div>
                <div class="px-2 py-1 rounded-md bg-neutral-700">WPM: {{ result.wpm }}</div>
                <div class="px-2 py-1 rounded-md bg-neutral-700">Error percentage {{ result.errorPercentage }}</div>
            </div>
    </div>
    </div>
</template>

<script setup>
import {watch, ref, computed} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import { updateLocalStorage } from '../../composables/updateLocalStorage';

const theme_ = themeStore()
const {theme, appTheme} = theme_

const store = customizeStore()
const { difficulty } = storeToRefs(store)

const result = computed(() => {
    return {        
        accuracy: difficulty.value === 'beginner' ? '70%' : difficulty.value === 'amateur' ? '80%' : '95%',
        wpm: difficulty.value === 'beginner' ? '50' : difficulty.value === 'amateur' ? '65' : '85',
        errorPercentage: difficulty.value === 'beginner' ? '30%' : difficulty.value === 'amateur' ? '20%' : '10%',
    }
})

watch(difficulty, (newVal) => {
    let difficulty = newVal
    updateLocalStorage(Object.keys({difficulty})[0], difficulty)
})
</script>