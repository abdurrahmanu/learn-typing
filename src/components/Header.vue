<template>
    <nav class="sticky top-0 w-[100%] h-[50px] shadow-sm shadow-neutral-600 max-w-[1300px] m-auto z-[9] mb-4">
        <div class="flex px-5 pl-3 pr-2 items-center  justify-between py-2 absolute top-0 left-0 w-full">
            <div class="flex gap-3 items-center">
                <user/>
                <div class="font-mono text-xl font-bold md:text-2xl cursor-default">DORAYI TYPING</div>
            </div>
            <div class="flex gap-2 rounded-full w-fit">
                <settings @click="toggleSettings" class="h-7" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import user from './svg/user.vue'
import settings from './svg/settings.vue';
import {storeToRefs} from 'pinia'
import {customizeStore} from '../store/customizeStore'
import { mainStore } from '../store/mainStore';

const store = mainStore()
const {alphabets, pauseTyping, toggleSidebar} = storeToRefs(store)

const main = customizeStore()
const { showMoreSettings} = storeToRefs(main)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>

