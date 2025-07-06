<template>
    <div ref="bgContainer" :class="[theme === 'dark' ? 'ring-white' : 'ring-black']" class='container'>
        <div 
        v-for="(color, index) in colors" 
        :key="index" 
        @click="toggleTheme(color)" 
        :class="[bg[index]]"
        class="color">
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { updateDB } from '../composables/updateDB';
import {themeStore}  from '../store/themeStore'
import { storeToRefs } from 'pinia';

const theme_ = themeStore()
const {theme, openBackgrounds } = storeToRefs(theme_)

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
    updateDB(Object.keys({theme})[0], theme.value)
}
</script>

<style scoped>
.container {
    @apply flex space-x-1 rounded-full p-[3px] w-fit ring-[1px] bg-neutral-500 transition-all duration-200 fixed left-[50%] translate-x-[-50%] m-auto max-w-[1500px] bottom-2
}

.color {
    @apply block w-5 cursor-pointer ring-[1px] ring-black h-4 rounded-full
}
</style>
