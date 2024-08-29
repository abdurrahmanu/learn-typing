<template>
    <div ref="bgContainer" :class="[openBackgrounds ? 'space-y-1' : '']" class="grid items-center justify-center rounded-full rotate-180 p-[2px]  border-slate-500 border bg-neutral-700 transition-all duration-200 hover:border-green-500">
        <div v-for="(color, index) in colors" :key="index" @click="toggleTheme(color)" v-show="openBackgrounds || color === theme"  :class="[bg[index], !openBackgrounds && color !== theme ? 'hidden' : 'block w-7 h-7 md:w-6 md:h-6 rounded-full border border-black']"></div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'

const theme_ = themeStore()
const {theme } = storeToRefs(theme_)

const openBackgrounds = ref(false)
const bgContainer = ref(null)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const toggleTheme = (color) => {
    theme.value = color

    openBackgrounds.value = !openBackgrounds.value
    if (theme.value === 'dark') {
        localStorageSettings.value.theme ='dark'
        bg.value = ['bg-neutral-900', 'bg-white']
        colors.value = ['dark', 'white']
        }  else {
            localStorageSettings.value.theme ='white'
            bg.value = ['bg-white', 'bg-neutral-900']
            colors.value = ['white', 'dark']
        }
        localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
}

const colors = ref([
    'dark',
    'white',
])

const bg = ref([
    'bg-neutral-900',
    'bg-white',
])

onMounted(() => {
    window.addEventListener('click', (event) => {
        if (bgContainer.value instanceof HTMLElement && !bgContainer.value.contains(event.target) && event.target !== bgContainer.value) {
        openBackgrounds.value = false
        }
    })
})
</script>