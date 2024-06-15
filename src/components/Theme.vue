<template>
    <div ref="bgContainer" :class="[openBackgrounds ? 'space-y-1' : '']" class="grid items-center justify-center rounded-full rotate-180 p-[2px]  border-slate-500 border fixed bottom-2 right-3 bg-neutral-700 transition-all duration-200 hover:border-green-500">
        <div v-for="(color, index) in colors" :key="index" @click="toggleTheme(color)" v-show="openBackgrounds || color === theme"  :class="[bg[index], !openBackgrounds && color !== theme ? 'hidden' : 'block w-7 h-7 md:w-9 md:h-9 rounded-full border border-black']"></div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'

const theme_ = themeStore()
const {theme, } = storeToRefs(theme_)

const openBackgrounds = ref(false)
const bgContainer = ref(null)

const toggleTheme = (color) => {
    theme.value = color
    openBackgrounds.value = !openBackgrounds.value
    if (theme.value === 'neutral') {
        localStorage.setItem('dorayi-typing-theme', 'dark')
    }  else {
        localStorage.setItem('dorayi-typing-theme', 'white')
    }
}


const colors = [
    'neutral',
    'white',
    // 'stone',
    // 'blue',
    // 'lime',
    // 'teal',
    // 'sky',
    // 'fuschia',
    // 'emerald',
]

const bg = [
    'bg-neutral-900',
    'bg-white',
    // 'bg-stone-600',
    // 'bg-blue-400',
    // 'bg-lime-300',
    // 'bg-teal-700',
    // 'bg-sky-400',
    // 'bg-fuschia-600',
    // 'bg-emerald-400',
]

onMounted(() => {
    window.addEventListener('click', (event) => {
        if (!bgContainer.value.contains(event.target) && event.target !== bgContainer.value) {
        openBackgrounds.value = false
        }
    })
})
</script>