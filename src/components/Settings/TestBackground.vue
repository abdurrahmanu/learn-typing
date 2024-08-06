<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="flex flex-wrap items-center px-4 py-4 space-x-2">
        <div class="pr-4 text-sm font-medium whitespace-nowrap">TEST BACKGROUND</div>
        <div :class="[testBackgroundColor === 'green' ? 'border-black' : 'border-transparent', theme === 'white' ?  'bg-green-200' : 'bg-green-900 text-white']" @click="testBackgroundColor = 'green'" class="px-2 py-1 border-2 rounded-md">Green</div>
        <div :class="[testBackgroundColor === 'gray' ? 'border-black' : 'border-transparent', theme === 'white' ?  'bg-slate-300' : 'text-white bg-neutral-800']" @click="testBackgroundColor = 'gray'" class="px-2 py-1 border-2 rounded-md">Gray</div>
        <div :class="[testBackgroundColor === 'blue' ? 'border-black' : 'border-transparent', theme === 'white' ?  'bg-blue-200' : 'text-white bg-blue-900',]" @click="testBackgroundColor = 'blue'" class="px-2 py-1 border-2 rounded-md">Blue</div>
        <div :class="[testBackgroundColor === 'gold' ? 'border-black' : 'border-transparent', , theme === 'white' ?  'bg-amber-300' : 'text-white bg-amber-700',]" @click="testBackgroundColor = 'gold'" class="px-2 py-1 border-2 rounded-md">Gold</div>
        <div :class="[testBackgroundColor === 'transparent' ? 'border-black' : 'border-transparent']" @click="testBackgroundColor = 'transparent'" class="px-2 py-1 border-2 rounded-md">Transparent</div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import { themeStore } from '../../store/themeStore';
import { storeToRefs } from 'pinia';

const theme_ = themeStore()
const {theme, testBackgroundColor} = storeToRefs(theme_)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

watch(testBackgroundColor, newVal => {
    localStorageSettings.value.testBackground = testBackgroundColor.value
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
})
</script>