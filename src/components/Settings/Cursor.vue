<template>
    <div class="flex flex-wrap gap-x-2">
        <div @click="cursorType = 'border'" class="flex px-5 py-1 ring-[2px] cursor-pointer rounded-md" :class="[cursorType === 'border' ? 'ring-blue-500' : 'hover:ring-blue-800 hover:ring-[1px] ring-slate-500']">
            <p class="border-[1px] w-fit border-blue-500">A</p>
        </div>
        <div @click="cursorType = 'cursor'" class="flex px-5 py-1 ring-[2px] cursor-pointer rounded-md" :class="[cursorType === 'cursor' ? 'ring-blue-500' : 'hover:ring-blue-800 hover:ring-[1px] ring-slate-500']">
            <p class="border-l-[1px] w-fit border-l-blue-500 ">A</p>
        </div>
        <div @click="cursorType = 'underline'" class="flex px-5 py-1 ring-[2px] cursor-pointer rounded-md" :class="[cursorType === 'underline' ? 'ring-blue-500' : 'hover:ring-blue-800 hover:ring-[1px] ring-slate-500']">
            <p class="border-b-[1px] w-fit border-b-blue-500">A</p>
        </div>
        <div @click="cursorType = 'pulse'" class="flex px-5 py-1 ring-[2px] cursor-pointer rounded-md" :class="[cursorType === 'pulse' ? 'ring-blue-500' : 'hover:ring-blue-800 hover:ring-[1px] ring-slate-500']">
            <p class="w-fit pulse">A</p>
        </div>
        <div @click="cursorType = 'word-pulse'" class="flex px-5 py-1 ring-[2px] cursor-pointer rounded-md" :class="[cursorType === 'word-pulse' ? 'ring-blue-500' : 'hover:ring-blue-800 hover:ring-[1px] ring-slate-500']">
            <p class="w-fit pulse">word</p>
        </div>
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {settingsStore} from '../../store/settingsStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const settingstore = settingsStore()
const { cursorType, settingsToUpdate} = storeToRefs(settingstore)

watch(cursorType, (newVal) => {
    let cursor = newVal

    settingsToUpdate.value.push({
        name: Object.keys({cursor})[0],
        value: cursor
    })
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