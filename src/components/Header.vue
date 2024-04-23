<template>
    <nav class="sticky top-0 flex justify-between w-[100%] h-[50px] text-slate-300 px-5 pr-2 bg-zinc-900 shadow-sm shadow-black max-w-[1300px] m-auto z-[9] items-center ">
        <div class="font-mono text-xl font-bold md:text-2xl">DORAYI TYPING</div>
        <div v-if="!alphabets" class="flex gap-2 rounded-full w-fit">
            <img v-if="!showMoreSettings" @click="showMoreSettings = !showMoreSettings" class="h-7" src="/settings.svg" alt="">
        </div>
    </nav>
</template>

<script setup>
import {onBeforeMount} from 'vue'
import BackgroundButton from './BackgroundButton.vue';
import {storeToRefs} from 'pinia'
import {customizeStore} from '../store/customizeStore'
import { useDarkMode } from '../store/useDarkMode'
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {alphabets} = storeToRefs(store)

const main = customizeStore()
const { showMoreSettings} = storeToRefs(main)

const darkMode = useDarkMode()
const {checkLocalStorageForSavedBackground} = darkMode
const {toggleDarkMode} = storeToRefs(darkMode)

onBeforeMount(() => {
    checkLocalStorageForSavedBackground()
})
</script>

