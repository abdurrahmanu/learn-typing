<template>
    <div class=" sticky z-[99999] top-[0]">
        <div  class="font-mono text-right flex justify-between px-2 w-full bg-neutral-800 shadow-sm shadow-black">
            <div class="text-white text-lg font-mono">ALL SETTINGS</div>
            <div class="p-[2px] text-white font-bold font-mono text-lg" @click="showMoreSettings = !showMoreSettings">
                <img src="/cancel.svg" class="w-7" alt="">
            </div>
        </div>
        <div class="m-auto text-center p-2 bg-neutral-600">
            <input type="search" class="px-3 w-full min-w-[100%] max-w-[300px] outline-none text-black p-1 rounded-full" name="" id="" placeholder="search settings">
        </div>
    </div>
</template>

<script setup>
import {mainStore} from '../../store/mainStore';
import {storeToRefs} from 'pinia'

const main = mainStore()
const { showMoreSettings } = storeToRefs(main)
</script>
