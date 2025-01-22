<template>
    <div ref="bgContainer" :class="[theme === 'dark' ? 'ring-white' : 'ring-black']" class="flex space-x-1 rounded-full p-[3px] w-fit ring-[1px] bg-neutral-500 transition-all duration-200 fixed left-[50%] translate-x-[-50%] m-auto max-w-[1500px] bottom-2">
        <div v-for="(color, index) in colors" class="block w-5 cursor-pointer ring-[1px] ring-black h-4 rounded-full" :key="index" @click="toggleTheme(color)" :class="[bg[index]]"></div>
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
