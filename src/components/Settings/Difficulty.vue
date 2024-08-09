<template>
<div :class="[appTheme, theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="flex flex-wrap items-center py-4 pl-5 gap-x-3 gap-y-1">
        <p class="text-sm font-medium">DIFFICULTY</p>        
        <div  :class="[theme === 'dark' ? 'text-slate-300' : 'text-slate-300']" class="flex flex-wrap gap-x-2 gap-y-1">
            <div @click="difficulty = 'free'" class="flex px-5 py-1 border-2 rounded-md" :class="[difficulty === 'free' ? 'border-yellow-500' : 'border-slate-500', theme === 'white' ? 'text-slate-600' : '']">
                <p class="w-fit">Free</p>
            </div>
            <div @click="difficulty = 'easy'" class="flex px-5 py-1 border-2 rounded-md bg-lime-600" :class="[difficulty === 'easy' ? 'border-yellow-500' : 'border-slate-500']">
                <p class="w-fit">Easy</p>
            </div>
            <div @click="difficulty = 'medium'" class="flex px-5 py-1 bg-yellow-800 border-2 rounded-md" :class="[difficulty === 'medium' ? 'border-yellow-500' : 'border-slate-500']">
                <p class="w-fit">Medium</p>
            </div>
            <div @click="difficulty = 'hard'" class="flex px-5 py-1 bg-teal-800 border-2 rounded-md" :class="[difficulty === 'hard' ? 'border-yellow-500' : 'border-slate-500']">
                <p class=" w-fit pulse">Hard</p>
            </div>
    </div>
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme, appTheme} = theme_

const store = customizeStore()
const { difficulty } = storeToRefs(store)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

watch(difficulty, (newVal) => {
    localStorageSettings.value.caret = newVal
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
})
</script>