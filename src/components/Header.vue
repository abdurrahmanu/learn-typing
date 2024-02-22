<template>
        <nav class="sticky top-0 flex justify-between w-full p-3 text-slate-300 max-w-[1000px] m-auto z-[999] bg-neutral-600 shadow-sm shadow-black items-center">
            <div class="font-mono text-xl font-bold md:text-2xl">DORAYI TYPING</div>
            <div class="relative w-fit h-fit">                
                <div @click="toggleDropdown = !toggleDropdown" class="w-10 h-8 bg-black"></div>
                <div v-if="toggleDropdown" class="rounded-md bg-slate-100 absolute top-[110%] text-black text-xs right-0">
                    <div class="px-2 py-1 rounded-md hover:bg-slate-300">Progress</div>
                    <div class="px-2 py-1 rounded-md hover:bg-slate-300">About</div>
                    <div class="px-2 py-1 rounded-md hover:bg-slate-300">Home</div>
                </div>
            </div>
        </nav>
</template>

<script setup>
import {ref} from 'vue'

const toggleDropdown = ref(false)
</script>

