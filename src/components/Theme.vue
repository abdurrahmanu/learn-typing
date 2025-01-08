<template>
    <!-- <div ref="bgContainer" :class="[openBackgrounds ? 'space-y-1' : '']" class=" rounded-full p-[2px] ring-[2px] ring-white bg-neutral-700 transition-all duration-200">
        <div v-for="(color, index) in colors" :key="index" @click="toggleTheme(color)" v-show="openBackgrounds || color === theme"  :class="[bg[index], !openBackgrounds && color !== theme ? 'hidden' : 'block w-7 h-7 md:w-6 md:h-6 rounded-full ring-[1px] ring-black']"></div>
    </div> -->
    <div ref="bgContainer" :class="[theme === 'dark' ? 'ring-white' : 'ring-black']" class="flex gap-2 rounded-full p-[4px] ring-[1px] bg-neutral-600 transition-all duration-200">
        <div v-for="(color, index) in colors" class="block w-5 h-4 rounded-full" :key="index" @click="toggleTheme(color)" :class="[bg[index]]"></div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'
import { updateDB } from '../composables/updateDB';

const theme_ = themeStore()
const {theme } = storeToRefs(theme_)

const openBackgrounds = ref(false)
const bgContainer = ref(null)
const colors = ref([
    'dark',
    'white',
])
const bg = ref([
    'bg-[#2c2e31]',
    'bg-white',
])

const toggleTheme = (color) => {
    theme.value = color
    
    openBackgrounds.value = !openBackgrounds.value
    // if (theme.value === 'dark') {
    //     updateDB(Object.keys({theme})[0], theme.value)
    //     bg.value = ['bg-[#2c2e31]', 'bg-white']
    //     colors.value = ['dark', 'white']
    // }  else {
    //     updateDB(Object.keys({theme})[0], theme.value)
    //         bg.value = ['bg-white', 'bg-[#2c2e31]']
    //         colors.value = ['white', 'dark']
    // }

    updateDB(Object.keys({theme})[0], theme.value)
}

onMounted(() => {
    window.addEventListener('click', (event) => {
        if (bgContainer.value instanceof HTMLElement && !bgContainer.value.contains(event.target) && event.target !== bgContainer.value) {
        openBackgrounds.value = false
        }
    })
})
</script>