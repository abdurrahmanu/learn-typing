<template>
    <div class=" sticky z-[99999] top-[0] bg-neutral-800 text-slate-200">
        <div  class="flex items-center justify-between w-full gap-4 px-2 font-mono text-right border-r shadow-sm border-r-zinc-700 shadow-black">
            <div class="p-2 font-mono text-lg ">SETTINGS</div>
            <div class="p-[2px] text-white font-bold font-mono text-lg" @click="toggleSettings">
                <p class="font-mono w-fit hover:text-red-500">X</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import { customizeStore } from '../../store/customizeStore';

const custom = customizeStore()
const { showMoreSettings } = storeToRefs(custom)

const customize = customizeStore()
const {pauseTyping} = storeToRefs(customize)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>
