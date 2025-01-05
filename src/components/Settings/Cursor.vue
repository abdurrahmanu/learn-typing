<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-4 pl-5 gap-x-3 gap-y-1 font-[400]">
        <div class="py-1 text-[15px] font-bold">CURSOR</div>
        <div class="flex flex-wrap gap-x-2 gap-y-1">
            <div @click="cursorType = 'border'" class="flex px-5 py-1 border rounded-md" :class="[cursorType === 'border' ? 'border-green-500' : 'border-slate-500']">
                <p class="border w-fit border-slate-400">A</p>
            </div>
            <!-- <div @click="cursorType = 'background'" class="flex px-5 py-1 border rounded-md" :class="[cursorType === 'background' ? 'border-green-500' : 'border-slate-500']">
                <p :class="[theme === 'dark' ? 'bg-slate-100 text-black' : 'bg-neutral-900 text-slate-200']">A</p>
            </div> -->
            <div @click="cursorType = 'cursor'" class="flex px-5 py-1 border rounded-md" :class="[cursorType === 'cursor' ? 'border-green-500' : 'border-slate-500']">
                <p class="border border-transparent w-fit border-l-slate-500 ">A</p>
            </div>
            <div @click="cursorType = 'underline'" class="flex px-5 py-1 border rounded-md" :class="[cursorType === 'underline' ? 'border-green-500' : 'border-slate-500']">
                <p class="border border-transparent w-fit border-b-blue-500">A</p>
            </div>
            <div @click="cursorType = 'pulse'" class="flex px-5 py-1 border rounded-md" :class="[cursorType === 'pulse' ? 'border-green-500' : 'border-slate-500']">
                <p class="w-fit pulse">A</p>
            </div>
            <div @click="cursorType = 'word-pulse'" class="flex px-5 py-1 border rounded-md" :class="[cursorType === 'word-pulse' ? 'border-green-500' : 'border-slate-500']">
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
import {updateDB} from '../../composables/updateDB'

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const { cursorType} = storeToRefs(store)

watch(cursorType, (newVal) => {
    let cursor = newVal
    updateDB(Object.keys({cursor})[0], cursor)
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