<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="flex flex-wrap items-center py-4 pl-5 gap-x-3 gap-y-1">
        <div class="text-sm font-medium">CARET</div>
        <div class="flex flex-wrap gap-x-2 gap-y-1">
            <div @click="caretType = 'border'" class="flex px-5 py-1 border rounded-md" :class="[caretType === 'border' ? 'border-green-500' : 'border-slate-500']">
                <p class="border w-fit border-slate-400">A</p>
            </div>
            <div @click="caretType = 'caret'" class="flex px-5 py-1 border rounded-md" :class="[caretType === 'caret' ? 'border-green-500' : 'border-slate-500']">
                <p class="border border-transparent w-fit border-l-slate-500 ">A</p>
            </div>
            <div @click="caretType = 'underline'" class="flex px-5 py-1 border rounded-md" :class="[caretType === 'underline' ? 'border-green-500' : 'border-slate-500']">
                <p class="border border-transparent w-fit border-b-blue-500">A</p>
            </div>
            <div @click="caretType = 'pulse'" class="flex px-5 py-1 border rounded-md" :class="[caretType === 'pulse' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit pulse">A</p>
            </div>
            <div @click="caretType = 'word-pulse'" class="flex px-5 py-1 border rounded-md" :class="[caretType === 'word-pulse' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit pulse">word</p>
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
const {theme} = theme_

const store = customizeStore()
const { caretType} = storeToRefs(store)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

watch(caretType, (newVal) => {
    localStorageSettings.value.caret = newVal
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
})
</script>

<style scoped>
.pulse {
    transition: all 2s ease;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 80%
    }
    50% {
        opacity: 30%;
    }
    100% {
        opacity: 80%;
    }
}

</style>