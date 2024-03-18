<template>
        <nav class="sticky top-0 flex justify-between w-[100%] h-[50px] text-slate-300 px-5 bg-zinc-900 shadow-sm shadow-black max-w-[1100px] m-auto z-[9] items-center ">
            <div class="font-mono text-xl font-bold md:text-2xl">DORAYI TYPING</div>
            <div @click="showMoreSettings = !showMoreSettings" class="rounded-full inline-block w-fit">
                <img class="h-7" src="/settings.svg" alt="">
            </div>
        </nav>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const main = mainStore()
const { showMoreSettings} = storeToRefs(main)
</script>

