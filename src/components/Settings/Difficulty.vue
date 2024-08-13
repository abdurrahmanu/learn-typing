<template>
<div :class="[appTheme, theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-4 pl-5 space-y-1">
        <p class="text-xs font-medium">DIFFICULTY</p>        
        <div class="flex flex-wrap gap-x-2 gap-y-1 font-[400]">
            <div @click="difficulty = 'beginner'" class="flex px-3 py-1 border rounded-md" :class="[difficulty === 'beginner' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit">Beginner</p>
            </div>
            <div @click="difficulty = 'amateur'" class="flex px-3 py-1 border rounded-md" :class="[difficulty === 'amateur' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit">Amateur</p>
            </div>
            <div @click="difficulty = 'expert'" class="flex px-3 py-1 border rounded-md" :class="[difficulty === 'expert' ? 'border-green-500' : 'border-slate-500']">
                <p class=" w-fit pulse">Expert</p>
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

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

watch(difficulty, (newVal) => {
    localStorageSettings.value.difficulty = newVal
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
})
</script>