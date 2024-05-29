<template>
    <nav :class="[appTheme]" class="sticky top-0 w-[100%] h-[50px] shadow-sm shadow-neutral-600 max-w-[1300px] m-auto z-[9] mb-4">
        <div class="absolute top-0 left-0 flex items-center justify-between w-full px-5 py-2 pl-3 pr-2">
            <div class="flex items-center gap-3">
                <user/>
                <div class="font-mono text-xl font-bold cursor-default md:text-2xl">DORAYI TYPING</div>
            </div>
            <div class="flex gap-2 rounded-full w-fit">
                <settings v-if="route.name === 'home'" @click="toggleSettings" class="h-7" />
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
import {useRouter, useRoute} from 'vue-router'
import {themeStore}  from '../store/themeStore'

const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)


const route = useRoute()
const store = mainStore()
const {alphabets, pauseTyping} = storeToRefs(store)

const main = customizeStore()
const { showMoreSettings} = storeToRefs(main)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>

