<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-4 pl-5 gap-x-3 gap-y-1 font-[400]">
        <div class="py-1 text-[14px] font-bold">CURSOR</div>
        <div class="flex flex-wrap gap-x-2 gap-y-1">
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
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const customizestore = customizeStore()
const { cursorType, settingsToUpdate} = storeToRefs(customizestore)

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