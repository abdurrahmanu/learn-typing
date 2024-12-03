<template>
    <div class=" sticky z-[99999] top-[0] bg-neutral-800 text-slate-200">
        <div  class="flex items-center justify-between w-full gap-4 px-2 text-right border-r shadow-sm border-r-zinc-700 shadow-black">
            <div class="p-2 text-lg ">SETTINGS</div>
            <div class="text-white font-bold  text-lg absolute top-0 bottom-0 right-0 p-2 hover:cursor-default" @click="toggleSettings">
                <p class="font-mono  w-fit hover:text-red-500 hover:cursor-pointer">X</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import { customizeStore } from '../../store/customizeStore';

const custom = customizeStore()
const { allSettings } = storeToRefs(custom)

const customize = customizeStore()
const {pauseTyping} = storeToRefs(customize)

const toggleSettings = () => {
    allSettings.value = !allSettings.value
    if (allSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>
