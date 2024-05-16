<template>
    <div class=" sticky z-[99999] top-[0] bg-neutral-700 text-slate-200">
        <div  class="font-mono text-right flex justify-between px-2 w-full border-r border-r-zinc-700 shadow-sm shadow-black items-center gap-4">
            <div class=" text-lg font-mono py-2">ALL SETTINGS</div>
            <div class="p-[2px] text-white font-bold font-mono text-lg" @click="toggleSettings">
                <img src="/cancel.svg" class="w-7" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import {customizeStore} from '../../store/customizeStore';
import {storeToRefs} from 'pinia'
import { mainStore } from '../../store/mainStore';

const custom = customizeStore()
const { showMoreSettings } = storeToRefs(custom)

const main = mainStore()
const {pauseTyping} = storeToRefs(main)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>
