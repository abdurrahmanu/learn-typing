<template>
        <div  class="font-mono text-right flex justify-between px-2 sticky z-[99999] top-[0] w-full bg-neutral-800 shadow-sm shadow-black">
            <div class="text-white text-lg font-mono">ALL SETTINGS</div>
            <div class="p-[2px] text-white font-bold font-mono text-lg" @click="showMoreSettings = !showMoreSettings">
                <img src="/cancel.svg" class="w-7" alt="">
            </div>
        </div>
</template>

<script setup>
import {mainStore} from '../../store/mainStore';
import {storeToRefs} from 'pinia'

const main = mainStore()
const { showMoreSettings } = storeToRefs(main)
</script>
