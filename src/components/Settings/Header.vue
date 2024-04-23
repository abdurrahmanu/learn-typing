<template>
    <div class=" sticky z-[99999] top-[0]">
        <div  class="font-mono text-right flex justify-between px-2 w-full bg-black border-r border-r-zinc-700 shadow-sm shadow-black items-center">
            <div class="text-white text-lg font-mono py-2">ALL SETTINGS</div>
            <div class="p-[2px] text-white font-bold font-mono text-lg" @click="showMoreSettings = !showMoreSettings">
                <img src="/cancel.svg" class="w-7" alt="">
            </div>
        </div>
        <!-- <div class="m-auto text-center p-2 bg-neutral-600">
            <input type="search" class="px-3 pl-5 w-full min-w-[100%] max-w-[300px] outline-none text-black p-1 py-2 rounded-full text-sm" name="" id="" placeholder="Search...">
        </div> -->
    </div>
</template>

<script setup>
import {customizeStore} from '../../store/customizeStore';
import {storeToRefs} from 'pinia'

const main = customizeStore()
const { showMoreSettings } = storeToRefs(main)
</script>
