<template>
    <nav class="sticky top-0 w-[100%] h-[50px] shadow-sm shadow-neutral-600 max-w-[1300px] m-auto z-[9] mb-4">
        <div class="flex px-5 pr-2 items-center  justify-between py-2 absolute top-0 left-0 w-full">
            <div class="font-mono text-xl font-bold md:text-2xl">DORAYI TYPING</div>
            <div v-if="!alphabets" class="flex gap-2 rounded-full w-fit">
                <settings v-if="!showMoreSettings" @click="showMoreSettings = !showMoreSettings" class="h-7" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import settings from './svg/settings.vue';
import {onBeforeMount} from 'vue'
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

onBeforeMount(() => {
    checkLocalStorageForSavedBackground()
})
</script>

